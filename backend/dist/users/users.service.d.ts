import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseService } from '../firebase/firebase.service';
export declare class UsersService {
    private firebaseService;
    private firestore;
    constructor(firebaseService: FirebaseService);
    register(createUserDto: CreateUserDto): Promise<any>;
}
