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

  async findAll(lang = 'ru'): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { published: true, language: lang },
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'title',
        'slug',
        'language',
        'description',
        'image',
        'metaTitle',
        'metaDescription',
        'createdAt',
      ],
    });
  }

  async findAllForSitemap(): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { published: true },
      order: { createdAt: 'DESC' },
      select: ['slug', 'language', 'createdAt'],
    });
  }

  async findBySlug(slug: string, lang = 'ru'): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { slug, language: lang, published: true },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
}
