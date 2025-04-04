
import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'model-s',
    model: 'Model S',
    type: 'sedan',
    image: 'https://assets.aceternity.com/demos/tesla-model-s.webp',
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
    colorImages: {
      '#FFFFFF': 'https://assets.aceternity.com/demos/tesla-model-s.webp',
      '#000000': 'https://assets.aceternity.com/demos/tesla-model-s-black.webp',
      '#C0C0C0': 'https://assets.aceternity.com/demos/tesla-model-s-silver.webp',
    }
  },
  {
    id: 'model-3',
    model: 'Model 3',
    type: 'sedan',
    image: 'https://assets.aceternity.com/demos/tesla-model-3.webp',
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
      '#FFFFFF': 'https://assets.aceternity.com/demos/tesla-model-3.webp',
      '#FF0000': 'https://assets.aceternity.com/demos/tesla-model-3-red.webp',
    }
  },
  {
    id: 'model-x',
    model: 'Model X',
    type: 'suv',
    image: 'https://assets.aceternity.com/demos/tesla-model-x.webp',
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
    colorImages: {
      '#FFFFFF': 'https://assets.aceternity.com/demos/tesla-model-x.webp',
      '#000000': 'https://assets.aceternity.com/demos/tesla-model-x-black.webp',
    }
  },
  {
    id: 'model-y',
    model: 'Model Y',
    type: 'suv',
    image: 'https://assets.aceternity.com/demos/tesla-model-y.webp',
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
    colorImages: {
      '#FFFFFF': 'https://assets.aceternity.com/demos/tesla-model-y.webp',
      '#FF0000': 'https://assets.aceternity.com/demos/tesla-model-y-red.webp',
    }
  },
  {
    id: 'cybertruck',
    model: 'Cybertruck',
    type: 'truck',
    image: 'https://assets.aceternity.com/demos/tesla-cybertruck.webp',
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
    colorImages: {
      '#C0C0C0': 'https://assets.aceternity.com/demos/tesla-cybertruck.webp',
    }
  },
  {
    id: 'roadster',
    model: 'Roadster',
    type: 'sports',
    image: 'https://assets.aceternity.com/demos/tesla-roadster.webp',
    price: 499,
    priceUnit: '/mo',
    tagline: 'The quickest car in the world with record-setting acceleration',
    features: [
      'Range: 620 miles',
      '0-60 mph in 1.9 seconds',
      '250+ mph top speed',
      'Removable glass roof',
      'All-wheel drive'
    ],
    performance: {
      range: 620,
      topSpeed: 250,
      acceleration: 1.9,
    },
    available: true,
    colors: ['#FF0000', '#FFFFFF', '#000000'],
    colorImages: {
      '#FF0000': 'https://assets.aceternity.com/demos/tesla-roadster.webp',
      '#FFFFFF': 'https://assets.aceternity.com/demos/tesla-roadster-white.webp',
    }
  }
];
