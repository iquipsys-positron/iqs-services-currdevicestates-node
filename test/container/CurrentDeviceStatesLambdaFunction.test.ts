let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { CurrentDeviceStateV1 } from '../../src/data/version1/CurrentDeviceStateV1';
import { CurrentDeviceStatesMemoryPersistence } from '../../src/persistence/CurrentDeviceStatesMemoryPersistence';
import { CurrentDeviceStatesController } from '../../src/logic/CurrentDeviceStatesController';
import { CurrentDeviceStatesLambdaFunction } from '../../src/container/CurrentDeviceStatesLambdaFunction';

let STATE1: CurrentDeviceStateV1 = {
    id: '1',
    org_id: '1',
    object_id: '1',
    time: new Date()
};
let STATE2: CurrentDeviceStateV1 = {
    id: '2',
    org_id: '1',
    time: new Date()
};

suite('CurrentDeviceStatesLambdaFunction', ()=> {
    let lambda: CurrentDeviceStatesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-currdevicestates:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-currdevicestates:controller:default:default:1.0'
        );

        lambda = new CurrentDeviceStatesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, (err) => {
            done(err);
        });
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var state1, state2: CurrentDeviceStateV1;

        async.series([
        // Create one state
            (callback) => {
                lambda.act(
                    {
                        role: 'curr_device_states',
                        cmd: 'set_state',
                        state: STATE1
                    },
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);
                        assert.equal(state.org_id, STATE1.org_id);

                        state1 = state;

                        callback();
                    }
                );
            },
        // Create another state
            (callback) => {
                lambda.act(
                    {
                        role: 'curr_device_states',
                        cmd: 'set_states',
                        states: [STATE2]
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all states
            (callback) => {
                lambda.act(
                    {
                        role: 'curr_device_states',
                        cmd: 'get_states' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Delete state
            (callback) => {
                lambda.act(
                    {
                        role: 'curr_device_states',
                        cmd: 'delete_state_by_id',
                        state_id: state1.id
                    },
                    (err, state) => {
                        assert.isNull(err);

                        assert.isNotNull(state);
                        assert.equal(state.id, state1.id);

                        callback();
                    }
                )
            },
        // Try to get deleted state by id
            (callback) => {
                lambda.act(
                    {
                        role: 'curr_device_states',
                        cmd: 'get_state_by_id',
                        state_id: state1.id
                    },
                    (err, state) => {
                        assert.isNull(err);

                        assert.isNull(state || null);

                        callback();
                    }
                )
            }
        ], done);
    });
});