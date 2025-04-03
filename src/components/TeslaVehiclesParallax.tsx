
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { vehicles } from "@/data/vehicles";

export default function TeslaVehiclesParallax() {
  // Map our vehicles data to the format expected by the HeroParallax component
  const vehicleProducts = vehicles.map(vehicle => ({
    id: vehicle.id,
    title: vehicle.model,
    link: `/vehicles/${vehicle.id}`,
    thumbnail: vehicle.image,
    price: vehicle.price,
    priceUnit: vehicle.priceUnit,
    available: vehicle.available
  }));

  return <HeroParallax vehicles={vehicleProducts} />;
}
