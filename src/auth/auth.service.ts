
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}

    async loginAuth0User(code: string, res) {
     const url = `${process.env.AUTH0_DOMAIN}/oauth/token`;
        console.log(code, "🐴🐴🐴🐴🐴🐴🐴🐴🐴🐴")
     const options = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: process.env.GRANT_TYPE
     }

    //  const options = {
    //     headers: {'content-type': 'application/x-www-form-urlencoded'},
    //     data: new URLSearchParams({
    //       grant_type: 'authorization_code',
    //       client_id: process.env.CLIENT_ID!,
    //       client_secret: process.env.CLIENT_SECRET!,
    //       code: code,
    //       redirect_uri: process.env.REDIRECT_URI!
    //     })
    //   }

    // Use RxJS `firstValueFrom` to convert the observable to a promise
    const { data } = await firstValueFrom(
      this.httpService.post(url, options).pipe(
        catchError((error: AxiosError) => {
          // Handle Axios errors
          console.log(error, "👿👿👿👿 <-----")
          throw new HttpException(
            error.response?.data || 'AN ERROR OCCURRED <-------',
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
    console.log(data, "THIS IS THE DATA COMING FROM AUTH0 SERVER <-------");
    res.cookie('auth0_token', data.access_token, { httpOnly: true, secure: true, sameSite: 'lax' });
    return { success: true };
    }


    async checkUserAuthentication() {
        return {isAuthenticated: true};
    }
}
