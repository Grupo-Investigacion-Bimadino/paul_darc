// backend/src/auth/auth.controller.ts

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Importa el guard estándar de Passport
import { AuthService } from './auth.service';

// Importa el DTO si existe para tipar la respuesta
// import { UserProfileDto } from '../users/dto/user-profile.dto'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint protegido para obtener el perfil del usuario actual.
   * La validación del token de Firebase (Bearer Token) ocurre en el JwtStrategy.
   */
  @UseGuards(AuthGuard('jwt')) // Usa el guard que valida el JWT
  @Get('profile')
  async getProfile(@Req() req): Promise<any> {
    // Cuando el token es validado por la JwtStrategy, el payload del token 
    // (que contiene el UID de Firebase) se adjunta a req.user.
    const firebaseUserUid = req.user.uid; 
    
    // Llama al servicio para obtener los datos completos del usuario 
    // (incluyendo nivel, puntos y logros) desde la base de datos.
    return this.authService.getUserProfile(firebaseUserUid); 
  }

  // Nota: Los endpoints para login/register/guest-login se omiten aquí,
  // ya que la lógica de Firebase ya los maneja, y el backend solo necesita
  // validar el token (en la estrategia) y servir el perfil (aquí).
}