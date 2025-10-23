import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reports, ReportSchema } from './schema/report.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reports.name, schema: ReportSchema }])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
