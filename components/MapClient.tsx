"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocationMarker } from './MapComponents';

interface MapClientProps {
  markerIconUrl: string;
  markerShadowUrl: string;
}

// Apply any map-level effects
function MapEffects() {
  const map = useMap();
  
  useEffect(() => {
    // This runs only on the client after the map is initialized
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
    
    return () => {
      // Cleanup when component unmounts
      map.remove();
    };
  }, [map]);
  
  return null;
}

export default function MapClient({ markerIconUrl, markerShadowUrl }: MapClientProps) {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[40.7128, -74.0060]} // Default to New York
        zoom={12} 
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map effects for better client-side handling */}
        <MapEffects />
        
        {/* Current location marker */}
        <LocationMarker 
          markerIconUrl={markerIconUrl} 
          markerShadowUrl={markerShadowUrl}
        />
      </MapContainer>
    </div>
  );
} 