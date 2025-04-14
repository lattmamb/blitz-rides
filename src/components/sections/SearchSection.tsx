
import React from 'react';
import SearchFilter from '@/components/SearchFilter';

interface SearchSectionProps {
  onSearch: (filters: {
    query: string;
    vehicleType: string;
    location: string;
    dateRange: string;
  }) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <SearchFilter onSearch={onSearch} />
    </div>
  );
};

export default SearchSection;
