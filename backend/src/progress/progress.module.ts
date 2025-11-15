import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  imports: [FirebaseModule, ActivitiesModule],
  controllers: [ProgressController],
  providers: [ProgressService]
})
export class ProgressModule {}
