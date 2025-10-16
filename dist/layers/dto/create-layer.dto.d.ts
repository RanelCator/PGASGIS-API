export declare class StyleDto {
    propertyValue?: string;
    alt_description?: string;
    fillType?: string;
    fillWeight?: string;
    fillColor?: string;
    angle?: string;
    sgvIcons?: string;
    classIcons?: string;
    borderColor?: string;
}
export declare class AttributeDto {
    propertyName: string;
    propertyName_Group: string;
    propertyName_Label: string;
    showLabelInZoomLevel?: string;
    fillType?: string;
    fillWeight?: string;
    fillColor?: string;
    angle?: string;
    sgvIcons?: string;
    classIcons?: string;
    style?: StyleDto[];
}
export declare class LayerInfoDto {
    description?: string;
    remarks?: string;
    layer_type?: string;
    DateUploaded?: string;
}
export declare class CreateLayerDto {
    layer: LayerInfoDto;
    attribute: AttributeDto;
}
