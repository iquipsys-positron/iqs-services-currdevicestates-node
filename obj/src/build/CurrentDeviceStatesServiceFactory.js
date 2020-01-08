"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const CurrentDeviceStatesMongoDbPersistence_1 = require("../persistence/CurrentDeviceStatesMongoDbPersistence");
const CurrentDeviceStatesFilePersistence_1 = require("../persistence/CurrentDeviceStatesFilePersistence");
const CurrentDeviceStatesMemoryPersistence_1 = require("../persistence/CurrentDeviceStatesMemoryPersistence");
const CurrentDeviceStatesController_1 = require("../logic/CurrentDeviceStatesController");
const CurrentDeviceStatesHttpServiceV1_1 = require("../services/version1/CurrentDeviceStatesHttpServiceV1");
class CurrentDeviceStatesServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(CurrentDeviceStatesServiceFactory.MemoryPersistenceDescriptor, CurrentDeviceStatesMemoryPersistence_1.CurrentDeviceStatesMemoryPersistence);
        this.registerAsType(CurrentDeviceStatesServiceFactory.FilePersistenceDescriptor, CurrentDeviceStatesFilePersistence_1.CurrentDeviceStatesFilePersistence);
        this.registerAsType(CurrentDeviceStatesServiceFactory.MongoDbPersistenceDescriptor, CurrentDeviceStatesMongoDbPersistence_1.CurrentDeviceStatesMongoDbPersistence);
        this.registerAsType(CurrentDeviceStatesServiceFactory.ControllerDescriptor, CurrentDeviceStatesController_1.CurrentDeviceStatesController);
        this.registerAsType(CurrentDeviceStatesServiceFactory.HttpServiceDescriptor, CurrentDeviceStatesHttpServiceV1_1.CurrentDeviceStatesHttpServiceV1);
    }
}
exports.CurrentDeviceStatesServiceFactory = CurrentDeviceStatesServiceFactory;
CurrentDeviceStatesServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "factory", "default", "default", "1.0");
CurrentDeviceStatesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "persistence", "memory", "*", "1.0");
CurrentDeviceStatesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "persistence", "file", "*", "1.0");
CurrentDeviceStatesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "persistence", "mongodb", "*", "1.0");
CurrentDeviceStatesServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "controller", "default", "*", "1.0");
CurrentDeviceStatesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-currdevicestates", "service", "http", "*", "1.0");
//# sourceMappingURL=CurrentDeviceStatesServiceFactory.js.map