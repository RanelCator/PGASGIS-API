import { LoginDto } from './dto/login.dto';
import { SqlService } from '../shared/sql.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    private sqlService;
    constructor(userModel: Model<User>, jwtService: JwtService, sqlService: SqlService);
    login(dto: LoginDto): Promise<ApiResponse>;
}
