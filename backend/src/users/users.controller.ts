
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  findAll() {
    // This method should be implemented in the service
    // return this.usersService.findAll(); 
    return 'This action returns all users';
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  findOne(@Param('id') id: string) {
    // This method should be implemented in the service
    // return this.usersService.findOne(id);
    return `This action returns a #${id} user`;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // This method should be implemented in the service
    // return this.usersService.update(id, updateUserDto);
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    // This method should be implemented in the service
    // return this.usersService.remove(id);
    return `This action removes a #${id} user`;
  }
}
