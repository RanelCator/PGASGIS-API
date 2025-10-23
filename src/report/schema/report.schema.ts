import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class LayerOption {
  @Prop() id: string;
  @Prop() description: string;
}

@Schema({ _id: false })
class Layers {
  @Prop() selected: string;
  @Prop({ type: [LayerOption], default: [] }) options: LayerOption[];
}

@Schema({ _id: false })
class Total {
  @Prop() Area: string;
  @Prop() Percent: string;
}

@Schema({ _id: false })
class AdditionalColumn {
  @Prop() propertyName_Label: string;
  @Prop() title: string;
}

@Schema({ _id: false })
class LayersSummary {
  @Prop({ type: [Object], default: [] }) data: any[];
  @Prop({ type: Total, default: {} }) total: Total;
  @Prop({ type: [AdditionalColumn], default: [] }) additional_columns: AdditionalColumn[];
}

@Schema({ _id: false })
class ConventionalSymbol {
  @Prop() icon: string;
  @Prop() description: string;
}

@Schema({ _id: false })
class Labels {
  @Prop() heading_1: string;
  @Prop() heading_2: string;
  @Prop() heading_3: string;
  @Prop() title: string;
  @Prop() table_label: string;
}

@Schema({ _id: false })
class OtherSummary {
  @Prop({ type: [String], default: [] }) options: string[];
  @Prop() selected: string;
  @Prop() title: string;
  @Prop({ type: [Object], default: [] }) data: any[];
  @Prop({ type: Total, default: {} }) total: Total;
}

@Schema({ collection: 'map_print_preview', timestamps: true })
export class Reports extends Document {
  @Prop() name: string;
  @Prop() image: string; // base64 image
  @Prop({ type: Layers, default: {} }) layers: Layers;
  @Prop({ type: LayersSummary, default: {} }) layers_summary: LayersSummary;
  @Prop({ type: [ConventionalSymbol], default: [] }) conventional_symbols: ConventionalSymbol[];
  @Prop({ type: Labels, default: {} }) labels: Labels;
  @Prop({ type: OtherSummary, default: {} }) other_summary: OtherSummary;
  @Prop() map_source: string;
  @Prop() locator: string;
}

export const ReportSchema = SchemaFactory.createForClass(Reports);
