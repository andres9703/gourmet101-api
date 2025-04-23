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

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Experience, (experience) => experience.comments, {
    onDelete: 'CASCADE',
  })
  experience: Experience;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
