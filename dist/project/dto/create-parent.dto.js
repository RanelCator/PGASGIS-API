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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParentDto = exports.CreateParentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateParentDto {
    layerId;
    description;
    layerType;
    orderBy;
}
exports.CreateParentDto = CreateParentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional ID of the associated layer (if already exists)',
        example: '66fcb8a5f8a7a621b056d2f9',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "layerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descriptive name or details of the parent layer',
        example: 'Main Road Network',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Numeric type representing the layer (e.g., 0=Folder/Sub-Folder, 1=Point, 2=Line, 3=Polygon)',
        example: 2,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateParentDto.prototype, "layerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order index for sorting layers',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateParentDto.prototype, "orderBy", void 0);
class UpdateParentDto {
    description;
    layerType;
    orderBy;
}
exports.UpdateParentDto = UpdateParentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated description for the parent layer',
        example: 'Updated River Network Layer',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated layer type (e.g., 1=Point, 2=Line, 3=Polygon)',
        example: 3,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateParentDto.prototype, "layerType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated order index for sorting layers',
        example: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateParentDto.prototype, "orderBy", void 0);
//# sourceMappingURL=create-parent.dto.js.map