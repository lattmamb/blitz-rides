
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin } from "lucide-react";

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
    <div className="glass-card py-6 px-6 md:px-8 w-full max-w-6xl mx-auto -mt-20 relative z-20">
      <h2 className="text-xl font-semibold mb-4">Search Cars</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect p-3 rounded-lg flex items-center gap-3">
          <Search className="h-5 w-5 text-white/70" />
          <input
            type="text"
            placeholder="Search by name or model"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-white placeholder-white/50"
          />
        </div>

        <div className="glass-effect p-3 rounded-lg">
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
        </div>

        <div className="glass-effect p-3 rounded-lg flex items-center gap-3">
          <MapPin className="h-5 w-5 text-white/70" />
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
        </div>

        <Button 
          type="submit" 
          className="bg-tesla-blue hover:bg-tesla-blue/90 text-white"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchFilter;
