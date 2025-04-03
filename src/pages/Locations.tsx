
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Clock, Car, Search } from 'lucide-react';

// Sample location data
const locations = [
  {
    id: 1,
    name: 'San Francisco',
    address: '123 Market St, San Francisco, CA 94105',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-5PM',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    availableVehicles: 12
  },
  {
    id: 2,
    name: 'Palo Alto',
    address: '456 University Ave, Palo Alto, CA 94301',
    phone: '(650) 555-2345',
    hours: 'Mon-Fri: 10AM-8PM, Sat-Sun: 10AM-6PM',
    coordinates: { lat: 37.4419, lng: -122.1430 },
    availableVehicles: 8
  },
  {
    id: 3,
    name: 'Los Angeles',
    address: '789 Hollywood Blvd, Los Angeles, CA 90028',
    phone: '(213) 555-3456',
    hours: 'Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-7PM',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    availableVehicles: 15
  },
  {
    id: 4,
    name: 'San Diego',
    address: '321 Pacific Highway, San Diego, CA 92101',
    phone: '(619) 555-4567',
    hours: 'Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-5PM',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    availableVehicles: 10
  },
  {
    id: 5,
    name: 'Sacramento',
    address: '654 Capitol Mall, Sacramento, CA 95814',
    phone: '(916) 555-5678',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed',
    coordinates: { lat: 38.5816, lng: -121.4944 },
    availableVehicles: 6
  }
];

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [mapZoom, setMapZoom] = useState(6);
  
  // Filter locations based on search
  const filteredLocations = locations.filter(
    location => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle location selection
  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(locationId);
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setMapCenter(location.coordinates);
      setMapZoom(14);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 mt-14 md:mt-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Locations</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Find the nearest CarFleet location to browse our vehicles, schedule a test drive, or pick up your subscription.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Locations List */}
          <div className="md:col-span-1">
            <div className="glass-card p-6 mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/70" />
                <Input
                  className="pl-10 bg-transparent border-glass-border focus:border-tesla-blue"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="text-sm text-white/70 mb-4">
                {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
              </div>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {filteredLocations.map(location => (
                  <Card 
                    key={location.id} 
                    className={`glass-card cursor-pointer transition-all border-0 ${
                      selectedLocation === location.id 
                        ? 'bg-glass-highlight border-l-4 border-l-tesla-blue' 
                        : 'hover:bg-glass-highlight'
                    }`}
                    onClick={() => handleLocationSelect(location.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Car className="h-3 w-3 mr-1 text-tesla-blue" />
                        {location.availableVehicles} vehicles available
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-white/70 mt-1 flex-shrink-0" />
                        <span className="text-white/70">{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-white/70" />
                        <span className="text-white/70">{location.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map View */}
          <div className="md:col-span-2">
            <Map 
              className="h-[500px] glass-card p-0 overflow-hidden"
              center={mapCenter}
              zoom={mapZoom}
            />
            
            {/* Selected Location Details */}
            {selectedLocation && (
              <div className="mt-6">
                {locations
                  .filter(loc => loc.id === selectedLocation)
                  .map(location => (
                    <Card key={location.id} className="glass-card">
                      <CardHeader>
                        <CardTitle>{location.name} Location</CardTitle>
                        <CardDescription>
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1 text-tesla-blue" />
                            {location.availableVehicles} vehicles currently available
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-white/70 mb-1">Address</div>
                            <div className="flex items-start gap-2 mb-3">
                              <MapPin className="h-5 w-5 text-tesla-blue mt-0.5 flex-shrink-0" />
                              <p>{location.address}</p>
                            </div>
                            
                            <div className="text-sm text-white/70 mb-1">Phone</div>
                            <div className="flex items-center gap-2 mb-3">
                              <Phone className="h-5 w-5 text-tesla-blue" />
                              <p>{location.phone}</p>
                            </div>
                            
                            <div className="text-sm text-white/70 mb-1">Hours</div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-tesla-blue" />
                              <p>{location.hours}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="space-y-4">
                              <Button 
                                className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                                onClick={() => navigate('/vehicles')}
                              >
                                Browse Available Vehicles
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full border-tesla-blue/30 hover:bg-tesla-blue/20"
                                onClick={() => window.open(`https://maps.google.com/?q=${location.address}`, '_blank')}
                              >
                                Get Directions
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full border-tesla-blue/30 hover:bg-tesla-blue/20"
                                onClick={() => window.open(`tel:${location.phone.replace(/[^0-9]/g, '')}`, '_self')}
                              >
                                Call Location
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Locations;
