import { Descriptor } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { CurrentDeviceStatesServiceFactory } from '../build/CurrentDeviceStatesServiceFactory';

export class CurrentDeviceStatesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("curr_device_states", "Current device states function");
        this._factories.add(new CurrentDeviceStatesServiceFactory);
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-currdevicestates', 'controller', 'default', '*', '*'));
    }

    public getReferences(): IReferences {
        return this._references;
    }
}

export const handler = new CurrentDeviceStatesLambdaFunction().getHandler();