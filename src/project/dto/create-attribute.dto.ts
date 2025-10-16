import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AttributeChildDto {
  @ApiProperty({
    example: '6705bce3df29c925da876b13',
    description: 'The unique identifier of the attribute from Layers Attribute',
  })
  @IsString()
  @IsNotEmpty()
  attributeId: string;

  @ApiProperty({
    example: 'Provincial Boundaries',
    description: 'The name of the attribute from Layers',
  })
  @IsString()
  @IsNotEmpty()
  propertyName: string;
}

export class UpdateAttributeDto {
    @ApiProperty({
      description: 'List of attribute children (will replace the existing attributeChild array)',
      type: [AttributeChildDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeChildDto)
    attributeChild: AttributeChildDto[];
  }