let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { ICurrentDeviceStatesPersistence } from './ICurrentDeviceStatesPersistence';

export class CurrentDeviceStatesMemoryPersistence 
    extends IdentifiableMemoryPersistence<CurrentDeviceStateV1, string> 
    implements ICurrentDeviceStatesPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let orgId = filter.getAsNullableString('org_id');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
                
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;
        
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (orgId && item.org_id != orgId) 
                return false;
            if (fromTime && item.time < fromTime) 
                return false;
            if (toTime && item.time >= toTime) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public setBatch(correlationId: string, items: CurrentDeviceStateV1[],
        callback: (err: any) => void): void {
        if (items == null || items.length == 0) {
            if (callback) callback(null);
            return;
        }

        async.each(items, (item, callback) => {
            this.set(correlationId, item, callback);
        }, callback);
    }
    
    public deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }

}
