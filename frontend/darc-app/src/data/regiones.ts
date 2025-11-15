export interface RegionData {
    nombre: string;
    descripcion: string;
    imagen: string;
    audio?: string;
    video?: string;
  }
  
  export const regionesData: RegionData[] = [
    {
      nombre: "Antioquia",
      descripcion:
        "Antioquia es una región montañosa con una rica cultura cafetera y un alto desarrollo tecnológico. Su capital, Medellín, es conocida por su innovación y progreso social.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/9/90/Medellin.jpg",
      audio: "/audios/antioquia.mp3",
      video: "https://www.youtube.com/embed/Kr6zWk92pQk",
    },
    {
      nombre: "Bolívar",
      descripcion:
        "Bolívar es una región costera rica en historia, con Cartagena como su joya colonial y destino turístico de gran importancia en Colombia.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/5/58/Cartagena_walls.jpg",
      audio: "/audios/bolivar.mp3",
      video: "https://www.youtube.com/embed/ABcC7vpljP8",
    },
    {
      nombre: "Córdoba",
      descripcion:
        "Córdoba combina tradiciones ganaderas y folclóricas con una biodiversidad impresionante. Su capital, Montería, es conocida como la 'Perla del Sinú'.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/4/42/Monteria_Sinu.jpg",
      audio: "/audios/cordoba.mp3",
      video: "https://www.youtube.com/embed/y7twCNYX6-g",
    },
  ];
  