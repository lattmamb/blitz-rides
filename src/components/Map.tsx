
import React, { useEffect, useRef } from 'react';
import { ChargingStation } from '../types';

interface MapProps {
  stations?: ChargingStation[];
  vehicleLocation?: { lat: number; lng: number };
  center?: { lat: number; lng: number };
  zoom?: number;
  style?: React.CSSProperties;
  className?: string;
}

const Map: React.FC<MapProps> = ({ 
  stations = [],
  vehicleLocation,
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 12,
  style,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, we would initialize a map library like Mapbox or Google Maps here
    console.log('Map would initialize here with:', { center, zoom, stations, vehicleLocation });
  }, [center, zoom, stations, vehicleLocation]);

  return (
    <div 
      ref={mapRef} 
      className={`glass-card relative overflow-hidden ${className}`} 
      style={{ minHeight: '400px', ...style }}
    >
      {/* This is a placeholder for the actual map implementation */}
      <div className="absolute inset-0 bg-tesla-dark-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
          <p className="text-white/70 mb-4">
            This would be an interactive map showing vehicle locations, charging stations, and routes. 
            For a production app, we would integrate with Mapbox or Google Maps API.
          </p>
          
          <div className="border border-glass-border rounded-lg p-4 text-left mb-4">
            <div className="text-sm font-medium mb-2">Map Data Preview:</div>
            <div className="text-xs text-white/70 space-y-1">
              <div><span className="text-tesla-blue">Center:</span> {center.lat.toFixed(4)}, {center.lng.toFixed(4)}</div>
              <div><span className="text-tesla-blue">Zoom:</span> {zoom}</div>
              <div><span className="text-tesla-blue">Charging Stations:</span> {stations.length}</div>
              {vehicleLocation && (
                <div><span className="text-tesla-blue">Vehicle Position:</span> {vehicleLocation.lat.toFixed(4)}, {vehicleLocation.lng.toFixed(4)}</div>
              )}
            </div>
          </div>
          
          <div className="glass-effect p-2 rounded text-sm">
            In a production environment, a real map would be displayed here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
