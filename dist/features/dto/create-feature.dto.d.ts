declare class GeometryDto {
    type: string;
    coordinates: number[][][] | number[][][][] | number[];
}
declare class DataDto {
    type: string;
    properties: Record<string, any>;
    geometry: GeometryDto;
}
export declare class CreateFeatureDto {
    GroupID: string;
    data: DataDto;
}
export {};
