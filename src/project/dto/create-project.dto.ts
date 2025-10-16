import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project to be created',
    example: 'PGAS GIS Infrastructure Project',
  })
  @IsString()
  @IsNotEmpty()
  project_name: string;
}
