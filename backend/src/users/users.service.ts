// backend/src/users/users.service.ts (Corregido)

import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin'; 
import { UpdateUserDto } from './dto/update-user.dto';

// Interfaz para la respuesta del usuario combinada
export interface AdminUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role: string;
    // La propiedad isAnonymous es booleana en el frontend, aquí la mantenemos como bool para consistencia
    isAnonymous: boolean; 
    createdAt: Date | null;
    lastSignInTime: Date | null;
}

@Injectable()
export class UsersService {
    private db = admin.firestore();
    private auth = admin.auth();

    // Función auxiliar para normalizar el objeto de Firebase UserRecord
    private normalizeUser(user: admin.auth.UserRecord): AdminUser {
        const claims = user.customClaims || {};
        
        // 1. Determinar el rol, usando Custom Claims o cayendo a 'Invitado'/'Alumno'
        let role = (claims.role as string) || 'Alumno';
        let isAnonymous = user.providerData.some(p => p.providerId === 'anonymous');

        // Si es anónimo, forzamos el rol a 'Invitado' si no tiene otro rol explícito
        if (isAnonymous) {
            role = 'Invitado';
        }
        
        // 2. Normalizar los tipos (undefined -> null)
        const email = user.email ?? null;
        const displayName = user.displayName ?? null;
        const photoURL = user.photoURL ?? null;

        return {
            uid: user.uid,
            email: email, // <-- Corregido con ?? null
            displayName: displayName, // <-- Corregido con ?? null
            photoURL: photoURL, // <-- Corregido con ?? null
            isAnonymous: isAnonymous, // <-- Extraído de providerData
            role: role,
            createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime) : null,
            lastSignInTime: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : null,
        };
    }
    
    // ... (findAll se queda igual)
    async findAll(): Promise<AdminUser[]> {
        const listUsers = await this.auth.listUsers(1000); 
        return listUsers.users.map(this.normalizeUser);
    }
    
    // ... (updateRole se queda igual)
    async updateRole(uid: string, role: string): Promise<AdminUser> {
        await this.auth.setCustomUserClaims(uid, { role });
        await this.auth.revokeRefreshTokens(uid); 
        const updatedUser = await this.auth.getUser(uid);
        return this.normalizeUser(updatedUser);
    }
    
    // ... (remove se queda igual)
    async remove(uid: string): Promise<{ message: string }> {
        await this.auth.deleteUser(uid);
        await this.db.collection('progress').doc(uid).delete();
        return { message: `Usuario ${uid} eliminado exitosamente.` };
    }
}