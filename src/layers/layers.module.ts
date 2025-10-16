import { Module } from '@nestjs/common';
import { LayersController } from './layers.controller';
import { LayersService } from './layers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapLayer, MapLayerSchema } from './schema/layer.schema';
import { FeatureCollection, FeatureSchema } from './schema/featurecollection.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: MapLayer.name, schema: MapLayerSchema },
    { name: FeatureCollection.name, schema: FeatureSchema }
  ])],
  controllers: [LayersController],
  providers: [LayersService]
})
export class LayersModule {}
