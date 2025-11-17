// backend/src/auth/auth.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin'; // Importamos Firebase Admin
import { ProgressService, UserProgress } from '../progress/progress.service'; // Importamos el servicio de Progreso y su interfaz

// Definimos una interfaz básica para el perfil que el controlador devolverá al frontend
// (Debe coincidir con la UserProfile del frontend, excepto por isGuest que es local)
interface UserProfileResponse {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    level: number;
    points: number;
    unlockedAchievements: string[];
    role: string; 
}

// Nota: Asume que existe un UsersService para obtener el rol persistente.
// Aquí lo simularemos si no tienes uno.
// import { UsersService } from '../users/users.service'; 

@Injectable()
export class AuthService {
    constructor(
        // Inyectamos el ProgressService para obtener los datos del juego
        private readonly progressService: ProgressService 
        // private readonly usersService: UsersService // Asumimos este servicio si lo tienes
    ) {
        // Inicialización de Firebase Admin (solo si no está en un módulo global)
        // Ya que tienes firebase-admin en dependencies, asumimos que está inicializado
        // globalmente o en tu AuthModule.
    }

    // Este método es llamado por AuthController.getProfile()
    async getUserProfile(userId: string): Promise<UserProfileResponse> {
        
        // 1. Obtiene los datos básicos del usuario de Firebase Auth
        let userRecord: admin.auth.UserRecord;
        try {
            userRecord = await admin.auth().getUser(userId);
        } catch (error) {
            // Si el UID no se encuentra en Firebase Auth, algo salió mal.
            throw new NotFoundException(`Usuario con UID ${userId} no encontrado en Firebase Auth.`);
        }


        // 2. Obtiene el progreso del usuario (nivel, puntos, logros)
        // Usamos el estado inicial si no existe progreso aún (primer login)
        const progress: UserProgress = await this.progressService.getProgressByUserId(userId) ?? {
            level: 1, 
            points: 150,
            unlockedAchievements: [],
        };
        
        // 3. Determina el rol del usuario
        // Lógica simplificada: Si no está en Custom Claims (o si no los usas), 
        // asignamos un rol por defecto. Para probar Admin, puedes usar un valor fijo.
        
        // **OPCIÓN A: Asignar Rol Fijo para Pruebas (REEMPLAZAR LUEGO)**
        // const userRole = 'Administrador'; 
        
        // **OPCIÓN B: Usar Custom Claims de Firebase (más profesional)**
        const userRole = (userRecord.customClaims?.role as string) || 'Alumno'; 
        
        // **OPCIÓN C: Usar tu propia DB (la mejor opción)**
        // const userDb = await this.usersService.getRoleFromDB(userId); 
        // const userRole = userDb.role || 'Alumno';
        
        // 4. Combina y devuelve el perfil completo
        return {
            uid: userId,
            email: userRecord.email ?? null,
            displayName: userRecord.displayName ?? null,
            photoURL: userRecord.photoURL ?? null,
            
            // Datos del juego que son persistentes
            level: progress.level, 
            points: progress.points,
            unlockedAchievements: progress.unlockedAchievements,
            role: userRole, 
        };
    }
}