/* eslint-disable */
import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FeedService],
  controllers: [FeedController],
  imports: [AuthModule],
})
export class FeedModule {}
