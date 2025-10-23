"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const common_1 = require("@nestjs/common");
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '..', '.env') });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
                "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
                "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
            },
        },
    }));
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: [
            'https://pgas.ph',
        ],
        credentials: false,
    });
    app.enableShutdownHooks(['SIGINT', 'SIGTERM']);
    const logger = new common_1.Logger('Bootstrap');
    const isDocker = fs_1.default.existsSync('/.dockerenv');
    const swagAddServer = isDocker ? 'api' : '';
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('PGAS-GIS API')
        .setDescription('API documentation for PGAS-GIS')
        .setVersion('1.0')
        .addServer(swagAddServer)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    app.use('/openapi.json', (req, res) => res.json(document));
    const { apiReference } = await import('@scalar/express-api-reference');
    app.use('/docs', apiReference({
        theme: 'deepSpace',
        url: 'openapi.json',
        documentDownloadType: 'none',
    }));
    swagger_1.SwaggerModule.setup('docs-swag', app, document);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
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
//# sourceMappingURL=main.js.map