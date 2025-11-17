// backend/src/progress/progress.controller.ts (Corregido)

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
// Importamos la interfaz UserProgress desde el Service
import { ProgressService, UserProgress } from './progress.service'; 
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

// DTO para tipar la actualización de progreso
class UpdateProgressDto {
  level: number;
  points: number;
  achievements: string[];
}

@Controller('progress')
@UseGuards(JwtAuthGuard, RolesGuard) 
@Roles('Alumno', 'Docente', 'Administrador') 
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('submit')
  @Roles('Alumno', 'Docente') 
  submitAnswer(@Req() req, @Body() submitAnswerDto: SubmitAnswerDto) {
    const userId = req.user.uid;
    return this.progressService.submitAnswer(userId, submitAnswerDto);
  }

  @Post()
  async updateProgress(@Req() req, @Body() updateProgressDto: UpdateProgressDto): Promise<UserProgress> { // <-- TIPADO CORREGIDO
    const userId = req.user.uid;
    return this.progressService.updateProgress(
      userId,
      updateProgressDto.level,
      updateProgressDto.points,
      updateProgressDto.achievements,
    );
  }

  @Post('reset') 
  async resetProgress(@Req() req): Promise<{ message: string }> {
    const userId = req.user.uid;
    await this.progressService.resetProgress(userId); 

    return { message: 'Progreso reseteado exitosamente.' };
  }
}