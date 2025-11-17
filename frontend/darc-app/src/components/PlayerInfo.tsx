// src/components/PlayerInfo.tsx

import React from 'react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import { FaCoins, FaVolumeUp, FaVolumeMute, FaCog } from 'react-icons/fa';

const PlayerInfo = () => {
  const { gameState, toggleSound, openProfileModal, openSettingsModal } = useGame();
  const { currentUser } = useAuth(); // Obtiene el usuario actual desde el AuthContext

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 p-2 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full shadow-lg text-white font-bold text-sm border-2 border-white/50">
      <button 
        onClick={openProfileModal}
        className="flex items-center gap-2 px-4 py-1 bg-white/30 rounded-full hover:bg-white/40 transition focus:outline-none"
        aria-label="Abrir perfil de jugador"
      >
        <img 
          // Si el usuario tiene foto de perfil en Firebase, la usa. Si no, usa el avatar por defecto.
          src={currentUser?.photoURL || '/icons/avatar.png'} 
          alt="Avatar del jugador" 
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
        {/* Si el usuario tiene un nombre visible en Firebase, lo usa. Si no, muestra 'Jugador'. */}
        <span>{currentUser?.displayName || 'Jugador'}</span>
      </button>

      <button 
        onClick={openSettingsModal}
        className="px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition focus:outline-none"
        aria-label="Ver progreso de nivel"
      >
        Nivel {gameState.playerLevel}
      </button>

      <div className="flex items-center gap-4 px-4 py-2 bg-white/30 rounded-full">
        <div className="flex items-center gap-1">
          <FaCoins className="text-yellow-300" />
          <span>{gameState.playerPoints}</span>
        </div>
        
        <button onClick={toggleSound} aria-label="Activar/Desactivar sonido" className="focus:outline-none">
          {gameState.isSoundOn ? (
            <FaVolumeUp className="cursor-pointer hover:text-yellow-300 transition" size={20} />
          ) : (
            <FaVolumeMute className="cursor-pointer hover:text-yellow-300 transition" size={20} />
          )}
        </button>

        <button onClick={openSettingsModal} className="focus:outline-none" aria-label="Abrir configuración">
            <FaCog className="cursor-pointer hover:text-yellow-300 transition" size={20} />
        </button>
      </div>
    </div>
  );
};

export default PlayerInfo;