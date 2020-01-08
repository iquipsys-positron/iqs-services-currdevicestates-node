"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const CurrentDeviceStatesServiceFactory_1 = require("../build/CurrentDeviceStatesServiceFactory");
class CurrentDeviceStatesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("curr_device_states", "Current device states microservice");
        this._factories.add(new CurrentDeviceStatesServiceFactory_1.CurrentDeviceStatesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.CurrentDeviceStatesProcess = CurrentDeviceStatesProcess;
//# sourceMappingURL=CurrentDeviceStatesProcess.js.map