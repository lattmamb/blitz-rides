
import { useState, useEffect } from 'react';

// Simulated vehicle position
interface VehiclePosition {
  lat: number;
  lng: number;
  timestamp: Date;
  speed: number;
  heading: number;
}

// For demo purposes - in a real app this would come from a backend
const generateRandomMovement = (
  currentLat: number, 
  currentLng: number,
  maxDelta: number = 0.001
): { lat: number; lng: number } => {
  const latDelta = (Math.random() - 0.5) * 2 * maxDelta;
  const lngDelta = (Math.random() - 0.5) * 2 * maxDelta;
  
  return {
    lat: currentLat + latDelta,
    lng: currentLng + lngDelta
  };
};

export const useVehicleTracking = (initialPosition: { lat: number; lng: number }) => {
  const [position, setPosition] = useState<VehiclePosition>({
    lat: initialPosition.lat,
    lng: initialPosition.lng,
    timestamp: new Date(),
    speed: Math.floor(Math.random() * 65) + 5, // Random speed between 5-70 mph
    heading: Math.floor(Math.random() * 360), // Random heading 0-359 degrees
  });
  
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("Just now");
  const [isMoving, setIsMoving] = useState<boolean>(true);
  
  useEffect(() => {
    // Update position every few seconds to simulate movement
    const intervalId = setInterval(() => {
      if (isMoving) {
        const newPosition = generateRandomMovement(position.lat, position.lng);
        
        setPosition({
          lat: newPosition.lat,
          lng: newPosition.lng,
          timestamp: new Date(),
          speed: Math.floor(Math.random() * 65) + 5, // Random speed between 5-70 mph
          heading: Math.floor(Math.random() * 360), // Random heading 0-359 degrees
        });
        
        setLastUpdateTime("Just now");
      }
    }, 5000);
    
    // Update "last updated" text
    const updateTimeInterval = setInterval(() => {
      if (isMoving) {
        const seconds = Math.floor((new Date().getTime() - position.timestamp.getTime()) / 1000);
        if (seconds < 60) {
          setLastUpdateTime(`${seconds} seconds ago`);
        } else {
          setLastUpdateTime(`${Math.floor(seconds / 60)} minutes ago`);
        }
      }
    }, 15000);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(updateTimeInterval);
    };
  }, [position, isMoving]);
  
  const toggleMovement = () => {
    setIsMoving(!isMoving);
  };
  
  return { position, lastUpdateTime, isMoving, toggleMovement };
};
