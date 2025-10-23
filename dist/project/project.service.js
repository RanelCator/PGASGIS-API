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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("./schema/project.schema");
const mongoose_2 = require("mongoose");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let ProjectService = class ProjectService {
    projectModel;
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async create(createProjectDto) {
        const createdLayer = new this.projectModel(createProjectDto);
        return createdLayer.save();
    }
    async addGroup(dto) {
        try {
            const project = await this.projectModel.findById(dto.project_id);
            if (!project) {
                return new api_response_dto_1.ApiResponse({
                    success: false,
                    message: `No project found with ID ${dto.project_id}`,
                });
            }
            const newGroup = {
                _id: new mongoose_2.Types.ObjectId(),
                group_name: dto.group_name,
                geometry_group: [
                    { id: 1, description: 'Point', items: [] },
                    { id: 2, description: 'Line', items: [] },
                    { id: 3, description: 'Polygon', items: [] },
                ],
            };
            project.menu_group.push(newGroup);
            await project.save();
            return new api_response_dto_1.ApiResponse({
                success: true,
                message: `Group "${dto.group_name}" successfully added to project.`,
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: error.message,
            });
        }
    }
    async removeGroup(projectId, groupId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(projectId)) {
                return new api_response_dto_1.ApiResponse({
                    success: false,
                    message: `Invalid Project ID ${projectId}`,
                });
            }
            if (!mongoose_2.Types.ObjectId.isValid(groupId)) {
                return new api_response_dto_1.ApiResponse({
                    success: false,
                    message: `Invalid Group ID: ${groupId}`,
                });
            }
            const project = await this.projectModel.findById(projectId);
            if (!project) {
                return new api_response_dto_1.ApiResponse({
                    success: false,
                    message: `No project found with ID ${projectId}`,
                });
            }
            const initialLength = project.menu_group.length;
            project.menu_group = project.menu_group.filter((g) => g._id.toString() !== groupId);
            if (project.menu_group.length === initialLength) {
                return new api_response_dto_1.ApiResponse({
                    success: false,
                    message: `No group found with ID ${groupId} in project ${projectId}`,
                });
            }
            await project.save();
            return new api_response_dto_1.ApiResponse({
                success: true,
                message: `Group ${groupId} successfully removed from project ${projectId}`,
            });
        }
        catch (error) {
            console.error('❌ Error in removeGroup:', error.message);
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: error.message || 'Internal Server Error. An unexpected error occurred while removing the group.',
            });
        }
    }
    async updateGroup(projectId, groupId, updateData) {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: `No project found with ID ${projectId}`,
            });
        }
        const group = project.menu_group.find((g) => g._id.toString() === groupId);
        if (!group) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: `No group found with ID ${groupId}`,
            });
        }
        Object.assign(group, updateData);
        project.markModified('menu_group');
        await project.save();
        return new api_response_dto_1.ApiResponse({
            success: true,
            message: `Group updated!`,
        });
    }
    async addItem(projectId, groupId, geometryId, dto) {
        try {
            const project = await this.projectModel.findById(projectId);
            if (!project)
                throw new common_1.NotFoundException('Project not found');
            const group = project.menu_group.find((g) => g._id.toString() === groupId);
            if (!group)
                throw new common_1.NotFoundException('Group not found');
            const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
            if (!geometry)
                throw new common_1.NotFoundException('Geometry group not found');
            const item_id = dto.layerId || new mongoose_2.Types.ObjectId().toString();
            const item = {
                item_id,
                description: dto.description,
                layerType: dto.layerType,
                orderBy: dto.orderBy,
                externalSource: dto.externalSource
                    ? {
                        source: dto.externalSource.source,
                        x: dto.externalSource.x,
                        y: dto.externalSource.y,
                    }
                    : null,
                items: [],
                attributeChild: [],
            };
            if (!dto.parentItemId) {
                geometry.items.push(item);
            }
            else {
                const parentItem = this.addItemRecursive(geometry.items, dto.parentItemId, item);
                if (!parentItem)
                    throw new common_1.NotFoundException('Parent item not found');
            }
            project.markModified('menu_group');
            await project.save();
            return new api_response_dto_1.ApiResponse({
                success: true,
                message: `Item ID: ${item_id} successfully added!.`,
                data: { item_id }
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: error.message,
            });
        }
    }
    async updateItem(projectId, groupId, geometryId, itemId, updateData) {
        try {
            const project = await this.projectModel.findById(projectId);
            if (!project)
                throw new common_1.NotFoundException('Project not found');
            const group = project.menu_group.find((g) => g._id.toString() === groupId);
            if (!group)
                throw new common_1.NotFoundException('Menu group not found');
            const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
            if (!geometry)
                throw new common_1.NotFoundException('Geometry group not found');
            const updated = this.updateItemRecursively(geometry.items, itemId, updateData);
            if (!updated)
                throw new common_1.NotFoundException('Item not found');
            project.markModified('menu_group');
            await project.save();
            return new api_response_dto_1.ApiResponse({
                success: true,
                message: `Item successfully Updated!.`
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: error.message,
            });
        }
    }
    async deleteItem(projectId, groupId, geometryId, itemId) {
        try {
            const project = await this.projectModel.findById(projectId);
            if (!project)
                throw new common_1.NotFoundException('Project not found');
            const group = project.menu_group.find((g) => g._id.toString() === groupId);
            if (!group)
                throw new common_1.NotFoundException('Group not found');
            const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
            if (!geometry)
                throw new common_1.NotFoundException('Geometry group not found');
            const deleted = this.deleteItemRecursively(geometry.items, itemId);
            if (!deleted)
                throw new common_1.NotFoundException(`Item with id ${itemId} not found`);
            await project.save();
            return new api_response_dto_1.ApiResponse({
                success: true,
                message: `Item with ID ${itemId} was successfully deleted.`,
                data: { itemId },
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                success: false,
                message: error.message,
            });
        }
    }
    async moveItem(projectId, groupId, geometryId, itemId, dto) {
        try {
            const project = await this.projectModel.findById(projectId);
            if (!project) {
                return new api_response_dto_1.ApiResponse({
                    message: 'Project not found.',
                    success: false,
                });
            }
            const group = project.menu_group.find((g) => g._id.toString() === groupId);
            if (!group) {
                return new api_response_dto_1.ApiResponse({
                    message: 'Group not found.',
                    success: false,
                });
            }
            const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
            if (!geometry) {
                return new api_response_dto_1.ApiResponse({
                    message: 'Geometry not found.',
                    success: false,
                });
            }
            const items = geometry.items;
            let itemToMove = null;
            const removeItemRecursively = (arr) => {
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    if (item.item_id === itemId) {
                        itemToMove = item;
                        arr.splice(i, 1);
                        return true;
                    }
                    if (item.items?.length && removeItemRecursively(item.items))
                        return true;
                }
                return false;
            };
            const found = removeItemRecursively(items);
            if (!found || !itemToMove) {
                return new api_response_dto_1.ApiResponse({
                    message: 'Item to move not found.',
                    success: false,
                });
            }
            const findItemById = (arr, id) => {
                for (const item of arr) {
                    if (item.item_id === id)
                        return item;
                    if (item.items?.length) {
                        const foundChild = findItemById(item.items, id);
                        if (foundChild)
                            return foundChild;
                    }
                }
                return null;
            };
            const newParent = findItemById(items, dto.newParentId);
            if (!newParent) {
                return new api_response_dto_1.ApiResponse({
                    message: 'New parent item not found.',
                    success: false,
                });
            }
            const isDescendant = (parent, targetId) => {
                if (!parent.items?.length)
                    return false;
                for (const child of parent.items) {
                    if (child.item_id === targetId || isDescendant(child, targetId))
                        return true;
                }
                return false;
            };
            if (isDescendant(itemToMove, dto.newParentId)) {
                return new api_response_dto_1.ApiResponse({
                    message: 'Invalid move: Cannot move an item under its descendant.',
                    success: false,
                });
            }
            if (!Array.isArray(newParent.items))
                newParent.items = [];
            newParent.items.push(itemToMove);
            await project.save();
            return new api_response_dto_1.ApiResponse({
                message: `Item "${itemToMove.description}" successfully moved under "${newParent.description}".`,
                success: true,
            });
        }
        catch (error) {
            return new api_response_dto_1.ApiResponse({
                message: error.message || 'Failed to move item.',
                success: false,
            });
        }
    }
    async updateAttributeChild(projectId, groupId, geometryId, itemId, dto) {
        const project = await this.projectModel.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const group = project.menu_group.find(g => g._id.toString() === groupId);
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        const geometry = group.geometry_group.find(g => g.id == geometryId);
        if (!geometry)
            throw new common_1.NotFoundException('Geometry group not found');
        const updated = this.updateItemRecursive(geometry.items, itemId, dto.attributeChild);
        if (!updated)
            throw new common_1.NotFoundException('Item not found');
        await project.save();
        return new api_response_dto_1.ApiResponse({
            success: true,
            message: 'attributeChild replaced successfully',
        });
    }
    updateItemRecursive(items, itemId, newChildren) {
        for (const item of items) {
            if (item.item_id === itemId) {
                item.attributeChild = newChildren;
                return true;
            }
            if (item.items && this.updateItemRecursive(item.items, itemId, newChildren)) {
                return true;
            }
        }
        return false;
    }
    deleteItemRecursively(items, itemId) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.item_id === itemId) {
                items.splice(i, 1);
                return true;
            }
            if (item.items?.length) {
                const deleted = this.deleteItemRecursively(item.items, itemId);
                if (deleted)
                    return true;
            }
        }
        return false;
    }
    updateItemRecursively(items, itemId, updateData) {
        for (const item of items) {
            if (item.item_id.toString() == itemId) {
                Object.assign(item, updateData);
                return true;
            }
            if (item.items?.length) {
                const updated = this.updateItemRecursively(item.items, itemId, updateData);
                if (updated)
                    return true;
            }
        }
        return false;
    }
    addItemRecursive(items, parentId, newItem) {
        for (const item of items) {
            if (item.item_id.toString() == parentId) {
                console.log(`parent found: ${parentId}`);
                item.items.push(newItem);
                return true;
            }
            if (item.items?.length) {
                const added = this.addItemRecursive(item.items, parentId, newItem);
                if (added)
                    return true;
            }
        }
        return false;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectService);
//# sourceMappingURL=project.service.js.map