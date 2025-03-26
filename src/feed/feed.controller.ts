/* eslint-disable */
import { Controller, Get, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('feed')
@UseGuards(AuthGuard)
export class FeedController {
  constructor() {}

  @Get()
  async getFeed(@Req() req: Request) {
    const user = req['user']; // User info attached by the guard
    return { message: 'Welcome to the feed!', user };
  }
}
