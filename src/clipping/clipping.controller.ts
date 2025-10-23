import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClippingService } from './clipping.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { AddCriteriaDto } from './dto/add-criteria.dto';
import { ApiResponse as CustomResponse } from 'src/common/dto/api-response.dto';

@ApiTags('Clipping')
@Controller('clipping')
export class ClippingController {
  constructor(private readonly clippingService: ClippingService) {}

  @Post('process')
  @ApiOperation({ summary: 'Create a new clipping process' })
  createProcess(@Body() dto: CreateProcessDto) {
    return this.clippingService.createProcess(dto);
  }

  @Post(':id/criteria')
  @ApiOperation({ summary: 'Add a criteria to an existing process' })
  @ApiParam({ name: 'id', description: 'Clipping process ID' })
  @ApiBody({ type: AddCriteriaDto })
  addCriteria(@Param('id') id: string, @Body() dto: AddCriteriaDto) {
    return this.clippingService.addCriteria(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all clipping processes (id + description only)' })
  listProcesses() {
    return this.clippingService.listProcesses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clipping process by ID' })
  getProcess(@Param('id') id: string) {
    return this.clippingService.getProcess(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update clipping process description' })
  @ApiParam({ name: 'id', description: 'Clipping process ID' })
  @ApiBody({ type: CreateProcessDto })
  @ApiResponse({
    status: 200,
    description: 'The clipping process has been successfully updated.',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Clipping process updated successfully',
        data: {
          id: '6705c1f8e88ab40012c8f123',
          description: 'Updated Clipping Process',
        },
      }),
    },
  })
  updateProcess(@Param('id') id: string, @Body() dto: CreateProcessDto) {
    return this.clippingService.updateProcess(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clipping process' })
  deleteProcess(@Param('id') id: string) {
    return this.clippingService.deleteProcess(id);
  }
}
