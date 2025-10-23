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
exports.LayersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const layers_service_1 = require("./layers.service");
const create_layer_dto_1 = require("./dto/create-layer.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let LayersController = class LayersController {
    layersService;
    constructor(layersService) {
        this.layersService = layersService;
    }
    async create(createLayerDto) {
        try {
            const layer = await this.layersService.create(createLayerDto);
            return new api_response_dto_1.ApiResponse({
                message: 'Layer created successfully',
                success: true,
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Failed to create layer',
                success: false,
            });
        }
    }
    async getLayerWithFeatures(id) {
        return this.layersService.findById(id);
    }
    async getLayerByType(layer_type) {
        return this.layersService.findByLayerType(layer_type);
    }
};
exports.LayersController = LayersController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new layer',
        description: 'Creates a new map layer with its metadata and attributes based on the provided data in the request body.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_layer_dto_1.CreateLayerDto]),
    __metadata("design:returntype", Promise)
], LayersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get layer by ID',
        description: 'Fetches a specific layer and its associated features using the provided layer ID.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LayersController.prototype, "getLayerWithFeatures", null);
__decorate([
    (0, common_1.Get)('type/:layer_type'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get layers by type',
        description: 'Retrieves one or more layers based on the specified `layer_type`. Returns all layers matching the given type.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'layer_type',
        description: 'The type of layer to retrieve (e.g., "polygon", "line", "point").',
        example: 'polygon',
    }),
    __param(0, (0, common_1.Param)('layer_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LayersController.prototype, "getLayerByType", null);
exports.LayersController = LayersController = __decorate([
    (0, swagger_1.ApiTags)('Layers'),
    (0, common_1.Controller)('layers'),
    __metadata("design:paramtypes", [layers_service_1.LayersService])
], LayersController);
//# sourceMappingURL=layers.controller.js.map