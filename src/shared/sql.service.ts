import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class SqlService implements OnModuleInit, OnModuleDestroy {
  private pool: sql.ConnectionPool;
  private readonly logger = new Logger(SqlService.name);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    try {
      this.pool = await new sql.ConnectionPool({
        database: this.config.get<string>('SQLSERVER_DB'),
        server: this.config.get<string>('SQLSERVER_HOST'),
        options: {
          encrypt: true,               
          trustServerCertificate: true 
        },
        authentication: {
          type: 'ntlm',
          options: {
            domain: this.config.get<string>('SQLSERVER_DOMAIN') || '', 
            userName: this.config.get<string>('SQLSERVER_USER') || '', 
            password: this.config.get<string>('SQLSERVER_PASS') || '', 
          },
        },
      }).connect();

      this.logger.log('✅ SQL Server connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to SQL Server', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      try {
        await this.pool.close();
        this.logger.log('🔌 SQL Server connection closed');
      } catch (err) {
        this.logger.warn('⚠️ Error closing SQL connection', err);
      }
    }
  }

  async GetUserID(username: string, password: string) {
    if (!this.pool) {
      throw new Error('SQL connection not initialized');
    }

    const normalized = username.includes('@pgas.ph') ? username : `${username}@pgas.ph`;

    const request = this.pool.request();
    request.input('username', sql.VarChar(255), username);
    request.input('password', sql.VarChar(255), password);

    const result = await request.query(`
      SELECT TOP 1 eid
      FROM spms.dbo.pmis_profile
      WHERE username = @normalized AND passcode = @password
    `);

    return result.recordset[0];
  }
}
