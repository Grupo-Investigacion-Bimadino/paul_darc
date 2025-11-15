
import React from 'react';

// Definición de la interfaz para los datos de la región
interface Region {
  id: string;
  name: string;
  description: string;
  multimedia: string[]; // Suponiendo que multimedia es un array de URLs
}

interface RegionDetailsProps {
  region: Region | null;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({ region }) => {
  // Contenedor principal con estilos base
  const asideBaseClasses = `
    w-full p-6 shadow-2xl rounded-lg
    bg-yellow-100 border-l-4 border-yellow-400
    text-gray-800 font-darc-childish
    flex flex-col h-full overflow-y-auto
  `;

  // Si no hay una región seleccionada, muestra un mensaje inicial
  if (!region) {
    return (
      <aside className={`${asideBaseClasses} justify-center items-center text-center`}>
        <p className="text-xl text-gray-600 font-semibold">Haz clic en una región del mapa para ver sus detalles.</p>
      </aside>
    );
  }

  // Renderiza los detalles de la región seleccionada
  return (
    <aside className={asideBaseClasses}>
      <h2
        className="
          text-4xl font-extrabold text-blue-700 mb-4
          leading-tight tracking-wide
          border-b-2 border-blue-300 pb-2
        "
      >
        Detalles de la Región
      </h2>

      <div className="flex-grow">
        <h3 className="text-2xl font-semibold mb-3 text-blue-600">
          {region.name}
        </h3>
        <p className="mb-4 text-lg">{region.description || 'Descripción no disponible.'}</p>

        {/* Renderiza el contenido multimedia si existe */}
        {region.multimedia && region.multimedia.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {region.multimedia.map((mediaUrl, index) => {
              // Determina si es imagen o vídeo por la extensión
              const isImage = /\.(jpeg|jpg|gif|png)$/.test(mediaUrl);
              const isVideo = /\.(mp4|webm|ogg)$/.test(mediaUrl);

              if (isImage) {
                return (
                  <img
                    key={index}
                    src={mediaUrl}
                    alt={`Contenido multimedia de ${region.name}`}
                    className="rounded-md shadow-md w-full h-auto object-cover"
                  />
                );
              } else if (isVideo) {
                return (
                  <video key={index} controls className="w-full rounded-md shadow-md">
                    <source src={mediaUrl} type="video/mp4" />
                    Tu navegador no soporta videos.
                  </video>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Sección de Minijuegos */}
      <div className="mt-8 pt-4 border-t-2 border-blue-300">
        <h3 className="text-2xl font-extrabold text-green-700 mb-4">¡A Jugar!</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Los botones pueden ser componentes reutilizables o simplemente botones estilizados */}
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            Juego de Capitales
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            Juego de Cultura
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RegionDetails;
