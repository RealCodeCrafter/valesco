import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    // Bu yerda SQL fayllarni avtomatik ishga tushiramiz
    await this.runSqlFile('create_articles_table.sql');
    await this.runSqlFile('seed_articles.sql');
  }

  private async runSqlFile(fileName: string) {
    try {
      const filePath = path.join(process.cwd(), fileName);

      if (!fs.existsSync(filePath)) {
        this.logger.warn(`SQL fayl topilmadi: ${filePath}`);
        return;
      }

      const sql = fs.readFileSync(filePath, 'utf8');
      const statements = sql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith('--'));

      for (const stmt of statements) {
        await this.dataSource.query(stmt);
      }

      this.logger.log(`SQL fayl bajarildi: ${fileName}`);
    } catch (error) {
      this.logger.error(`SQL faylni bajarishda xatolik: ${fileName}`, error);
    }
  }
}

