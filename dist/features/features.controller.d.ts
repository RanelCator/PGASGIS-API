import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
export declare class FeaturesController {
    private readonly featuresService;
    constructor(featuresService: FeaturesService);
    create(createFeatureDto: CreateFeatureDto): Promise<ApiResponse>;
    findByGroup(groupId: string): Promise<ApiResponse>;
    removeByGroupId(groupId: string): Promise<ApiResponse>;
}
