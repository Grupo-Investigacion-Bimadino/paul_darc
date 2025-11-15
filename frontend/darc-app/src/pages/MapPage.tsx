
import React, { useState } from 'react';
import Mapa from '../Mapa.tsx';

// Definición de la interfaz para los datos de la región
interface Region {
  id: string;
  name: string;
  description: string;
  multimedia: string[];
}

const MapPage: React.FC = () => {
  // Estado para guardar la región que el usuario selecciona en el mapa.
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Esta función se pasa al componente InteractiveMap y se llama cuando se hace clic en una región.
  const handleRegionSelect = (region: Region | null) => {
    setSelectedRegion(region);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 p-4">
      {/* Contenedor del mapa interactivo, ocupa 2/3 del ancho */}
      <div className="w-full md:w-2/3 h-full shadow-lg rounded-lg overflow-hidden">
      <Mapa
          onRegionSelect={handleRegionSelect} 
          selectedRegionName={selectedRegion?.name}
        />
      </div>
      
      {/* Panel lateral para mostrar los detalles de la región, ocupa 1/3 del ancho */}
      <div className="w-full md:w-1/3 h-full bg-yellow-100 p-6 rounded-lg shadow-2xl border-l-4 border-yellow-400 overflow-y-auto font-darc-childish text-gray-800">
        {selectedRegion ? (
          // Si hay una región seleccionada, muestra sus detalles.
          <div>
            <h2 className="text-3xl font-bold mb-4">{selectedRegion.name}</h2>
            <p className="text-lg mb-6">{selectedRegion.description}</p>
            <div className="grid grid-cols-1 gap-4">
              {selectedRegion.multimedia.map((mediaUrl, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  {/* Comprueba si el archivo es un video o una imagen por su extensión */}
                  {mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video controls className="w-full h-auto">
                      <source src={mediaUrl} type={`video/${mediaUrl.split('.').pop()}`} />
                      Tu navegador no soporta la reproducción de videos.
                    </video>
                  ) : (
                    <img src={mediaUrl} alt={`${selectedRegion.name} media ${index + 1}`} className="w-full h-auto object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Si no hay ninguna región seleccionada, muestra el mensaje por defecto.
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-center">
              Haz clic en una región del mapa para ver sus detalles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
