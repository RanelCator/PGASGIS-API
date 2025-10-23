import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ExternalSourceDto {
  @ApiProperty({
    description: 'URL or endpoint of the external source providing the data',
    example: 'https://serve.pgas.ph/gisapi/api/v1/file?id=32&d=1760665427',
  })
  @IsString()
  source: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate field name or mapping key',
    example: 'latitude',
  })
  @IsOptional()
  @IsString()
  x?: string;

  @ApiPropertyOptional({
    description: 'Longitude coordinate field name or mapping key',
    example: 'longitude',
  })
  @IsOptional()
  @IsString()
  y?: string;
}

export class CreateParentDto {
  @ApiPropertyOptional({
    description: 'Optional ID of the associated layer (if already exists)',
    example: '66fcb8a5f8a7a621b056d2f9',
  })
  @IsOptional()
  @IsString()
  layerId?: string;

  @ApiProperty({
    description: 'Descriptive name or details of the parent layer',
    example: 'Main Road Network',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Numeric type representing the layer (e.g., 0=Folder/Sub-Folder, 1=Point, 2=Line, 3=Polygon)',
    example: 2,
  })
  @IsNumber()
  layerType: number;

  @ApiProperty({
    description: 'Order index for sorting layers',
    example: 1,
  })
  @IsNumber()
  orderBy: number;

  @ApiPropertyOptional({
    description: 'External data source containing URL and coordinate field mapping',
    type: () => ExternalSourceDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ExternalSourceDto)
  externalSource?: ExternalSourceDto;
}

export class UpdateParentDto {
  @ApiPropertyOptional({
    description: 'Updated description for the parent layer',
    example: 'Updated River Network Layer',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated layer type (e.g., 1=Point, 2=Line, 3=Polygon)',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  layerType?: number;

  @ApiPropertyOptional({
    description: 'Updated order index for sorting layers',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  orderBy?: number;
}
