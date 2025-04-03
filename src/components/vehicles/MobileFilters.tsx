
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface MobileFiltersProps {
  filters: {
    types: string[];
    priceRange: number[];
    availability: boolean;
    sortBy: string;
  };
  onTypeChange: (type: 'sedan' | 'suv' | 'truck' | 'sports', checked: boolean | 'indeterminate') => void;
  onPriceChange: (value: number[]) => void;
  onAvailabilityChange: (checked: boolean | 'indeterminate') => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  filters,
  onTypeChange,
  onPriceChange,
  onAvailabilityChange,
  onSortChange
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-white/10 pb-4">
        <h4 className="text-sm font-medium mb-2">Vehicle Type</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mobile-sedan" 
              checked={filters.types.includes('sedan')}
              onCheckedChange={(checked) => onTypeChange('sedan', checked)}
            />
            <label htmlFor="mobile-sedan" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sedan
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mobile-suv" 
              checked={filters.types.includes('suv')}
              onCheckedChange={(checked) => onTypeChange('suv', checked)}
            />
            <label htmlFor="mobile-suv" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              SUV
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mobile-truck" 
              checked={filters.types.includes('truck')}
              onCheckedChange={(checked) => onTypeChange('truck', checked)}
            />
            <label htmlFor="mobile-truck" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Truck
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mobile-sports" 
              checked={filters.types.includes('sports')}
              onCheckedChange={(checked) => onTypeChange('sports', checked)}
            />
            <label htmlFor="mobile-sports" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sports
            </label>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 pb-4">
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <div className="px-1">
          <Slider 
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]} 
            min={0}
            max={500}
            step={10}
            onValueChange={onPriceChange}
            className="mb-6"
          />
          <div className="flex justify-between text-sm text-white/70">
            <div>${filters.priceRange[0]}/mo</div>
            <div>${filters.priceRange[1]}/mo</div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 pb-4">
        <h4 className="text-sm font-medium mb-2">Availability</h4>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="mobile-availability" 
            checked={filters.availability}
            onCheckedChange={onAvailabilityChange}
          />
          <label htmlFor="mobile-availability" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Show only available vehicles
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Sort By</h4>
        <select 
          className="glass-effect w-full py-2 px-3 rounded text-sm border border-glass-border outline-none cursor-pointer"
          value={filters.sortBy}
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

export default MobileFilters;
