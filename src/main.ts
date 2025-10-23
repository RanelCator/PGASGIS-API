import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { Logger } from '@nestjs/common';
import compression from 'compression';
import { config as loadEnv } from 'dotenv';
import { join } from 'path';
import helmet from 'helmet';
import os from 'os';
import fs from 'fs';

// Load .env from project root (for IIS/PM2 deployments)
loadEnv({ path: join(__dirname, '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // Enable Nest shutdown hooks
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "script-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
          "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
        },
      },
    })
  );
  app.use(compression());
  app.enableCors({
    origin: [
      'https://pgas.ph', // <-- your actual frontend domain
    ],
    credentials: false,  // if your frontend uses cookies or auth tokens
  });
  app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

  const logger = new Logger('Bootstrap');

  const isDocker = fs.existsSync('/.dockerenv');
  const swagAddServer = isDocker ? 'api' : '';
  // Swagger / Scalar docs configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PGAS-GIS API')
    .setDescription('API documentation for PGAS-GIS')
    .setVersion('1.0')
    .addServer(swagAddServer)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  app.use('/openapi.json', (req, res) => res.json(document));

  const { apiReference } = await import('@scalar/express-api-reference');
  app.use(
    '/docs',
    apiReference({
      theme: 'deepSpace',
      url: 'openapi.json',
      documentDownloadType: 'none',
    }),
  );

  SwaggerModule.setup('docs-swag', app, document);

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Determine listening port
  const port = Number(process.env.PORT) || 8989;

  await app.listen(port, '0.0.0.0');

  logger.log(` PGAS-GIS API Server started`);
  logger.log(` Running on: http://localhost:${port}`);
  logger.log(` API Reference: http://localhost:${port}/docs`);
  logger.log(` Swagger UI: http://localhost:${port}/docs-swag`);
  logger.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(` isDocker: ${isDocker}`);
}

bootstrap().catch((err) => {
  console.error('❌ Application failed to start:', err);
  process.exit(1);
});
