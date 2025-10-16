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
exports.CreateFeatureDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class GeometryDto {
    type;
    coordinates;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Polygon',
        description: 'Type of geometry, such as Point, LineString, Polygon, or MultiPolygon',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GeometryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [[[120.9822, 14.6042], [120.983, 14.605], [120.9822, 14.6042]]],
        description: 'Array of coordinates following GeoJSON structure (can vary by geometry type)',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GeometryDto.prototype, "coordinates", void 0);
class DataDto {
    type;
    properties;
    geometry;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Feature',
        description: 'Type of the GeoJSON object. Should always be "Feature".',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DataDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { name: 'Barangay Hall', category: 'Building' },
        description: 'Custom properties associated with this feature (key-value pairs)',
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DataDto.prototype, "properties", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Geometry data containing the type and coordinates of the feature',
        type: GeometryDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GeometryDto),
    __metadata("design:type", GeometryDto)
], DataDto.prototype, "geometry", void 0);
class CreateFeatureDto {
    GroupID;
    data;
}
exports.CreateFeatureDto = CreateFeatureDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6521f85b8e9e99aee07b1f34',
        description: 'ID of the group to which this feature belongs',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFeatureDto.prototype, "GroupID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GeoJSON feature data including type, properties, and geometry',
        type: DataDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DataDto),
    __metadata("design:type", DataDto)
], CreateFeatureDto.prototype, "data", void 0);
//# sourceMappingURL=create-feature.dto.js.map