import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate User',
    description:
      'Validates user credentials and returns an access token if authentication is successful. ' +
      'The client must provide valid username and password in the request body.',
  })
  async login(@Body() dto: LoginDto): Promise<ApiResponse> {
    return this.authService.login(dto);
  }
}
