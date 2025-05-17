import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { RegionsModule } from './regions/regions.module';
import { ProgressModule } from './progress/progress.module';
import { AlertsModule } from './alerts/alerts.module';
import { AchievementsModule } from './achievements/achievements.module';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [UsersModule, QuestionsModule, RegionsModule, ProgressModule, AlertsModule, AchievementsModule, AvatarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
