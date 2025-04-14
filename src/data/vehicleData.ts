
import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'model-s',
    model: 'Model S',
    type: 'sedan',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png',
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
      '#FFFFFF': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png',
      '#000000': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Model-S-Main-Hero-Desktop-LHD-Animation.png',
      '#C0C0C0': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Exterior-Gray-Desktop.png',
    },
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: 'model-3',
    model: 'Model 3',
    type: 'sedan',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-LHD.png',
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
      '#FFFFFF': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-LHD.png',
      '#FF0000': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.png',
    },
    rating: 4.7,
    reviewCount: 215
  },
  {
    id: 'model-x',
    model: 'Model X',
    type: 'suv',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png',
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
      '#FFFFFF': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png',
      '#000000': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Exterior-Hero-Desktop-Global.png',
    },
    rating: 4.8,
    reviewCount: 92
  },
  {
    id: 'model-y',
    model: 'Model Y',
    type: 'suv',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y.png',
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
      '#FFFFFF': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y.png',
      '#FF0000': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-Global.png',
    },
    rating: 4.6,
    reviewCount: 187
  },
  {
    id: 'cybertruck',
    model: 'Cybertruck',
    type: 'truck',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Cybertruck.png',
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
      '#C0C0C0': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Cybertruck.png',
    },
    rating: 4.9,
    reviewCount: 76
  },
  {
    id: 'roadster',
    model: 'Roadster',
    type: 'sports',
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/roadster_front.png',
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
      '#FF0000': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/roadster_front.png',
      '#FFFFFF': 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/roadster_side.png',
    },
    rating: 5.0,
    reviewCount: 42
  }
];
