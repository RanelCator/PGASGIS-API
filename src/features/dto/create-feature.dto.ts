import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  IsObject, 
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class GeometryDto {
  @ApiProperty({
    example: 'Polygon',
    description: 'Type of geometry, such as Point, LineString, Polygon, or MultiPolygon',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: [[[120.9822, 14.6042], [120.983, 14.605], [120.9822, 14.6042]]],
    description: 'Array of coordinates following GeoJSON structure (can vary by geometry type)',
  })
  @IsArray()
  coordinates: number[][][] | number[][][][] | number[];
}

class DataDto {
  @ApiProperty({
    example: 'Feature',
    description: 'Type of the GeoJSON object. Should always be "Feature".',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: { name: 'Barangay Hall', category: 'Building' },
    description: 'Custom properties associated with this feature (key-value pairs)',
  })
  @IsObject()
  properties: Record<string, any>;

  @ApiProperty({
    description: 'Geometry data containing the type and coordinates of the feature',
    type: GeometryDto,
  })
  @ValidateNested()
  @Type(() => GeometryDto)
  geometry: GeometryDto;
}

export class CreateFeatureDto {
  @ApiProperty({
    example: '6521f85b8e9e99aee07b1f34',
    description: 'ID of the group to which this feature belongs',
  })
  @IsString()
  @IsNotEmpty()
  GroupID: string;

  @ApiProperty({
    description: 'GeoJSON feature data including type, properties, and geometry',
    type: DataDto,
  })
  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}
