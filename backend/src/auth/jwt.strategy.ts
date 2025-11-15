import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const decodedToken = await this.firebaseService.getAdmin.auth().verifyIdToken(token);
      const user = await this.firebaseService.getAdmin.auth().getUser(decodedToken.uid);
      // Aquí puedes enriquecer el objeto 'user' con datos de tu base de datos si es necesario
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
