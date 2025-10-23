import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessDto {
  @ApiProperty({ description: 'Description of the clipping process' })
  description: string;
}
