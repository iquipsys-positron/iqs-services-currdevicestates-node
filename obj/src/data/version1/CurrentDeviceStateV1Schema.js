"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class CurrentDeviceStateV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('object_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('pos', null); // GeoJSON
        this.withOptionalProperty('alt', pip_services3_commons_node_2.TypeCode.Float);
        this.withOptionalProperty('angle', pip_services3_commons_node_2.TypeCode.Float);
        this.withOptionalProperty('speed', pip_services3_commons_node_2.TypeCode.Float);
    }
}
exports.CurrentDeviceStateV1Schema = CurrentDeviceStateV1Schema;
//# sourceMappingURL=CurrentDeviceStateV1Schema.js.map