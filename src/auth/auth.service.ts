import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  private async findUserWithPasswordByUsername(
    username: string,
  ): Promise<Admin | null> {
    const qb = this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.username = :username', { username })
      .addSelect('admin.password');

    return qb.getOne();
  }

  private looksHashed(password: string): boolean {
    if (typeof password !== 'string') return false;
    return password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$') || password.startsWith('$argon2');
  }

  async login(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;

    const user = await this.findUserWithPasswordByUsername(username);
    if (!user) {
      throw new NotFoundException('Admin not found');
    }

    if (!user.password) {
      throw new UnauthorizedException('Admin has no password set');
    }

    let isValid = false;
    if (this.looksHashed(user.password)) {
      isValid = await bcrypt.compare(password, user.password);
    } else {
      isValid = user.password === password;
    }

    if (!isValid) {
      throw new UnauthorizedException('Parol noto‘g‘ri');
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: 'admin',
      sites: user.sites,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const { password: _omit, ...safeUser } = user;

    return {
      accessToken,
      user: { ...safeUser, role: payload.role, sites: payload.sites },
    };
  }

  async logout(userId: number) {
    return { message: `Admin ${userId} logged out successfully` };
  }
}