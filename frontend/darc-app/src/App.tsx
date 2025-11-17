// src/App.tsx

import React from 'react';
import DarcGame from './pages/DarcGame'; // Importamos el componente principal del juego

// Este componente ahora es muy simple. Su única responsabilidad es renderizar el juego.
// Ya no se preocupa por si el usuario está logueado o no.
const App = () => {
  return <DarcGame />;
};

export default App;