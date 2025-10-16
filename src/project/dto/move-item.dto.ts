import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveItemDto {
  @ApiProperty({
    example: '66d2fbc8f99a3422d6d1c0aa',
    description: 'The target parent item ID where this item will be moved under',
  })
  @IsString()
  @IsNotEmpty()
  newParentId: string;
}
