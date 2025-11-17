// src/pages/LoginScreen.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginAsGuest } = useAuth(); // Importamos loginAsGuest

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
    } catch (err) {
      setError('No se pudo iniciar la sesión de invitado.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">Bienvenido a DARC</h1>
        <form onSubmit={handleSubmit}>
            {/* ... (campos de email, password y botón de submit sin cambios) ... */}
        </form>

        {/* Separador */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="px-4 text-gray-400">o</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Botón de Invitado */}
        <button 
          onClick={handleGuestLogin}
          className="w-full p-3 bg-gray-600 hover:bg-gray-700 rounded font-bold transition"
        >
          Entrar como Invitado
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;