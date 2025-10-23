import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SqlQueryService } from 'src/query/query.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private sqlQueryService;
    constructor(userModel: Model<User>, jwtService: JwtService, sqlQueryService: SqlQueryService);
    login(dto: LoginDto): Promise<ApiResponse>;
}
