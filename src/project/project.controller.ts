import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateParentDto, UpdateParentDto } from './dto/create-parent.dto';
import { MoveItemDto } from './dto/move-item.dto';
import { UpdateAttributeDto } from './dto/create-attribute.dto';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Creates a new project entry with its base information such as description and metadata.',
  })
  @SwaggerResponse({ status: 201, description: 'Project created successfully.' })
  @SwaggerResponse({ status: 400, description: 'Invalid project data.' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      const layer = await this.projectService.create(createProjectDto);
      return new ApiResponse({
        message: 'Project Created!',
        success: true,
      });
    } catch (error) {
      return new ApiResponse({
        message: error.message || 'Failed to create Project',
        success: false,
      });
    }
  }

  @Post('group')
  @ApiOperation({
    summary: 'Add a new group to an existing project',
    description:
      'Adds a new group under a specified project. Groups are used to organize related geometries or items.',
  })
  @SwaggerResponse({ status: 201, description: 'Group added successfully.' })
  @SwaggerResponse({ status: 400, description: 'Invalid group data.' })
  async addGroup(@Body() dto: CreateGroupDto): Promise<ApiResponse> {
    try {
      return await this.projectService.addGroup(dto);
    } catch (error) {
      return new ApiResponse({
        message: error.message || 'Unexpected error occurred while adding group.',
        success: false,
      });
    }
  }

  @Patch(':projectId/group/:groupId')
  @ApiOperation({
    summary: 'Update group details',
    description:
      'Updates the properties (e.g., description) of a group within a specific project.',
  })
  @SwaggerResponse({ status: 200, description: 'Group updated successfully.' })
  @SwaggerResponse({ status: 404, description: 'Group not found.' })
  async updateGroup(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Body() dto: { description?: string },
  ) {
    return this.projectService.updateGroup(projectId, groupId, dto);
  }

  @Delete(':projectId/group/:groupId')
  @ApiOperation({
    summary: 'Remove a group from a project',
    description:
      'Deletes a group identified by its ID from the specified project. All items under the group will also be removed.',
  })
  @SwaggerResponse({ status: 200, description: 'Group deleted successfully.' })
  @SwaggerResponse({ status: 404, description: 'Group not found.' })
  async removeGroup(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.projectService.removeGroup(projectId, groupId);
  }

  @Post(':projectId/group/:groupId/geometry/:geometryId/parent')
  @ApiOperation({
    summary: 'Add a new item (parent) to geometry',
    description:
      'Creates a new item under the specified geometry and group. If the item has nested sub-items, they will also be stored.',
  })
  @SwaggerResponse({ status: 201, description: 'Item created successfully.' })
  @SwaggerResponse({ status: 400, description: 'Invalid item data.' })
  async addItem(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Param('geometryId') geometryId: number,
    @Body() dto: CreateParentDto,
  ): Promise<ApiResponse> {
    try {
      return await this.projectService.addItem(projectId, groupId, geometryId, dto);
    } catch (error) {
      return new ApiResponse({
        message: error.message || 'Unexpected error occurred while adding item.',
        success: false,
      });
    }
  }

  @Patch(':projectId/group/:groupId/geometry/:geometryId/item/:itemId')
  @ApiOperation({
    summary: 'Update an existing item (supports nested items)',
    description:
      'Updates an item’s data under the specified geometry. If the target item is nested, it will be updated recursively.',
  })
  @SwaggerResponse({ status: 200, description: 'Item updated successfully.' })
  @SwaggerResponse({ status: 404, description: 'Item not found.' })
  async updateItem(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Param('geometryId') geometryId: number,
    @Param('itemId') itemId: string,
    @Body() updateData: Record<string, any>,
  ): Promise<ApiResponse> {
    try {
      return this.projectService.updateItem(projectId, groupId, geometryId, itemId, updateData);
    } catch (error) {
      return new ApiResponse({
        message: error.message || 'Unexpected error occurred while updating item.',
        success: false,
      });
    }
  }

  @Patch(':projectId/group/:groupId/geometry/:geometryId/item/:itemId/move')
  @ApiOperation({
    summary: 'Move Item to Another Parent',
    description:
      'Moves an existing item to another parent item within the same geometry. Prevents invalid hierarchy moves (e.g., moving an item under its descendant).',
  })
  async moveItem(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Param('geometryId') geometryId: number,
    @Param('itemId') itemId: string,
    @Body() dto: MoveItemDto,
  ): Promise<ApiResponse> {
    try {
      return await this.projectService.moveItem(projectId, groupId, geometryId, itemId, dto);
    } catch (error) {
      return new ApiResponse({
        message: error.message || 'Failed to move item.',
        success: false,
      });
    }
  }

  @Delete(':projectId/group/:groupId/geometry/:geometryId/item/:itemId')
  @ApiOperation({
    summary: 'Delete item recursively',
    description:
      'Deletes an item from a specific geometry and all its nested sub-items recursively. This operation cannot be undone.',
  })
  @SwaggerResponse({ status: 200, description: 'Item and its nested items deleted successfully.' })
  @SwaggerResponse({ status: 404, description: 'Item not found.' })
  async deleteItem(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Param('geometryId') geometryId: number,
    @Param('itemId') itemId: string,
  ) {
    return this.projectService.deleteItem(projectId, groupId, geometryId, itemId);
  }

  @Patch(':projectId/group/:groupId/geometry/:geometryId/item/:itemId/attribute')
  @ApiOperation({
    summary: 'Replace attributeChild[] for an Item',
    description:
      'Finds the specific item within the given Project → Group → Geometry → Item hierarchy and replaces its attributeChild[] array with the provided new data.',
  })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiParam({ name: 'groupId', description: 'Menu Group ID (ObjectId)' })
  @ApiParam({ name: 'geometryId', description: 'Geometry group numeric ID' })
  @ApiParam({ name: 'itemId', description: 'Item ID string' })
  updateAttributeChild(
    @Param('projectId') projectId: string,
    @Param('groupId') groupId: string,
    @Param('geometryId') geometryId: number,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateAttributeDto,
  ): Promise<ApiResponse> {
    return this.projectService.updateAttributeChild(projectId, groupId, geometryId, itemId, dto);
  }
}
