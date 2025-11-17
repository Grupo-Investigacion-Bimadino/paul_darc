// src/components/ProfileModal.tsx

import React from 'react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaTrophy, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

const ProfileModal = () => {
  const { gameState, closeProfileModal } = useGame();
  // Obtenemos 'isGuest' del contexto de autenticación
  const { currentUser, logout, isGuest } = useAuth();

  if (!gameState.isProfileModalOpen) return null;

  const handleLogout = async () => { /* ... sin cambios ... */ };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center"
      onClick={closeProfileModal}
    >
      <div 
        className="..." // Estilo del contenedor sin cambios
        onClick={e => e.stopPropagation()}
      >
        <button onClick={closeProfileModal} /* ... */ >
          <FaTimes size={24} />
        </button>

        {currentUser && isGuest ? (
          // Vista para el usuario INVITADO
          <div className="flex flex-col items-center text-center">
            <img src={'/icons/avatar.png'} alt="Avatar de invitado" className="w-24 h-24 rounded-full border-4 border-white mb-4" />
            <h2 className="text-3xl font-bold mb-2">Eres un Invitado</h2>
            <p className="text-gray-300 mb-6">Tu progreso no se guardará. ¡Crea una cuenta para guardar tus logros!</p>
            <button className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition">
              <FaUserPlus />
              Crear Cuenta
            </button>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg">
              <FaSignOutAlt />
              Salir
            </button>
          </div>
        ) : currentUser ? (
          // Vista para el usuario REGISTRADO
          <div className="flex flex-col items-center">
            {/* ... (Todo el código para el usuario registrado se queda igual) ... */}
          </div>
        ) : (
          <p>No hay usuario conectado.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;