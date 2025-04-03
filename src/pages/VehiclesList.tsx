
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle } from '@/types';
import { Filter, Sliders, Car, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

const VehiclesList: React.FC = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [filters, setFilters] = useState({
    types: ['sedan', 'suv', 'truck', 'sports'],
    priceRange: [0, 500],
    availability: true,
    sortBy: 'price-low' // 'price-low', 'price-high', 'range', 'acceleration'
  });

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState({
    type: true,
    price: true,
    availability: true
  });

  useEffect(() => {
    let result = [...vehicles];
    
    // Apply type filter
    if (filters.types.length > 0 && filters.types.length < 4) {
      result = result.filter(vehicle => 
        filters.types.includes(vehicle.type)
      );
    }
    
    // Apply price filter
    result = result.filter(vehicle => 
      vehicle.price >= filters.priceRange[0] && 
      vehicle.price <= filters.priceRange[1]
    );
    
    // Apply availability filter
    if (filters.availability) {
      result = result.filter(vehicle => vehicle.available);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'range':
        result.sort((a, b) => b.performance.range - a.performance.range);
        break;
      case 'acceleration':
        result.sort((a, b) => a.performance.acceleration - b.performance.acceleration);
        break;
      default:
        break;
    }
    
    setFilteredVehicles(result);
  }, [filters]);

  const handleTypeChange = (type: 'sedan' | 'suv' | 'truck' | 'sports', checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return;
    
    setFilters(prev => ({
      ...prev,
      types: checked 
        ? [...prev.types, type] 
        : prev.types.filter(t => t !== type)
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }));
  };

  const handleAvailabilityChange = (checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return;
    
    setFilters(prev => ({
      ...prev,
      availability: checked
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value
    }));
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">Our Vehicle Fleet</h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Browse our selection of premium electric vehicles available for subscription
          </p>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" /> 
                Filters & Sorting
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-effect border-glass-border bg-tesla-dark-80">
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                <MobileFilters 
                  filters={filters} 
                  onTypeChange={handleTypeChange}
                  onPriceChange={handlePriceChange}
                  onAvailabilityChange={handleAvailabilityChange}
                  onSortChange={handleSortChange}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-full md:w-64">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center mb-5">
                <Sliders className="h-5 w-5 text-tesla-blue mr-2" />
                <h3 className="text-lg font-medium">Filters</h3>
              </div>
              
              <DesktopFilters 
                filters={filters}
                isCollapsibleOpen={isCollapsibleOpen}
                setIsCollapsibleOpen={setIsCollapsibleOpen}
                onTypeChange={handleTypeChange}
                onPriceChange={handlePriceChange}
                onAvailabilityChange={handleAvailabilityChange}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          
          {/* Vehicle Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-5">
              <p className="text-white/70">
                <span className="text-white font-medium">{filteredVehicles.length}</span> vehicles available
              </p>
              <div className="hidden md:flex items-center glass-effect px-3 py-1.5 rounded-lg">
                <span className="text-sm text-white/70 mr-2">Sort by:</span>
                <select 
                  className="bg-transparent text-sm border-none outline-none cursor-pointer"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="price-low" className="bg-tesla-dark">Price (Low to High)</option>
                  <option value="price-high" className="bg-tesla-dark">Price (High to Low)</option>
                  <option value="range" className="bg-tesla-dark">Range</option>
                  <option value="acceleration" className="bg-tesla-dark">Acceleration</option>
                </select>
              </div>
            </div>
            
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <Car className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
                <p className="text-white/70 mb-4">Try adjusting your filters to see more vehicles</p>
                <Button 
                  variant="outline" 
                  className="border-tesla-blue/50 hover:bg-tesla-blue/20"
                  onClick={() => setFilters({
                    types: ['sedan', 'suv', 'truck', 'sports'],
                    priceRange: [0, 500],
                    availability: true,
                    sortBy: 'price-low'
                  })}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

interface FiltersProps {
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

interface DesktopFiltersProps extends FiltersProps {
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

const MobileFilters: React.FC<FiltersProps> = ({
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

export default VehiclesList;
