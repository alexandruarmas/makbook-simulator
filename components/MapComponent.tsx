"use client";

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Setup default icon to avoid missing marker issues
const icon = L.icon({
  iconUrl: 'data:image/png;base64,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',
  shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// A simplified LocationMarker component
function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const circleRef = useRef<L.Circle | null>(null);
  const map = useMap();
  
  useEffect(() => {
    // Enable location watching
    map.locate({
      watch: true,
      enableHighAccuracy: true
    });
    
    // Listen for location events
    const handleLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
      
      // Create or update accuracy circle
      if (circleRef.current) {
        circleRef.current.setLatLng(e.latlng);
        circleRef.current.setRadius(e.accuracy);
      } else {
        circleRef.current = L.circle(e.latlng, {
          radius: e.accuracy,
          color: '#0A84FF',
          fillColor: '#0A84FF',
          fillOpacity: 0.15,
          weight: 2
        }).addTo(map);
      }
      
      // Center map on first location
      if (!position) {
        map.setView(e.latlng, 16);
      }
    };
    
    map.on('locationfound', handleLocationFound);
    
    // Clean up
    return () => {
      map.stopLocate();
      map.off('locationfound', handleLocationFound);
      if (circleRef.current) {
        circleRef.current.remove();
      }
    };
  }, [map, position]);
  
  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="text-center">
          <div className="font-medium">Your Location</div>
          <div className="text-xs text-gray-600 mt-1">
            Accuracy: {Math.round(accuracy)}m
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// Main map component
export default function MapComponent() {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[40.7128, -74.0060]} // Default to New York
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        
        {/* Custom Zoom Controls */}
        <div className="absolute z-[1000] bottom-5 right-5 flex flex-col gap-2">
          <button 
            className="bg-[#252525] w-8 h-8 rounded flex items-center justify-center text-white text-xl shadow-md"
            onClick={() => document.querySelector('.leaflet-control-zoom-in')?.dispatchEvent(new MouseEvent('click'))}
          >
            +
          </button>
          <button 
            className="bg-[#252525] w-8 h-8 rounded flex items-center justify-center text-white text-xl shadow-md"
            onClick={() => document.querySelector('.leaflet-control-zoom-out')?.dispatchEvent(new MouseEvent('click'))}
          >
            -
          </button>
        </div>
      </MapContainer>
    </div>
  );
} 