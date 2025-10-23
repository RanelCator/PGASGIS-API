import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SqlQueryService } from './query.service';
import { CreateSqlQueryDto } from './dto/create-sql-query.dto';
import { UpdateSqlQueryDto } from './dto/update-sql-query.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('query')
export class SqlQueryController {
  constructor(private readonly sqlQueryService: SqlQueryService) {}

  @Post()
  create(@Body() dto: CreateSqlQueryDto): Promise<ApiResponse> {
    return this.sqlQueryService.create(dto);
  }

  @Get()
  findAll(): Promise<ApiResponse> {
    return this.sqlQueryService.findAll();
  }

  // Accept dynamic parameters (e.g. /sql-query/6712f8e1a4cde3b92afc00a1?project_year=2025)
  @Get(':id')
  execute(@Param('id') id: string, @Query() params: Record<string, any>): Promise<ApiResponse> {
    return this.sqlQueryService.execute(id, params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSqlQueryDto): Promise<ApiResponse> {
    return this.sqlQueryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse> {
    return this.sqlQueryService.remove(id);
  }
}
