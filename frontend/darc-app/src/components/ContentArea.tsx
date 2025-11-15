import React from "react";
import Mapa from "./Mapa.tsx";

interface ContentAreaProps {
  activeSection: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ activeSection }) => {
  switch (activeSection) {
    case "inicio":
      return <h2 className="text-2xl font-semibold">Bienvenido a DARC</h2>;

    case "regiones":
      return (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Explora las Regiones de Colombia
          </h2>
          <Mapa />
        </div>
      );

    case "juegos":
      return <h2 className="text-2xl font-semibold">Zona de Juegos</h2>;

    case "multimedia":
      return <h2 className="text-2xl font-semibold">Recursos Multimedia</h2>;

    case "acerca":
      return <h2 className="text-2xl font-semibold">Acerca del Proyecto</h2>;

    default:
      return <h2 className="text-2xl font-semibold">Selecciona una sección</h2>;
  }
};

export default ContentArea;
