
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, Car, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SearchFilterProps {
  onSearch: (filters: {
    query: string;
    vehicleType: string;
    location: string;
    dateRange: string;
  }) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [vehicleType, setVehicleType] = useState("all");
  const [location, setLocation] = useState("all");
  const [dateRange, setDateRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      vehicleType,
      location,
      dateRange,
    });
  };

  return (
    <motion.div 
      className="glass-card py-8 px-8 w-full max-w-6xl mx-auto -mt-28 relative z-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Find Your Perfect Tesla
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <motion.div 
          className="glass-effect p-4 rounded-xl flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Search className="h-5 w-5 text-tesla-blue" />
          <input
            type="text"
            placeholder="Search by model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-white placeholder-white/50"
          />
        </motion.div>

        <motion.div 
          className="glass-effect p-4 rounded-xl flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Car className="h-5 w-5 text-tesla-blue" />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-white appearance-none cursor-pointer"
          >
            <option value="all" className="bg-tesla-dark">All Types</option>
            <option value="sedan" className="bg-tesla-dark">Sedan</option>
            <option value="suv" className="bg-tesla-dark">SUV</option>
            <option value="truck" className="bg-tesla-dark">Truck</option>
            <option value="sports" className="bg-tesla-dark">Sports</option>
          </select>
          <div className="pointer-events-none">
            <ArrowRight className="h-4 w-4 text-white/50 rotate-90" />
          </div>
        </motion.div>

        <motion.div 
          className="glass-effect p-4 rounded-xl flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MapPin className="h-5 w-5 text-tesla-blue" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-white appearance-none cursor-pointer"
          >
            <option value="all" className="bg-tesla-dark">All Locations</option>
            <option value="sf" className="bg-tesla-dark">San Francisco</option>
            <option value="la" className="bg-tesla-dark">Los Angeles</option>
            <option value="ny" className="bg-tesla-dark">New York</option>
            <option value="chicago" className="bg-tesla-dark">Chicago</option>
          </select>
          <div className="pointer-events-none">
            <ArrowRight className="h-4 w-4 text-white/50 rotate-90" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            type="submit" 
            className="w-full h-full bg-gradient-to-r from-tesla-blue to-tesla-purple hover:brightness-110 transition-all flex items-center justify-center gap-2 text-white"
          >
            <span>Search</span>
            <Search className="h-4 w-4" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default SearchFilter;
