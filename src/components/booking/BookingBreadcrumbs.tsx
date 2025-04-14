
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Vehicle } from '@/types';

interface BookingBreadcrumbsProps {
  vehicle: Vehicle;
}

const BookingBreadcrumbs: React.FC<BookingBreadcrumbsProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="text-sm text-white/60 flex items-center">
        <Button 
          variant="link" 
          className="p-0 text-white/60 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="ml-4 flex items-center">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3 mx-2 text-white/40" />
          <Link to="/vehicles" className="hover:text-white">Vehicles</Link>
          <ChevronRight className="h-3 w-3 mx-2 text-white/40" />
          <Link to={`/vehicles/${vehicle.id}`} className="hover:text-white">{vehicle.model}</Link>
          <ChevronRight className="h-3 w-3 mx-2 text-white/40" />
          <span className="text-white">Book</span>
        </div>
      </div>
    </div>
  );
};

export default BookingBreadcrumbs;
