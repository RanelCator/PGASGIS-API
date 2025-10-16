import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false, _id: false })
export class Geometry {
  @Prop({
    type: String,
    enum: ['Point', 'LineString', 'Polygon', 'MultiPolygon'],
    required: true,
  })
  type: string;

  @Prop({ type: Array, required: true })
  coordinates: number[][][] | number[][][][] | number[];
}

const GeometrySchema = SchemaFactory.createForClass(Geometry);

@Schema({_id: false})
export class Data {
  @Prop({ type: String, enum: ['Feature'], required: true })
  type: string;

  @Prop({ type: Object, required: true })
  properties: Record<string, any>;

  @Prop({ type: GeometrySchema, required: true })
  geometry: Geometry;
}

const DataSchema = SchemaFactory.createForClass(Data);

@Schema({ timestamps: true })
export class Feature extends Document {
  @Prop({ required: true })
  GroupID: string;

  @Prop({ type: DataSchema, required: true })
  data: Record<string, any>;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
