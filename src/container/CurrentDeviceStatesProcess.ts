import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { CurrentDeviceStatesServiceFactory } from '../build/CurrentDeviceStatesServiceFactory';

export class CurrentDeviceStatesProcess extends ProcessContainer {

    public constructor() {
        super("curr_device_states", "Current device states microservice");
        this._factories.add(new CurrentDeviceStatesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
