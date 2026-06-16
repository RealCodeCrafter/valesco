import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query('lang') lang = 'ru'): Promise<Article[]> {
    return this.articlesService.findAll(lang);
  }

  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang = 'ru',
  ): Promise<Article> {
    return this.articlesService.findBySlug(slug, lang);
  }
}
