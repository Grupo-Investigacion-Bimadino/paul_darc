// backend/src/users/users.controller.ts

import { Controller, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService, AdminUser } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Proteger todo el módulo de usuarios
@Roles('Administrador') // Solo los administradores pueden gestionar usuarios
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  findAll(): Promise<AdminUser[]> {
    return this.usersService.findAll();
  }

  @Patch(':id/role')
  updateRole(@Param('id') uid: string, @Body('role') role: string): Promise<AdminUser> {
    // Nota: Aquí solo actualizamos el rol. El DTO UpdateUserDto puede ser más grande.
    // Usamos 'role' directamente del body para simplificar la llamada.
    return this.usersService.updateRole(uid, role);
  }

  @Delete(':id')
  remove(@Param('id') uid: string): Promise<{ message: string }> {
    return this.usersService.remove(uid);
  }
}
