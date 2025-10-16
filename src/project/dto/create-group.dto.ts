import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    example: '6705bce3df29c925da876b13',
    description: 'The unique identifier of the project where this group will be added',
  })
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    example: 'PGAS - GIS',
    description: 'The name of the group to be created under the specified project',
  })
  @IsString()
  @IsNotEmpty()
  group_name: string;
}
