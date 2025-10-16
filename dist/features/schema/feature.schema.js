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
exports.FeatureSchema = exports.Feature = exports.Data = exports.Geometry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Geometry = class Geometry {
    type;
    coordinates;
};
exports.Geometry = Geometry;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['Point', 'LineString', 'Polygon', 'MultiPolygon'],
        required: true,
    }),
    __metadata("design:type", String)
], Geometry.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, required: true }),
    __metadata("design:type", Array)
], Geometry.prototype, "coordinates", void 0);
exports.Geometry = Geometry = __decorate([
    (0, mongoose_1.Schema)({ timestamps: false, _id: false })
], Geometry);
const GeometrySchema = mongoose_1.SchemaFactory.createForClass(Geometry);
let Data = class Data {
    type;
    properties;
    geometry;
};
exports.Data = Data;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Feature'], required: true }),
    __metadata("design:type", String)
], Data.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Data.prototype, "properties", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GeometrySchema, required: true }),
    __metadata("design:type", Geometry)
], Data.prototype, "geometry", void 0);
exports.Data = Data = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Data);
const DataSchema = mongoose_1.SchemaFactory.createForClass(Data);
let Feature = class Feature extends mongoose_2.Document {
    GroupID;
    data;
};
exports.Feature = Feature;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Feature.prototype, "GroupID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DataSchema, required: true }),
    __metadata("design:type", Object)
], Feature.prototype, "data", void 0);
exports.Feature = Feature = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Feature);
exports.FeatureSchema = mongoose_1.SchemaFactory.createForClass(Feature);
//# sourceMappingURL=feature.schema.js.map