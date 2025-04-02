"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Create a simple loading component
const LoadingSpinner = () => (
  <div className="h-full flex items-center justify-center bg-[#1A1A1A]">
    <div className="animate-spin w-8 h-8 border-4 border-[#0A84FF] border-t-transparent rounded-full"></div>
  </div>
);

// Completely client-side map component with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

// Location denied component
const LocationDenied = ({ onRetry }: { onRetry: () => void }) => (
  <div className="h-full flex items-center justify-center bg-[#1A1A1A] text-center">
    <div>
      <div className="w-16 h-16 mx-auto bg-[#252525] rounded-full flex items-center justify-center mb-3">
        <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      <p className="text-gray-400 mb-4">Location access denied</p>
      <p className="text-sm text-gray-500 mb-4 max-w-xs">Please enable location access in your browser settings to use Maps</p>
      <button 
        className="bg-[#0A84FF] text-white px-4 py-2 rounded-md text-sm"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  </div>
);

// Main Map component
export default function MacOSMap() {
  const [isClient, setIsClient] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [mapKey, setMapKey] = useState(Date.now()); // Used to recreate map on retries
  
  useEffect(() => {
    setIsClient(true);
    
    // Check location permission only on client
    if (typeof window !== 'undefined') {
      try {
        navigator.permissions?.query({ name: 'geolocation' })
          .then(result => {
            if (result.state === 'denied') {
              setLocationDenied(true);
            }
          })
          .catch(() => {
            // Permissions API might not be available, try geolocation directly
            navigator.geolocation.getCurrentPosition(
              () => setLocationDenied(false),
              () => setLocationDenied(true)
            );
          });
      } catch (error) {
        console.error("Geolocation error:", error);
      }
    }
  }, []);
  
  const handleRetry = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationDenied(false);
        // Generate new key to force recreation of the map component
        setMapKey(Date.now());
      },
      () => setLocationDenied(true)
    );
  };
  
  // Don't render anything until we're on client
  if (!isClient) {
    return <LoadingSpinner />;
  }
  
  // Show denied screen when location is denied
  if (locationDenied) {
    return <LocationDenied onRetry={handleRetry} />;
  }

  // Render map with a unique key to prevent reuse issues
  return <MapComponent key={mapKey} />;
} 