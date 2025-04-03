
import { ChargingStation } from '../types';

export const chargingStations: ChargingStation[] = [
  {
    id: 'cs-1',
    name: 'Downtown Supercharger',
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    address: '123 Market St, San Francisco, CA',
    available: 8,
    total: 12,
    chargingSpeed: 250
  },
  {
    id: 'cs-2',
    name: 'North Beach Station',
    location: {
      lat: 37.8010,
      lng: -122.4119
    },
    address: '456 Bay St, San Francisco, CA',
    available: 3,
    total: 8,
    chargingSpeed: 150
  },
  {
    id: 'cs-3',
    name: 'Mission District Hub',
    location: {
      lat: 37.7599,
      lng: -122.4148
    },
    address: '789 Valencia St, San Francisco, CA',
    available: 5,
    total: 10,
    chargingSpeed: 250
  }
];
