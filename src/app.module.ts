/* eslint-disable */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FeedModule } from './feed/feed.module';
import { AuthService } from './auth/auth.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { Business } from './domain/entities/business.entity';
import { Experience } from './domain/entities/experience.entity';
import { Reservation } from './domain/entities/reservation.entity';
import { BusinessImage } from './domain/entities/business-image.entity';
import { Product } from './domain/entities/product.entity';
import { Location } from './domain/entities/location.entity';
import { ProductImage } from './domain/entities/product-image.entity';
import { Comment } from './domain/entities/comment.entity';
import { Like } from './domain/entities/like.entity';
import { configLoader } from 'config/configuration';

console.log(process.env.DATABASE_URL, '<<---------');
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('database_url');
        console.log('DATABASE_URL:', dbUrl); // Debug log
        return {
          type: 'postgres',
          url: dbUrl,
          entities: [
            User,
            Business,
            Experience,
            Reservation,
            Comment,
            Like,
            BusinessImage,
            Product,
            Location,
            ProductImage,
          ],
          synchronize: true,
          ssl: { rejectUnauthorized: false },
          logging: true,
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    HttpModule,
    FeedModule,
    CloudinaryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
