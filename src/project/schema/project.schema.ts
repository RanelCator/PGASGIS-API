import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false })
class AttributeChild {
    @Prop() attributeId: string;
    @Prop() description: string;
}

@Schema({ _id: false })
class Item {
    @Prop() item_id: string;
    @Prop() description: string;
    @Prop() layerType: number;
    @Prop() orderBy: number;
    @Prop({ type: [AttributeChild], default: [] }) attributeChild?: AttributeChild[];
    @Prop({ type: [Object], default: [] }) items?: Item[];
}
export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema({ _id: false })
class GeometryGroup {
    @Prop() id: number;
    @Prop() description: string;
    @Prop({ type: [ItemSchema], default: [] }) items: Item[];
}

@Schema({ _id: false })
class MenuGroup {
    @Prop({ type: MongooseSchema.Types.ObjectId }) _id: Types.ObjectId;
    @Prop() group_name: string;
    @Prop({ type: [GeometryGroup], default: [] }) geometry_group: GeometryGroup[];
}


@Schema({ collection: 'project' })
export class Project extends Document {
    @Prop({ required: true })
    project_name: string;
    @Prop({ type: [MenuGroup], default: [] }) menu_group: MenuGroup[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
