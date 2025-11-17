// src/components/TriviaGame.tsx

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { TriviaOption } from '../context/GameContext'; // Importamos la interfaz para el tipado

const TriviaGame = () => {
  const { triviaQuestions, endMiniGame, addPoints } = useGame();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);

  // Protección: Si no hay preguntas disponibles (por un error de API, etc.), muestra un estado de error.
  if (!triviaQuestions || triviaQuestions.length === 0) {
    return (
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg text-center shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Error</h2>
        <p className="mb-6">No se pudieron cargar las preguntas de la trivia.</p>
        <button 
          onClick={endMiniGame}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Volver al Mapa
        </button>
      </div>
    );
  }

  const handleAnswerClick = (selectedOption: TriviaOption) => {
    if (showFeedback) return;

    let pointsEarnedThisTurn = 0;
    if (selectedOption.isCorrect) {
      pointsEarnedThisTurn = 10;
      setScore(prev => prev + pointsEarnedThisTurn);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < triviaQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setGameFinished(true);
        // Llama a addPoints de forma asíncrona pero no necesita esperar
        addPoints(score + pointsEarnedThisTurn);
      }
    }, 2000);
  };
  
  if (isGameFinished) {
    return (
      <div className="w-full max-w-md bg-indigo-800 p-8 rounded-lg text-center shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-4 text-yellow-300">¡Juego Terminado!</h2>
        <p className="text-xl mb-6">Tu puntuación final es:</p>
        <p className="text-6xl font-bold mb-8">{score}</p>
        <button 
          onClick={endMiniGame}
          className="w-full py-3 bg-green-500 hover:bg-green-600 font-bold rounded-lg"
        >
          Continuar
        </button>
      </div>
    );
  }

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  return (
    <div className="w-full h-full bg-indigo-700 p-8 flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg">Pregunta {currentQuestionIndex + 1} / {triviaQuestions.length}</span>
          <span className="text-2xl font-bold text-yellow-300">Puntuación: {score}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-8 bg-black/20 p-4 rounded-lg">
          {currentQuestion.questionText}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option: TriviaOption, index: number) => {
            let buttonClass = "bg-blue-500 hover:bg-blue-600";
            if (showFeedback) {
              if (option.isCorrect) {
                buttonClass = "bg-green-500 animate-pulse";
              } else if (!isCorrect) {
                // Si el usuario falló, solo la que seleccionó se marca en rojo
                // Para eso necesitaríamos guardar la opción seleccionada. 
                // Por ahora, marcaremos todas las incorrectas en rojo.
                buttonClass = "bg-red-500";
              } else {
                // Si el usuario acertó, las incorrectas se atenúan
                buttonClass = "bg-blue-500 opacity-50";
              }
            }
            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`p-4 rounded-lg text-lg font-semibold transition-all duration-300 ${buttonClass}`}
                disabled={showFeedback}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;