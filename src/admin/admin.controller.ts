import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthGuard, Roles, RolesGuard } from '../auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
///
}