import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Criteria {
  @Prop({ required: true }) layerId: string;
  @Prop({ required: true }) stepNo: number;
  @Prop({ required: true }) attributeName: string;
  @Prop({ type: [String], default: [] }) attributeValue: string[];
  @Prop({ type: [Object], default: [] }) features: Record<string, any>[];
}

@Schema({ collection: 'clipping', timestamps: true })
export class Clipping extends Document {
  @Prop({ required: true }) description: string;
  @Prop({ type: [Criteria], default: [] }) criteria: Criteria[];
}

export const ClippingSchema = SchemaFactory.createForClass(Clipping);
