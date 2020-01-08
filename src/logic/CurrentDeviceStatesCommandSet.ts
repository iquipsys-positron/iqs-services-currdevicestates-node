import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { CurrentDeviceStateV1 } from '../data/version1/CurrentDeviceStateV1';
import { CurrentDeviceStateV1Schema } from '../data/version1/CurrentDeviceStateV1Schema';
import { ICurrentDeviceStatesController } from './ICurrentDeviceStatesController';

export class CurrentDeviceStatesCommandSet extends CommandSet {
    private _logic: ICurrentDeviceStatesController;

    constructor(logic: ICurrentDeviceStatesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetStatesCommand());
		this.addCommand(this.makeGetStateByIdCommand());
		this.addCommand(this.makeSetStateCommand());
		this.addCommand(this.makeSetStatesCommand());
		this.addCommand(this.makeDeleteStatesByFilterCommand());
		this.addCommand(this.makeDeleteStateByIdCommand());
    }

	private makeGetStatesCommand(): ICommand {
		return new Command(
			"get_states",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getStates(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetStateByIdCommand(): ICommand {
		return new Command(
			"get_state_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('state_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let stateId = args.getAsString("state_id");
                this._logic.getStateById(correlationId, stateId, callback);
            }
		);
	}

	private makeSetStateCommand(): ICommand {
		return new Command(
			"set_state",
			new ObjectSchema(true)
				.withRequiredProperty('state', new CurrentDeviceStateV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let state = args.get("state");
                this._logic.setState(correlationId, state, callback);
            }
		);
	}

	private makeSetStatesCommand(): ICommand {
		return new Command(
			"set_states",
			new ObjectSchema(true)
				.withRequiredProperty('states', new ArraySchema(new CurrentDeviceStateV1Schema())),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let states = args.get("states");
                this._logic.setStates(correlationId, states, (err) => {
					callback(err, null);
				});
            }
		);
	}
	
	private makeDeleteStatesByFilterCommand(): ICommand {
		return new Command(
			"delete_states_by_filter",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.deleteStatesByFilter(correlationId, filter, (err) => {
					if (callback) callback(err, null); 
				});
            }
		);
	}

	private makeDeleteStateByIdCommand(): ICommand {
		return new Command(
			"delete_state_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('state_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let stateId = args.getAsString("state_id");
                this._logic.deleteStateById(correlationId, stateId, callback);
            }
		);
	}

}