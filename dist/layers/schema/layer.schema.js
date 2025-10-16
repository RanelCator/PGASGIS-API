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
exports.MapLayerSchema = exports.MapLayer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Style = class Style {
    propertyValue;
    alt_description;
    fillType;
    fillWeight;
    fillColor;
    angle;
    sgvIcons;
    classIcons;
    borderColor;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "propertyValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "alt_description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "fillType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "fillWeight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "fillColor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "angle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "sgvIcons", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "classIcons", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Style.prototype, "borderColor", void 0);
Style = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Style);
let Attribute = class Attribute {
    propertyName;
    propertyName_Group;
    propertyName_Label;
    showLabelInZoomLevel;
    fillType;
    fillWeight;
    fillColor;
    angle;
    sgvIcons;
    classIcons;
    style;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attribute.prototype, "propertyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attribute.prototype, "propertyName_Group", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attribute.prototype, "propertyName_Label", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "showLabelInZoomLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "fillType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "fillWeight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "fillColor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "angle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "sgvIcons", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attribute.prototype, "classIcons", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Style], default: [] }),
    __metadata("design:type", Array)
], Attribute.prototype, "style", void 0);
Attribute = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], Attribute);
let LayerInfo = class LayerInfo {
    description;
    remarks;
    layer_type;
    DateUploaded;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LayerInfo.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LayerInfo.prototype, "remarks", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LayerInfo.prototype, "layer_type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LayerInfo.prototype, "DateUploaded", void 0);
LayerInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], LayerInfo);
let MapLayer = class MapLayer extends mongoose_2.Document {
    layer;
    attribute;
};
exports.MapLayer = MapLayer;
__decorate([
    (0, mongoose_1.Prop)({ type: LayerInfo }),
    __metadata("design:type", LayerInfo)
], MapLayer.prototype, "layer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Attribute], default: [] }),
    __metadata("design:type", Array)
], MapLayer.prototype, "attribute", void 0);
exports.MapLayer = MapLayer = __decorate([
    (0, mongoose_1.Schema)({ collection: 'map_layer' })
], MapLayer);
exports.MapLayerSchema = mongoose_1.SchemaFactory.createForClass(MapLayer);
exports.MapLayerSchema.set('toJSON', {
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=layer.schema.js.map