/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Experience } from './experience.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Experience, (experience) => experience.likes, {
    onDelete: 'CASCADE',
  })
  experience: Experience;

  @CreateDateColumn()
  created_at: Date;
}
