import { Document, Schema as MongooseSchema, Types } from 'mongoose';
declare class AttributeChild {
    attributeId: string;
    description: string;
}
declare class Item {
    item_id: string;
    description: string;
    layerType: number;
    orderBy: number;
    attributeChild?: AttributeChild[];
    items?: Item[];
}
export declare const ItemSchema: MongooseSchema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item, any, {}> & Item & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Item> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare class GeometryGroup {
    id: number;
    description: string;
    items: Item[];
}
declare class MenuGroup {
    _id: Types.ObjectId;
    group_name: string;
    geometry_group: GeometryGroup[];
}
export declare class Project extends Document {
    project_name: string;
    menu_group: MenuGroup[];
}
export declare const ProjectSchema: MongooseSchema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project, any, {}> & Project & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Project> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
