import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './question.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class QuestionsService {
  private readonly firestore: admin.firestore.Firestore;
  private readonly questionsCollection: admin.firestore.CollectionReference;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = this.firebaseAdmin.firestore();
    this.questionsCollection = this.firestore.collection('questions');
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newDocRef = await this.questionsCollection.add(createQuestionDto);
    const newDocSnapshot = await newDocRef.get();
    return { id: newDocSnapshot.id, ...newDocSnapshot.data() } as Question;
  }

  async findAll(): Promise<Question[]> {
    const snapshot = await this.questionsCollection.get();
    if (snapshot.empty) {
      return [];
    }
    const questions: Question[] = [];
    snapshot.forEach(doc => {
      questions.push({ id: doc.id, ...doc.data() } as Question);
    });
    return questions;
  }

  async findOne(id: string): Promise<Question> {
    const doc = await this.questionsCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as Question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const docRef = this.questionsCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    await docRef.update({ ...updateQuestionDto });
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as Question;
  }

  async remove(id: string): Promise<{ message: string }> {
    const docRef = this.questionsCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    await docRef.delete();
    return { message: `Question with ID ${id} has been deleted.` };
  }
}
