// src/components/Mapa.tsx

import React from 'react';
import L, { Map, Layer, LeafletMouseEvent } from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import colombiaData from '../data/colombia.geo.json';

// Interfaz para la información que pasaremos cuando se seleccione una región.
// Deberías mover esta interfaz a un archivo de tipos compartido si la usas en otros lugares.
interface Region {
  id: string;
  name: string;
}

// 1. Define una interfaz para las props que el componente Mapa aceptará
interface MapaProps {
  onRegionSelect: (region: Region | null) => void;
  selectedRegionName?: string; // Hacemos esta prop opcional con '?'
}

// 2. Haz que tu componente acepte y desestructure estas props
const Mapa: React.FC<MapaProps> = ({ onRegionSelect, selectedRegionName }) => {
  const mapRef = React.useRef<Map | null>(null);

  const resetAllLayers = (map: Map) => {
    map.eachLayer((layer: any) => {
      if (layer.feature) {
        layer.setStyle({ weight: 2, color: 'white', fillOpacity: 0.7 });
      }
    });
  };

  const onEachFeature = (feature: any, layer: Layer) => {
    const regionName = feature.properties.NOMBRE_DPT;
    if (!regionName) return;

    layer.on({
      click: (e: LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e);
        if (mapRef.current) {
          resetAllLayers(mapRef.current);
        }
        
        // 3. Llama a la función onRegionSelect pasada como prop
        onRegionSelect({ id: regionName, name: regionName });
        
        e.target.setStyle({ weight: 4, color: '#FFD700', fillOpacity: 0.9 });
      },
    });
  };

  const MapEvents = () => {
    useMapEvents({
      click() {
        // 4. Llama a onRegionSelect con 'null' al hacer clic fuera
        onRegionSelect(null);
        if (mapRef.current) {
          resetAllLayers(mapRef.current);
        }
      },
    });
    return null;
  };

  const mapStyle = { /* ... tu estilo ... */ };
  
  return (
    <MapContainer
      ref={mapRef}
      center={[4.5709, -74.2973]}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer url="https://..."/>
      <GeoJSON data={colombiaData as any} style={mapStyle} onEachFeature={onEachFeature} />
      <MapEvents />
    </MapContainer>
  );
};

export default Mapa;