// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    User, 
    signInWithEmailAndPassword, 
    signOut, 
    signInAnonymously 
} from 'firebase/auth';
import { app } from '../firebase/firebase.config'; 
import axiosInstance, { setAuthHeaderToken } from '../axios'; 


export interface UserProfile { 
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isGuest: boolean; 
    role: string;
    
    // <-- CAMPOS DE PROGRESO AÑADIDOS
    level: number;
    points: number;
    unlockedAchievements: string[];
    // FIN DE CAMPOS DE PROGRESO
}

export interface AuthContextType {
    currentUser: UserProfile | null; 
    token: string | null;
    isGuest: boolean;
    login: (email: string, password: string) => Promise<void>; 
    loginAsGuest: () => Promise<void>; 
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null); 
    const [token, setToken] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    // Función para obtener y guardar el perfil del usuario desde NestJS
    const fetchUserProfile = async (firebaseUser: User, idToken: string) => {
        
        let profile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? null,
            displayName: firebaseUser.displayName ?? null,
            photoURL: firebaseUser.photoURL ?? null,
            isGuest: firebaseUser.isAnonymous,
            role: firebaseUser.isAnonymous ? 'Invitado' : 'Alumno', 
            
            // Valores por defecto para el progreso (si el backend falla)
            level: 1, 
            points: 150,
            unlockedAchievements: [],
        };
        
        if (!firebaseUser.isAnonymous) {
            setAuthHeaderToken(idToken); 
            
            try {
                // Llama al backend /auth/profile
                const response = await axiosInstance.get('/auth/profile');
                
                // Sobrescribe el perfil con los datos persistentes del backend
                profile = { 
                    ...profile,
                    displayName: response.data.displayName || response.data.name || profile.displayName,
                    role: response.data.role || profile.role,
                    level: response.data.level, 
                    points: response.data.points, 
                    unlockedAchievements: response.data.unlockedAchievements,
                };
                
            } catch (error) {
                console.error("Error al obtener perfil del backend:", error);
            }
        }

        setCurrentUser(profile);
    };
    
    // Observa el estado de autenticación de Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                setToken(idToken);
                await fetchUserProfile(user, idToken);
            } else {
                setCurrentUser(null);
                setToken(null);
                setIsGuest(false);
                setAuthHeaderToken(null); 
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [auth]);

    // Funciones de autenticación
    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const loginAsGuest = async (): Promise<void> => {
        setLoading(true);
        try {
            await signInAnonymously(auth);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        setLoading(true);
        try {
            if (currentUser && currentUser.isGuest) { 
                await auth.currentUser?.delete();
            }
            await signOut(auth);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // Exponemos el valor. Usamos currentUser?.isGuest o un fallback
    const value = {
        currentUser,
        token,
        isGuest: currentUser?.isGuest || false, 
        login,
        loginAsGuest,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};