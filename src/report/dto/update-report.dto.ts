import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiPropertyOptional({
    example: 'Updated Land Use Report 2025',
    description: 'Optional updated report name',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'data:image/png;base64,...',
    description: 'Optional updated base64 image string for the map snapshot',
  })
  image?: string;

  @ApiPropertyOptional({
    description: 'Optional updated layers configuration',
  })
  layers?: CreateReportDto['layers'];

  @ApiPropertyOptional({
    description: 'Optional updated layers summary data',
  })
  layers_summary?: CreateReportDto['layers_summary'];

  @ApiPropertyOptional({
    description: 'Optional updated conventional symbols',
  })
  conventional_symbols?: CreateReportDto['conventional_symbols'];

  @ApiPropertyOptional({
    description: 'Optional updated label texts for the report',
  })
  labels?: CreateReportDto['labels'];

  @ApiPropertyOptional({
    description: 'Optional updated additional summary section',
  })
  other_summary?: CreateReportDto['other_summary'];

  @ApiPropertyOptional({
    example: 'Online Tiles',
    description: 'Optional updated map source type',
  })
  map_source?: string;

  @ApiPropertyOptional({
    example: 'Updated Locator Reference',
    description: 'Optional updated locator value',
  })
  locator?: string;
}
