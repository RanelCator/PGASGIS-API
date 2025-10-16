import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LayersService } from './layers.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { MapLayer } from './schema/layer.schema';

@ApiTags('Layers')
@Controller('layers')
export class LayersController {
    constructor(private readonly layersService: LayersService) {}

    @Post('create')
    @ApiOperation({
        summary: 'Create a new layer',
        description:
            'Creates a new map layer with its metadata and attributes based on the provided data in the request body.',
    })

    async create(@Body() createLayerDto: CreateLayerDto) {
        try {
            const layer = await this.layersService.create(createLayerDto);
            return new ApiResponse({
                message: 'Layer created successfully',
                success: true,
            });
        } catch (error) {
            return new ApiResponse({
                message: error.message || 'Failed to create layer',
                success: false,
            });
        }
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get layer by ID',
        description:
            'Fetches a specific layer and its associated features using the provided layer ID.',
    })
    async getLayerWithFeatures(@Param('id') id: string): Promise<ApiResponse> {
        return this.layersService.findById(id);
    }

    @Get('type/:layer_type')
    @ApiOperation({
        summary: 'Get layer by type',
        description:
            'Retrieves one or more layers based on the specified `layer_type`. Returns all layers matching the given type.',
    })
    @ApiParam({
        name: 'layer_type',
        description: 'The type of layer to retrieve (e.g., "polygon", "line", "point").',
        example: 'polygon',
    })
    async getLayerByType(@Param('layer_type') layer_type: string): Promise<ApiResponse> {
        return this.layersService.findByLayerType(layer_type);
    }
}
