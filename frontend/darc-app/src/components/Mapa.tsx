import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Solución al bug de los íconos de Leaflet con Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Mapa: React.FC = () => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Cargar el archivo GeoJSON desde la carpeta public
    fetch("/colombia.geo.json")
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el GeoJSON");
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error al cargar GeoJSON:", err));
  }, []);

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.NOMBRE_DPT) {
      layer.bindPopup(feature.properties.NOMBRE_DPT);
    }
  };

  const style = (feature: any) => ({
    fillColor: "#38bdf8", // azul claro
    weight: 1,
    opacity: 1,
    color: "#333",
    dashArray: "3",
    fillOpacity: 0.6,
  });

  return (
    <div className="w-full h-[80vh] rounded-lg shadow-md">
      {geoData ? (
        <MapContainer
          center={[4.57, -74.29]}
          zoom={6}
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <GeoJSON data={geoData} onEachFeature={onEachFeature} style={style} />
        </MapContainer>
      ) : (
        <p className="text-center text-gray-600 mt-4">Cargando mapa...</p>
      )}
    </div>
  );
};

export default Mapa;
