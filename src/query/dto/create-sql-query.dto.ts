// create-sql-query.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSqlQueryDto {
  @ApiProperty({ example: 'Sample Report' })
  @IsString()
  description: string;

  @ApiProperty(
    { 
        example: 'SELECT * FROM tbl_sample WHERE project_year = @project_year',
        description: 'Parameter name should be the same as column_name'
     })
  @IsString()
  sql_query: string;
}
