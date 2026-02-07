import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

dotenv.config();

// Video fayl formatiga qarab MIME type aniqlash
function getVideoMimeType(filePath: string): string {
  const ext = filePath.toLowerCase().split('.').pop();
  const mimeTypes: { [key: string]: string } = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    mkv: 'video/x-matroska',
  };
  return mimeTypes[ext || ''] || 'video/mp4';
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
    setHeaders: (res, path) => {
      // Video fayllar uchun to'g'ri Content-Type
      if (path.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i)) {
        res.setHeader('Content-Type', getVideoMimeType(path));
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Disposition', 'inline'); // inline - ko'rsatish, attachment - yuklab olish
      }
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000;

   
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
