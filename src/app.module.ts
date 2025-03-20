import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';


@Module({
  imports: [AuthModule, HttpModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
