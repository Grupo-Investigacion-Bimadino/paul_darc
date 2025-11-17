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
import { setAuthHeaderToken } from '../axios';

export interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<any>;
  loginAsGuest: () => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsGuest(user.isAnonymous);
        const idToken = await user.getIdToken();
        setToken(idToken);
        setAuthHeaderToken(idToken);
      } else {
        setIsGuest(false);
        setToken(null);
        setAuthHeaderToken(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginAsGuest = () => {
    return signInAnonymously(auth);
  };

  // --- CORRECCIÓN ---
  // La función signOut es la única necesaria para cerrar sesión,
  // tanto para usuarios registrados como anónimos.
  // Borrar el usuario anónimo es una acción destructiva que no queremos aquí.
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    token,
    isGuest,
    login,
    loginAsGuest,
    logout,
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