
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types';

interface RelatedVehiclesProps {
  currentVehicleId: string;
  vehicles: Vehicle[];
}

const RelatedVehicles: React.FC<RelatedVehiclesProps> = ({ currentVehicleId, vehicles }) => {
  const relatedVehicles = vehicles
    .filter(v => v.id !== currentVehicleId)
    .slice(0, 3);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedVehicles.map(relatedVehicle => (
          <Link key={relatedVehicle.id} to={`/vehicles/${relatedVehicle.id}`}>
            <div className="glass-card p-4 hover:border-tesla-blue/30 transition-all group">
              <div className="relative h-36 flex items-center justify-center mb-4">
                <img
                  src={relatedVehicle.image}
                  alt={relatedVehicle.model}
                  className="h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold">{relatedVehicle.model}</h3>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold">${relatedVehicle.price}</span>
                  <span className="text-white/70 text-sm">{relatedVehicle.priceUnit}</span>
                </div>
                <div className="text-sm text-tesla-blue">View Details</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedVehicles;
