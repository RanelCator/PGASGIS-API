import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<GetUserDTO[]>;
    create(createUserDto: CreateUserDto): Promise<ApiResponse>;
    update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<ApiResponse>;
    findOne(id: string): Promise<ApiResponse>;
    remove(id: string): Promise<ApiResponse>;
}
