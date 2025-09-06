
import React from 'react';

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom: number;
  vesselName?: string;
}

const MapView: React.FC<MapViewProps> = ({ latitude, longitude, zoom, vesselName }) => {
  // Construct the OpenStreetMap embed URL.
  // We can add a marker to the map using the `mlat` and `mlon` parameters.
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.5},${latitude - 0.5},${longitude + 0.5},${latitude + 0.5}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="w-full h-full bg-gray-300 relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        title="Vessel Map"
      ></iframe>
      {vesselName && (
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-lg text-sm">
          <p className="font-bold text-gray-900">Tracking: {vesselName}</p>
          <p className="text-gray-600">Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
