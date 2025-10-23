"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const layer_schema_1 = require("./schema/layer.schema");
const featurecollection_schema_1 = require("./schema/featurecollection.schema");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let LayersService = class LayersService {
    layerModel;
    featureModel;
    constructor(layerModel, featureModel) {
        this.layerModel = layerModel;
        this.featureModel = featureModel;
    }
    async create(createLayerDto) {
        const createdLayer = new this.layerModel(createLayerDto);
        return createdLayer.save();
    }
    async findById(id) {
        const layer = await this.layerModel.findById(id).lean();
        const features = await this.featureModel.find({ GroupID: id }).lean();
        if (!layer) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: `No layer found for GroupID ${id}`,
            });
        }
        const mappedResult = {
            id: layer._id.toString(),
            layer: layer.layer,
            attribute: layer.attribute,
        };
        const result = {
            ...mappedResult,
            data: {
                type: 'FeatureCollection',
                features: features.map(f => f.data),
            },
        };
        return new api_response_dto_1.ApiResponse({
            message: 'Records Retrieved',
            success: true,
            data: result,
        });
    }
    async findByLayerType(layer_type) {
        try {
            const layers = await this.layerModel.find({ 'layer.layer_type': layer_type }).select('_id layer.description').exec();
            if (!layers || layers.length === 0) {
                return new api_response_dto_1.ApiResponse({
                    message: `No layers found for type: ${layer_type}`,
                    success: false,
                });
            }
            return new api_response_dto_1.ApiResponse({
                message: 'Layers fetched successfully',
                success: true,
                data: layers,
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Request Failed',
                success: false,
            });
        }
    }
};
exports.LayersService = LayersService;
exports.LayersService = LayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(layer_schema_1.MapLayer.name)),
    __param(1, (0, mongoose_1.InjectModel)(featurecollection_schema_1.FeatureCollection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LayersService);
//# sourceMappingURL=layers.service.js.map