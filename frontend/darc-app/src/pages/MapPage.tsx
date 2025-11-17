// src/pages/MapPage.tsx

import React, { useState } from 'react';
import Mapa from '../components/Mapa';

// Esta interfaz debe coincidir con la de Mapa.tsx
interface Region {
  id: string;
  name: string;
}

const MapPage: React.FC = () => {
  // Estado para guardar la región seleccionada en esta página
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Función que se pasará como prop al componente Mapa
  const handleRegionSelect = (region: Region | null) => {
    setSelectedRegion(region);
    console.log("Región seleccionada en MapPage:", region);
  };

  return (
    <div>
      <h1>Página del Mapa</h1>
      {selectedRegion && (
        <div style={{ padding: '10px', background: '#f0f0f0' }}>
          <h2>Información de la Región Seleccionada:</h2>
          <p>Nombre: {selectedRegion.name}</p>
        </div>
      )}
      <div style={{ height: '80vh', width: '100%' }}>
        {/* Ahora el componente Mapa recibe las props correctamente */}
        <Mapa 
          onRegionSelect={handleRegionSelect}
          selectedRegionName={selectedRegion?.name}
        />
      </div>
    </div>
  );
};

export default MapPage;