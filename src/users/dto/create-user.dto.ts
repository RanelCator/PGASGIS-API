import { IsString, IsEmail, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan',
    description: 'First name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Dela Cruz',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'Santos',
    description: 'Middle name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  middlename?: string;

  @ApiProperty({
    example: 'juan.delacruz@pgas.ph',
    description: 'Official email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  emailaddress: string;

  @ApiProperty({
    example: 1,
    description: 'Flag to indicate if the user belongs to PGAS (1 = Yes, 0 = No)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  IsPGAS?: number;

  @ApiProperty({
    example: 10234,
    description: 'PGAS employee ID, if applicable',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pgasID?: number;

  @ApiProperty({
    example: 2,
    description: 'User type identifier',
  })
  @IsNumber()
  @IsNotEmpty()
  UserType: number;

  @ApiProperty({
    example: 'juan.delacruz',
    description: 'Username for system login',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Plaintext password for new accounts (hashed before storage)',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;
}
