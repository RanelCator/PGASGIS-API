import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<GetUserDTO[]>;
    findOne(id: string): Promise<ApiResponse>;
    create(createUserDto: CreateUserDto): Promise<ApiResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponse>;
    remove(id: string): Promise<ApiResponse>;
}
