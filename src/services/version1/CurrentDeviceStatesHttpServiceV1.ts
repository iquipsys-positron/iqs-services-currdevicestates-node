import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class CurrentDeviceStatesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/curr_device_states');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-currdevicestates', 'controller', 'default', '*', '1.0'));
    }
}