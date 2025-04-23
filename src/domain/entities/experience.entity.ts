/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Business } from './business.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.experiences, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Business, (business) => business.experiences, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('smallint')
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.experience)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.experience)
  likes: Like[];
}
