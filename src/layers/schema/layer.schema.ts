// layers/schema/layer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Style {
  @Prop() propertyValue: string;
  @Prop() alt_description: string;
  @Prop() fillType: string;
  @Prop() fillWeight: string;
  @Prop() fillColor: string;
  @Prop() angle: string;
  @Prop() sgvIcons: string;
  @Prop() classIcons: string;
  @Prop() borderColor: string;
}

@Schema({ _id: true })
class Attribute {
  @Prop({ required: true }) propertyName: string;
  @Prop({ required: true }) propertyName_Group: string;
  @Prop({ required: true }) propertyName_Label: string;
  @Prop() showLabelInZoomLevel: string;
  @Prop() fillType: string;
  @Prop() fillWeight: string;
  @Prop() fillColor: string;
  @Prop() angle: string;
  @Prop() sgvIcons: string;
  @Prop() classIcons: string;

  @Prop({ type: [Style], default: [] })
  style: Style[];
}

@Schema({ _id: false })
class LayerInfo {
  @Prop() description: string;
  @Prop() remarks: string;
  @Prop() layer_type: string;
  @Prop() DateUploaded: string;
}

@Schema({ collection: 'map_layer' })
export class MapLayer extends Document {
  @Prop({ type: LayerInfo }) layer: LayerInfo;

  @Prop({ type: [Attribute], default: [] })
  attribute: Attribute[];
}

export const MapLayerSchema = SchemaFactory.createForClass(MapLayer);
MapLayerSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret: any) => {
    delete ret.__v; // no TS error now
    return ret;
  },
});