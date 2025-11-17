// src/components/RegionPanel.tsx

import React from 'react';
import { useGame } from '@context/GameContext'; // <-- USANDO ALIAS
import { FaSearch, FaMusic, FaStar } from 'react-icons/fa';

// Componente helper para íconos
const MiniGameIcon = ({ iconName }: { iconName: string }) => {
    if (iconName === 'FaSearch') return <FaSearch />;
    if (iconName === 'FaMusic') return <FaMusic />;
    if (iconName === 'FaStar') return <FaStar />;
    return null;
};

const RegionPanel = () => {
    const { selectedRegionData, startMiniGame } = useGame();
    
    // Si no hay datos, renderizamos null, pero no hacemos un "return null" temprano aquí
    // para permitir la transición de salida (si la tuviéramos implementada con librerías más avanzadas)

    // Para el RegionPanel, simplemente si no hay datos, no renderizamos nada,
    // y aplicamos la animación directamente al div.
    if (!selectedRegionData) {
        return null;
    }
    
    const primaryGame = selectedRegionData.miniGames.length > 0 ? selectedRegionData.miniGames[0] : null;

    return (
        // Aplicamos la clase de animación de entrada
        <div 
            className="absolute top-1/2 -translate-y-1/2 right-0 z-20 w-64 p-4 bg-gradient-to-b from-green-400 to-green-600 rounded-l-lg shadow-2xl text-white border-4 border-white/60 animate-slide-in-right"
            // Nota: Aquí, la transición de salida (slide-out) se manejaría usando una librería
            // como framer-motion o React Transition Group, que aplican la clase
            // antes de desmontar el componente. Por ahora, solo tenemos la entrada.
        >
            {/* Título e Imagen Dinámicos */}
            <div className="text-center">
                <h2 className="text-2xl font-bold drop-shadow-md">{selectedRegionData.name}</h2>
                <img 
                    src={selectedRegionData.image} 
                    alt={selectedRegionData.name} 
                    className="w-24 h-24 mx-auto my-3 object-cover rounded-full border-4 border-white/80" 
                />
            </div>

            {/* Descripción Dinámica */}
            <p className="text-sm text-center mb-4 bg-black/20 p-2 rounded-lg h-24 overflow-y-auto">
                {selectedRegionData.description}
            </p>

            {/* Botón Principal (Jugar Minijuego) */}
            {primaryGame && (
                <button 
                    onClick={() => startMiniGame(primaryGame.id)}
                    className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-lg shadow-md transition transform hover:scale-105"
                >
                    Jugar {primaryGame.name}
                </button>
            )}

            {/* Lista de Minijuegos Dinámica */}
            <div>
                <h3 className="font-bold mb-2 text-center">Minijuegos Disponibles</h3>
                <ul className="space-y-2">
                    {selectedRegionData.miniGames.map((game) => (
                        <li 
                            key={game.id}
                            onClick={() => startMiniGame(game.id)}
                            className="flex items-center gap-3 p-2 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition"
                        >
                            <MiniGameIcon iconName={game.icon} />
                            <span>{game.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default RegionPanel;