
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import GlobeDemo from '@/components/ui/globe-demo';
import { MapPin, Info, Zap, Globe, ChevronRight, Clock, ChevronDown } from 'lucide-react';
import { ChargingStation } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto px-4 py-16 mt-14 md:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Our Locations</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find Tesla charging stations and rental pickup locations near you. We're expanding our network every month.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-6 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            variant={viewMode === 'map' ? 'glx-neo' : 'glx-glass'}
            className="group relative overflow-hidden"
            onClick={() => setViewMode('map')}
          >
            <MapPin className="mr-2 h-4 w-4" /> 
            <span>2D Map</span>
            {viewMode === 'map' && (
              <motion.div
                layoutId="viewIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-tesla-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Button>
          <Button 
            variant={viewMode === 'globe' ? 'glx-neo' : 'glx-glass'}
            className="group relative overflow-hidden"
            onClick={() => setViewMode('globe')}
          >
            <Globe className="mr-2 h-4 w-4" /> 
            <span>3D Globe</span>
            {viewMode === 'globe' && (
              <motion.div
                layoutId="viewIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-tesla-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Button>
        </motion.div>
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'map' ? (
                <div className="rounded-xl overflow-hidden h-[400px] md:h-[500px] relative">
                  <Map 
                    center={{ lat: 37.7749, lng: -122.4194 }} 
                    zoom={9} 
                    stations={chargingStations}
                  />
                </div>
              ) : (
                <GlobeDemo stations={chargingStations} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {chargingStations.map((station, index) => (
            <motion.div 
              key={station.id}
              className="glass-card overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{station.name}</h3>
                  <motion.div 
                    className={`text-xs font-medium px-2 py-1 rounded-full 
                      ${station.available > 0 ? 'bg-tesla-green/20 text-tesla-green' : 'bg-tesla-red/20 text-tesla-red'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {station.available > 0 ? `${station.available}/${station.total} Available` : 'Currently Full'}
                  </motion.div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-white/70">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{station.address}</span>
                </div>
                
                <div className="flex justify-between rounded p-3 mb-4 backdrop-blur-md bg-white/[0.02]">
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
                    <div className="font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      24/7
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="glx-glass" 
                    className="flex-1 group"
                    onClick={() => window.open(`https://maps.google.com/?q=${station.location.lat},${station.location.lng}`, '_blank')}
                  >
                    <span>Directions</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="glx-neo"
                    className="flex-1 bg-gradient-to-r from-tesla-blue/90 to-tesla-purple/90 border-none"
                    onClick={() => navigate('/vehicles')}
                  >
                    Rent Near Here
                  </Button>
                </div>
              </div>
              
              {/* Subtle hover indicator */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tesla-blue to-tesla-purple opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="rounded-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-white/[0.03] p-6 rounded-xl">
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
                  <div className="backdrop-blur-xl bg-white/[0.02] p-4 rounded transition-transform hover:translate-y-[-2px]">
                    <h4 className="font-bold mb-2">Superchargers</h4>
                    <p className="text-sm text-white/70">
                      Superchargers deliver up to 250kW of power, adding up to 200 miles of range in just 15 minutes of charging.
                    </p>
                  </div>
                  <div className="backdrop-blur-xl bg-white/[0.02] p-4 rounded transition-transform hover:translate-y-[-2px]">
                    <h4 className="font-bold mb-2">Destination Chargers</h4>
                    <p className="text-sm text-white/70">
                      Located at hotels, restaurants, and shopping centers, these chargers provide up to 40 miles of range per hour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Don't See a Location Near You?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our network of locations. Sign up to be notified when we open a new location in your area.
          </p>
          <Button 
            variant="glx-gradient" 
            size="lg"
            className="group"
          >
            Request a Location
            <ChevronDown className="ml-1 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Locations;
