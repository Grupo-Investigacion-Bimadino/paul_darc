// src/components/ChooseSoundGame.tsx

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { useGame } from '../context/GameContext';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

// Importa la interfaz para usarla en el tipado
import { ChooseSoundOption } from '../context/GameContext';

const ChooseSoundGame = () => {
  const { gameState, chooseSoundGames, addPoints, endMiniGame } = useGame();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const gameId = gameState.activeMiniGameId;

  if (!gameId || !chooseSoundGames[gameId]) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl mb-4">Error</h2>
        <p>No se pudo cargar el juego de sonido.</p>
        <button onClick={endMiniGame} className="mt-4 px-4 py-2 bg-blue-500 rounded">
          Volver
        </button>
      </div>
    );
  }

  const challenge = chooseSoundGames[gameId];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (showFeedback) return;

    setSelectedOptionId(optionId);
    setShowFeedback(true);

    if (optionId === challenge.correctOptionId) {
      addPoints(15);
    }

    setTimeout(() => {
      endMiniGame();
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-teal-800 flex flex-col items-center justify-center p-4 text-white">
      <audio key={gameId} ref={audioRef} src={challenge.soundFile} onEnded={() => setIsPlaying(false)} />
      
      <h2 className="text-3xl font-bold text-center mb-6">{challenge.questionText}</h2>

      <button onClick={togglePlay} className="mb-8 text-yellow-300 hover:text-yellow-400">
        {isPlaying ? <FaPauseCircle size={80} /> : <FaPlayCircle size={80} />}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Se añade el tipo 'ChooseSoundOption' al parámetro 'option' */}
        {challenge.options.map((option: ChooseSoundOption) => {
          let optionClass = "bg-gray-700 hover:bg-gray-600";
          if (showFeedback) {
            if (option.id === challenge.correctOptionId) {
              optionClass = "bg-green-500 animate-pulse";
            } else if (option.id === selectedOptionId) {
              optionClass = "bg-red-500";
            } else {
              optionClass = "bg-gray-700 opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showFeedback}
              className={`flex flex-col items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${optionClass}`}
            >
              <img src={option.image} alt={option.text} className="w-32 h-32 object-cover rounded-md mb-4" />
              <span className="text-xl font-semibold">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseSoundGame;