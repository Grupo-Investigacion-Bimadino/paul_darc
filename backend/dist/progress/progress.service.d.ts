import { FirebaseService } from '../firebase/firebase.service';
import { ActivitiesService } from '../activities/activities.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class ProgressService {
    private firebaseService;
    private readonly activitiesService;
    private firestore;
    constructor(firebaseService: FirebaseService, activitiesService: ActivitiesService);
    submitAnswer(userId: string, submitAnswerDto: SubmitAnswerDto): Promise<any>;
}
