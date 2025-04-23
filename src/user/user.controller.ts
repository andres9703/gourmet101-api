/* eslint-disable */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GourmetUser } from 'src/domain/interfaces/gourmet-user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return await this.userService.findOne(id);
  }

  // @Get(':id/:postId')
  // async findOnePost(@Param('id') id: string, @Param('postId') postId: string) {
  //   return { value: 'this is working with id' + id + 'and' + postId };
  // }

  @Post()
  async create(@Body() body: { sub: string }) {
    return this.userService.create(body.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: GourmetUser) {
    return this.userService.update(id, body);
  }
}
