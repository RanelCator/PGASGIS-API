import { LayersService } from './layers.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
export declare class LayersController {
    private readonly layersService;
    constructor(layersService: LayersService);
    create(createLayerDto: CreateLayerDto): Promise<ApiResponse<any>>;
    getLayerWithFeatures(id: string): Promise<ApiResponse>;
    getLayerByType(layer_type: string): Promise<ApiResponse>;
}
