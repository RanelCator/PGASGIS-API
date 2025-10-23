// update-sql-query.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSqlQueryDto } from './create-sql-query.dto';

export class UpdateSqlQueryDto extends PartialType(CreateSqlQueryDto) {}
