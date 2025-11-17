// backend/src/regions/regions.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  /**
   * Endpoint de Lectura (público, usado por GameContext.tsx)
   * Nota: Este endpoint debe estar abierto (o protegido solo por JwtAuthGuard)
   * ya que es usado por el frontend para cargar los datos iniciales.
   */
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  /**
   * Endpoints de Administración (Protegidos)
   * Solo los administradores pueden crear, actualizar o eliminar regiones.
   */

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador') // Solo Admins pueden crear regiones
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador') // Solo Admins pueden editar regiones
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador') // Solo Admins pueden eliminar regiones
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}