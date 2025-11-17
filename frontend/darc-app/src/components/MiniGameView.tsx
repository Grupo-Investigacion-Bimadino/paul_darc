// src/components/MiniGameView.tsx

import React from 'react';
import { useGame } from '../context/GameContext';
import TriviaGame from './TriviaGame';
import FindObjectGame from './FindObjectGame';
import ChooseSoundGame from './ChooseSoundGame'; // <-- IMPORTA EL NUEVO JUEGO

const MiniGameView = () => {
  const { gameState, endMiniGame } = useGame();

  const renderActiveGame = () => {
    const gameId = gameState.activeMiniGameId;

    if (gameId === 'Trivia' || gameId?.startsWith('q')) {
      return <TriviaGame />;
    }
    
    if (gameId?.startsWith('find_')) {
      return <FindObjectGame />;
    }

    // AÑADIMOS LA LÓGICA PARA EL JUEGO DE SONIDO
    if (gameId?.startsWith('sound_')) {
      return <ChooseSoundGame />;
    }

    // Fallback
    return (
      <div className="text-center">
        <h2 className="text-2xl mb-4">Juego no encontrado</h2>
        <p className="mb-4">El juego con ID "{gameId}" no se pudo cargar.</p>
        <button onClick={endMiniGame} className="px-6 py-2 bg-yellow-500 text-black font-bold rounded">
          Volver
        </button>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-30 bg-gray-900 flex justify-center items-center">
      {renderActiveGame()}
    </div>
  );
};

export default MiniGameView;