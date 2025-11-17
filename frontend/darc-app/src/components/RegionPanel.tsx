// src/components/RegionPanel.tsx

import React from 'react';
import { useGame } from '../context/GameContext';
import { FaSearch, FaMusic } from 'react-icons/fa';

const MiniGameIcon = ({ iconName }: { iconName: string }) => {
  if (iconName === 'FaSearch') return <FaSearch />;
  if (iconName === 'FaMusic') return <FaMusic />;
  return null;
};

const RegionPanel = () => {
  const { selectedRegionData, startMiniGame } = useGame();

  if (!selectedRegionData) {
    return null;
  }

  const handlePlayClick = () => {
    if (selectedRegionData.miniGames.length > 0) {
      startMiniGame(selectedRegionData.miniGames[0].id);
    }
  };

  return (
    <div 
      className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-64 p-4 bg-gradient-to-b from-green-400 to-green-600 rounded-2xl shadow-2xl text-white border-4 border-white/60"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold drop-shadow-md">{selectedRegionData.name}</h2>
        <img 
          src={selectedRegionData.image} 
          alt={selectedRegionData.name} 
          className="w-24 h-24 mx-auto my-3 object-cover rounded-full border-4 border-white/80"
        />
      </div>

      <p className="text-sm text-center mb-4 bg-black/20 p-2 rounded-lg h-24 overflow-y-auto">
        {selectedRegionData.description}
      </p>

      <button 
        onClick={handlePlayClick}
        className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-lg shadow-md transition transform hover:scale-105"
      >
        Jugar minijuego
      </button>

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