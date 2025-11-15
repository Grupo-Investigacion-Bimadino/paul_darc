import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const serviceAccountString = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_KEY');
    if (!serviceAccountString) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found.');
    }

    try {
      const serviceAccount = JSON.parse(serviceAccountString);

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
        });
      }
      return admin;
    } catch (error) {
      throw new Error(`Failed to initialize Firebase Admin: ${error.message}`);
    }
  },
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [FirebaseService, firebaseAdminProvider],
  exports: [FirebaseService, firebaseAdminProvider],
})
export class FirebaseModule {}
