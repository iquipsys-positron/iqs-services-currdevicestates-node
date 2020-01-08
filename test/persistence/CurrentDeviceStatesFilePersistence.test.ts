import { ConfigParams } from 'pip-services3-commons-node';

import { CurrentDeviceStatesFilePersistence } from '../../src/persistence/CurrentDeviceStatesFilePersistence';
import { CurrentDeviceStatesPersistenceFixture } from './CurrentDeviceStatesPersistenceFixture';

suite('CurrentDeviceStatesFilePersistence', ()=> {
    let persistence: CurrentDeviceStatesFilePersistence;
    let fixture: CurrentDeviceStatesPersistenceFixture;
    
    setup((done) => {
        persistence = new CurrentDeviceStatesFilePersistence('./data/curr_device_states.test.json');

        fixture = new CurrentDeviceStatesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});