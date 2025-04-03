
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import GlobeDemo from '@/components/ui/globe-demo';
import { MapPin, Info, Zap, Globe } from 'lucide-react';
import { ChargingStation } from '@/types';

// Sample charging stations data
const chargingStations: ChargingStation[] = [
  {
    id: 'cs1',
    name: 'Downtown Supercharger',
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    address: '123 Market St, San Francisco, CA',
    available: 5,
    total: 8,
    chargingSpeed: 250
  },
  {
    id: 'cs2',
    name: 'Palo Alto Supercharger',
    location: {
      lat: 37.4419,
      lng: -122.1430
    },
    address: '456 University Ave, Palo Alto, CA',
    available: 3,
    total: 10,
    chargingSpeed: 250
  },
  {
    id: 'cs3',
    name: 'Mountain View Station',
    location: {
      lat: 37.3861,
      lng: -122.0839
    },
    address: '789 Castro St, Mountain View, CA',
    available: 0,
    total: 6,
    chargingSpeed: 150
  },
  {
    id: 'cs4',
    name: 'Los Angeles Supercharger',
    location: {
      lat: 34.0522,
      lng: -118.2437
    },
    address: '123 Main St, Los Angeles, CA',
    available: 7,
    total: 12,
    chargingSpeed: 250
  },
  {
    id: 'cs5',
    name: 'New York City Station',
    location: {
      lat: 40.7128,
      lng: -74.006
    },
    address: '456 Broadway, New York, NY',
    available: 2,
    total: 8,
    chargingSpeed: 150
  },
  {
    id: 'cs6',
    name: 'Seattle Supercharger',
    location: {
      lat: 47.6062,
      lng: -122.3321
    },
    address: '789 Pike St, Seattle, WA',
    available: 4,
    total: 6,
    chargingSpeed: 250
  }
];

const Locations = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('globe');
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Locations</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find Tesla charging stations and rental pickup locations near you. We're expanding our network every month.
          </p>
        </div>
        
        <div className="mb-6 flex justify-center gap-4">
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'}
            className={viewMode === 'map' ? 'bg-tesla-blue hover:bg-tesla-blue/90' : 'border-glass-border bg-glass hover:bg-white/10'}
            onClick={() => setViewMode('map')}
          >
            <MapPin className="mr-2 h-4 w-4" /> 2D Map
          </Button>
          <Button 
            variant={viewMode === 'globe' ? 'default' : 'outline'}
            className={viewMode === 'globe' ? 'bg-tesla-blue hover:bg-tesla-blue/90' : 'border-glass-border bg-glass hover:bg-white/10'}
            onClick={() => setViewMode('globe')}
          >
            <Globe className="mr-2 h-4 w-4" /> 3D Globe
          </Button>
        </div>
        
        <div className="mb-12">
          {viewMode === 'map' ? (
            <div className="glass-card p-4 md:p-6 rounded-xl h-[400px] md:h-[500px] relative">
              <Map 
                center={{ lat: 37.7749, lng: -122.4194 }} 
                zoom={9} 
                stations={chargingStations}
              />
            </div>
          ) : (
            <GlobeDemo stations={chargingStations} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chargingStations.map((station) => (
            <div key={station.id} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{station.name}</h3>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full 
                    ${station.available > 0 ? 'bg-tesla-green/20 text-tesla-green' : 'bg-tesla-red/20 text-tesla-red'}`}>
                    {station.available > 0 ? `${station.available}/${station.total} Available` : 'Currently Full'}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-white/70">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{station.address}</span>
                </div>
                
                <div className="flex justify-between bg-glass-highlight rounded p-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-white/70">Speed</div>
                    <div className="flex items-center justify-center gap-1 font-medium">
                      <Zap className="h-3 w-3 text-tesla-blue" />
                      {station.chargingSpeed} kW
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-white/70">Status</div>
                    <div className="font-medium">
                      {station.available > 0 ? 'Open' : 'Full'}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-white/70">Hours</div>
                    <div className="font-medium">24/7</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-glass-border bg-glass hover:bg-white/10"
                    onClick={() => window.open(`https://maps.google.com/?q=${station.location.lat},${station.location.lng}`, '_blank')}
                  >
                    Directions
                  </Button>
                  <Button 
                    className="flex-1 bg-tesla-blue hover:bg-tesla-blue/90"
                    onClick={() => navigate('/vehicles')}
                  >
                    Rent Near Here
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glass-card p-6 rounded-xl mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-tesla-blue/20 p-2 rounded-full text-tesla-blue mt-1">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About Our Locations</h3>
              <p className="text-white/80 mb-4">
                Our growing network of Tesla Superchargers and destination charging locations enable Tesla owners to drive throughout North America. Find the nearest Supercharger location for fast, convenient charging for your Tesla.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-glass p-4 rounded">
                  <h4 className="font-bold mb-2">Superchargers</h4>
                  <p className="text-sm text-white/70">
                    Superchargers deliver up to 250kW of power, adding up to 200 miles of range in just 15 minutes of charging.
                  </p>
                </div>
                <div className="bg-glass p-4 rounded">
                  <h4 className="font-bold mb-2">Destination Chargers</h4>
                  <p className="text-sm text-white/70">
                    Located at hotels, restaurants, and shopping centers, these chargers provide up to 40 miles of range per hour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See a Location Near You?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our network of locations. Sign up to be notified when we open a new location in your area.
          </p>
          <Button className="bg-tesla-blue hover:bg-tesla-blue/90">
            Request a Location
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Locations;
