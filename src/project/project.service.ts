import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { MoveItemDto } from './dto/move-item.dto';
import { UpdateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) 
        private projectModel:Model<Project>
    ) {}

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const createdLayer = new this.projectModel(createProjectDto);
        return createdLayer.save();
    }

    async addGroup(dto: CreateGroupDto): Promise<ApiResponse>  {
      try
      {
        const project = await this.projectModel.findById(dto.project_id);
        if (!project) {
          return new ApiResponse({
              success: false,
              message: `No project found with ID ${dto.project_id}`,
          });
        }

        const newGroup = {
          _id: new Types.ObjectId(),
          group_name: dto.group_name,
          geometry_group: [
            { id: 1, description: 'Point', items: [] },
            { id: 2, description: 'Line', items: [] },
            { id: 3, description: 'Polygon', items: [] },
          ],
        };

        project.menu_group.push(newGroup);
        await project.save();

        return new ApiResponse({
          success: true,
          message: `Group "${dto.group_name}" successfully added to project.`,
        });
      }catch(error){
        return new ApiResponse({
          success: false,
          message: error.message,
        });
      }
    }

    async removeGroup(projectId: string, groupId: string): Promise<ApiResponse> {
      try {
        // Validate ObjectId format early
        if (!Types.ObjectId.isValid(projectId)) {
          return new ApiResponse({
            success: false,
            message: `Invalid Project ID ${projectId}`,
          });
        }
    
        if (!Types.ObjectId.isValid(groupId)) {
          return new ApiResponse({
            success: false,
            message: `Invalid Group ID: ${groupId}`,
          });
        }
    
        const project = await this.projectModel.findById(projectId);
    
        if (!project) {
          return new ApiResponse({
            success: false,
            message: `No project found with ID ${projectId}`,
          });
        }
    
        const initialLength = project.menu_group.length;
    
        project.menu_group = project.menu_group.filter(
          (g: any) => g._id.toString() !== groupId
        );
    
        if (project.menu_group.length === initialLength) {
          return new ApiResponse({
            success: false,
            message: `No group found with ID ${groupId} in project ${projectId}`,
          });
        }
    
        await project.save();
    
        return new ApiResponse({
          success: true,
          message: `Group ${groupId} successfully removed from project ${projectId}`,
        });
      } catch (error: any) {
        console.error('❌ Error in removeGroup:', error.message);
    
        return new ApiResponse({
          success: false,
          message: error.message || 'Internal Server Error. An unexpected error occurred while removing the group.',
        });
      }
    }

    async updateGroup(
        projectId: string,
        groupId: string,
        updateData: { group_name?: string; description?: string },
      ): Promise<ApiResponse> {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
          return new ApiResponse({
            success: false,
            message: `No project found with ID ${projectId}`,
          });
        }
      
        const group = project.menu_group.find(
          (g: any) => g._id.toString() === groupId,
        );
      
        if (!group) {
          return new ApiResponse({
            success: false,
            message: `No group found with ID ${groupId}`,
          });
        }
      
        Object.assign(group, updateData);
        project.markModified('menu_group');
        await project.save();
      
        return new ApiResponse({
          success: true,
          message: `Group updated!`,
        });
    }

    async addItem(projectId: string, groupId: string, geometryId: number, dto: CreateParentDto & { parentItemId?: string }): Promise<ApiResponse> {
      try {
        const project = await this.projectModel.findById(projectId);
        if (!project) throw new NotFoundException('Project not found');

        const group = project.menu_group.find((g) => g._id.toString() === groupId);
        if (!group) throw new NotFoundException('Group not found');

        const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
        if (!geometry) throw new NotFoundException('Geometry group not found');

        const item_id = dto.layerId || new Types.ObjectId().toString();

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
        } else {
          const parentItem = this.addItemRecursive(geometry.items, dto.parentItemId, item);
          if (!parentItem) throw new NotFoundException('Parent item not found');
        }

        project.markModified('menu_group');
        await project.save();
        return new ApiResponse({
          success: true,
          message: `Item ID: ${item_id} successfully added!.`,
          data: { item_id }
        });

      }catch(error){
        return new ApiResponse({
          success: false,
          message: error.message,
        });
      }
    }  

    async updateItem(projectId: string,
      groupId: string,
      geometryId: number,
      itemId: string,
      updateData: Record<string, any>,
    ): Promise<ApiResponse> {
      try
      {
        const project = await this.projectModel.findById(projectId);
        if (!project) throw new NotFoundException('Project not found');
    
        const group = project.menu_group.find((g) => g._id.toString() === groupId);
        if (!group) throw new NotFoundException('Menu group not found');
  
        const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
        if (!geometry) throw new NotFoundException('Geometry group not found');
  
        const updated = this.updateItemRecursively(geometry.items, itemId, updateData);
        if (!updated) throw new NotFoundException('Item not found');
    
        project.markModified('menu_group');
        await project.save();
  
        return new ApiResponse({
          success: true,
          message: `Item successfully Updated!.`
        });
      }catch(error){
        return new ApiResponse({
          success: false,
          message: error.message,
        });
      }
    }

    async deleteItem(
      projectId: string,
      groupId: string,
      geometryId: number,
      itemId: string,
    ): Promise<ApiResponse> {
      try {
        const project = await this.projectModel.findById(projectId);
        if (!project) throw new NotFoundException('Project not found');
    
        const group = project.menu_group.find((g) => g._id.toString() === groupId);
        if (!group) throw new NotFoundException('Group not found');
    
        const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
        if (!geometry) throw new NotFoundException('Geometry group not found');
    
        // recursive delete helper
        const deleted = this.deleteItemRecursively(geometry.items, itemId);
        if (!deleted)
          throw new NotFoundException(`Item with id ${itemId} not found`);
    
        await project.save();
    
        return new ApiResponse({
          success: true,
          message: `Item with ID ${itemId} was successfully deleted.`,
          data: { itemId },
        });
      } catch (error) {
        return new ApiResponse({
          success: false,
          message: error.message,
        });
      }
    }

    async moveItem(
      projectId: string,
      groupId: string,
      geometryId: number,
      itemId: string,
      dto: MoveItemDto,
    ): Promise<ApiResponse> {
      try {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
          return new ApiResponse({
            message: 'Project not found.',
            success: false,
          });
        }
  
        const group = project.menu_group.find((g) => g._id.toString() === groupId);
        if (!group) {
          return new ApiResponse({
            message: 'Group not found.',
            success: false,
          });
        }
  
        const geometry = group.geometry_group.find((geo) => geo.id == geometryId);
        if (!geometry) {
          return new ApiResponse({
            message: 'Geometry not found.',
            success: false,
          });
        }
  
        const items = geometry.items;
  
        // Step 1: Find the item to move and remove it from current location
        let itemToMove: any = null;
        const removeItemRecursively = (arr: any[]): boolean => {
          for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.item_id === itemId) {
              itemToMove = item;
              arr.splice(i, 1);
              return true;
            }
            if (item.items?.length && removeItemRecursively(item.items)) return true;
          }
          return false;
        };
  
        const found = removeItemRecursively(items);
        if (!found || !itemToMove) {
          return new ApiResponse({
            message: 'Item to move not found.',
            success: false,
          });
        }
  
        // Step 2: Find the new parent
        const findItemById = (arr: any[], id: string): any => {
          for (const item of arr) {
            if (item.item_id === id) return item;
            if (item.items?.length) {
              const foundChild = findItemById(item.items, id);
              if (foundChild) return foundChild;
            }
          }
          return null;
        };
  
        const newParent = findItemById(items, dto.newParentId);
        if (!newParent) {
          return new ApiResponse({
            message: 'New parent item not found.',
            success: false,
          });
        }
  
        // Step 3: Prevent circular hierarchy (cannot move an item into its descendant)
        const isDescendant = (parent: any, targetId: string): boolean => {
          if (!parent.items?.length) return false;
          for (const child of parent.items) {
            if (child.item_id === targetId || isDescendant(child, targetId)) return true;
          }
          return false;
        };
  
        if (isDescendant(itemToMove, dto.newParentId)) {
          return new ApiResponse({
            message: 'Invalid move: Cannot move an item under its descendant.',
            success: false,
          });
        }
  
        // Step 4: Move item under new parent
        if (!Array.isArray(newParent.items)) newParent.items = [];
        newParent.items.push(itemToMove);
  
        // Step 5: Save project
        await project.save();
  
        return new ApiResponse({
          message: `Item "${itemToMove.description}" successfully moved under "${newParent.description}".`,
          success: true,
        });
      } catch (error) {
        return new ApiResponse({
          message: error.message || 'Failed to move item.',
          success: false,
        });
      }
    }

    async updateAttributeChild(
      projectId: string,
      groupId: string,
      geometryId: number,
      itemId: string,
      dto: UpdateAttributeDto,
    ): Promise<ApiResponse> {
      const project = await this.projectModel.findById(projectId);
      if (!project) throw new NotFoundException('Project not found');
  
      // Traverse the hierarchy: menu_group → geometry_group → items (recursive)
      const group = project.menu_group.find(g => g._id.toString() === groupId);
      if (!group) throw new NotFoundException('Group not found');
  
      const geometry = group.geometry_group.find(g => g.id == geometryId);
      if (!geometry) throw new NotFoundException('Geometry group not found');
  
      const updated = this.updateItemRecursive(geometry.items, itemId, dto.attributeChild);
  
      if (!updated) throw new NotFoundException('Item not found');
  
      await project.save();
  
      return new ApiResponse({
        success: true,
        message: 'attributeChild replaced successfully',
      });
    }

    private updateItemRecursive(items: any[], itemId: string, newChildren: any[]): boolean {
      for (const item of items) {
        if (item.item_id === itemId) {
          // Replace the array
          item.attributeChild = newChildren;
          return true;
        }
        if (item.items && this.updateItemRecursive(item.items, itemId, newChildren)) {
          return true;
        }
      }
      return false;
    }
    
    private deleteItemRecursively(items: any[], itemId: string): boolean {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
    
        if (item.item_id === itemId) {
          items.splice(i, 1);
          return true;
        }
    
        if (item.items?.length) {
          const deleted = this.deleteItemRecursively(item.items, itemId);
          if (deleted) return true;
        }
      }
      return false;
    }
    
    private updateItemRecursively(items: any[], itemId: string, updateData: Partial<any>): boolean {
      for (const item of items) {
        if (item.item_id.toString() == itemId) {
          Object.assign(item, updateData);
          return true;
        }
        if (item.items?.length) {
          const updated = this.updateItemRecursively(item.items, itemId, updateData);
          if (updated) return true;
        }
      }
      return false;
    }

    private addItemRecursive(items: any[], parentId: string, newItem: any): boolean {
      for (const item of items) {
        if (item.item_id.toString() == parentId) {
          console.log(`parent found: ${parentId}`);
          item.items.push(newItem);
          return true;
        }
  
        if (item.items?.length) {
          const added = this.addItemRecursive(item.items, parentId, newItem);
          if (added) return true;
        }
      }
      return false;
    }

}
