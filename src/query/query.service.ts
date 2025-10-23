import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sql from 'mssql';

import { SqlQuery } from './schema/sql-query.schema';
import { CreateSqlQueryDto } from './dto/create-sql-query.dto';
import { UpdateSqlQueryDto } from './dto/update-sql-query.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class SqlQueryService {
  private readonly logger = new Logger(SqlQueryService.name);
  private readonly pools = new Map<string, sql.ConnectionPool>();

  constructor(
    private readonly config: ConfigService,
    @InjectModel(SqlQuery.name) private readonly sqlQueryModel: Model<SqlQuery>,
  ) {}

  // ========================
  // 🔹 CONNECTION MANAGEMENT
  // ========================

  private getConnectionConfig(alias: string): sql.config {
    const prefix = alias.toUpperCase();

    const server = this.config.get<string>(`${prefix}_HOST`);
    const database = this.config.get<string>(`${prefix}_DB`);
    const userName = this.config.get<string>(`${prefix}_USER`);
    const password = this.config.get<string>(`${prefix}_PASS`);
    const domain = this.config.get<string>(`${prefix}_DOMAIN`);

    if (!server || !database) {
      throw new Error(`❌ Missing SQL configuration for alias: ${alias}`);
    }

    return {
      server,
      database,
      options: { encrypt: true, trustServerCertificate: true },
      authentication: {
        type: 'ntlm',
        options: { domain: domain || '', userName, password },
      },
    };
  }

  private async getPool(alias: string): Promise<sql.ConnectionPool> {
    if (this.pools.has(alias)) return this.pools.get(alias)!;

    const config = this.getConnectionConfig(alias);

    try {
      const pool = await new sql.ConnectionPool(config).connect();
      this.pools.set(alias, pool);
      this.logger.log(`✅ Connected to SQL Server alias: ${alias}`);
      return pool;
    } catch (error) {
      this.logger.error(
        `❌ Failed to connect to SQL alias: ${alias}`,
        error.stack || error,
      );
      throw new Error(
        `Failed to connect to SQL Server alias: ${alias}. Check .env configuration or network access.`,
      );
    }
  }

  async query(
    alias: string,
    query: string,
    params?: Record<string, any>,
  ): Promise<any[]> {
    const pool = await this.getPool(alias);
    const request = pool.request();

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }
    }

    const result = await request.query(query);
    return result.recordset;
  }

  async closeAll() {
    for (const [alias, pool] of this.pools.entries()) {
      await pool.close();
      this.logger.log(`🔌 Closed connection for alias: ${alias}`);
    }
    this.pools.clear();
  }

  // ========================
  // 🔹 QUERY DOCUMENT CRUD
  // ========================

  async create(dto: CreateSqlQueryDto): Promise<ApiResponse> {
    const created = new this.sqlQueryModel(dto);
    await created.save();
    return new ApiResponse({
      success: true,
      message: 'SQL Query saved successfully',
      data: created,
    });
  }

  async findAll(): Promise<ApiResponse> {
    const queries = await this.sqlQueryModel.find({}, { description: 1 }).lean();
    return new ApiResponse({
      success: true,
      message: 'SQL Queries fetched successfully',
      data: queries,
    });
  }

  async update(id: string, dto: UpdateSqlQueryDto): Promise<ApiResponse> {
    const updated = await this.sqlQueryModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('SQL Query not found');

    return new ApiResponse({
      success: true,
      message: 'SQL Query updated successfully',
      data: updated,
    });
  }

  async remove(id: string): Promise<ApiResponse> {
    const deleted = await this.sqlQueryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('SQL Query not found');

    return new ApiResponse({
      success: true,
      message: 'SQL Query deleted successfully',
    });
  }

  // ========================
  // 🔹 EXECUTION HELPERS
  // ========================

  async execute(id: string, params: Record<string, any>): Promise<ApiResponse> {
    const queryDoc = await this.sqlQueryModel.findById(id);
    if (!queryDoc) throw new NotFoundException('SQL Query not found');

    try {
      const result = await this.query(queryDoc.connectionAlias, queryDoc.sql_query, params);
      return new ApiResponse({
        success: true,
        message: 'Query executed successfully',
        data: result,
      });
    } catch (error) {
      throw new BadRequestException(`SQL execution failed: ${error.message}`);
    }
  }

  async getUserId(username: string, password: string): Promise<ApiResponse> {
    try {
      const normalized = username.includes('@pgas.ph')
        ? username
        : `${username}@pgas.ph`;

      const alias = 'SQLSERVER_PMIS';
      const query = `
        SELECT TOP 1 eid
        FROM spms.dbo.pmis_profile
        WHERE username = @username AND passcode = @password
      `;

      const params = { username: normalized, password };
      const result = await this.query(alias, query, params);
      const user = result[0] || null;
      //console.log(!!user);

      return new ApiResponse({
        success: !!user,
        message: user ? 'User found' : 'Invalid credentials',
        data: user,
      });
    } catch (error) {
      return new ApiResponse({
        success: false,
        message: `Error fetching user: ${error.message}`,
      });
    }
  }
}
