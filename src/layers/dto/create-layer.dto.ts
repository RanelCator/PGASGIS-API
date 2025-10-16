import {
    IsString,
    IsArray,
    IsOptional,
    ValidateNested,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  
  export class StyleDto {
    @ApiProperty({ required: false }) @IsOptional() @IsString() propertyValue?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() alt_description?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillType?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillWeight?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillColor?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() angle?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() sgvIcons?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() classIcons?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() borderColor?: string;
  }
  
  export class AttributeDto {
    @ApiProperty({ required: true }) @IsOptional() @IsString() propertyName: string;
    @ApiProperty({ required: true }) @IsOptional() @IsString() propertyName_Group: string;
    @ApiProperty({ required: true }) @IsOptional() @IsString() propertyName_Label: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() showLabelInZoomLevel?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillType?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillWeight?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() fillColor?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() angle?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() sgvIcons?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() classIcons?: string;
  
    @ApiProperty({
      type: [StyleDto],
      required: false,
      description: 'List of style configurations for the attribute',
    })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => StyleDto)
    style?: StyleDto[];
  }
  
  export class LayerInfoDto {
    @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() remarks?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() layer_type?: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() DateUploaded?: string;
  }
  
  export class CreateLayerDto {
    @ApiProperty({ type: LayerInfoDto })
    @ValidateNested()
    @Type(() => LayerInfoDto)
    layer: LayerInfoDto;
  
    @ApiProperty({ type: AttributeDto })
    @ValidateNested()
    @Type(() => AttributeDto)
    attribute: AttributeDto;
  }
  