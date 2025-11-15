
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  private firestore: admin.firestore.Firestore;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {
    this.firestore = this.firebaseService.getAdmin.firestore();
  }

  async create(createActivityDto: CreateActivityDto): Promise<any> {
    const newActivity = {
      ...createActivityDto,
      createdAt: new Date(),
    };
    const docRef = await this.firestore.collection('activities').add(newActivity);
    return { id: docRef.id, ...newActivity };
  }

  async findAll(): Promise<any[]> {
    const activitiesSnapshot = await this.firestore.collection('activities').get();
    return activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string): Promise<any> {
    const activityDoc = await this.firestore.collection('activities').doc(id).get();
    if (!activityDoc.exists) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    return { id: activityDoc.id, ...activityDoc.data() };
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<any> {
    const activityRef = this.firestore.collection('activities').doc(id);
    await activityRef.update({ ...updateActivityDto });
    return { id, ...updateActivityDto };
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.firestore.collection('activities').doc(id).delete();
    return { message: `Actividad con ID ${id} eliminada.` };
  }
}
