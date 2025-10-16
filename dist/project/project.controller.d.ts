import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { MoveItemDto } from './dto/move-item.dto';
import { UpdateAttributeDto } from './dto/create-attribute.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<ApiResponse<any>>;
    addGroup(dto: CreateGroupDto): Promise<ApiResponse>;
    updateGroup(projectId: string, groupId: string, dto: {
        description?: string;
    }): Promise<ApiResponse<any>>;
    removeGroup(projectId: string, groupId: string): Promise<ApiResponse<any>>;
    addItem(projectId: string, groupId: string, geometryId: number, dto: CreateParentDto): Promise<ApiResponse>;
    updateItem(projectId: string, groupId: string, geometryId: number, itemId: string, updateData: Record<string, any>): Promise<ApiResponse>;
    moveItem(projectId: string, groupId: string, geometryId: number, itemId: string, dto: MoveItemDto): Promise<ApiResponse>;
    deleteItem(projectId: string, groupId: string, geometryId: number, itemId: string): Promise<ApiResponse<any>>;
    updateAttributeChild(projectId: string, groupId: string, geometryId: number, itemId: string, dto: UpdateAttributeDto): Promise<ApiResponse>;
}
