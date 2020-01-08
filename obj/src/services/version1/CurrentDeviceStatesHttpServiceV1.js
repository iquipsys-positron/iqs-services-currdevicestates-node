"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class CurrentDeviceStatesHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/curr_device_states');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-currdevicestates', 'controller', 'default', '*', '1.0'));
    }
}
exports.CurrentDeviceStatesHttpServiceV1 = CurrentDeviceStatesHttpServiceV1;
//# sourceMappingURL=CurrentDeviceStatesHttpServiceV1.js.map