import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { ICurrentDeviceStatesController } from './ICurrentDeviceStatesController';
export declare class CurrentDeviceStatesController implements IConfigurable, IReferenceable, ICommandable, ICurrentDeviceStatesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getStates(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void;
    getStateById(correlationId: string, id: string, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
    private fixState;
    setState(correlationId: string, state: CurrentDeviceStateV1, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
    setStates(correlationId: string, states: CurrentDeviceStateV1[], callback: (err: any) => void): void;
    deleteStatesByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
    deleteStateById(correlationId: string, id: string, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
}
