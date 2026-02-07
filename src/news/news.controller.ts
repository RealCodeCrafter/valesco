import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { News } from './entities/news.entity';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, Roles, RolesGuard } from 'src/auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'image', maxCount: 50 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: join(__dirname, '..', '..', 'uploads', 'news'),
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        limits: {
          fileSize: 500 * 1024 * 1024, // 500MB for videos
        },
      },
    ),
  )
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ): Promise<News> {
    const baseUrl = this.configService.get<string>('BASE_URL');
    const uploadedFiles: {
      img?: string;
      images?: string[];
      video?: string;
    } = {};

    if (files?.img && files.img.length > 0) {
      uploadedFiles.img = `${baseUrl}/uploads/news/${files.img[0].filename}`;
    }

    if (files?.image && files.image.length > 0) {
      uploadedFiles.images = files.image.map(
        (file) => `${baseUrl}/uploads/news/${file.filename}`,
      );
    }

    if (files?.video && files.video.length > 0) {
      uploadedFiles.video = `${baseUrl}/uploads/news/${files.video[0].filename}`;
    }

    return this.newsService.create(createNewsDto, uploadedFiles);
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
    if (id <= 0) {
      throw new BadRequestException(
        'Invalid news ID: ID must be a positive number',
      );
    }
    return this.newsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'image', maxCount: 50 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: join(__dirname, '..', '..', 'uploads', 'news'),
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        limits: {
          fileSize: 500 * 1024 * 1024, // 500MB for videos
        },
      },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles()
    files: {
      img?: Express.Multer.File[];
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ): Promise<News> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new BadRequestException(
        'Invalid news ID: ID must be a positive number',
      );
    }

    const baseUrl = this.configService.get<string>('BASE_URL');
    const uploadedFiles: {
      img?: string;
      images?: string[];
      video?: string;
    } = {};

    if (files?.img && files.img.length > 0) {
      uploadedFiles.img = `${baseUrl}/uploads/news/${files.img[0].filename}`;
    }

    if (files?.image && files.image.length > 0) {
      uploadedFiles.images = files.image.map(
        (file) => `${baseUrl}/uploads/news/${file.filename}`,
      );
    }

    if (files?.video && files.video.length > 0) {
      uploadedFiles.video = `${baseUrl}/uploads/news/${files.video[0].filename}`;
    }

    return this.newsService.update(parsedId, updateNewsDto, uploadedFiles);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  async remove(@Param('id') id: string): Promise<void> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new BadRequestException(
        'Invalid news ID: ID must be a positive number',
      );
    }
    return this.newsService.remove(parsedId);
  }
}
