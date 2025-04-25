/* eslint-disable */

import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsUrl,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserType } from 'src/domain/enums';
import { Transform } from 'class-transformer';

export class CreateGourmetUserDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(10)
  phone: string;

  @IsEnum(UserType)
  userType: UserType;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isProfileComplete: boolean;

  @IsUrl()
  @IsOptional()
  profilePicture?: string;
}

export class UpdateGourmetUserDto extends PartialType(CreateGourmetUserDto) {}
