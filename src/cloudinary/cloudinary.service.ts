/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse } from './interfaces/cloudinary-response.interface';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  async uploadImageToCloudinary(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    return new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
