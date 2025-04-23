/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Business } from './business.entity';

@Entity('business_images')
export class BusinessImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Business, (business) => business.images, {
    onDelete: 'CASCADE',
  })
  business: Business;

  @Column('text')
  url: string;

  @Column()
  alt_text: string;

  @Column()
  is_primary: boolean;

  @CreateDateColumn()
  uploaded_at: Date;
}
