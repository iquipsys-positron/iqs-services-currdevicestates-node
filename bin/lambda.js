let CurrentDeviceStatesLambdaFunction = require('../obj/src/container/CurrentDeviceStatesLambdaFunction').CurrentDeviceStatesLambdaFunction;

module.exports = new CurrentDeviceStatesLambdaFunction().getHandler();