"use client";

import { useState, useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface LocationMarkerProps {
  markerIconUrl: string;
  markerShadowUrl: string;
}

// Location tracker component
export function LocationMarker({ markerIconUrl, markerShadowUrl }: LocationMarkerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const map = useMap();
  const locationCircleRef = useRef<L.Circle | null>(null);
  const isFirstLocation = useRef(true);
  
  // Create icon using the provided URLs
  const defaultIcon = L.icon({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const mapEvents = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
      
      // Create or update the accuracy circle
      if (locationCircleRef.current) {
        locationCircleRef.current.setLatLng(e.latlng);
        locationCircleRef.current.setRadius(e.accuracy);
      } else {
        locationCircleRef.current = L.circle(e.latlng, {
          radius: e.accuracy,
          color: '#0A84FF',
          fillColor: '#0A84FF',
          fillOpacity: 0.15,
          weight: 2
        }).addTo(map);
      }
      
      // Only set view on first location
      if (isFirstLocation.current) {
        map.setView(e.latlng, 16);
        isFirstLocation.current = false;
      }
    }
  });

  // Start location tracking when component mounts
  useEffect(() => {
    mapEvents.locate({ 
      watch: true,
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
    
    // Clean up when component unmounts
    return () => {
      mapEvents.stopLocate();
      if (locationCircleRef.current) {
        locationCircleRef.current.remove();
      }
    };
  }, [mapEvents]);

  return position === null ? null : (
    <Marker 
      position={position} 
      icon={defaultIcon}
    >
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