
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface DesktopFiltersProps {
  filters: {
    types: string[];
    priceRange: number[];
    availability: boolean;
    sortBy: string;
  };
  isCollapsibleOpen: {
    type: boolean;
    price: boolean;
    availability: boolean;
  };
  setIsCollapsibleOpen: React.Dispatch<React.SetStateAction<{
    type: boolean;
    price: boolean;
    availability: boolean;
  }>>;
  onTypeChange: (type: 'sedan' | 'suv' | 'truck' | 'sports', checked: boolean | 'indeterminate') => void;
  onPriceChange: (value: number[]) => void;
  onAvailabilityChange: (checked: boolean | 'indeterminate') => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DesktopFilters: React.FC<DesktopFiltersProps> = ({
  filters,
  isCollapsibleOpen,
  setIsCollapsibleOpen,
  onTypeChange,
  onPriceChange,
  onAvailabilityChange,
  onSortChange
}) => {
  return (
    <div className="space-y-5">
      <Collapsible 
        open={isCollapsibleOpen.type} 
        onOpenChange={(open) => setIsCollapsibleOpen(prev => ({ ...prev, type: open }))}
        className="border-b border-white/10 pb-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Vehicle Type</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsibleOpen.type ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sedan" 
              checked={filters.types.includes('sedan')}
              onCheckedChange={(checked) => onTypeChange('sedan', checked)}
            />
            <label htmlFor="sedan" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sedan
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="suv" 
              checked={filters.types.includes('suv')}
              onCheckedChange={(checked) => onTypeChange('suv', checked)}
            />
            <label htmlFor="suv" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              SUV
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="truck" 
              checked={filters.types.includes('truck')}
              onCheckedChange={(checked) => onTypeChange('truck', checked)}
            />
            <label htmlFor="truck" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Truck
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sports" 
              checked={filters.types.includes('sports')}
              onCheckedChange={(checked) => onTypeChange('sports', checked)}
            />
            <label htmlFor="sports" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sports
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible 
        open={isCollapsibleOpen.price} 
        onOpenChange={(open) => setIsCollapsibleOpen(prev => ({ ...prev, price: open }))}
        className="border-b border-white/10 pb-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Price Range</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsibleOpen.price ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-4">
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
        </CollapsibleContent>
      </Collapsible>

      <Collapsible 
        open={isCollapsibleOpen.availability} 
        onOpenChange={(open) => setIsCollapsibleOpen(prev => ({ ...prev, availability: open }))}
        className="border-b border-white/10 pb-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Availability</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsibleOpen.availability ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="availability" 
              checked={filters.availability}
              onCheckedChange={onAvailabilityChange}
            />
            <label htmlFor="availability" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Show only available vehicles
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

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

export default DesktopFilters;
