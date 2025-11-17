// src/components/ChooseSoundGame.tsx

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
// Importamos la interfaz para usarla en el tipado
import { useGame, ChooseSoundChallenge, ChooseSoundOption } from '../context/GameContext'; 
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const ChooseSoundGame = () => {
    // 1. LLAMA A TODOS LOS HOOKS AL PRINCIPIO, SIN CONDICIONES
    const { gameState, chooseSoundGames, addPoints, endMiniGame } = useGame();
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // El Hook useEffect ahora está antes de cualquier 'return' temprano
    useEffect(() => {
        // Pausa el audio si el componente se desmonta o el juego cambia
        const audio = audioRef.current;
        return () => {
            audio?.pause();
        };
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar/desmontar el componente

    const gameId = gameState.activeMiniGameId;

    // 2. LA CONDICIÓN DE RETORNO TEMPRANO AHORA VA DESPUÉS DE LOS HOOKS
    const challenge: ChooseSoundChallenge | undefined = chooseSoundGames[gameId || ''];
    
    if (!gameId || !challenge) {
        // Si no hay un juego válido, muestra un mensaje de error y detiene el renderizado
        return (
            <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-center items-center p-8 text-center">
                <h2 className="text-2xl mb-4 text-red-400">Error</h2>
                <p className="mb-4">No se pudo cargar el juego de sonido.</p>
                <button 
                    onClick={endMiniGame} 
                    className="mt-4 px-4 py-2 bg-blue-500 rounded"
                >
                    Volver al Mapa
                </button>
            </div>
        );
    }
    
    // A partir de aquí, asumimos que 'challenge' existe
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

    // Usamos ChooseSoundOption para tipar el parámetro 'option'
    const handleOptionClick = (option: ChooseSoundOption) => {
        if (showFeedback) return;

        setSelectedOptionId(option.id);
        setShowFeedback(true);

        let isCorrect = false;

        if (option.id === challenge.correctOptionId) {
            addPoints(15);
            isCorrect = true;
        }

        // Después de 2 segundos, termina el juego
        setTimeout(() => {
            // Si es correcto, el feedback ya dio los puntos y llama a endMiniGame
            // Si es incorrecto, solo se quita el feedback y volvemos al mapa de todas formas para seguir el flujo
            endMiniGame(); 
        }, 2000); 
    };

    return (
        <div className="w-full h-full bg-teal-800 flex flex-col items-center justify-center p-4 text-white">
            
            {/* La URL del audio ahora tiene una clave para forzar la recarga si el juego cambia */}
            <audio 
                key={gameId} 
                ref={audioRef} 
                src={challenge.soundFile} 
                onEnded={() => setIsPlaying(false)} 
                // La key={gameId} es CRUCIAL para que React desmonte y monte el audio
                // al cambiar de juego, forzando la recarga del archivo.
                
                // Mantenemos FaPlayCircle y FaPauseCircle como iconos visuales
            /> 
            

            <h2 className="text-3xl font-bold text-center mb-6">{challenge.questionText}</h2>

            {/* Botón de Reproducción */}
            <button 
                onClick={togglePlay} 
                className="mb-8 text-yellow-300 hover:text-yellow-400"
            >
                {isPlaying ? <FaPauseCircle size={80} /> : <FaPlayCircle size={80} />}
            </button>

            {/* Opciones (Imágenes y Texto) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {challenge.options.map((option: ChooseSoundOption, index: number) => {
                    let optionClass = "bg-gray-700 hover:bg-gray-600";
                    
                    if (showFeedback) {
                        if (option.id === challenge.correctOptionId) {
                            optionClass = "bg-green-500 animate-pulse"; // Opción correcta
                        } else if (option.id === selectedOptionId) {
                            optionClass = "bg-red-500"; // Opción incorrecta seleccionada
                        } else {
                            optionClass = "bg-gray-700 opacity-50"; // Otras opciones
                        }
                    }

                    return (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            disabled={showFeedback} // Deshabilita clics mientras se muestra el feedback
                            className={`flex flex-col items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${optionClass}`}
                        >
                            <img 
                                src={option.image} 
                                alt={option.text} 
                                className="w-32 h-32 object-cover rounded-md mb-4" 
                            />
                            <span className="text-xl font-semibold">{option.text}</span>
                        </button>
                    );
                })}
            </div>

            <button 
                onClick={endMiniGame} 
                className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded font-bold"
            >
                Salir del juego
            </button>
        </div>
    );
};

export default ChooseSoundGame;