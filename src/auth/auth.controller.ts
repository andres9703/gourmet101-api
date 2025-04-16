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
    if (result.success) {
      // Set access_token cookie
      res.cookie('auth_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',
        maxAge: 10 * 60 * 60 * 1000, // 10 hours
      });
      // Set refresh_token cookie
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res.status(200).json({ success: true });
    }
    return res
      .status(401)
      .json({ success: false, message: 'Authentication failed' });
  }

  @Get('status')
  async checkUserAuthentication(@Req() req: Request) {
    const accessToken = req.cookies['auth_token']; // Get the token from the cookie

    return this.authService.checkUserAuthentication(accessToken);
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: 'No refresh token provided' });
    }
    try {
      const result = await this.authService.refreshAccessToken(refreshToken);
      console.log('result from the refresh method in api <---------', result);
      res.cookie('auth_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',
        // maxAge: 10 * 60 * 60 * 1000, // 10 hours
        maxAge: 1 * 60 * 1000,
      });
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',
        // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        maxAge: 5 * 60 * 1000,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: 'Failed to refresh token' });
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token'); // Clear the cookie
    res.clearCookie('refresh_token'); // Clear the cookie
    return res.status(200).json({ success: true });
  }
}
