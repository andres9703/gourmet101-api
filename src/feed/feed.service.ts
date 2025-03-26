/* eslint-disable */
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  async getFeed() {
    return 'This action returns all feed items with token validation';
  }
}
