import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './question.interface';
import * as admin from 'firebase-admin';
export declare class QuestionsService {
    private readonly firebaseAdmin;
    private readonly firestore;
    private readonly questionsCollection;
    constructor(firebaseAdmin: admin.app.App);
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
