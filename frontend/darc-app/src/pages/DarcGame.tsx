// src/pages/DarcGame.tsx

import React, { useState, useRef } from 'react';
import L, { Map, Layer, LeafletMouseEvent } from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import colombiaData from '../data/colombia.geo.json';
import { useGame } from '../context/GameContext';

// Componentes UI
import PlayerInfo from '../components/PlayerInfo';
import RegionPanel from '../components/RegionPanel';
import ZoomControls from '../components/ZoomControls';
import Sidebar from '../components/Sidebar';
import ProfileModal from '../components/ProfileModal';
import MiniGameView from '../components/MiniGameView';
import SettingsModal from '../components/SettingsModal';

const DarcGame = () => {
  const { gameState, setSelectedRegion } = useGame();
  const { activeMiniGameId } = gameState;
  
  const mapRef = useRef<Map | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click() {
        setSelectedRegion(null);
        if (mapRef.current) {
          resetAllLayers(mapRef.current);
        }
      },
    });
    return null;
  };

  const [activeSection, setActiveSection] = useState('Juegos');
  const initialCenter: [number, number] = [4.5709, -74.2973];
  const initialZoom = 6;

  const resetAllLayers = (map: Map) => {
    map.eachLayer((layer: any) => {
      if (layer.feature) {
        layer.setStyle({ weight: 2, color: 'white', fillOpacity: 0.7 });
      }
    });
  };

  const onEachFeature = (feature: any, layer: Layer) => {
    const regionName = feature.properties.NOMBRE_DPT || feature.properties.name;
    if (!regionName) return;

    layer.on({
      click: (e: LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e);
        if (mapRef.current) {
          resetAllLayers(mapRef.current);
        }
        setSelectedRegion(regionName);
        e.target.setStyle({ weight: 4, color: '#FFD700', fillOpacity: 0.9 });
      },
    });
  };

  const mapStyle = {
    fillColor: '#3182CE',
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {activeMiniGameId ? (
        <MiniGameView />
      ) : (
        <>
          <MapContainer 
            ref={mapRef}
            center={initialCenter} 
            zoom={initialZoom} 
            style={{ height: '100%', width: '100%' }}
            className="absolute inset-0 z-0"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <GeoJSON 
              data={colombiaData as any}
              style={mapStyle}
              onEachFeature={onEachFeature} 
            />
            <MapEvents />
          </MapContainer>

          <div className="absolute top-0 left-0 h-full z-10 p-4">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-20 flex justify-center">
             <PlayerInfo />
          </div>

          <div className="absolute bottom-4 left-4 z-10">
            <ZoomControls mapRef={mapRef} initialCenter={initialCenter} initialZoom={initialZoom} />
          </div>

          <RegionPanel />
        </>
      )}
      
      <ProfileModal />
      <SettingsModal />
    </div>
  );
};

export default DarcGame;