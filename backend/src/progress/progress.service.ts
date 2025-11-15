import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { ActivitiesService } from '../activities/activities.service';
import * as admin from 'firebase-admin';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class ProgressService {
  private firestore: admin.firestore.Firestore;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
    private readonly activitiesService: ActivitiesService,
  ) {
    this.firestore = this.firebaseService.getAdmin.firestore();
  }

  async submitAnswer(userId: string, submitAnswerDto: SubmitAnswerDto): Promise<any> {
    const { activityId, userAnswer } = submitAnswerDto;

    const activity = await this.activitiesService.findOne(activityId);
    if (!activity) {
      throw new NotFoundException(`Actividad con ID ${activityId} no encontrada`);
    }

    const correctAnswer = activity.correctAnswer;

    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    const score = isCorrect ? activity.score || 10 : 0;

    const progress = {
      userId,
      activityId,
      userAnswer,
      isCorrect,
      score,
      submittedAt: new Date(),
    };

    const docRef = await this.firestore.collection('progress').add(progress);

    return { id: docRef.id, ...progress };
  }
}
