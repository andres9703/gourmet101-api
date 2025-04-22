/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserType } from '../enums/user-type.enum';
import { Business } from './business.entity';
import { Experience } from './experience.entity';
import { Reservation } from './reservation.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ name: 'first_name', length: 100, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: true })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserType,
    name: 'user_type',
    default: UserType.NORMAL,
  })
  userType: UserType;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'is_profile_complete', default: false })
  isProfileComplete: boolean;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Business, (business) => business.user)
  businesses: Business[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
