import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Importar
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { Achievement, AchievementSchema } from './schemas/achievement.schema'; // 2. Importar Modelo y Schema

@Module({
  imports: [
    // 3. Registrar el modelo
    MongooseModule.forFeature([{ name: Achievement.name, schema: AchievementSchema }]),
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}