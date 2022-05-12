import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login to DFS',
  })
  @ApiBody({
    description: 'Details of User',
    type: LoginDto,
  })
  @Public()
  @Post('login')
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const loginResponse = new LoginResponseDto();

    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token } = await this.authService.login(user);

    loginResponse.success = true;
    loginResponse.data = {
      access_token: access_token,
      refresh_token: access_token,
      expiry: '1h',
    };
    loginResponse.statusCode = 200;
    loginResponse.message = 'Successful login';

    return loginResponse;
    // return loginDto;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // console.log(req.user);
    return req.user;
    // as { userId: string; username: string };
  }
}
