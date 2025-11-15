
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import { setAuthHeaderToken } from '../axios' // Import the function to set the token

// Interface for the Auth Context props
export interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
        setAuthHeaderToken(idToken); // Set the token for Axios
      } else {
        setToken(null);
        setAuthHeaderToken(null); // Clear the token for Axios
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
