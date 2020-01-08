let CurrentDeviceStatesProcess = require('../obj/src/container/CurrentDeviceStatesProcess').CurrentDeviceStatesProcess;

try {
    new CurrentDeviceStatesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
