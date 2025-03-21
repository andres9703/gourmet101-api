/* eslint-disable */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import * as qs from 'qs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async loginAuth0User(code: string, codeVerifier: string) {
    const url = `${process.env.AUTH0_DOMAIN}/oauth/token`;
    console.log(code, '🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴');
    console.log(codeVerifier, '🐴🐴🐴🐴 Code Verifier');

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
            console.log(response.data, 'DATA INSIDE THE MAP <-----👍👍');
            return response.data;
          }),
          catchError((error: AxiosError) => {
            console.log(error.response?.data, '👿👿👿👿 <-----');
            throw new HttpException(
              error.response?.data || 'AN ERROR OCCURRED <-------',
              error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );

    console.log(
      response,
      'THIS IS THE DATA COMING FROM AUTH0 SERVER <-------👍👍',
    );
    return { success: true, access_token: response.access_token }; // Return access_token
  }

  async checkUserAuthentication(accessToken: string) {
    if (!accessToken) {
      console.log('NO ACCESS TOKEN <-----');
      return { isAuthenticated: false };
    }
    console.log('continuoooooo <-------');
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
      return { isAuthenticated: true, user: response };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }
}
