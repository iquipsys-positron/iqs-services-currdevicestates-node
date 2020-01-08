import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class CurrentDeviceStateV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    object_id?: string;
    time: Date;
    pos?: any;
    alt?: number;
    angle?: number;
    speed?: number;
}
