import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
