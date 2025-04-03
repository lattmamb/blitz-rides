
import React from "react";
import NavbarDemo from "./navbar-menu-demo";

export const VehicleHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
      <h2 className="text-2xl md:text-5xl font-bold gradient-text text-center mb-2">
        Experience Electric Luxury
      </h2>
      <p className="max-w-2xl mx-auto text-base md:text-xl mt-4 text-white/70 text-center">
        Discover our lineup of premium electric vehicles. Cutting-edge technology,
        breathtaking design, and zero emissions. Explore and reserve your Tesla today.
      </p>
      
      <div className="mt-10">
        <NavbarDemo />
      </div>
    </div>
  );
};

export default VehicleHeader;
