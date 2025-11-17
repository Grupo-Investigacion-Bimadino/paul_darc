// src/components/FindObjectGame.tsx

import React, { useState, MouseEvent } from 'react';
// Importa las interfaces para tipado
import { useGame, FindObjectChallenge, RegionData } from '../context/GameContext'; 

// Importa FaTimes para el botón de salir
import { FaTimes } from 'react-icons/fa'; 

// Asumimos que FaTimes está disponible gracias a que instalamos react-icons
// Si da error, asegúrate de que FaTimes está en la lista de imports de react-icons/fa

const FindObjectGame = () => {
    // Obtenemos los datos necesarios del contexto
    const { gameState, findObjectGames, addPoints, endMiniGame, selectedRegionData } = useGame();
    
    // Estado local para manejar el feedback visual al usuario (mensaje y si fue correcto)
    const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

    // Si el juego se inició desde el RegionPanel, usamos el juego asociado a la región
    // Si se inició directamente (ej. 'find_arepa'), usamos el ID directo
    const gameId = gameState.activeMiniGameId;
    
    // Si se activó desde una región (ej. Antioquia) busca el primer juego 'find_...'
    // Esta lógica podría ser más robusta, pero por ahora asumimos que el gameId es el correcto.
    const challenge: FindObjectChallenge | undefined = findObjectGames[gameId || ''];

    // Protección: Si el ID del juego no es válido o no existe, mostramos error
    if (!gameId || !challenge) {
        return (
            <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-center items-center p-8 text-center">
                <h2 className="text-2xl mb-4 text-red-400">Error: Juego no encontrado</h2>
                <p className="mb-6">El juego con ID "{gameId}" no se pudo cargar. Vuelve al mapa.</p>
                <button 
                    onClick={endMiniGame} 
                    className="w-full max-w-xs py-2 bg-blue-500 hover:bg-blue-600 rounded font-bold transition"
                >
                    Volver al Mapa
                </button>
            </div>
        );
    }

    const { backgroundImage, objectToFind } = challenge;
    
    
    // --- Lógica Principal del Juego: Detección de Clics ---
    const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
        if (feedback) return; // Evita clics después de una respuesta

        // 1. Calcular coordenadas del clic en porcentaje (0-100)
        const rect = e.currentTarget.getBoundingClientRect();
        // X como porcentaje del ancho (0 a 100)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        // Y como porcentaje del alto (0 a 100)
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const { area } = objectToFind;

        let isCorrect = false;

        // 2. Comprueba si el clic está dentro del área correcta
        if (
            x >= area.x && 
            x <= area.x + area.width && 
            y >= area.y && 
            y <= area.y + area.height
        ) {
            isCorrect = true;
            setFeedback({ message: `¡Excelente! ¡Encontraste ${objectToFind.name}!`, isCorrect: true });
            addPoints(25); // Otorga 25 puntos (addPoints es async y persiste en NestJS)
        } else {
            setFeedback({ message: '¡Casi! Sigue buscando.', isCorrect: false });
        }
        
        // 3. Después de 2 segundos, cierra el feedback y termina el juego si acertó
        setTimeout(() => {
            if (isCorrect) {
                endMiniGame(); // Vuelve al mapa si acertó
            } else {
                setFeedback(null); // Quita el feedback para que pueda seguir buscando
            }
        }, 2000); 
    };

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
            <h2 className="text-3xl font-bold mb-4">Encuentra {objectToFind.name}</h2>
            
            {/* Contenedor de la imagen con posicionamiento relativo */}
            {/* Nota: Usamos una 'key' única para forzar la recreación del div si el backgroundImage cambia, aunque aquí solo renderizamos uno */}
            <div 
                key={challenge.id}
                className="relative w-full max-w-4xl aspect-video bg-cover bg-center rounded-lg shadow-lg cursor-pointer" 
                style={{ 
                    backgroundImage: `url(${backgroundImage})` 
                }}
                onClick={handleImageClick}
            >
                {/* Feedback visual que aparece sobre la imagen */}
                {feedback && (
                    <div 
                        className={`absolute inset-0 flex justify-center items-center rounded-lg ${
                            feedback.isCorrect ? 'bg-green-500/70' : 'bg-red-500/70'
                        }`}
                    >
                        <p className={`text-4xl font-bold ${feedback.isCorrect ? 'animate-pulse' : ''}`}>{feedback.message}</p>
                    </div>
                )}
            </div>

            <button 
                onClick={endMiniGame} 
                className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded font-bold transition"
            >
                Salir del juego
            </button>
        </div>
    );
};

export default FindObjectGame;