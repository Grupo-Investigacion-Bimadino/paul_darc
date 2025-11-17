import React, { useState } from "react";
import { regionesData } from "../data/regiones";

const Informacion: React.FC = () => {
  const [regionSeleccionada, setRegionSeleccionada] = useState(regionesData[0]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-6 overflow-y-auto">
      {/* Lista de regiones */}
      <aside className="w-full md:w-1/3 bg-gray-50 rounded-xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Regiones</h2>
        <ul className="space-y-2">
          {regionesData.map((r) => (
            <li
              key={r.nombre}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                r.nombre === regionSeleccionada.nombre
                  ? "bg-primary text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setRegionSeleccionada(r)}
            >
              {r.nombre}
            </li>
          ))}
        </ul>
      </aside>

      {/* Información de región */}
      <section className="flex-1 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-secondary mb-3">
          {regionSeleccionada.nombre}
        </h2>
        <p className="text-gray-700 mb-4">{regionSeleccionada.descripcion}</p>

        <img
          src={regionSeleccionada.imagen}
          alt={regionSeleccionada.nombre}
          className="rounded-lg shadow-md w-full max-h-64 object-cover mb-6"
        />

        {regionSeleccionada.video && (
          <div className="aspect-video w-full mb-4">
            <iframe
              src={regionSeleccionada.video}
              title={`Video de ${regionSeleccionada.nombre}`}
              allowFullScreen
              className="rounded-lg w-full h-full shadow-md"
            ></iframe>
          </div>
        )}

        {regionSeleccionada.audio && (
          <audio
            controls
            className="w-full mt-3"
            src={regionSeleccionada.audio}
          >
            Tu navegador no soporta la reproducción de audio.
          </audio>
        )}
      </section>
    </div>
  );
};

export default Informacion;
