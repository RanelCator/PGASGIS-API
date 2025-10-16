import { Document } from 'mongoose';
declare class Style {
    propertyValue: string;
    alt_description: string;
    fillType: string;
    fillWeight: string;
    fillColor: string;
    angle: string;
    sgvIcons: string;
    classIcons: string;
    borderColor: string;
}
declare class Attribute {
    propertyName: string;
    propertyName_Group: string;
    propertyName_Label: string;
    showLabelInZoomLevel: string;
    fillType: string;
    fillWeight: string;
    fillColor: string;
    angle: string;
    sgvIcons: string;
    classIcons: string;
    style: Style[];
}
declare class LayerInfo {
    description: string;
    remarks: string;
    layer_type: string;
    DateUploaded: string;
}
export declare class MapLayer extends Document {
    layer: LayerInfo;
    attribute: Attribute[];
}
export declare const MapLayerSchema: import("mongoose").Schema<MapLayer, import("mongoose").Model<MapLayer, any, any, any, Document<unknown, any, MapLayer, any, {}> & MapLayer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MapLayer, Document<unknown, {}, import("mongoose").FlatRecord<MapLayer>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<MapLayer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
