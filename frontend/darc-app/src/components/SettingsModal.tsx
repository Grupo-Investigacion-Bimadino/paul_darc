// src/components/SettingsModal.tsx

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { FaTimes, FaTachometerAlt, FaCog } from 'react-icons/fa';

const SettingsModal = () => {
  const { gameState, closeSettingsModal } = useGame();
  const [activeTab, setActiveTab] = useState('progreso'); // 'progreso' o 'configuracion'

  if (!gameState.isSettingsModalOpen) {
    return null;
  }

  const pointsNeeded = gameState.playerLevel * 100;
  const progressPercentage = Math.floor((gameState.playerPoints / pointsNeeded) * 100);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center"
      onClick={closeSettingsModal}
    >
      <div 
        className="relative bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg text-white border-2 border-cyan-400"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={closeSettingsModal}
          className="absolute top-4 right-4 text-white hover:text-cyan-300 transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Pestañas */}
        <div className="flex border-b border-gray-600 mb-4">
          <button 
            onClick={() => setActiveTab('progreso')}
            className={`flex items-center gap-2 px-4 py-2 font-bold ${activeTab === 'progreso' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400'}`}
          >
            <FaTachometerAlt /> Progreso
          </button>
          <button 
            onClick={() => setActiveTab('configuracion')}
            className={`flex items-center gap-2 px-4 py-2 font-bold ${activeTab === 'configuracion' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400'}`}
          >
            <FaCog /> Configuración
          </button>
        </div>

        {/* Contenido de la Pestaña */}
        <div>
          {activeTab === 'progreso' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Progreso de Nivel</h3>
              <p className="mb-2">Nivel Actual: <span className="font-bold text-cyan-300">{gameState.playerLevel}</span></p>
              <p className="mb-2">Puntos Actuales: <span className="font-bold text-cyan-300">{gameState.playerPoints} / {pointsNeeded}</span></p>
              <div className="w-full bg-gray-700 rounded-full h-6">
                <div 
                  className="bg-cyan-500 h-6 rounded-full text-center text-sm flex items-center justify-center" 
                  style={{width: `${progressPercentage}%`}}
                >
                  {progressPercentage}%
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-400">¡Necesitas {pointsNeeded - gameState.playerPoints} puntos para el siguiente nivel!</p>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Configuración General</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Idioma</span>
                  <select className="bg-gray-700 p-2 rounded">
                    <option>Español</option>
                    <option disabled>Inglés (Próximamente)</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Calidad Gráfica</span>
                  <select className="bg-gray-700 p-2 rounded">
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
                <button className="w-full mt-6 py-2 bg-red-600 hover:bg-red-700 rounded">
                  Borrar Progreso
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;