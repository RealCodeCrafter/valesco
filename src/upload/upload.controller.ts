import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {
    // uploads/files papkasini yaratish
    const uploadsDir = join(__dirname, '..', '..', 'uploads', 'files');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadsDir = join(__dirname, '..', '..', 'uploads', 'files');
          if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true });
          }
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File yuborilmadi');
    }

    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:10000';
    const fileUrl = `${baseUrl}/uploads/files/${file.filename}`;

    return {
      success: true,
      message: 'File muvaffaqiyatli yuklandi',
      url: fileUrl,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}

