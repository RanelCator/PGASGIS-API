import { Document } from 'mongoose';
export declare class Geometry {
    type: string;
    coordinates: number[][][] | number[][][][] | number[];
}
export declare class Data {
    type: string;
    properties: Record<string, any>;
    geometry: Geometry;
}
export declare class Feature extends Document {
    GroupID: string;
    data: Record<string, any>;
}
export declare const FeatureSchema: import("mongoose").Schema<Feature, import("mongoose").Model<Feature, any, any, any, Document<unknown, any, Feature, any, {}> & Feature & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feature, Document<unknown, {}, import("mongoose").FlatRecord<Feature>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Feature> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
