/* eslint-disable */
import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('callback')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const result = await this.authService.loginAuth0User(
      loginUserDto.code,
      loginUserDto.code_verifier,
    );
    console.log(result, 'result in the controller to set the cookie <--------');
    if (result.success) {
      // Set a secure, HTTP-only cookie with the access_token
      res.cookie('auth_token', result.access_token, {
        httpOnly: true, // Prevents client-side JavaScript access
        secure: process.env.NODE_ENV === 'production' ? true : false, // Use secure cookies in production
        sameSite: 'lax', // Helps prevent CSRF
        maxAge: 3600000, // 1 hour in milliseconds
      });
      console.log('Cookie set: -------->', res.get('Set-Cookie'));
      return res.status(200).json({ success: true });
    }
    return res
      .status(401)
      .json({ success: false, message: 'Authentication failed' });
  }

  @Get('status')
  async checkUserAuthentication(@Req() req: Request) {
    const accessToken = req.cookies['auth_token']; // Get the token from the cookie
    console.log(
      accessToken,
      'access token in the controller from status <--------',
    );
    return this.authService.checkUserAuthentication(accessToken);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token'); // Clear the cookie
    return res.status(200).json({ success: true });
  }
}
