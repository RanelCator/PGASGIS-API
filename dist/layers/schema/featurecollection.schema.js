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
exports.FeatureSchema = exports.FeatureCollection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FeatureCollection = class FeatureCollection extends mongoose_2.Document {
    GroupID;
    data;
};
exports.FeatureCollection = FeatureCollection;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FeatureCollection.prototype, "GroupID", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            type: { type: String, default: 'Feature' },
            properties: {},
            geometry: {
                type: {
                    type: String,
                    enum: ['Polygon', 'MultiPolygon', 'Point', 'LineString'],
                },
                coordinates: {},
            },
        },
    }),
    __metadata("design:type", Object)
], FeatureCollection.prototype, "data", void 0);
exports.FeatureCollection = FeatureCollection = __decorate([
    (0, mongoose_1.Schema)({ collection: 'features' })
], FeatureCollection);
exports.FeatureSchema = mongoose_1.SchemaFactory.createForClass(FeatureCollection);
//# sourceMappingURL=featurecollection.schema.js.map