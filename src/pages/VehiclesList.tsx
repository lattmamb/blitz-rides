
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { vehicles } from '@/data/vehicles';
import { Vehicle } from '@/types';
import { Filter, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ExpandableVehiclesGrid from '@/components/ui/expandable-vehicles-grid';
import MobileFilters from '@/components/vehicles/MobileFilters';
import DesktopFilters from '@/components/vehicles/DesktopFilters';
import NoVehiclesFound from '@/components/vehicles/NoVehiclesFound';
import VehiclesHeader from '@/components/vehicles/VehiclesHeader';
import VehiclesListStatus from '@/components/vehicles/VehiclesListStatus';

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

  const resetFilters = () => {
    setFilters({
      types: ['sedan', 'suv', 'truck', 'sports'],
      priceRange: [0, 500],
      availability: true,
      sortBy: 'price-low'
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <VehiclesHeader 
          title="Our Vehicle Fleet" 
          description="Browse our selection of premium electric vehicles available for subscription" 
        />
        
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
            <VehiclesListStatus 
              count={filteredVehicles.length}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
            />
            
            {filteredVehicles.length > 0 ? (
              <ExpandableVehiclesGrid vehicles={filteredVehicles} />
            ) : (
              <NoVehiclesFound onResetFilters={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehiclesList;
