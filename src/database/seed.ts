/* eslint-disable */
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
import { UserType, ReservationStatus } from '../domain/enums';

import { AppDataSource } from './data-source';

const seed = async () => {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const locationRepo = AppDataSource.getRepository(Location);
  const businessRepo = AppDataSource.getRepository(Business);
  const businessImageRepo = AppDataSource.getRepository(BusinessImage);
  const productRepo = AppDataSource.getRepository(Product);
  const productImageRepo = AppDataSource.getRepository(ProductImage);
  const experienceRepo = AppDataSource.getRepository(Experience);
  const reservationRepo = AppDataSource.getRepository(Reservation);
  const commentRepo = AppDataSource.getRepository(Comment);
  const likeRepo = AppDataSource.getRepository(Like);

  // Seed Users
  const users = await userRepo.save([
    {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userType: UserType.NORMAL,
      userId: 'google-oauth2|113388030541366420900',
      isProfileComplete: true,
      profilePicture: 'https://picsum.photos/200/300',
      phone: '1234567890',
    },
    {
      email: 'carmen@example.com',
      firstName: 'Carmen',
      lastName: 'Doe',
      userType: UserType.BUSINESS,
      userId: 'google-oauth2|113388030541366420200',
      isProfileComplete: false,
      profilePicture: 'https://picsum.photos/200/300',
      phone: '1234567980',
    },
  ]);

  // Seed Locations
  const locations = await locationRepo.save([
    {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postal_code: '10001',
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      address: '456 Park Ave',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postal_code: '60601',
      latitude: 41.8781,
      longitude: -87.6298,
    },
  ]);

  // Seed Businesses
  const businesses = await businessRepo.save([
    {
      user: users[1],
      name: 'Alice’s Café',
      description: 'Cozy coffee shop',
      location: locations[0],
    },
    {
      user: users[0],
      name: 'Bob’s Bakery',
      description: 'Fresh baked goods',
      location: locations[1],
    },
  ]);

  // Seed Business Images
  await businessImageRepo.save([
    {
      business: businesses[0],
      url: 'https://picsum.photos/200/300',
      alt_text: 'Café exterior',
      is_primary: true,
    },
    {
      business: businesses[1],
      url: 'https://picsum.photos/200/300',
      alt_text: 'Bakery interior',
      is_primary: true,
    },
  ]);

  // Seed Products (1 per business)
  const products = await productRepo.save([
    {
      business: businesses[0],
      name: 'Cappuccino',
      description: 'Freshly brewed cappuccino',
      price: 3.99,
    },
    {
      business: businesses[1],
      name: 'Bagel',
      description: 'Freshly baked bagel',
      price: 2.99,
    },
  ]);

  // Seed Product Images
  await productImageRepo.save([
    {
      product: products[0],
      url: 'https://picsum.photos/200/300',
      alt_text: 'Cappuccino cup',
      is_primary: true,
    },
    {
      product: products[1],
      url: 'https://picsum.photos/200/300',
      alt_text: 'Bagel',
      is_primary: true,
    },
  ]);

  // Seed Experiences (1 per user-business pair)
  const experiences = await experienceRepo.save([
    {
      user: users[0],
      business: businesses[0],
      title: 'Great ambiance!',
      description: 'Loved the coffee and the vibe.',
      rating: 5,
    },
    {
      user: users[0],
      business: businesses[1],
      title: 'Fresh and warm!',
      description: 'Loved the bagels.',
      rating: 4,
    },
    {
      user: users[1],
      business: businesses[0],
      title: 'Nice place!',
      description: 'Chill and cozy.',
      rating: 5,
    },
    {
      user: users[1],
      business: businesses[1],
      title: 'Tasty bakery!',
      description: 'Great service and fresh food.',
      rating: 4,
    },
  ]);

  // Seed Reservations (1 per user-business-product)
  await reservationRepo.save([
    {
      user: users[0],
      business: businesses[0],
      product: products[0],
      startTime: new Date(),
      endTime: new Date(),
      numGuests: 2,
      status: ReservationStatus.COMPLETED,
    },
    {
      user: users[0],
      business: businesses[1],
      product: products[1],
      startTime: new Date(),
      endTime: new Date(),
      numGuests: 1,
      status: ReservationStatus.COMPLETED,
    },
    {
      user: users[1],
      business: businesses[0],
      product: products[0],
      startTime: new Date(),
      endTime: new Date(),
      numGuests: 3,
      status: ReservationStatus.COMPLETED,
    },
  ]);

  // Seed Comments (1 per experience)
  await commentRepo.save([
    {
      user: users[0],
      experience: experiences[0],
      content: 'Absolutely loved it!',
    },
    {
      user: users[0],
      experience: experiences[1],
      content: 'Very tasty and fresh!',
    },
    {
      user: users[1],
      experience: experiences[2],
      content: 'Loved the chill vibe.',
    },
    {
      user: users[1],
      experience: experiences[3],
      content: 'Excellent bakery!',
    },
  ]);

  // Seed Likes (both users like all experiences)
  const likes = [
    likeRepo.create({ user: users[0], experience: experiences[0] }),
    likeRepo.create({ user: users[0], experience: experiences[1] }),
    likeRepo.create({ user: users[0], experience: experiences[2] }),
    likeRepo.create({ user: users[0], experience: experiences[3] }),
    likeRepo.create({ user: users[1], experience: experiences[0] }),
    likeRepo.create({ user: users[1], experience: experiences[1] }),
    likeRepo.create({ user: users[1], experience: experiences[2] }),
    likeRepo.create({ user: users[1], experience: experiences[3] }),
  ];

  await likeRepo.save(likes);

  console.log('✅ Database seeded!');
  process.exit();
};

seed();
