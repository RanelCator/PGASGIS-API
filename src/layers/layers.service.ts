import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MapLayer } from './schema/layer.schema';
import { CreateLayerDto } from './dto/create-layer.dto';
import { FeatureCollection } from './schema/featurecollection.schema';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class LayersService {
    constructor(
        @InjectModel(MapLayer.name)
        private readonly layerModel: Model<MapLayer>,
        @InjectModel(FeatureCollection.name)
        private readonly featureModel: Model<FeatureCollection>,
    ){}

    async create(createLayerDto: CreateLayerDto): Promise<MapLayer> {
        const createdLayer = new this.layerModel(createLayerDto);
        return createdLayer.save();
    }

    async findById(id: string) : Promise<ApiResponse>{
        const layer = await this.layerModel.findById(id).lean();
        const features = await this.featureModel.find({ GroupID: id }).lean();
    
        if (!layer) {
          return new ApiResponse({
            success: false,
            message: `No layer found for GroupID ${id}`,
          });
        }

        const mappedResult = {
            id: layer._id.toString(),
            layer: layer.layer,
            attribute: layer.attribute,
        };

        const result = {
          ...mappedResult,
          data: {
            type: 'FeatureCollection',
            features: features.map(f => f.data),
          },
        };
    
        return new ApiResponse({
          message: 'Records Retrieved',
          success: true,
          data: result,
        });
    }

    async findByLayerType(layer_type: string): Promise<ApiResponse<MapLayer>> {
      const layer = await this.layerModel.findOne({ 'layer.layer_type': layer_type }).exec();
  
      if (!layer) {
        throw new NotFoundException(
          new ApiResponse({
            message: `Layer with layer_type "${layer_type}" not found.`,
            success: false,
          }),
        );
      }
  
      return new ApiResponse({
        message: `Layer retrieved successfully.`,
        success: true,
        data: layer,
      });
    }

}
