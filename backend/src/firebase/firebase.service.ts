
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    if (!admin.apps.length) {
      const serviceAccount = this.configService.get<string>(
        'GOOGLE_APPLICATION_CREDENTIALS',
      );
      if (serviceAccount) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
        });
      }
    }
  }

  get getAdmin() {
    return admin;
  }
}
