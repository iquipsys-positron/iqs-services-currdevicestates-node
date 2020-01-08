let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { ICurrentDeviceStatesPersistence } from '../persistence/ICurrentDeviceStatesPersistence';
import { ICurrentDeviceStatesController } from './ICurrentDeviceStatesController';
import { CurrentDeviceStatesCommandSet } from './CurrentDeviceStatesCommandSet';

export class CurrentDeviceStatesController implements  IConfigurable, IReferenceable, ICommandable, ICurrentDeviceStatesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-currdevicestates:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(CurrentDeviceStatesController._defaultConfig);
    private _persistence: ICurrentDeviceStatesPersistence;
    private _commandSet: CurrentDeviceStatesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ICurrentDeviceStatesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new CurrentDeviceStatesCommandSet(this);
        return this._commandSet;
    }
    
    public getStates(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getStateById(correlationId: string, id: string, 
        callback: (err: any, state: CurrentDeviceStateV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    private fixState(state: CurrentDeviceStateV1): void {
        if (_.isString(state.pos))
            state.pos = JSON.parse(state.pos);

        state.time = DateTimeConverter.toNullableDateTime(state.time) || new Date();
    }

    public setState(correlationId: string, state: CurrentDeviceStateV1, 
        callback: (err: any, state: CurrentDeviceStateV1) => void): void {
        this.fixState(state);
        this._persistence.set(correlationId, state, callback);
    }

    public setStates(correlationId: string, states: CurrentDeviceStateV1[], 
        callback: (err: any) => void): void {
        for (let state of states)
            this.fixState(state);
    
        this._persistence.setBatch(correlationId, states, callback);
    }
    
    public deleteStatesByFilter(correlationId: string, filter: FilterParams, 
        callback: (err: any) => void): void {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }

    public deleteStateById(correlationId: string, id: string, 
        callback: (err: any, state: CurrentDeviceStateV1) => void): void {
        this._persistence.deleteById(correlationId, id, callback);
    }

}
