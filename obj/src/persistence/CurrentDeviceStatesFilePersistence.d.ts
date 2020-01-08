import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { CurrentDeviceStatesMemoryPersistence } from './CurrentDeviceStatesMemoryPersistence';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
export declare class CurrentDeviceStatesFilePersistence extends CurrentDeviceStatesMemoryPersistence {
    protected _persister: JsonFilePersister<CurrentDeviceStateV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
