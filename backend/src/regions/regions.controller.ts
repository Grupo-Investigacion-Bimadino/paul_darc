import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  create(@Body() createRegionDto: CreateRegionDto) {
    // return this.regionsService.create(createRegionDto);
    return 'This action adds a new region';
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    // return this.regionsService.update(id, updateRegionDto);
    return `This action updates a #${id} region`;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    // return this.regionsService.remove(id);
    return `This action removes a #${id} region`;
  }
}
