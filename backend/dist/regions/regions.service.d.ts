import { FirebaseService } from '../firebase/firebase.service';
import { Region } from './region.interface';
export declare class RegionsService {
    private firebaseService;
    private firestore;
    constructor(firebaseService: FirebaseService);
    findAll(): Promise<Region[]>;
    findOne(id: string): Promise<Region>;
}
