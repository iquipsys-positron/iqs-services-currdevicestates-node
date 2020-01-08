import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
export interface ICurrentDeviceStatesPersistence extends IGetter<CurrentDeviceStateV1, string>, IWriter<CurrentDeviceStateV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: CurrentDeviceStateV1) => void): void;
    set(correlationId: string, item: CurrentDeviceStateV1, callback: (err: any, item: CurrentDeviceStateV1) => void): void;
    setBatch(correlationId: string, items: CurrentDeviceStateV1[], callback: (err: any) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: CurrentDeviceStateV1) => void): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
