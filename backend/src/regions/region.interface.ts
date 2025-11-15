export interface Region {
  id: string;
  nombre: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
}
