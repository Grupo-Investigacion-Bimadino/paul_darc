import React, { useState } from "react";
import { Gamepad2, Map, Settings, ChevronDown } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const [showGamesMenu, setShowGamesMenu] = useState(false);

  return (
    <aside className="w-64 bg-darcBlue text-white min-h-screen flex flex-col p-5 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-center">DARC Panel</h1>

      {/* Botón Juegos con submenú */}
      <div>
        <button
          onClick={() => setShowGamesMenu(!showGamesMenu)}
          className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition ${
            activeSection === "juegos" ? "bg-darcGreen" : "hover:bg-darcGreen/80"
          }`}
        >
          <span className="flex items-center gap-2">
            <Gamepad2 size={18} />
            Juegos
          </span>
          <ChevronDown
            className={`transition-transform ${showGamesMenu ? "rotate-180" : ""}`}
            size={18}
          />
        </button>

        {showGamesMenu && (
          <div className="ml-6 mt-2 space-y-1">
            <button
              onClick={() => setActiveSection("juego1")}
              className="block w-full text-left py-1 px-2 rounded hover:bg-darcGreen/60 transition"
            >
              Juego 1: Trivia
            </button>
            <button
              onClick={() => setActiveSection("juego2")}
              className="block w-full text-left py-1 px-2 rounded hover:bg-darcGreen/60 transition"
            >
              Juego 2: Mapa Interactivo
            </button>
            <button
              onClick={() => setActiveSection("juego3")}
              className="block w-full text-left py-1 px-2 rounded hover:bg-darcGreen/60 transition"
            >
              Juego 3: Desafíos
            </button>
          </div>
        )}
      </div>

      {/* Botón de Opciones */}
      <button
        onClick={() => setActiveSection("opciones")}
        className={`flex items-center gap-2 py-2 px-3 rounded-lg mt-4 transition ${
          activeSection === "opciones" ? "bg-darcGreen" : "hover:bg-darcGreen/80"
        }`}
      >
        <Settings size={18} />
        Opciones
      </button>

      {/* Información al pie */}
      <div className="mt-auto text-center text-xs opacity-70">
        © 2025 Proyecto DARC
      </div>
    </aside>
  );
};

export default Sidebar;
