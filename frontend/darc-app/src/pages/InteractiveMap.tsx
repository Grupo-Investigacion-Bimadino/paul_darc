import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axiosInstance from '../axios.ts';

// 🧩 Interfaz para los datos de la región
interface Region {
  id: string;
  name: string;
  description: string;
  multimedia: string[];
}

// 🧭 Solución para los íconos de Leaflet (necesario con Webpack y Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface InteractiveMapProps {
  onRegionSelect: (region: Region | null) => void;
  selectedRegionName?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onRegionSelect, selectedRegionName }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🗺️ Carga el archivo GeoJSON (asegúrate de tener public/colombia.geo.json)
  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const response = await fetch('/colombia.geo.json');
        if (!response.ok) throw new Error(`Error HTTP al cargar GeoJSON: ${response.status}`);
        const data = await response.json();
        setGeoData(data);
      } catch (err: any) {
        setError('❌ No se pudo cargar el archivo GeoJSON. Verifica que exista en la carpeta "public".');
        console.error(err);
      }
    };
    fetchGeoJson();
  }, []);

  // 🖱️ Maneja clic en región
  const handleRegionClick = async (regionName: string) => {
    setIsLoading(true);
    onRegionSelect(null);
    try {
      const response = await axiosInstance.get<Region[]>(`/regions?name=${encodeURIComponent(regionName)}`);
      if (response.data && response.data.length > 0) {
        onRegionSelect(response.data[0]);
      } else {
        onRegionSelect(null);
        console.warn(`No se encontraron detalles para la región: ${regionName}`);
      }
    } catch (err) {
      console.error(`Error al obtener detalles de la región: ${regionName}`, err);
      onRegionSelect(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎨 Define estilo del GeoJSON
  const getFeatureStyle = (feature: any) => ({
    fillColor: feature.properties.NOMBRE_DPT === selectedRegionName ? '#FFC107' : '#8BC34A',
    weight: feature.properties.NOMBRE_DPT === selectedRegionName ? 4 : 2,
    opacity: 1,
    color: '#212121',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  // ⚡ Define interacción para cada región
  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.NOMBRE_DPT) {
      const regionName = feature.properties.NOMBRE_DPT;
      layer.bindPopup(regionName, { className: 'font-bold text-lg' });
      layer.on({
        click: () => handleRegionClick(regionName),
        mouseover: (e: any) => e.target.setStyle({ weight: 4, color: '#FFD700', fillOpacity: 0.8 }),
        mouseout: (e: any) => e.target.setStyle(getFeatureStyle(feature)),
      });
    }
  };

  // 🧭 Ajusta el zoom al tamaño del país
  const MapViewAdjuster = () => {
    const map = useMap();
    useEffect(() => {
      if (geoData && map) {
        try {
          const bounds = L.geoJSON(geoData).getBounds();
          map.fitBounds(bounds, { padding: [20, 20] });
        } catch (err) {
          console.error('Error al ajustar la vista del mapa:', err);
        }
      }
    }, [geoData, map]);
    return null;
  };

  // ⚠️ Mensajes de carga o error
  if (error) return <div className="text-red-600 font-bold text-center p-5">{error}</div>;
  if (!geoData) return <div className="text-gray-600 font-semibold text-center p-5">🗺️ Cargando mapa...</div>;

  // 🧱 Render del mapa
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        minHeight: '80vh',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Indicador de carga */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '5px 15px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        >
          <p className="font-semibold text-gray-700">Cargando datos de la región...</p>
        </div>
      )}

      {/* 🗺️ Mapa principal */}
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        zoom={6}
        minZoom={5}
        maxZoom={9}
        center={[4.57, -74.29]}
        zoomControl={true}
      >
        {/* Capa base del mapa (OpenStreetMap o Carto) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapViewAdjuster />
        <GeoJSON data={geoData} style={getFeatureStyle} onEachFeature={onEachFeature} key={selectedRegionName} />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
