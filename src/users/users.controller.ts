// src/users/users.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // CORRECCIÓN: Se quitó el signo '+' delante de 'id'
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // CORRECCIÓN: Se quitó el signo '+' delante de 'id'
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // CORRECCIÓN: Se quitó el signo '+' delante de 'id'
    return this.usersService.remove(id);
  }

  // Si implementaste los métodos para añadir logros o respuestas, irían aquí.
  // Por ejemplo:
  /*
  @Post(':userId/achievements/:achievementId')
  addAchievement(
    @Param('userId') userId: string,
    @Param('achievementId') achievementId: string,
  ) {
    return this.usersService.addAchievement(userId, achievementId);
  }
  */
}