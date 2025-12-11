import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Admin } from './entities/admin.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SecretKey123!@#VeryLongAndRandom',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, AdminController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    await this.authService.createSuperAdmin();
  }
}