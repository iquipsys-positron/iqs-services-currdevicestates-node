import { ConfigParams } from 'pip-services3-commons-node';

import { CurrentDeviceStatesMemoryPersistence } from '../../src/persistence/CurrentDeviceStatesMemoryPersistence';
import { CurrentDeviceStatesPersistenceFixture } from './CurrentDeviceStatesPersistenceFixture';

suite('CurrentDeviceStatesMemoryPersistence', ()=> {
    let persistence: CurrentDeviceStatesMemoryPersistence;
    let fixture: CurrentDeviceStatesPersistenceFixture;
    
    setup((done) => {
        persistence = new CurrentDeviceStatesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new CurrentDeviceStatesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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