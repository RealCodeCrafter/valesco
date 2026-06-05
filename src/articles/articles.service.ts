import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { published: true },
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'title',
        'slug',
        'description',
        'image',
        'metaTitle',
        'metaDescription',
        'createdAt',
      ],
    });
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { slug, published: true },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
}
