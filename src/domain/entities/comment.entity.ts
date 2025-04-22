/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Experience } from './experience.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Experience, (experience) => experience.comments)
  experience: Experience;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
