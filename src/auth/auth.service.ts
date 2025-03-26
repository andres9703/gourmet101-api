/* eslint-disable */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async loginAuth0User(code: string, codeVerifier: string) {
    const url = `${process.env.AUTH0_DOMAIN}/oauth/token`;

    const options = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET, // Optional for PKCE
      redirect_uri: process.env.REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
    };

    const response = await firstValueFrom(
      this.httpService
        .post(url, options, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          map((response) => {
            console.log(
              'Login response from the auth0 server ⚡⚡ <-----',
              response,
            );
            return response.data;
          }),
          catchError((error: AxiosError) => {
            console.log(error.response?.data, '🐞🐞 <-----');
            throw new HttpException(
              error.response?.data || 'AN ERROR OCCURRED <-------',
              error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );

    return {
      success: true,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const url = `${process.env.AUTH0_DOMAIN}/oauth/token`;
    const options = {
      grant_type: 'refresh_token',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: refreshToken,
    };

    const response = await firstValueFrom(
      this.httpService
        .post(url, options, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          map((response) => {
            console.log(
              'Refresh response from the auth0 server 💫💫 <-----',
              response,
            );
            return response.data;
          }),
          catchError((error: AxiosError) => {
            console.log(error.response?.data, '👿👿👿👿 <-----');
            throw new HttpException(
              error.response?.data || 'Failed to refresh token',
              error.response?.status || HttpStatus.UNAUTHORIZED,
            );
          }),
        ),
    );

    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token || refreshToken, // Use new refresh_token if provided (rotation)
    };
  }

  async checkUserAuthentication(accessToken: string) {
    if (!accessToken) {
      console.log('NO ACCESS TOKEN <-----');
      return {
        isAuthenticated: false,
        reason: 'No authentication token provided',
      };
    }

    const url = `${process.env.AUTH0_DOMAIN}/userinfo`;
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .pipe(
            map((res) => res.data),
            catchError(() => {
              throw new Error('Invalid token');
            }),
          ),
      );
      return { isAuthenticated: true, user: response, reason: 'token valid' };
    } catch (error) {
      return { isAuthenticated: false, reason: error.message };
    }
  }
}
