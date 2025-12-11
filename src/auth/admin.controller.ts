import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Roles, RolesGuard } from './auth.guard';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Roles('super_admin')
  async createAdmin(
    @Body() createAdminDto: { username: string; password: string; sites?: string[] },
    @Req() req: any,
  ) {
    return this.authService.createAdmin(
      createAdminDto.username,
      createAdminDto.password,
      createAdminDto.sites || [],
      req.user,
    );
  }

  @Get()
  @Roles('super_admin')
  async getAllAdmins(@Req() req: any) {
    return this.authService.getAllAdmins(req.user);
  }

  @Put(':id')
  @Roles('super_admin', 'admin')
  async updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: { username?: string; password?: string; sites?: string[] },
    @Req() req: any,
  ) {
    return this.authService.updateAdmin(id, updateAdminDto, req.user);
  }

  @Delete(':id')
  @Roles('super_admin')
  async deleteAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.authService.deleteAdmin(id, req.user);
  }
}

