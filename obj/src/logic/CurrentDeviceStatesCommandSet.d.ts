import { CommandSet } from 'pip-services3-commons-node';
import { ICurrentDeviceStatesController } from './ICurrentDeviceStatesController';
export declare class CurrentDeviceStatesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ICurrentDeviceStatesController);
    private makeGetStatesCommand;
    private makeGetStateByIdCommand;
    private makeSetStateCommand;
    private makeSetStatesCommand;
    private makeDeleteStatesByFilterCommand;
    private makeDeleteStateByIdCommand;
}
