import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Article> {
    return this.articlesService.findBySlug(slug);
  }
}
