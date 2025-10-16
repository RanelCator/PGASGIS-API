import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { MoveItemDto } from './dto/move-item.dto';
import { UpdateAttributeDto } from './dto/create-attribute.dto';
export declare class ProjectService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    addGroup(dto: CreateGroupDto): Promise<ApiResponse>;
    removeGroup(projectId: string, groupId: string): Promise<ApiResponse>;
    updateGroup(projectId: string, groupId: string, updateData: {
        group_name?: string;
        description?: string;
    }): Promise<ApiResponse>;
    addItem(projectId: string, groupId: string, geometryId: number, dto: CreateParentDto & {
        parentItemId?: string;
    }): Promise<ApiResponse>;
    updateItem(projectId: string, groupId: string, geometryId: number, itemId: string, updateData: Record<string, any>): Promise<ApiResponse>;
    deleteItem(projectId: string, groupId: string, geometryId: number, itemId: string): Promise<ApiResponse>;
    moveItem(projectId: string, groupId: string, geometryId: number, itemId: string, dto: MoveItemDto): Promise<ApiResponse>;
    updateAttributeChild(projectId: string, groupId: string, geometryId: number, itemId: string, dto: UpdateAttributeDto): Promise<ApiResponse>;
    private updateItemRecursive;
    private deleteItemRecursively;
    private updateItemRecursively;
    private addItemRecursive;
}
