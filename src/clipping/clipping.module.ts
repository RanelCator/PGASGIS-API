import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClippingController } from './clipping.controller';
import { ClippingService } from './clipping.service';
import { Clipping, ClippingSchema } from './schema/clipping.schema';
import { MapLayer, MapLayerSchema } from 'src/layers/schema/layer.schema';
import { Feature, FeatureSchema } from 'src/features/schema/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clipping.name, schema: ClippingSchema },
      { name: MapLayer.name, schema: MapLayerSchema },
      { name: Feature.name, schema: FeatureSchema },
    ]),
  ],
  controllers: [ClippingController],
  providers: [ClippingService],
  exports: [ClippingService],
})
export class ClippingModule {}
