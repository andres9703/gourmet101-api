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
import { UpdateGourmetUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
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

  async update(
    id: string,
    dto: UpdateGourmetUserDto,
    file?: Express.Multer.File,
  ) {
    try {
      console.log({ id, dto, file }, 'SEEING THE DATA');
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`User ${id} not found`);

      if (file) {
        const { secure_url } =
          await this.cloudinaryService.uploadImageToCloudinary(file);
        user.profilePicture = secure_url;
      }

      Object.assign(user, dto);
      const updated = await this.userRepository.save(user);

      const { createdAt, updatedAt, ...userUpdated } = updated;

      return userUpdated;
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
