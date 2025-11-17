// src/components/ContentArea.tsx

import React from "react";

// La interfaz de props sigue definida por si la necesitas en el futuro,
// pero el componente ya no la usa activamente.
interface ContentAreaProps {
  activeSection: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ activeSection }) => {
  // El contenido anterior que renderizaba el mapa ha sido eliminado
  // para evitar conflictos con la nueva arquitectura del componente DarcGame.
  // Este componente ahora es un placeholder.

  // Si necesitas mostrar contenido diferente basado en la 'activeSection' del sidebar,
  // la lógica iría aquí.
  // Por ejemplo:
  // if (activeSection === 'AlgunaSeccion') {
  //   return <div>Contenido de Alguna Sección</div>;
  // }

  return (
    <div className="content-area">
      {/* Este componente está actualmente vacío para evitar errores de compilación. */}
    </div>
  );
};

export default ContentArea;