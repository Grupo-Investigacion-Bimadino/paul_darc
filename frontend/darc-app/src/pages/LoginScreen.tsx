// src/pages/LoginScreen.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserShield } from 'react-icons/fa'; // Icono para el login de invitado

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
        setError('');
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
                    {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-cyan-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-cyan-500"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-cyan-600 hover:bg-cyan-700 rounded font-bold transition"
                    >
                        Iniciar Sesión
                    </button>
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
                    className="w-full p-3 bg-gray-600 hover:bg-gray-700 rounded font-bold transition flex items-center justify-center gap-2"
                >
                    <FaUserShield /> Entrar como Invitado
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;