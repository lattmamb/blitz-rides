
import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'model-s',
    model: 'Model S',
    type: 'sedan',
    image: '',
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
    image: '',
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
    colorImages: {}
  },
  {
    id: 'model-x',
    model: 'Model X',
    type: 'suv',
    image: '',
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
    colors: ['#FFFFFF', '#000000', '#C0C0C0', '#0000FF'],
    colorImages: {}
  },
  {
    id: 'model-y',
    model: 'Model Y',
    type: 'suv',
    image: '',
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
    colors: ['#FFFFFF', '#000000', '#C0C0C0', '#FF0000'],
    colorImages: {}
  },
  {
    id: 'cybertruck',
    model: 'Cybertruck',
    type: 'truck',
    image: '',
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
    colors: ['#C0C0C0'],
    colorImages: {}
  }
];
