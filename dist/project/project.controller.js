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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
const create_group_dto_1 = require("./dto/create-group.dto");
const create_parent_dto_1 = require("./dto/create-parent.dto");
const move_item_dto_1 = require("./dto/move-item.dto");
const create_attribute_dto_1 = require("./dto/create-attribute.dto");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(createProjectDto) {
        try {
            const layer = await this.projectService.create(createProjectDto);
            return new api_response_dto_1.ApiResponse({
                message: 'Project Created!',
                success: true,
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Failed to create Project',
                success: false,
            });
        }
    }
    async addGroup(dto) {
        try {
            return await this.projectService.addGroup(dto);
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Unexpected error occurred while adding group.',
                success: false,
            });
        }
    }
    async updateGroup(projectId, groupId, dto) {
        return this.projectService.updateGroup(projectId, groupId, dto);
    }
    async removeGroup(projectId, groupId) {
        return this.projectService.removeGroup(projectId, groupId);
    }
    async addItem(projectId, groupId, geometryId, dto) {
        try {
            return await this.projectService.addItem(projectId, groupId, geometryId, dto);
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Unexpected error occurred while adding item.',
                success: false,
            });
        }
    }
    async updateItem(projectId, groupId, geometryId, itemId, updateData) {
        try {
            return this.projectService.updateItem(projectId, groupId, geometryId, itemId, updateData);
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Unexpected error occurred while updating item.',
                success: false,
            });
        }
    }
    async moveItem(projectId, groupId, geometryId, itemId, dto) {
        try {
            return await this.projectService.moveItem(projectId, groupId, geometryId, itemId, dto);
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Failed to move item.',
                success: false,
            });
        }
    }
    async deleteItem(projectId, groupId, geometryId, itemId) {
        return this.projectService.deleteItem(projectId, groupId, geometryId, itemId);
    }
    updateAttributeChild(projectId, groupId, geometryId, itemId, dto) {
        return this.projectService.updateAttributeChild(projectId, groupId, geometryId, itemId, dto);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new project',
        description: 'Creates a new project entry with its base information such as description and metadata.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Project created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid project data.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('group'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a new group to an existing project',
        description: 'Adds a new group under a specified project. Groups are used to organize related geometries or items.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Group added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid group data.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addGroup", null);
__decorate([
    (0, common_1.Patch)(':projectId/group/:groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update group details',
        description: 'Updates the properties (e.g., description) of a group within a specific project.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Group updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Group not found.' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)(':projectId/group/:groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a group from a project',
        description: 'Deletes a group identified by its ID from the specified project. All items under the group will also be removed.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Group deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Group not found.' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "removeGroup", null);
__decorate([
    (0, common_1.Post)(':projectId/group/:groupId/geometry/:geometryId/parent'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a new item (parent) to geometry',
        description: 'Creates a new item under the specified geometry and group. If the item has nested sub-items, they will also be stored.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid item data.' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Param)('geometryId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, create_parent_dto_1.CreateParentDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)(':projectId/group/:groupId/geometry/:geometryId/item/:itemId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an existing item (supports nested items)',
        description: 'Updates an item’s data under the specified geometry. If the target item is nested, it will be updated recursively.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found.' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Param)('geometryId')),
    __param(3, (0, common_1.Param)('itemId')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Patch)(':projectId/group/:groupId/geometry/:geometryId/item/:itemId/move'),
    (0, swagger_1.ApiOperation)({
        summary: 'Move Item to Another Parent',
        description: 'Moves an existing item to another parent item within the same geometry. Prevents invalid hierarchy moves (e.g., moving an item under its descendant).',
    }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Param)('geometryId')),
    __param(3, (0, common_1.Param)('itemId')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, move_item_dto_1.MoveItemDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "moveItem", null);
__decorate([
    (0, common_1.Delete)(':projectId/group/:groupId/geometry/:geometryId/item/:itemId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete item recursively',
        description: 'Deletes an item from a specific geometry and all its nested sub-items recursively. This operation cannot be undone.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item and its nested items deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found.' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Param)('geometryId')),
    __param(3, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Patch)(':projectId/group/:groupId/geometry/:geometryId/item/:itemId/attribute'),
    (0, swagger_1.ApiOperation)({
        summary: 'Replace attributeChild[] for an Item',
        description: 'Finds the specific item within the given Project → Group → Geometry → Item hierarchy and replaces its attributeChild[] array with the provided new data.',
    }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiParam)({ name: 'groupId', description: 'Menu Group ID (ObjectId)' }),
    (0, swagger_1.ApiParam)({ name: 'geometryId', description: 'Geometry group numeric ID' }),
    (0, swagger_1.ApiParam)({ name: 'itemId', description: 'Item ID string' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Param)('geometryId')),
    __param(3, (0, common_1.Param)('itemId')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, create_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateAttributeChild", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map