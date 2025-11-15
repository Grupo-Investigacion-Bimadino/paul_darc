import { Strategy } from 'passport-firebase-jwt';
import { FirebaseService } from '../firebase/firebase.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    validate(token: string): Promise<import("firebase-admin/auth").UserRecord>;
}
export {};
