/* eslint-disable */
import { UserType } from 'src/domain/enums/user-type.enum';
export interface GourmetUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: UserType;
  isProfileComplete: boolean;
  profilePicture: string;
}
