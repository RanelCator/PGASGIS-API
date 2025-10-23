import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { Reports } from './schema/report.schema';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Reports.name)
        private readonly reportModel: Model<Reports>,
      ) {}

    async create(createReportDto: CreateReportDto): Promise<ApiResponse<Reports>> {
        try {
            const report = new this.reportModel(createReportDto);
            const saved = await report.save();

            return new ApiResponse({
            message: 'Report created successfully',
            success: true,
            data: saved,
            });
        } catch (error) {
            throw new InternalServerErrorException(
            new ApiResponse({
                message: error.message || 'Failed to create report',
                success: false,
            }),
            );
        }
    }

    async findAll(): Promise<ApiResponse<Partial<Reports>[]>> {
        try {
            const reports = await this.reportModel
            .find()
            .select('_id name')
            .exec();

            return new ApiResponse({
            message: reports.length ? 'Reports retrieved successfully' : 'No reports found',
            success: true,
            data: reports,
            });
            
        } catch (error) {
            throw new InternalServerErrorException(
            new ApiResponse({
                message: error.message || 'Failed to fetch reports',
                success: false,
            }),
            );
        }
    }

    async findOne(id: string): Promise<ApiResponse<Reports>> {
        try {
            const report = await this.reportModel.findById(id).exec();
            if (!report) {
                throw new NotFoundException(
                    new ApiResponse({
                    message: `Report with ID ${id} not found`,
                    success: false,
                    }),
                );
            }

            return new ApiResponse({
                message: 'Report retrieved successfully',
                success: true,
                data: report,
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                new ApiResponse({
                    message: error.message || 'Failed to retrieve report',
                    success: false,
                }),
            );
        }
    }

    async update(id: string, updateReportDto: UpdateReportDto): Promise<ApiResponse<Reports>> {
        try {
          const updated = await this.reportModel
            .findByIdAndUpdate(id, updateReportDto, { new: true })
            .exec();
    
          if (!updated) {
            throw new NotFoundException(
              new ApiResponse({
                message: `Report with ID ${id} not found`,
                success: false,
              }),
            );
          }
    
          return new ApiResponse({
            message: 'Report updated successfully',
            success: true,
          });
        } catch (error) {
          if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(
                new ApiResponse({
                    message: error.message || 'Failed to update report',
                    success: false,
                }),
            );
        }
    }

    async deleteReport(id: string): Promise<ApiResponse> {
        const result = await this.reportModel.findByIdAndDelete(id);
    
        if (!result) {
          throw new NotFoundException(`Report with ID ${id} not found`);
        }
    
        return new ApiResponse({
          message: 'Report deleted successfully',
          success: true
        });
    }

}
