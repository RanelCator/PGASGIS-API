import { Document } from 'mongoose';
export declare class FeatureCollection extends Document {
    GroupID: string;
    data: Record<string, any>;
}
export declare const FeatureSchema: import("mongoose").Schema<FeatureCollection, import("mongoose").Model<FeatureCollection, any, any, any, Document<unknown, any, FeatureCollection, any, {}> & FeatureCollection & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FeatureCollection, Document<unknown, {}, import("mongoose").FlatRecord<FeatureCollection>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<FeatureCollection> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
