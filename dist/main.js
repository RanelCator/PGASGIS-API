"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PGAS-GIS API')
        .setDescription('API documentation for PGAS-GIS')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.use('/openapi.json', (req, res) => res.json(document));
    const { apiReference } = await import('@scalar/express-api-reference');
    app.use('/docs', apiReference({
        theme: 'deepSpace',
        url: '/openapi.json',
        documentDownloadType: 'none',
    }));
    swagger_1.SwaggerModule.setup('docs-swag', app, document);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    await app.listen(process.env.PORT ?? 8989);
}
bootstrap();
//# sourceMappingURL=main.js.map