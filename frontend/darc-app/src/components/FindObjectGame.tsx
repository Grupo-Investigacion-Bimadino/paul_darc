// src/components/FindObjectGame.tsx

import React, { useState, MouseEvent } from 'react';
import { useGame } from '../context/GameContext';

const FindObjectGame = () => {
  const { gameState, findObjectGames, addPoints, endMiniGame } = useGame();
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const gameId = gameState.activeMiniGameId;
  if (!gameId || !findObjectGames[gameId]) {
    return <div>Error: Juego no encontrado.</div>;
  }

  const challenge = findObjectGames[gameId];
  const { backgroundImage, objectToFind } = challenge;

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (feedback) return; // Evita clics después de una respuesta

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const { area } = objectToFind;
    
    // Comprueba si el clic está dentro del área correcta
    if (x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height) {
      setFeedback({ message: '¡Excelente! ¡Lo encontraste!', isCorrect: true });
      addPoints(25); // Otorga 25 puntos por encontrar el objeto
    } else {
      setFeedback({ message: '¡Casi! Sigue buscando.', isCorrect: false });
    }

    // Después de 2 segundos, cierra el feedback o termina el juego
    setTimeout(() => {
      if (x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height) {
        endMiniGame();
      } else {
        setFeedback(null);
      }
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <h2 className="text-3xl font-bold mb-4">Encuentra {objectToFind.name}</h2>
      
      {/* Contenedor de la imagen con posicionamiento relativo */}
      <div 
        className="relative w-full max-w-4xl aspect-video bg-cover bg-center rounded-lg shadow-lg cursor-pointer"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={handleImageClick}
      >
        {/* Feedback visual que aparece sobre la imagen */}
        {feedback && (
          <div className={`absolute inset-0 flex justify-center items-center rounded-lg ${feedback.isCorrect ? 'bg-green-500/70' : 'bg-red-500/70'}`}>
            <p className="text-4xl font-bold animate-pulse">{feedback.message}</p>
          </div>
        )}
      </div>

      <button onClick={endMiniGame} className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded">
        Salir del juego
      </button>
    </div>
  );
};

export default FindObjectGame;