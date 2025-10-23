import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clipping } from './schema/clipping.schema';
import { MapLayer } from 'src/layers/schema/layer.schema';
import { Feature } from 'src/features/schema/feature.schema';
import { CreateProcessDto } from './dto/create-process.dto';
import { AddCriteriaDto } from './dto/add-criteria.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class ClippingService {
  constructor(
    @InjectModel(Clipping.name) private clippingModel: Model<Clipping>,
    @InjectModel(MapLayer.name) private mapLayerModel: Model<MapLayer>,
    @InjectModel(Feature.name) private featureModel: Model<Feature>,
  ) {}

  // 🧩 Create new process
  async createProcess(dto: CreateProcessDto): Promise<ApiResponse> {
    const process = new this.clippingModel({
      description: dto.description,
      criteria: [],
    });

    await process.save();
    return new ApiResponse({
      success: true,
      message: 'Clipping process created successfully',
      data: { id: process._id, description: process.description },
    });
  }

  // ➕ Add criteria to process
  async addCriteria(id: string, dto: AddCriteriaDto): Promise<ApiResponse> {
    const process = await this.clippingModel.findById(id);
    if (!process) throw new NotFoundException('Clipping process not found');

    // ✅ Ensure layer exists
    const layer = await this.mapLayerModel.findById(dto.layerId);
    if (!layer) throw new NotFoundException('Layer not found');

    // ✅ Filter features by GroupID and attribute values
    const features = await this.featureModel.find({ GroupID: dto.layerId }).lean();
    const filtered = features.filter((f) => {
      const prop = f.data.properties[dto.attributeName];
      return dto.attributeValue.includes(prop);
    });

    // ✅ Append to criteria
    process.criteria.push({
      ...dto,
      features: filtered.map((f) => f.data),
    });

    await process.save();
    return new ApiResponse({
      success: true,
      message: 'Criteria added successfully',
      data: { id: process._id, criteriaCount: process.criteria.length },
    });
  }

  // 📜 Get list of all processes (id + description only)
  async listProcesses(): Promise<ApiResponse> {
    const processes = await this.clippingModel.find({}, { _id: 1, description: 1 }).lean();
    return new ApiResponse({
      success: true,
      message: 'List of clipping processes',
      data: processes,
    });
  }

  // 🔍 Get a process by ID
  async getProcess(id: string): Promise<ApiResponse> {
    const process = await this.clippingModel.findById(id).lean();
    if (!process) throw new NotFoundException('Clipping process not found');

    return new ApiResponse({
      success: true,
      message: 'Clipping process fetched successfully',
      data: process,
    });
  }

  // ✏️ Update description
  async updateProcess(id: string, dto: CreateProcessDto): Promise<ApiResponse> {
    const updated = await this.clippingModel.findByIdAndUpdate(
      id,
      { description: dto.description },
      { new: true },
    );

    if (!updated) throw new NotFoundException('Clipping process not found');

    return new ApiResponse({
      success: true,
      message: 'Clipping process updated successfully',
      data: { id: updated._id, description: updated.description },
    });
  }

  // 🗑️ Delete process
  async deleteProcess(id: string): Promise<ApiResponse> {
    const deleted = await this.clippingModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Clipping process not found');

    return new ApiResponse({
      success: true,
      message: 'Clipping process deleted successfully',
      data: { id },
    });
  }
}
