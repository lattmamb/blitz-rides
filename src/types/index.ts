export interface Vehicle {
  id: string;
  model: string;
  type: 'sedan' | 'suv' | 'truck' | 'sports';
  image: string;
  price: number;
  priceUnit: string;
  tagline: string;
  features: string[];
  performance: {
    range: number;
    topSpeed: number;
    acceleration: number;
  };
  available: boolean;
  colors: string[];
  colorImages?: {
    [key: string]: string;
  };
  rating?: number;
  reviewCount?: number;
  model3D?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  duration: string;
  features: string[];
  recommended?: boolean;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  available: number;
  total: number;
  chargingSpeed: number;
}

export interface UserBooking {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  planId: string;
  totalCost: number;
}
