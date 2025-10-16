"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayersModule = void 0;
const common_1 = require("@nestjs/common");
const layers_controller_1 = require("./layers.controller");
const layers_service_1 = require("./layers.service");
const mongoose_1 = require("@nestjs/mongoose");
const layer_schema_1 = require("./schema/layer.schema");
const featurecollection_schema_1 = require("./schema/featurecollection.schema");
let LayersModule = class LayersModule {
};
exports.LayersModule = LayersModule;
exports.LayersModule = LayersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: layer_schema_1.MapLayer.name, schema: layer_schema_1.MapLayerSchema },
                { name: featurecollection_schema_1.FeatureCollection.name, schema: featurecollection_schema_1.FeatureSchema }
            ])],
        controllers: [layers_controller_1.LayersController],
        providers: [layers_service_1.LayersService]
    })
], LayersModule);
//# sourceMappingURL=layers.module.js.map