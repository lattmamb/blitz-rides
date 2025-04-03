import { Vehicle, SubscriptionPlan, ChargingStation } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'model-s',
    model: 'Model S',
    type: 'sedan',
    image: '/lovable-uploads/011215ed-22f9-4462-8492-3cdff3c58719.png',
    price: 249,
    priceUnit: '/mo',
    tagline: 'Premium electric sedan with incredible range',
    features: [
      'Range: 405 miles',
      '0-60 mph in 3.1 seconds',
      'Autopilot included',
      'Premium interior',
      'Over-the-air updates'
    ],
    performance: {
      range: 405,
      topSpeed: 149,
      acceleration: 3.1,
    },
    available: true,
    colors: ['#FFFFFF', '#000000', '#C0C0C0', '#FF0000', '#0000FF'],
    colorImages: {}
  },
  {
    id: 'model-3',
    model: 'Model 3',
    type: 'sedan',
    image: '/lovable-uploads/47d60302-d1d8-4ed9-8a86-587ee94631b8.png',
    price: 189,
    priceUnit: '/mo',
    tagline: 'Affordable electric sedan with amazing value',
    features: [
      'Range: 358 miles',
      '0-60 mph in 5.8 seconds',
      'Autopilot included',
      'Minimalist interior',
      'Over-the-air updates'
    ],
    performance: {
      range: 358,
      topSpeed: 140,
      acceleration: 5.8,
    },
    available: true,
    colors: ['#FFFFFF', '#FF0000', '#0000FF'],
    colorImages: {
      '#FFFFFF': '/lovable-uploads/47d60302-d1d8-4ed9-8a86-587ee94631b8.png',
      '#FF0000': '/lovable-uploads/7d31401b-90e8-420a-ac1a-0553b705632e.png',
      '#0000FF': '/lovable-uploads/69f7e81d-c631-418d-b38c-f1eedf3c0f12.png',
    }
  },
  {
    id: 'model-x',
    model: 'Model X',
    type: 'suv',
    image: '/lovable-uploads/87310600-2a51-4edd-a0b3-4ae26fc44398.png',
    price: 299,
    priceUnit: '/mo',
    tagline: 'Premium SUV with falcon wing doors',
    features: [
      'Range: 348 miles',
      '0-60 mph in 3.8 seconds',
      'Falcon wing doors',
      'Seats up to 7',
      'Autopilot included'
    ],
    performance: {
      range: 348,
      topSpeed: 155,
      acceleration: 3.8,
    },
    available: true,
    colors: ['#FFFFFF', '#000000', '#C0C0C0', '#0000FF']
  },
  {
    id: 'model-y',
    model: 'Model Y',
    type: 'suv',
    image: '/lovable-uploads/e42401ea-2fd0-4cf6-aeda-6103d873b447.png',
    price: 199,
    priceUnit: '/mo',
    tagline: 'Versatile electric crossover SUV',
    features: [
      'Range: 330 miles',
      '0-60 mph in 4.8 seconds',
      'Autopilot included',
      'Spacious interior',
      'Over-the-air updates'
    ],
    performance: {
      range: 330,
      topSpeed: 135,
      acceleration: 4.8,
    },
    available: true,
    colors: ['#FFFFFF', '#000000', '#C0C0C0', '#FF0000']
  },
  {
    id: 'cybertruck',
    model: 'Cybertruck',
    type: 'truck',
    image: '/lovable-uploads/02bed47b-1f8e-4f76-96e0-fe121baef92e.png',
    price: 349,
    priceUnit: '/mo',
    tagline: 'Futuristic electric pickup truck',
    features: [
      'Range: 500+ miles',
      '0-60 mph in 2.9 seconds',
      'Exoskeleton design',
      'Adaptive air suspension',
      'Up to 14,000 lb towing'
    ],
    performance: {
      range: 500,
      topSpeed: 130,
      acceleration: 2.9,
    },
    available: true,
    colors: ['#C0C0C0']
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'flex-month',
    name: 'Flex Monthly',
    price: 149,
    priceUnit: '/mo',
    duration: 'Monthly',
    features: [
      'Monthly renewal',
      'Switch vehicles once a month',
      'Basic insurance included',
      'Maintenance included',
      'Up to 1,000 miles/month'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 129,
    priceUnit: '/mo',
    duration: '3 Months',
    features: [
      '3-month commitment',
      'Switch vehicles once a month',
      'Standard insurance included',
      'Maintenance included',
      'Up to 1,500 miles/month'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 109,
    priceUnit: '/mo',
    duration: '6 Months',
    features: [
      '6-month commitment',
      'Switch vehicles anytime',
      'Premium insurance included',
      'Maintenance included',
      'Up to 2,000 miles/month'
    ]
  }
];

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
