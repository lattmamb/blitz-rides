
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function NavbarDemo() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down past 200px, show when scrolling up
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <div className="relative w-full flex items-center justify-center py-10 mt-4">
      <Navbar 
        className={`top-2 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`} 
      />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      className={cn("fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 transition-all duration-300", className)}
    >
      <Menu setActive={setActive}>
        {["Vehicles", "Fleet", "Plans", "Locations"].map((item) => (
          <MenuItem 
            key={item}
            setActive={setActive} 
            active={active} 
            item={item} 
            data-menu-item={item}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`relative transition-all duration-300 ${
              hoveredItem === item && active !== item ? 'text-tesla-blue' : ''
            }`}
          >
            {item === "Vehicles" && (
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/vehicles?type=sedan">Sedans</HoveredLink>
                <HoveredLink to="/vehicles?type=suv">SUVs</HoveredLink>
                <HoveredLink to="/vehicles?type=truck">Trucks</HoveredLink>
                <HoveredLink to="/vehicles?type=sports">Sports</HoveredLink>
              </div>
            )}
            
            {item === "Fleet" && (
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
            )}
            
            {item === "Plans" && (
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/pricing#daily">Daily Rental</HoveredLink>
                <HoveredLink to="/pricing#weekly">Weekly Rental</HoveredLink>
                <HoveredLink to="/pricing#monthly">Monthly Subscription</HoveredLink>
                <HoveredLink to="/pricing#corporate">Corporate Plans</HoveredLink>
              </div>
            )}
            
            {item === "Locations" && (
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/locations#california">California</HoveredLink>
                <HoveredLink to="/locations#new-york">New York</HoveredLink>
                <HoveredLink to="/locations#florida">Florida</HoveredLink>
                <HoveredLink to="/locations#texas">Texas</HoveredLink>
              </div>
            )}
            
            {/* Spotlight effect when hovered */}
            {hoveredItem === item && active !== item && (
              <motion.div 
                className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(10,132,255,0.3) 0%, transparent 70%)'
                }}
              />
            )}
          </MenuItem>
        ))}
      </Menu>
      
      {/* Ambient light indicator that shows when menu is active */}
      {active && (
        <motion.div
          className="absolute left-1/2 -top-4 w-24 h-1 bg-tesla-blue rounded-full blur-md"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.5, width: 96 }}
          exit={{ opacity: 0, width: 0 }}
          style={{ 
            translateX: '-50%',
            boxShadow: '0 0 20px rgba(10,132,255,0.7)'
          }}
        />
      )}
    </motion.div>
  );
}
