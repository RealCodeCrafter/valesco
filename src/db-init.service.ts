import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.runSqlFile('create_articles_table.sql');
    await this.runSqlFile('alter_articles_add_language.sql');
    await this.runSqlFile('seed_articles.sql');
    await this.runSqlFile('seed_articles_en.sql');
  }

  private splitSqlStatements(sql: string): string[] {
    const statements: string[] = [];
    let current = '';
    let inSingleQuote = false;
    let dollarTag: string | null = null;

    for (let i = 0; i < sql.length; i++) {
      const char = sql[i];

      if (!inSingleQuote && char === '$') {
        const rest = sql.slice(i);
        const match = rest.match(/^\$([a-zA-Z_][a-zA-Z0-9_]*)?\$/);
        if (match) {
          const tag = match[1] ?? '';
          if (dollarTag === null) {
            dollarTag = tag;
          } else if (dollarTag === tag) {
            dollarTag = null;
          }
          current += match[0];
          i += match[0].length - 1;
          continue;
        }
      }

      if (dollarTag !== null) {
        current += char;
        continue;
      }

      if (char === "'") {
        if (inSingleQuote && sql[i + 1] === "'") {
          current += "''";
          i++;
          continue;
        }
        inSingleQuote = !inSingleQuote;
        current += char;
        continue;
      }

      if (char === ';' && !inSingleQuote && dollarTag === null) {
        const trimmed = current.trim();
        if (trimmed) statements.push(trimmed);
        current = '';
        continue;
      }

      current += char;
    }

    const trimmed = current.trim();
    if (trimmed) statements.push(trimmed);
    return statements;
  }

  private async runSqlFile(fileName: string) {
    try {
      const filePath = path.join(process.cwd(), fileName);

      if (!fs.existsSync(filePath)) {
        this.logger.warn(`SQL fayl topilmadi: ${filePath}`);
        return;
      }

      const rawSql = fs.readFileSync(filePath, 'utf8');

      const sql = rawSql
        .split(/\r?\n/g)
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n');

      const statements = this.splitSqlStatements(sql);

      for (const stmt of statements) {
        await this.dataSource.query(stmt);
      }

      this.logger.log(`SQL fayl bajarildi: ${fileName}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SQL faylni bajarishda xatolik: ${fileName}. ${message}`);
    }
  }
}
