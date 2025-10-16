import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) 
        private userModel:Model<User>
    ) {}
   
    async findAll(): Promise<GetUserDTO[]> {
        const users = await this.userModel.find().lean();
        return users.map(user => ({
            id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            emailaddress: user.emailaddress,
            UserType: user.UserType
        }));
    }

    async create(createUserDto: CreateUserDto): Promise<ApiResponse> {
        if (!createUserDto.username || createUserDto.username.trim() === '') {
            const emailLocalPart = createUserDto.emailaddress.split('@')[0];
            createUserDto.username = emailLocalPart;
          }
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return new ApiResponse({
          message: 'The user has been registered successfully.',
          success: true,
        });
    }

    async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<ApiResponse> {
        const SALT = parseInt(process.env.SALT || '10', 10);
        try
        {
            const user = await this.userModel.findById(id);
            if(!user){
                return new ApiResponse({
                    message: `No user with id ${id} exists.`,
                    success: false,
                });
            }
            
            if (updateUserDto.IsPGAS === 0){
              if (updateUserDto.password)
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, SALT);
            }

            Object.assign(user, updateUserDto);
            await user.save();
            return new ApiResponse({
                message: 'The user has been updated successfully.',
                success: true,
              });
        }catch(err){
            return new ApiResponse({
                message: err.message,
                success: false,
              });
        }
    }

    async findOne(id: string): Promise<ApiResponse> {
        const user = await this.userModel.findById(id).lean();

        if (!user) {
          return new ApiResponse({
            message: `No user with id ${id} exists.`,
            success: false,
          });
        }

        const mappedUser = {
            id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            emailaddress: user.emailaddress,
            Usersuccess: user.UserType,
        };

        return new ApiResponse({
            message: 'User Found',
            success: true,
            data: mappedUser,
        });
    }

    async remove(id: string): Promise<ApiResponse> {
        try {
          const user = await this.userModel.findByIdAndDelete(id).exec();
          if (!user) {
            return new ApiResponse({
              message: `No user with id ${id} exists.`,
              success: false,
            });
          }
      
          return new ApiResponse({
            message: 'The user has been deleted successfully.',
            success: true,
          });

        } catch (err) {
          return new ApiResponse({
            message: err.message,
            success: false,
          });
        }
    }
}
