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
exports.FeaturesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const feature_schema_1 = require("./schema/feature.schema");
let FeaturesService = class FeaturesService {
    featureModel;
    constructor(featureModel) {
        this.featureModel = featureModel;
    }
    async create(createFeatureDto) {
        const createdFeature = new this.featureModel(createFeatureDto);
        return await createdFeature.save();
    }
    async findByGroupId(groupId) {
        const features = await this.featureModel.find({ GroupID: groupId }).exec();
        return features.map(f => f.data);
    }
    async remove(groupId) {
        const result = await this.featureModel.deleteMany({ GroupID: groupId }).exec();
        return result.deletedCount > 0;
    }
};
exports.FeaturesService = FeaturesService;
exports.FeaturesService = FeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(feature_schema_1.Feature.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeaturesService);
//# sourceMappingURL=features.service.js.map