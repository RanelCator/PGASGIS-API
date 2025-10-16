import { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';
import { CreateFeatureDto } from './dto/create-feature.dto';
export declare class FeaturesService {
    private featureModel;
    constructor(featureModel: Model<Feature>);
    create(createFeatureDto: CreateFeatureDto): Promise<import("mongoose").Document<unknown, {}, Feature, {}, {}> & Feature & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByGroupId(groupId: string): Promise<Record<string, any>[]>;
    remove(groupId: string): Promise<boolean>;
}
