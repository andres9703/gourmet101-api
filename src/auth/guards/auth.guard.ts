/* eslint-disable */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['auth_token']; // Extract the token from the cookie

    if (!accessToken) {
      throw new UnauthorizedException('No authentication token provided');
    }

    // Validate the token using AuthService
    const result = await this.authService.checkUserAuthentication(accessToken);
    if (!result.isAuthenticated) {
      throw new UnauthorizedException(result.reason || 'token expired');
    }

    // Optionally attach the user info to the request for use in controllers
    request['user'] = result.user;
    return true;
  }
}
