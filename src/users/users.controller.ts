import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger';

@ApiTags('Users Management')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all users',
    description: 'Fetches a complete list of users currently registered in the system.',
  })
  @SwaggerResponse({ status: 200, description: 'List of users retrieved successfully.' })
  async findAll(): Promise<GetUserDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve specific user by ID',
    description: 'Fetches detailed information about a single user using their unique identifier.',
  })
  @SwaggerResponse({ status: 200, description: 'User details retrieved successfully.' })
  @SwaggerResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Registers a new user with the provided details such as name, email, and role.',
  })
  @SwaggerResponse({ status: 201, description: 'User created successfully.' })
  @SwaggerResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ApiResponse> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update existing user',
    description: 'Modifies user information based on the provided data. Only supplied fields are updated.',
  })
  @SwaggerResponse({ status: 200, description: 'User updated successfully.' })
  @SwaggerResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Removes a user permanently from the system using their unique ID.',
  })
  @SwaggerResponse({ status: 200, description: 'User deleted successfully.' })
  @SwaggerResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string): Promise<ApiResponse> {
    return this.usersService.remove(id);
  }
}
