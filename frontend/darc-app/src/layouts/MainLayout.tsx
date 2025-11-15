
// frontend/darc-app/src/layouts/MainLayout.tsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-darc-childish">
      {/* Barra de Navegación Superior: Fondo verde lima, texto blanco */}
      <header className="bg-lime-500 text-white shadow-xl p-4 md:p-6 sticky top-0 z-50">
        <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo DARC estilizado */}
          <div className="text-4xl md:text-5xl font-extrabold tracking-widest leading-none">
            <Link to="/" className="text-white drop-shadow-md">
                <span className="text-yellow-300 drop-shadow-md">D</span>ARC
            </Link>
          </div>

          {/* Enlaces de navegación con el estilo solicitado */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map" className="px-6 py-2 text-white text-2xl font-bold rounded-full transition-transform transform hover:scale-110">
              Mapa
            </Link>
            <Link to="/games" className="px-6 py-2 text-white text-2xl font-bold rounded-full transition-transform transform hover:scale-110">
              Juegos
            </Link>
            <Link to="/admin" className="px-6 py-2 text-white text-2xl font-bold rounded-full transition-transform transform hover:scale-110">
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* Contenido Principal con Outlet para las rutas anidadas */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-inner rounded-b-lg">
        <Outlet />
      </main>

      {/* Barra de Progreso Inferior */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-3 md:p-4 shadow-lg z-50">
        <div className="container mx-auto flex items-center gap-4">
          <div className="text-xl font-bold text-yellow-500 drop-shadow-md">
            Nivel: Turista
          </div>
          {/* Contenedor de la barra de progreso */}
          <div className="flex-grow w-full bg-gray-300 rounded-full h-8 relative overflow-hidden shadow-inner">
            {/* Barra de progreso interna */}
            <div
              className="bg-green-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500 ease-out"
              style={{ width: '75%' }} 
            >
              <span className="text-sm font-bold text-white">75%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
