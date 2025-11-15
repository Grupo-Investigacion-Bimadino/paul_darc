
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private firestore: admin.firestore.Firestore;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {
    this.firestore = this.firebaseService.getAdmin.firestore();
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, nombre, apellidos } = createUserDto;

    try {
      // CU-1: Crear usuario en Firebase Authentication
      const userRecord = await this.firebaseService.getAdmin.auth().createUser({
        email,
        password,
        displayName: `${nombre} ${apellidos}`,
      });

      // Guardar perfil en Firestore
      const userProfile = {
        nombre,
        apellidos,
        email,
        fechaRegistro: new Date(),
        rol: 'Usuario',
      };

      await this.firestore.collection('users').doc(userRecord.uid).set(userProfile);

      return { uid: userRecord.uid, ...userProfile };

    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  // ... mantén los otros métodos del servicio aquí, adaptándolos a Firestore si es necesario
}
