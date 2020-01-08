import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
export interface ICurrentDeviceStatesController {
    getStates(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void;
    getStateById(correlationId: string, id: string, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
    setState(correlationId: string, state: CurrentDeviceStateV1, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
    setStates(correlationId: string, states: CurrentDeviceStateV1[], callback: (err: any) => void): void;
    deleteStatesByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
    deleteStateById(correlationId: string, id: string, callback: (err: any, state: CurrentDeviceStateV1) => void): void;
}
