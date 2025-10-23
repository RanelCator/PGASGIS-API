import { Model } from 'mongoose';
import { MapLayer } from './schema/layer.schema';
import { CreateLayerDto } from './dto/create-layer.dto';
import { FeatureCollection } from './schema/featurecollection.schema';
import { ApiResponse } from 'src/common/dto/api-response.dto';
export declare class LayersService {
    private readonly layerModel;
    private readonly featureModel;
    constructor(layerModel: Model<MapLayer>, featureModel: Model<FeatureCollection>);
    create(createLayerDto: CreateLayerDto): Promise<MapLayer>;
    findById(id: string): Promise<ApiResponse>;
    findByLayerType(layer_type: string): Promise<ApiResponse>;
}
