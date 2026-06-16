import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArticlesService } from '../articles/articles.service';

interface SitemapUrl {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

@Injectable()
export class SitemapService {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly configService: ConfigService,
  ) {}

  async generate(): Promise<string> {
    const siteUrl = this.configService
      .get<string>('SITE_URL', 'https://valescooil.com')
      .replace(/\/$/, '');

    const articles = await this.articlesService.findAllForSitemap();

    const staticPages: SitemapUrl[] = [
      { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
      { loc: `${siteUrl}/ru/blog`, changefreq: 'weekly', priority: '0.9' },
      { loc: `${siteUrl}/en/blog`, changefreq: 'weekly', priority: '0.9' },
      { loc: `${siteUrl}/products`, changefreq: 'weekly', priority: '0.8' },
      { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.7' },
      { loc: `${siteUrl}/contact`, changefreq: 'monthly', priority: '0.7' },
    ];

    const articlePages: SitemapUrl[] = articles.map((article) => ({
      loc: `${siteUrl}/${article.language}/blog/${article.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: article.createdAt
        ? new Date(article.createdAt).toISOString().split('T')[0]
        : undefined,
    }));

    const urls: SitemapUrl[] = [...staticPages, ...articlePages];

    const urlEntries = urls
      .map((url) => {
        const lastmod = url.lastmod
          ? `\n    <lastmod>${url.lastmod}</lastmod>`
          : '';
        return `  <url>
    <loc>${url.loc}</loc>${lastmod}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  }
}
