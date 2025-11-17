// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Vuelve a importar ambos proveedores
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("El elemento 'root' no fue encontrado en el DOM.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* RESTAURAMOS EL AUTHPROVIDER */}
    {/* Es importante que esté aquí para que los componentes que usan useAuth() funcionen */}
    <AuthProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);