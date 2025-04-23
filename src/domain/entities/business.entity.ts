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
import { Location } from './location.entity';
import { BusinessImage } from './business-image.entity';
import { Product } from './product.entity';
import { Experience } from './experience.entity';
import { Reservation } from './reservation.entity';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.businesses, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Location, (location) => location.businesses)
  location: Location;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => BusinessImage, (image) => image.business)
  images: BusinessImage[];

  @OneToMany(() => Product, (product) => product.business)
  products: Product[];

  @OneToMany(() => Experience, (experience) => experience.business)
  experiences: Experience[];

  @OneToMany(() => Reservation, (reservation) => reservation.business)
  reservations: Reservation[];
}
