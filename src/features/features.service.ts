import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class FeaturesService {
  constructor(@InjectModel(Feature.name) private featureModel: Model<Feature>) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const createdFeature = new this.featureModel(createFeatureDto);
    return await createdFeature.save(); // returns plain data
  }

  async findByGroupId(groupId: string) {
    const features = await this.featureModel.find({ GroupID: groupId }).exec();
    return features.map(f => f.data);
  }

  async remove(groupId: string): Promise<boolean> {
    const result = await this.featureModel.deleteMany({ GroupID: groupId }).exec();
    return result.deletedCount > 0;
  }
}

