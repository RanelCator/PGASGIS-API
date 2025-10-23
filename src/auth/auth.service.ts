// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SqlQueryService } from 'src/query/query.service';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private sqlQueryService: SqlQueryService,
      ) {}

    async login(dto: LoginDto): Promise<ApiResponse> {
        const { username, password, IsPGAS } = dto;
      
        // case 1: PGAS = 1 → Authenticate via SQL
        if (IsPGAS === 1) {
          // 1) Query SQL Server
          const response = await this.sqlQueryService.getUserId(username, password);

          if (!response.success || !response.data) {
            throw new UnauthorizedException(response.message);
          }

          const sqlId = response.data.eid; // comes from SQL query

      
          // 2) Look up in Mongo using pgasID
          const mongoUser = await this.userModel.findOne({ pgasID: sqlId }).lean();
          if (!mongoUser) {
            throw new UnauthorizedException('User not linked in MongoDB.');
          }
      
          // 3) Prepare JWT payload
          const payload = {
            sub: mongoUser._id.toString(),  // Mongo _id
            role: mongoUser.UserType,       // UserType as role
          };
          const token = this.jwtService.sign(payload);
      
          return new ApiResponse({
            message: 'Login Successful',
            success: true,
            data: { access_token: token },
          });
        }
      
        // case 2: PGAS = 0 → Authenticate in Mongo only
        if (IsPGAS === 0) {
          const mongoUser = await this.userModel.findOne({ username }).exec();
          if (!mongoUser) throw new UnauthorizedException('Invalid username or password.');
      
          const match = await bcrypt.compare(password, mongoUser.password);
          if (!match) throw new UnauthorizedException('Invalid username or password.');
      
          const payload = {
            sub: mongoUser.id.toString(),
            role: mongoUser.UserType,
          };
          const token = this.jwtService.sign(payload);
      
          return new ApiResponse({
            message: 'Login Successful',
            success: true,
            data: { access_token: token },
          });
        }
      
        throw new UnauthorizedException('Invalid login request.');
      }
      

}
