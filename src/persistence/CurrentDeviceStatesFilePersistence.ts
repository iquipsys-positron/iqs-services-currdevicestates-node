import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { CurrentDeviceStatesMemoryPersistence } from './CurrentDeviceStatesMemoryPersistence';
import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';

export class CurrentDeviceStatesFilePersistence extends CurrentDeviceStatesMemoryPersistence {
	protected _persister: JsonFilePersister<CurrentDeviceStateV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<CurrentDeviceStateV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}