import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { ICurrentDeviceStatesPersistence } from './ICurrentDeviceStatesPersistence';
export declare class CurrentDeviceStatesMongoDbPersistence extends IdentifiableMongoDbPersistence<CurrentDeviceStateV1, string> implements ICurrentDeviceStatesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void;
    setBatch(correlationId: string, states: CurrentDeviceStateV1[], callback: (err: any) => void): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
