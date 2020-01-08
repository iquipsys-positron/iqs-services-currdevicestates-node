"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class CurrentDeviceStatesMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('curr_device_states');
        super.ensureIndex({ org_id: 1, time: -1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    setBatch(correlationId, states, callback) {
        if (states == null || states.length == 0) {
            if (callback)
                callback(null);
            return;
        }
        let batch = this._collection.initializeUnorderedBulkOp();
        let count = 0;
        let operations = [];
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
            if (callback)
                callback(null);
        });
    }
    deleteByFilter(correlationId, filter, callback) {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }
}
exports.CurrentDeviceStatesMongoDbPersistence = CurrentDeviceStatesMongoDbPersistence;
//# sourceMappingURL=CurrentDeviceStatesMongoDbPersistence.js.map