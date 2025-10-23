import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SqlQueryController } from './query.controller';
import { SqlQueryService } from './query.service';
import { SqlQuery, SqlQuerySchema } from './schema/sql-query.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: SqlQuery.name, schema: SqlQuerySchema }]),
  ],
  controllers: [SqlQueryController],
  providers: [SqlQueryService],
  exports: [SqlQueryService],
})
export class QueryModule {}
