import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files for uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Socket yoki portni env dan olish
  const SOCKET_PATH = process.env.SOCKET_PATH || '/var/www/valesco-web/data/nodejs/0.sock';
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

  // Agar socket mavjud bo'lsa, socket orqali ishlatish
  if (fs.existsSync(SOCKET_PATH)) {
    await app.listen(SOCKET_PATH);
    console.log(`🚀 Backend listening on socket ${SOCKET_PATH}`);
  } else {
    // Aks holda TCP port orqali ishga tushirish
    await app.listen(PORT, '0.0.0.0');
    console.log(`🚀 Backend listening on port ${PORT}`);
  }
}
bootstrap();
