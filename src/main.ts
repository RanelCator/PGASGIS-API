import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('PGAS-GIS API')
    .setDescription('API documentation for PGAS-GIS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/openapi.json', (req, res) => res.json(document));
  const { apiReference } = await import('@scalar/express-api-reference');
  app.use(
    '/docs',
    apiReference({
      theme: 'deepSpace',
      url: '/openapi.json', // <-- points to the JSON you just served
      documentDownloadType: 'none',
    })
  );
  SwaggerModule.setup('docs-swag', app, document);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 8989);
}
bootstrap();
