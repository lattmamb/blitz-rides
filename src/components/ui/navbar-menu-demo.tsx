
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center py-10 mt-4">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  const menuVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={menuVariants}
      className={cn("fixed top-4 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Vehicles" data-menu-item="Vehicles">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/vehicles?type=sedan">Sedans</HoveredLink>
            <HoveredLink to="/vehicles?type=suv">SUVs</HoveredLink>
            <HoveredLink to="/vehicles?type=truck">Trucks</HoveredLink>
            <HoveredLink to="/vehicles?type=sports">Sports</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Fleet" data-menu-item="Fleet">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Model S"
              href="/vehicles/model-s"
              src="https://assets.aceternity.com/demos/tesla-model-s.webp"
              description="Luxury sedan with exceptional range and performance."
            />
            <ProductItem
              title="Model X"
              href="/vehicles/model-x"
              src="https://assets.aceternity.com/demos/tesla-model-x.webp"
              description="SUV with falcon-wing doors and spacious interior."
            />
            <ProductItem
              title="Model 3"
              href="/vehicles/model-3"
              src="https://assets.aceternity.com/demos/tesla-model-3.webp"
              description="Affordable sedan with cutting-edge technology."
            />
            <ProductItem
              title="Roadster"
              href="/vehicles/roadster"
              src="https://assets.aceternity.com/demos/tesla-roadster.webp"
              description="Revolutionary electric supercar with unmatched performance."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Plans" data-menu-item="Plans">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/pricing#daily">Daily Rental</HoveredLink>
            <HoveredLink to="/pricing#weekly">Weekly Rental</HoveredLink>
            <HoveredLink to="/pricing#monthly">Monthly Subscription</HoveredLink>
            <HoveredLink to="/pricing#corporate">Corporate Plans</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Locations" data-menu-item="Locations">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/locations#california">California</HoveredLink>
            <HoveredLink to="/locations#new-york">New York</HoveredLink>
            <HoveredLink to="/locations#florida">Florida</HoveredLink>
            <HoveredLink to="/locations#texas">Texas</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </motion.div>
  );
}
