import React, { useState } from "react";
import Sidebar from "./components/Sidebar.tsx";
import Mapa from "./components/Mapa.tsx";

function App() {
  const [activeSection, setActiveSection] = useState("juegos");

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenedor principal */}
      <main className="flex-1 relative bg-gray-100">
        {/* Mapa siempre visible */}
        <div className="absolute inset-0 z-0">
          <Mapa />
        </div>

        {/* Contenido superpuesto (dependiendo de la sección activa) */}
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg z-10 max-w-sm">
          {activeSection === "opciones" && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-darcBlue">Opciones</h2>
              <p className="text-gray-700 text-sm">
                Aquí puedes ajustar la configuración general del proyecto DARC.
              </p>
            </div>
          )}

          {activeSection === "juego1" && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-darcBlue">Juego 1: Trivia</h2>
              <p className="text-gray-700 text-sm">Prueba tus conocimientos sobre Colombia.</p>
            </div>
          )}

          {activeSection === "juego2" && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-darcBlue">Juego 2: Mapa Interactivo</h2>
              <p className="text-gray-700 text-sm">Explora el mapa mientras respondes desafíos.</p>
            </div>
          )}

          {activeSection === "juego3" && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-darcBlue">Juego 3: Desafíos</h2>
              <p className="text-gray-700 text-sm">Supera retos para desbloquear logros.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
