// backend/src/progress/progress.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin'; 

// Exportamos la interfaz para que el controlador la pueda usar
export interface UserProgress {
  level: number;
  points: number;
  unlockedAchievements: string[];
}

@Injectable()
export class ProgressService {
  private db = admin.firestore(); 
  private readonly PROGRESS_COLLECTION = 'progress'; 

  // constructor(private readonly usersService: UsersService) {}
  
  async getProgressByUserId(userId: string): Promise<UserProgress | null> {
    const doc = await this.db.collection(this.PROGRESS_COLLECTION).doc(userId).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as UserProgress;
  }
  
  async updateProgress(
    userId: string,
    level: number,
    points: number,
    achievements: string[],
  ): Promise<UserProgress> { // <-- Usando interfaz exportada
    const newProgress: UserProgress = {
      level,
      points,
      unlockedAchievements: achievements,
    };

    await this.db.collection(this.PROGRESS_COLLECTION).doc(userId).set(newProgress, { merge: true });
    
    console.log(`[DB] Progreso guardado para ${userId}: Nivel ${level}, Puntos ${points}`);
    
    return newProgress; 
  }

  async resetProgress(userId: string): Promise<{ message: string }> {
    const initialProgress: UserProgress = {
      level: 1,
      points: 150,
      unlockedAchievements: [],
    };

    await this.db.collection(this.PROGRESS_COLLECTION).doc(userId).set(initialProgress, { merge: true });

    console.log(`[DB] Reseteando progreso para el usuario: ${userId}`);
    return { message: 'Progreso reseteado exitosamente.' };
  }
  
  async submitAnswer(userId: string, submitAnswerDto: any): Promise<any> {
    console.log(`[DB] Registrando respuesta para ${userId}:`, submitAnswerDto);
    return { success: true, registered: submitAnswerDto };
  }
}