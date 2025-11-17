// src/App.tsx (Router con Protección de Roles)

import React from 'react';
import { useAuth } from './context/AuthContext'; 
import DarcGame from './pages/DarcGame'; 
import LoginScreen from './pages/LoginScreen'; 
import AdminDashboard from './pages/AdminDashboard'; // <-- IMPORTADO


const App = () => {
    const { currentUser, loading } = useAuth(); 
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <p className="text-2xl">Cargando Autenticación...</p>
            </div>
        );
    }
    
    // LÓGICA DE ROUTING CON PROTECCIÓN DE ROLES
    if (currentUser) {
        if (currentUser.role === 'Administrador') {
            return <AdminDashboard />;
        }
        // Cualquier otro usuario (Alumno, Docente, Invitado) va al juego
        return <DarcGame />;
    }

    // Si no hay usuario (currentUser es null)
    return <LoginScreen />;
};

export default App;