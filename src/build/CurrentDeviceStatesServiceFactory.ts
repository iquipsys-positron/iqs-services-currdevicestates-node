import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { CurrentDeviceStatesMongoDbPersistence } from '../persistence/CurrentDeviceStatesMongoDbPersistence';
import { CurrentDeviceStatesFilePersistence } from '../persistence/CurrentDeviceStatesFilePersistence';
import { CurrentDeviceStatesMemoryPersistence } from '../persistence/CurrentDeviceStatesMemoryPersistence';
import { CurrentDeviceStatesController } from '../logic/CurrentDeviceStatesController';
import { CurrentDeviceStatesHttpServiceV1 } from '../services/version1/CurrentDeviceStatesHttpServiceV1';

export class CurrentDeviceStatesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-currdevicestates", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-currdevicestates", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-currdevicestates", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-currdevicestates", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-currdevicestates", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-currdevicestates", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(CurrentDeviceStatesServiceFactory.MemoryPersistenceDescriptor, CurrentDeviceStatesMemoryPersistence);
		this.registerAsType(CurrentDeviceStatesServiceFactory.FilePersistenceDescriptor, CurrentDeviceStatesFilePersistence);
		this.registerAsType(CurrentDeviceStatesServiceFactory.MongoDbPersistenceDescriptor, CurrentDeviceStatesMongoDbPersistence);
		this.registerAsType(CurrentDeviceStatesServiceFactory.ControllerDescriptor, CurrentDeviceStatesController);
		this.registerAsType(CurrentDeviceStatesServiceFactory.HttpServiceDescriptor, CurrentDeviceStatesHttpServiceV1);
	}
	
}
