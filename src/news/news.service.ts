import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(
    createNewsDto: CreateNewsDto,
    uploadedFiles?: { img?: string; images?: string[]; video?: string },
  ): Promise<News> {
    const news = new News();
    news.title = createNewsDto.title;
    news.description = createNewsDto.description || '';
    news.date = createNewsDto.date;
    news.img = uploadedFiles?.img || createNewsDto.img || null;
    news.image = uploadedFiles?.images || createNewsDto.image || [];
    news.fullContent = createNewsDto.fullContent || '';
    news.video = uploadedFiles?.video || createNewsDto.video || null;

    return this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
    });
    if (!news) {
      throw new NotFoundException('News not found');
    }
    return news;
  }

  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    uploadedFiles?: { img?: string; images?: string[]; video?: string },
  ): Promise<News> {
    return await this.newsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const news = await this.findOne(id);

        // Delete old files if new ones are being uploaded
        if (uploadedFiles?.img && news.img) {
          this.deleteFile(news.img, 'news');
        }
        if (uploadedFiles?.video && news.video) {
          this.deleteFile(news.video, 'news');
        }

        // Update fields
        if (updateNewsDto.title) news.title = updateNewsDto.title;
        if (updateNewsDto.description !== undefined)
          news.description = updateNewsDto.description || '';
        if (updateNewsDto.date) news.date = updateNewsDto.date;
        if (updateNewsDto.fullContent !== undefined)
          news.fullContent = updateNewsDto.fullContent || '';

        // Handle image uploads
        if (uploadedFiles?.img) {
          news.img = uploadedFiles.img;
        } else if (updateNewsDto.img !== undefined) {
          if (updateNewsDto.img && news.img && updateNewsDto.img !== news.img) {
            this.deleteFile(news.img, 'news');
          }
          news.img = updateNewsDto.img ? updateNewsDto.img : null;
        }

        // Handle image array
        if (uploadedFiles?.images && uploadedFiles.images.length > 0) {
          news.image = [...(news.image || []), ...uploadedFiles.images];
        } else if (updateNewsDto.image !== undefined) {
          // Delete old images that are not in the new array
          const oldImages = news.image || [];
          const newImages = updateNewsDto.image || [];
          const imagesToDelete = oldImages.filter(
            (img) => !newImages.includes(img),
          );
          imagesToDelete.forEach((img) => this.deleteFile(img, 'news'));
          news.image = newImages;
        }

        // Handle video upload
        if (uploadedFiles?.video) {
          news.video = uploadedFiles.video;
        } else if (updateNewsDto.video !== undefined) {
          if (
            updateNewsDto.video &&
            news.video &&
            updateNewsDto.video !== news.video
          ) {
            this.deleteFile(news.video, 'news');
          }
          news.video = updateNewsDto.video ? updateNewsDto.video : null;
        }

        return transactionalEntityManager.save(News, news);
      },
    );
  }

  async remove(id: number): Promise<void> {
    return await this.newsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const news = await this.findOne(id);

        // Delete all files
        if (news.img) {
          this.deleteFile(news.img, 'news');
        }
        if (news.video) {
          this.deleteFile(news.video, 'news');
        }
        if (news.image && news.image.length > 0) {
          news.image.forEach((img) => this.deleteFile(img, 'news'));
        }

        await transactionalEntityManager.remove(News, news);
      },
    );
  }

  private deleteFile(fileUrl: string, folder: string): void {
    try {
      const fileName = fileUrl.split('/').pop() ?? '';
      if (!fileName) return;

      const filePath = join(__dirname, '..', '..', 'uploads', folder, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      // Silently fail if file doesn't exist or can't be deleted
      console.error(`Error deleting file ${fileUrl}:`, error);
    }
  }
}
