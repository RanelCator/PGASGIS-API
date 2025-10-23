// layers/schema/featurecollection.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'features' })
export class FeatureCollection extends Document {
  @Prop({ required: true }) GroupID: string;

  @Prop({
    type: {
      type: { type: String, default: 'Feature' },
      properties: {
        
      },
      geometry: {
        type: {
          type: String,
          enum: ['Polygon', 'MultiPolygon', 'Point', 'LineString'],
        },
        coordinates: {},
      },
    },
  })
  data: Record<string, any>;
}

export const FeatureSchema = SchemaFactory.createForClass(FeatureCollection);