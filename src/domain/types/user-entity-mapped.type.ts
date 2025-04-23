/* eslint-disable */
import { User } from '../entities/user.entity';

export type UserEntityMapped = Omit<User, 'createdAt' | 'updatedAt'>;
