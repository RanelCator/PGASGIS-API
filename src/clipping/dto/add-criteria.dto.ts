import { ApiProperty } from '@nestjs/swagger';

export class AddCriteriaDto {
  @ApiProperty({ description: 'Layer ID (must exist in map_layer collection)' })
  layerId: string;

  @ApiProperty({ description: 'Step number (order of clipping)' })
  stepNo: number;

  @ApiProperty({ description: 'Attribute/property name to filter features' })
  attributeName: string;

  @ApiProperty({ description: 'Accepted values for the selected attribute', type: [String] })
  attributeValue: string[];
}
