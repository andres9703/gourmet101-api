/* eslint-disable */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FeedModule } from './feed/feed.module';
import configuration from 'config/configuration';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    FeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
