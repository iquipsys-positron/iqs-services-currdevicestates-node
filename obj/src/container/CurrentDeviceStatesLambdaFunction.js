"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const CurrentDeviceStatesServiceFactory_1 = require("../build/CurrentDeviceStatesServiceFactory");
class CurrentDeviceStatesLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("curr_device_states", "Current device states function");
        this._factories.add(new CurrentDeviceStatesServiceFactory_1.CurrentDeviceStatesServiceFactory);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-currdevicestates', 'controller', 'default', '*', '*'));
    }
    getReferences() {
        return this._references;
    }
}
exports.CurrentDeviceStatesLambdaFunction = CurrentDeviceStatesLambdaFunction;
exports.handler = new CurrentDeviceStatesLambdaFunction().getHandler();
//# sourceMappingURL=CurrentDeviceStatesLambdaFunction.js.map