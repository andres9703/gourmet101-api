/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('text')
  url: string;

  @Column()
  alt_text: string;

  @Column()
  is_primary: boolean;

  @CreateDateColumn()
  uploaded_at: Date;
}
