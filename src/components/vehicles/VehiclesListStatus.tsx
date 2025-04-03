
import React from 'react';

interface VehiclesListStatusProps {
  count: number;
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const VehiclesListStatus: React.FC<VehiclesListStatusProps> = ({ 
  count, 
  sortBy, 
  onSortChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-white/70">
        <span className="text-white font-medium">{count}</span> vehicles available
      </p>
      <div className="hidden md:flex items-center glass-effect px-3 py-1.5 rounded-lg">
        <span className="text-sm text-white/70 mr-2">Sort by:</span>
        <select 
          className="bg-transparent text-sm border-none outline-none cursor-pointer"
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="price-low" className="bg-tesla-dark">Price (Low to High)</option>
          <option value="price-high" className="bg-tesla-dark">Price (High to Low)</option>
          <option value="range" className="bg-tesla-dark">Range</option>
          <option value="acceleration" className="bg-tesla-dark">Acceleration</option>
        </select>
      </div>
    </div>
  );
};

export default VehiclesListStatus;
