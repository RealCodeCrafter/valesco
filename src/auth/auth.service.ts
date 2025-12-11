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
      role: user.role || 'admin',
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

  async createSuperAdmin() {
    const superAdminUsername = process.env.SUPER_ADMIN_USERNAME || `superadmin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || this.generateStrongPassword();

    const existingSuperAdmin = await this.adminRepository.findOne({
      where: { role: 'super_admin' },
    });

    if (existingSuperAdmin) {
      console.log('Super admin allaqachon mavjud:', existingSuperAdmin.username);
      return {
        username: existingSuperAdmin.username,
        password: 'Mavjud super admin parolini ishlating',
        message: 'Super admin allaqachon mavjud',
      };
    }

    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    const superAdmin = this.adminRepository.create({
      username: superAdminUsername,
      password: hashedPassword,
      role: 'super_admin',
      sites: ['*'],
    });

    await this.adminRepository.save(superAdmin);

    console.log('\n========================================');
    console.log('SUPER ADMIN YARATILDI:');
    console.log('========================================');
    console.log('Username:', superAdminUsername);
    console.log('Password:', superAdminPassword);
    console.log('Role: super_admin');
    console.log('========================================\n');

    return {
      username: superAdminUsername,
      password: superAdminPassword,
      message: 'Super admin muvaffaqiyatli yaratildi',
    };
  }

  private generateStrongPassword(): string {
    const length = 20;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    const crypto = require('crypto');
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
      password += charset[randomBytes[i] % charset.length];
    }
    
    return password;
  }

  async createAdmin(username: string, password: string, sites: string[], currentUser: any) {
    if (currentUser.role !== 'super_admin') {
      throw new UnauthorizedException('Faqat super admin admin yarata oladi');
    }

    const existingAdmin = await this.adminRepository.findOne({
      where: { username },
    });

    if (existingAdmin) {
      throw new UnauthorizedException('Bu username allaqachon mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = this.adminRepository.create({
      username,
      password: hashedPassword,
      role: 'admin',
      sites: sites || [],
    });

    await this.adminRepository.save(admin);

    const { password: _omit, ...safeAdmin } = admin;
    return safeAdmin;
  }

  async getAllAdmins(currentUser: any) {
    if (currentUser.role !== 'super_admin') {
      throw new UnauthorizedException('Faqat super admin adminlarni ko\'ra oladi');
    }

    const admins = await this.adminRepository.find({
      select: ['id', 'username', 'role', 'sites'],
    });

    return admins;
  }

  async updateAdmin(id: number, updateData: { username?: string; password?: string; sites?: string[] }, currentUser: any) {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }

    if (currentUser.role === 'super_admin') {
      if (admin.role === 'super_admin' && currentUser.id !== admin.id) {
        throw new UnauthorizedException('Super adminni boshqa super admin yangilay olmaydi');
      }
    } else if (currentUser.role === 'admin') {
      if (currentUser.id !== admin.id) {
        throw new UnauthorizedException('Faqat o\'z ma\'lumotlaringizni yangilay olasiz');
      }
      if (updateData.sites) {
        throw new UnauthorizedException('Admin sites ni o\'zgartira olmaydi');
      }
    } else {
      throw new UnauthorizedException('Ruxsat yo\'q');
    }

    if (updateData.username) {
      const existingAdmin = await this.adminRepository.findOne({
        where: { username: updateData.username },
      });
      if (existingAdmin && existingAdmin.id !== id) {
        throw new UnauthorizedException('Bu username allaqachon mavjud');
      }
      admin.username = updateData.username;
    }

    if (updateData.password) {
      admin.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.sites && currentUser.role === 'super_admin') {
      admin.sites = updateData.sites;
    }

    await this.adminRepository.save(admin);

    const { password: _omit, ...safeAdmin } = admin;
    return safeAdmin;
  }

  async deleteAdmin(id: number, currentUser: any) {
    if (currentUser.role !== 'super_admin') {
      throw new UnauthorizedException('Faqat super admin adminlarni o\'chira oladi');
    }

    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }

    if (admin.role === 'super_admin') {
      throw new UnauthorizedException('Super adminni o\'chirib bo\'lmaydi');
    }

    await this.adminRepository.remove(admin);

    return { message: 'Admin muvaffaqiyatli o\'chirildi' };
  }
}