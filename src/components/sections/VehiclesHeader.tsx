
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface VehiclesHeaderProps {
  onFilter: (filters: {
    query: string;
    vehicleType: string;
    location?: string;
    dateRange?: string;
  }) => void;
}

const VehiclesHeader: React.FC<VehiclesHeaderProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('all');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('');
  const { theme } = useTheme();
  
  // Vehicle types
  const vehicleTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'crossover', label: 'Crossover' },
    { value: 'truck', label: 'Truck' },
    { value: 'roadster', label: 'Roadster' }
  ];
  
  // Apply filters
  const handleApplyFilters = () => {
    onFilter({
      query,
      vehicleType,
      location,
      dateRange
    });
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setQuery('');
    setVehicleType('all');
    setLocation('');
    setDateRange('');
    
    onFilter({
      query: '',
      vehicleType: 'all',
      location: '',
      dateRange: ''
    });
  };
  
  // Auto-apply filters on change
  useEffect(() => {
    const timerId = setTimeout(() => {
      handleApplyFilters();
    }, 500);
    
    return () => clearTimeout(timerId);
  }, [query, vehicleType]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className={cn(
          "text-4xl md:text-5xl font-bold mb-4",
          theme === 'neoPulse' ? "neo-pulse-text" :
          theme === 'quantumGlass' ? "quantum-glass-text" :
          "orbital-dark-text"
        )}>
          Our Tesla Fleet
        </h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          Browse our selection of premium electric vehicles available for booking
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 rounded-2xl mb-10"
      >
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search input */}
          <div className="flex-1 relative">
            <label className="text-sm text-white/70 mb-1 block">
              Search Vehicles
            </label>
            <div className="relative">
              <Input
                className={cn(
                  "pl-10 transition-all duration-200",
                  theme === 'neoPulse' ? "border-tesla-blue/20 focus-visible:border-tesla-blue/50" :
                  theme === 'quantumGlass' ? "border-white/10 focus-visible:border-white/30" :
                  "border-tesla-purple/20 focus-visible:border-tesla-purple/50"
                )}
                placeholder="Search by model, type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              {query && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  onClick={() => setQuery('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Vehicle type filter */}
          <div className="md:w-1/4">
            <label className="text-sm text-white/70 mb-1 block">
              Vehicle Type
            </label>
            <select
              className={cn(
                "w-full rounded-md border bg-background px-3 h-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                theme === 'neoPulse' ? "border-tesla-blue/20 focus-visible:ring-tesla-blue/50" :
                theme === 'quantumGlass' ? "border-white/10 focus-visible:ring-white/30" :
                "border-tesla-purple/20 focus-visible:ring-tesla-purple/50"
              )}
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              {vehicleTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Advanced filters toggle */}
          <div>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {isAdvancedOpen ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
          
          {/* Quick clear button (shows when filters are active) */}
          {(query || vehicleType !== 'all' || location || dateRange) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
                onClick={handleClearFilters}
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Advanced filters (expandable) */}
        <AnimatePresence>
          {isAdvancedOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                <div>
                  <label className="text-sm text-white/70 mb-1 block">
                    Location
                  </label>
                  <Input
                    placeholder="All locations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-white/10 focus-visible:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70 mb-1 block">
                    Date Range
                  </label>
                  <Input
                    placeholder="Any dates"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border-white/10 focus-visible:border-white/30"
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end mt-2">
                  <Button 
                    variant="default"
                    className={cn(
                      theme === 'neoPulse' ? "bg-tesla-blue hover:bg-tesla-blue/90" :
                      theme === 'quantumGlass' ? "bg-white/10 hover:bg-white/20" :
                      "bg-tesla-purple hover:bg-tesla-purple/90"
                    )}
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VehiclesHeader;
