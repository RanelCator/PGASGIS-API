declare class ExternalSourceDto {
    source: string;
    x?: string;
    y?: string;
}
export declare class CreateParentDto {
    layerId?: string;
    description: string;
    layerType: number;
    orderBy: number;
    externalSource?: ExternalSourceDto;
}
export declare class UpdateParentDto {
    description?: string;
    layerType?: number;
    orderBy?: number;
}
export {};
