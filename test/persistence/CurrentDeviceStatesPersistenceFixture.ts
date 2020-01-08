let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { CurrentDeviceStateV1 } from '../../src/data/version1/CurrentDeviceStateV1';

import { ICurrentDeviceStatesPersistence } from '../../src/persistence/ICurrentDeviceStatesPersistence';

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
let STATE3: CurrentDeviceStateV1 = {
    id: '3',
    org_id: '2',
    object_id: '2',
    time: new Date(new Date().getTime() + 1000)
};

export class CurrentDeviceStatesPersistenceFixture {
    private _persistence: ICurrentDeviceStatesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testSetCurrentDeviceStates(done) {
        async.series([
        // Create one state
            (callback) => {
                this._persistence.set(
                    null,
                    STATE1,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);
                        assert.equal(state.org_id, STATE1.org_id);

                        callback();
                    }
                );
            },
        // Create another states
            (callback) => {
                this._persistence.setBatch(
                    null,
                    [STATE2, STATE3],
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let state1: CurrentDeviceStateV1;

        async.series([
        // Create items
            (callback) => {
                this.testSetCurrentDeviceStates(callback);
            },
        // Get all states
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        state1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the state
            (callback) => {
                state1.object_id = '5';

                this._persistence.set(
                    null,
                    state1,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isObject(state);
                        assert.equal(state.object_id, '5');
                        assert.equal(state.id, state1.id);

                        callback();
                    }
                );
            },
        // Delete state
            (callback) => {
                this._persistence.deleteById(
                    null,
                    state1.id,
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
                this._persistence.getOneById(
                    null,
                    state1.id,
                    (err, state) => {
                        assert.isNull(err);

                        assert.isNull(state || null);

                        callback();
                    }
                )
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create states
            (callback) => {
                this.testSetCurrentDeviceStates(callback);
            },
        // Get states filtered by organization
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, states) => {
                        assert.isNull(err);

                        assert.isObject(states);
                        assert.lengthOf(states.data, 2);

                        callback();
                    }
                );
            },
        // Get states by device id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        ids: ['1']
                    }),
                    new PagingParams(),
                    (err, states) => {
                        assert.isNull(err);

                        assert.isObject(states);
                        assert.lengthOf(states.data, 1);

                        callback();
                    }
                );
            },
        // Get states filtered by time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                       from_time: STATE3.time
                    }),
                    new PagingParams(),
                    (err, states) => {
                        assert.isNull(err);

                        assert.isObject(states);
                        assert.lengthOf(states.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}
