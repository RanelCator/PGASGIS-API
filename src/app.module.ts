import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LayersModule } from './layers/layers.module';
import { FeaturesModule } from './features/features.module';
import { ProjectModule } from './project/project.module';
import { ReportModule } from './report/report.module';
import { QueryModule } from './query/query.module';
import { ClippingModule } from './clipping/clipping.module';
import { HealthModule } from './health/health.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs'),
      serveRoot: '/devdocs', 
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URI: Joi.string().uri().required(), 
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
    }),
    UsersModule,
    AuthModule,
    LayersModule,
    FeaturesModule,
    ProjectModule,
    ReportModule,
    QueryModule,
    ClippingModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
