import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiResponse as CustomResponse } from 'src/common/dto/api-response.dto'; // optional if you have a shared ApiResponse wrapper

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportsService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiBody({ type: CreateReportDto })
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully created.',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Report created successfully',
        data: {
          _id: '6705c1f8e88ab40012c8f123',
          report_name: 'Example Report',
          createdAt: '2025-10-09T08:00:00.000Z',
          updatedAt: '2025-10-09T08:00:00.000Z',
        },
      }),
    },
  })
  async create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({
    status: 200,
    description: 'List of all reports',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Reports fetched successfully',
        data: [
          {
            _id: '6705c1f8e88ab40012c8f123',
            report_name: 'Example Report',
            createdAt: '2025-10-09T08:00:00.000Z',
            updatedAt: '2025-10-09T08:00:00.000Z',
          },
        ],
      }),
    },
  })
  async findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific report by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB Report ID' })
  @ApiResponse({
    status: 200,
    description: 'Single report details',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Report fetched successfully',
        data: {
          _id: '6705c1f8e88ab40012c8f123',
          report_name: 'Example Report',
          createdAt: '2025-10-09T08:00:00.000Z',
          updatedAt: '2025-10-09T08:00:00.000Z',
        },
      }),
    },
  })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a report by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB Report ID' })
  @ApiBody({ type: UpdateReportDto })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully updated.',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Report updated successfully',
        data: {
          _id: '6705c1f8e88ab40012c8f123',
          report_name: 'Updated Report',
          updatedAt: '2025-10-09T09:00:00.000Z',
        },
      }),
    },
  })
  async updates(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB Report ID' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully deleted.',
    schema: {
      example: new CustomResponse({
        success: true,
        message: 'Report deleted successfully',
        data: {
          _id: '6714f3a847f2e948ee3e61b9',
          name: 'Land Use Report',
          deletedAt: '2025-10-20T10:00:00.000Z',
        },
      }),
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found',
    schema: {
      example: new CustomResponse({
        success: false,
        message: 'Report with ID 6714f3a847f2e948ee3e61b9 not found',
      }),
    },
  })
  async deleteReport(@Param('id') id: string): Promise<CustomResponse> {
    return this.reportsService.deleteReport(id);
  }
}
