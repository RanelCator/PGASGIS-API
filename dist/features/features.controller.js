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
exports.FeaturesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const features_service_1 = require("./features.service");
const create_feature_dto_1 = require("./dto/create-feature.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let FeaturesController = class FeaturesController {
    featuresService;
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    async create(createFeatureDto) {
        const data = await this.featuresService.create(createFeatureDto);
        return new api_response_dto_1.ApiResponse({
            message: 'Feature saved successfully',
            success: true,
            data,
        });
    }
    async findByGroup(groupId) {
        const data = await this.featuresService.findByGroupId(groupId);
        return new api_response_dto_1.ApiResponse({
            success: true,
            data,
        });
    }
    async removeByGroupId(groupId) {
        const success = await this.featuresService.remove(groupId);
        return new api_response_dto_1.ApiResponse({
            message: success
                ? 'Features deleted successfully'
                : 'No features found for the specified GroupID',
            success,
        });
    }
};
exports.FeaturesController = FeaturesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new feature',
        description: 'Adds a new feature to the specified layer group. The request body must include the required feature details defined in the DTO.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feature created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid feature data provided.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feature_dto_1.CreateFeatureDto]),
    __metadata("design:returntype", Promise)
], FeaturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('group/:groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get features by group ID',
        description: 'Retrieves all features associated with a specific group ID. Useful for fetching features belonging to a certain layer or category.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Features retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No features found for the specified GroupID.' }),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturesController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Delete)('group/:groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete features by group ID',
        description: 'Deletes all features associated with the given group ID. This action removes all related records under that group.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Features deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No features found for the specified GroupID.' }),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturesController.prototype, "removeByGroupId", null);
exports.FeaturesController = FeaturesController = __decorate([
    (0, swagger_1.ApiTags)('Features'),
    (0, common_1.Controller)('features'),
    __metadata("design:paramtypes", [features_service_1.FeaturesService])
], FeaturesController);
//# sourceMappingURL=features.controller.js.map