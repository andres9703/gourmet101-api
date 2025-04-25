/* eslint-disable */

import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  code: string;

  @IsString()
  code_verifier: string;
}
