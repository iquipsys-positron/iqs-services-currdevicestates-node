import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class CurrentDeviceStateV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withOptionalProperty('object_id', TypeCode.String);
        
        this.withOptionalProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('pos', null); // GeoJSON
        this.withOptionalProperty('alt', TypeCode.Float);
        this.withOptionalProperty('angle', TypeCode.Float);
        this.withOptionalProperty('speed', TypeCode.Float);
    }
}
