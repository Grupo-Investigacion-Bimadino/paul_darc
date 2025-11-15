import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Alumno', 'Docente')
  submitAnswer(@Req() req, @Body() submitAnswerDto: SubmitAnswerDto) {
    const userId = req.user.uid;
    return this.progressService.submitAnswer(userId, submitAnswerDto);
  }
}
