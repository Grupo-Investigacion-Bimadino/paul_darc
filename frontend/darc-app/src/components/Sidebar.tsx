// src/components/Sidebar.tsx

import React, { useState } from 'react';
import { useGame } from '../context/GameContext'; // Importamos el hook para acceder a startMiniGame
import { 
  FaGamepad, 
  FaQuestionCircle, 
  FaMapMarkedAlt, 
  FaTrophy, 
  FaCog, 
  FaChevronDown, 
  FaChevronUp 
} from 'react-icons/fa';

// Definimos los tipos para las props que recibimos de App.tsx
interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  // Estado local para controlar si el submenú de juegos está abierto
  const [isGamesMenuOpen, setGamesMenuOpen] = useState(true);
  
  // Obtenemos la función para iniciar juegos desde nuestro contexto global
  const { startMiniGame } = useGame();

  // Función para manejar el clic en las secciones principales (que no son juegos)
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    console.log(`Sección activa: ${sectionId}`);
  };

  // Lista de juegos para renderizar dinámicamente, ahora con una acción asociada
  const games = [
    { 
      id: 'Trivia', 
      name: 'Juego 1: Trivia', 
      icon: <FaQuestionCircle />, 
      action: () => startMiniGame('Trivia') // Esta acción inicia el juego de trivia
    },
    { 
      id: 'Mapa Interactivo', 
      name: 'Juego 2: Mapa', 
      icon: <FaMapMarkedAlt />, 
      action: () => console.log('Juego "Mapa Interactivo" aún no implementado.')
    },
    { 
      id: 'Desafíos', 
      name: 'Juego 3: Desafíos', 
      icon: <FaTrophy />, 
      action: () => console.log('Juego "Desafíos" aún no implementado.')
    },
  ];

  return (
    <div className="w-64 h-full bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg text-white flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-center">DARC</h2>
      
      <nav className="flex flex-col space-y-2">
        {/* Botón Principal de Juegos (Desplegable) */}
        <button
          onClick={() => setGamesMenuOpen(!isGamesMenuOpen)}
          className="w-full flex justify-between items-center p-3 rounded-lg text-left font-bold bg-green-600 hover:bg-green-700 transition"
        >
          <div className="flex items-center gap-3">
            <FaGamepad />
            <span>Juegos</span>
          </div>
          {isGamesMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* SUBMENÚ DE JUEGOS */}
        {isGamesMenuOpen && (
          <div className="pl-4 flex flex-col space-y-2">
            {games.map(game => (
              <button
                key={game.id}
                onClick={game.action} // Asignamos la acción correspondiente (iniciar juego)
                // El estilo condicional ahora solo se basa en si es la sección activa
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                  activeSection === game.id
                    ? 'bg-blue-500 font-bold'
                    // Ya no necesitamos un onClick separado para setActiveSection aquí
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {game.icon}
                <span>{game.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Botón de Opciones */}
        <button
          onClick={() => handleSectionClick('Opciones')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-bold transition ${
            activeSection === 'Opciones'
              ? 'bg-blue-500'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <FaCog />
          <span>Opciones</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-xs text-gray-400">
        <p>&copy; 2025 Proyecto DARC</p>
      </div>
    </div>
  );
};

export default Sidebar;