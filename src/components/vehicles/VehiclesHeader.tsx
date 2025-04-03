
import React from 'react';

interface VehiclesHeaderProps {
  title: string;
  description: string;
}

const VehiclesHeader: React.FC<VehiclesHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold gradient-text mb-2">{title}</h1>
      <p className="text-lg text-white/70 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default VehiclesHeader;
