import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@ApiTags('Features')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new feature',
    description:
      'Adds a new feature to the specified layer group. The request body must include the required feature details defined in the DTO.',
  })
  @SwaggerResponse({ status: 201, description: 'Feature created successfully.' })
  @SwaggerResponse({ status: 400, description: 'Invalid feature data provided.' })
  async create(@Body() createFeatureDto: CreateFeatureDto): Promise<ApiResponse> {
    const data = await this.featuresService.create(createFeatureDto);
    return new ApiResponse({
      message: 'Feature saved successfully',
      success: true,
      data,
    });
  }

  @Get('group/:groupId')
  @ApiOperation({
    summary: 'Get features by group ID',
    description:
      'Retrieves all features associated with a specific group ID. Useful for fetching features belonging to a certain layer or category.',
  })
  @SwaggerResponse({ status: 200, description: 'Features retrieved successfully.' })
  @SwaggerResponse({ status: 404, description: 'No features found for the specified GroupID.' })
  async findByGroup(@Param('groupId') groupId: string): Promise<ApiResponse> {
    const data = await this.featuresService.findByGroupId(groupId);
    return new ApiResponse({
      success: true,
      data,
    });
  }

  @Delete('group/:groupId')
  @ApiOperation({
    summary: 'Delete features by group ID',
    description:
      'Deletes all features associated with the given group ID. This action removes all related records under that group.',
  })
  @SwaggerResponse({ status: 200, description: 'Features deleted successfully.' })
  @SwaggerResponse({ status: 404, description: 'No features found for the specified GroupID.' })
  async removeByGroupId(@Param('groupId') groupId: string): Promise<ApiResponse> {
    const success = await this.featuresService.remove(groupId);
    return new ApiResponse({
      message: success
        ? 'Features deleted successfully'
        : 'No features found for the specified GroupID',
      success,
    });
  }
}
