/* eslint-disable */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../domain/entities/user.entity';
import { Location } from '../domain/entities/location.entity';
import { Business } from '../domain/entities/business.entity';
import { BusinessImage } from '../domain/entities/business-image.entity';
import { Product } from '../domain/entities/product.entity';
import { ProductImage } from '../domain/entities/product-image.entity';
import { Experience } from '../domain/entities/experience.entity';
import { Reservation } from '../domain/entities/reservation.entity';
import { Comment } from '../domain/entities/comment.entity';
import { Like } from '../domain/entities/like.entity';

dotenv.config();

const dbUri = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUri, // or hardcode your connection string
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  logging: true,
  entities: [
    User,
    Location,
    Business,
    BusinessImage,
    Product,
    ProductImage,
    Experience,
    Reservation,
    Comment,
    Like,
  ],
});
