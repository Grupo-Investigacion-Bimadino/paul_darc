// src/components/ZoomControls.tsx

import React from 'react';
import { FaPlus, FaMinus, FaSyncAlt } from 'react-icons/fa';
import { Map } from 'leaflet';

// Se definen los tipos para las props que el componente va a recibir desde App.tsx
interface ZoomControlsProps {
  mapRef: React.MutableRefObject<Map | null>;
  initialCenter: [number, number];
  initialZoom: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ mapRef, initialCenter, initialZoom }) => {
  
  // Función para acercar el mapa
  const handleZoomIn = () => {
    // Se verifica que la referencia al mapa exista antes de usarla
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  // Función para alejar el mapa
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  // Función para restablecer la vista inicial del mapa
  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView(initialCenter, initialZoom);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={handleZoomIn}
        className="flex justify-center items-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
        aria-label="Acercar mapa"
      >
        <FaPlus size={20} />
      </button>
      <button 
        onClick={handleZoomOut}
        className="flex justify-center items-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
        aria-label="Alejar mapa"
      >
        <FaMinus size={20} />
      </button>
      <button 
        onClick={handleResetView}
        className="flex justify-center items-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110"
        aria-label="Restablecer vista"
      >
        <FaSyncAlt size={20} />
      </button>
    </div>
  );
};

export default ZoomControls;