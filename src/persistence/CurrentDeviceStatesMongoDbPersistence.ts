let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { ICurrentDeviceStatesPersistence } from './ICurrentDeviceStatesPersistence';

export class CurrentDeviceStatesMongoDbPersistence
    extends IdentifiableMongoDbPersistence<CurrentDeviceStateV1, string>
    implements ICurrentDeviceStatesPersistence {

    constructor() {
        super('curr_device_states');
        super.ensureIndex({ org_id: 1, time: -1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CurrentDeviceStateV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public setBatch(correlationId: string, states: CurrentDeviceStateV1[],
        callback: (err: any) => void): void {
        if (states == null || states.length == 0) {
            if (callback) callback(null);
            return;
        }

        let batch = this._collection.initializeUnorderedBulkOp();
        let count = 0;

        let operations: any[] = [];

        for (let state of states) {
            let newData = _.omit(state, 'id');

            batch
                .find({ _id: state.id })
                .upsert()
                .updateOne({
                    $set: newData,
                    $setOnInsert: {
                        _id: state.id
                    }
                });
            count++;
        }

        batch.execute((err) => {
            if (!err)
                this._logger.trace(correlationId, "Added " + count + " states");
            
            if (callback) callback(null);
        });
    }
    
    public deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }

}
