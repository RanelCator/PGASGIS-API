import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class LayerOptionDto {
  @ApiProperty({ example: 'layer123', description: 'Layer unique identifier' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Road Network Layer', description: 'Layer description' })
  @IsString()
  description: string;
}

class LayersDto {
  @ApiProperty({ example: 'layer123', description: 'Selected layer ID' })
  @IsString()
  selected: string;

  @ApiProperty({
    type: [LayerOptionDto],
    description: 'List of available layer options',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LayerOptionDto)
  options: LayerOptionDto[];
}

class TotalDto {
  @ApiProperty({ example: '123.45', description: 'Total area value' })
  @IsString()
  Area: string;

  @ApiProperty({ example: '15%', description: 'Percentage value' })
  @IsString()
  Percent: string;
}

class AdditionalColumnDto {
  @ApiProperty({ example: 'Population_Label', description: 'Property name label' })
  @IsString()
  propertyName_Label: string;

  @ApiProperty({ example: 'Population', description: 'Column title' })
  @IsString()
  title: string;
}

class LayersSummaryDto {
  @ApiProperty({
    type: [Object],
    description: 'Array of summarized data per layer',
    example: [{ Barangay: 'Sample', Area: '20.5', Percent: '10%' }],
  })
  @IsArray()
  data: any[];

  @ApiProperty({ type: TotalDto, description: 'Total summary data' })
  @ValidateNested()
  @Type(() => TotalDto)
  total: TotalDto;

  @ApiProperty({
    type: [AdditionalColumnDto],
    description: 'Additional dynamic columns in summary',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalColumnDto)
  additional_columns: AdditionalColumnDto[];
}

class ConventionalSymbolDto {
  @ApiProperty({ example: 'icon.png', description: 'Symbol icon filename or URL' })
  @IsString()
  icon: string;

  @ApiProperty({ example: 'School Zone', description: 'Symbol description' })
  @IsString()
  description: string;
}

class LabelsDto {
  @ApiProperty({ example: 'PGAS GIS MAP', description: 'Top header text' })
  @IsString()
  heading_1: string;

  @ApiProperty({ example: 'Provincial Planning Office', description: 'Second header text' })
  @IsString()
  heading_2: string;

  @ApiProperty({ example: 'Land Use Analysis', description: 'Third header text' })
  @IsString()
  heading_3: string;

  @ApiProperty({ example: 'Map Title', description: 'Main title of the report' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Table Summary', description: 'Label for the summary table' })
  @IsString()
  table_label: string;
}

class OtherSummaryDto {
  @ApiProperty({
    example: ['Forest', 'Agricultural'],
    description: 'List of selectable summary options',
  })
  @IsArray()
  options: string[];

  @ApiProperty({ example: 'Forest', description: 'Currently selected option' })
  @IsString()
  selected: string;

  @ApiProperty({ example: 'Land Type Summary', description: 'Title of the summary section' })
  @IsString()
  title: string;

  @ApiProperty({
    type: [Object],
    example: [{ Type: 'Forest', Area: '200', Percent: '40%' }],
    description: 'Data for the summary table',
  })
  @IsArray()
  data: any[];

  @ApiProperty({ type: TotalDto, description: 'Total summary of other data' })
  @ValidateNested()
  @Type(() => TotalDto)
  total: TotalDto;
}

export class CreateReportDto {
  @ApiProperty({ example: 'Annual Land Report 2025', description: 'Report name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'data:image/png;base64,...',
    description: 'Base64 image string for the map snapshot',
  })
  @IsString()
  image: string;

  @ApiPropertyOptional({ type: LayersDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LayersDto)
  layers: LayersDto;

  @ApiPropertyOptional({ type: LayersSummaryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LayersSummaryDto)
  layers_summary: LayersSummaryDto;

  @ApiPropertyOptional({ type: [ConventionalSymbolDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConventionalSymbolDto)
  conventional_symbols: ConventionalSymbolDto[];

  @ApiPropertyOptional({ type: LabelsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LabelsDto)
  labels: LabelsDto;

  @ApiPropertyOptional({ type: OtherSummaryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OtherSummaryDto)
  other_summary: OtherSummaryDto;

  @ApiPropertyOptional({ example: 'Offline Tiles', description: 'Map source type' })
  @IsOptional()
  @IsString()
  map_source: string;

  @ApiPropertyOptional({ example: 'Locator Enabled', description: 'Locator status or name' })
  @IsOptional()
  @IsString()
  locator: string;
}
