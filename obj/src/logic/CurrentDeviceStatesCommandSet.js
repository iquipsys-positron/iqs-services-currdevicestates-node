"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const pip_services3_commons_node_9 = require("pip-services3-commons-node");
const CurrentDeviceStateV1Schema_1 = require("../data/version1/CurrentDeviceStateV1Schema");
class CurrentDeviceStatesCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetStatesCommand());
        this.addCommand(this.makeGetStateByIdCommand());
        this.addCommand(this.makeSetStateCommand());
        this.addCommand(this.makeSetStatesCommand());
        this.addCommand(this.makeDeleteStatesByFilterCommand());
        this.addCommand(this.makeDeleteStateByIdCommand());
    }
    makeGetStatesCommand() {
        return new pip_services3_commons_node_2.Command("get_states", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_9.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getStates(correlationId, filter, paging, callback);
        });
    }
    makeGetStateByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_state_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('state_id', pip_services3_commons_node_7.TypeCode.String), (correlationId, args, callback) => {
            let stateId = args.getAsString("state_id");
            this._logic.getStateById(correlationId, stateId, callback);
        });
    }
    makeSetStateCommand() {
        return new pip_services3_commons_node_2.Command("set_state", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('state', new CurrentDeviceStateV1Schema_1.CurrentDeviceStateV1Schema()), (correlationId, args, callback) => {
            let state = args.get("state");
            this._logic.setState(correlationId, state, callback);
        });
    }
    makeSetStatesCommand() {
        return new pip_services3_commons_node_2.Command("set_states", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('states', new pip_services3_commons_node_6.ArraySchema(new CurrentDeviceStateV1Schema_1.CurrentDeviceStateV1Schema())), (correlationId, args, callback) => {
            let states = args.get("states");
            this._logic.setStates(correlationId, states, (err) => {
                callback(err, null);
            });
        });
    }
    makeDeleteStatesByFilterCommand() {
        return new pip_services3_commons_node_2.Command("delete_states_by_filter", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_8.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.deleteStatesByFilter(correlationId, filter, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeDeleteStateByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_state_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('state_id', pip_services3_commons_node_7.TypeCode.String), (correlationId, args, callback) => {
            let stateId = args.getAsString("state_id");
            this._logic.deleteStateById(correlationId, stateId, callback);
        });
    }
}
exports.CurrentDeviceStatesCommandSet = CurrentDeviceStatesCommandSet;
//# sourceMappingURL=CurrentDeviceStatesCommandSet.js.map