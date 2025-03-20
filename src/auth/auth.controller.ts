import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('callback')
  async login(@Body() loginUserDto: LoginUserDto, @Response({passthrough:true}) res) {
   return await this.authService.loginAuth0User(loginUserDto.code, res);

  }

  @Get('check')
  async checkUserAuthentication() {
    return this.authService.checkUserAuthentication();
  }
}
