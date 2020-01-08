"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const CurrentDeviceStatesCommandSet_1 = require("./CurrentDeviceStatesCommandSet");
class CurrentDeviceStatesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(CurrentDeviceStatesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new CurrentDeviceStatesCommandSet_1.CurrentDeviceStatesCommandSet(this);
        return this._commandSet;
    }
    getStates(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getStateById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    fixState(state) {
        if (_.isString(state.pos))
            state.pos = JSON.parse(state.pos);
        state.time = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(state.time) || new Date();
    }
    setState(correlationId, state, callback) {
        this.fixState(state);
        this._persistence.set(correlationId, state, callback);
    }
    setStates(correlationId, states, callback) {
        for (let state of states)
            this.fixState(state);
        this._persistence.setBatch(correlationId, states, callback);
    }
    deleteStatesByFilter(correlationId, filter, callback) {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }
    deleteStateById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.CurrentDeviceStatesController = CurrentDeviceStatesController;
CurrentDeviceStatesController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-currdevicestates:persistence:*:*:1.0');
//# sourceMappingURL=CurrentDeviceStatesController.js.map