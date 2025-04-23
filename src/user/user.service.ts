/* eslint-disable */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import type { UserEntityMapped } from 'src/domain/types/user-entity-mapped.type';
import { GourmetUser } from 'src/domain/interfaces/gourmet-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const userResponse = await this.userRepository.findOne({
        where: { userId: id },
      });
      if (!userResponse) return { user: null, subSubmitted: id };
      const { createdAt, updatedAt, ...user } = userResponse;
      return { user: user as UserEntityMapped, subSubmitted: id };
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(sub: string) {
    try {
      const userCreated = await this.userRepository.create({
        userId: sub,
      });
      const userCreationSuccess = await this.userRepository.save(userCreated);
      const { createdAt, updatedAt, ...user } = userCreationSuccess;
      return user as UserEntityMapped;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, body: GourmetUser) {
    try {
      await this.userRepository.update(id, body);

      const updatedUser = await this.userRepository.findOne({ where: { id } });

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        updatedAt: updatedUser.updatedAt,
        id: updatedUser.id,
      };
    } catch (error) {
      // Better error handling with proper HTTP exceptions
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to update user: ${error.message}`,
      );
    }
  }
}
