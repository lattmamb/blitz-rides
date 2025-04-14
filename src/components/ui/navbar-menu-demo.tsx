
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Search, X } from "lucide-react";

export default function NavbarDemo() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  
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
  
  const handleUserClick = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="relative w-full flex items-center justify-center py-10 mt-4">
      <Navbar 
        className={`top-2 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`} 
        onSearchOpen={() => setSearchOpen(true)}
        onUserClick={handleUserClick}
      />
      
      {/* Global search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-full max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for vehicles, locations, features..."
                  className="w-full bg-glass/30 backdrop-blur-md border border-white/10 rounded-full py-4 px-6 text-lg text-white focus:border-tesla-blue/50 focus:outline-none focus:ring-1 focus:ring-tesla-blue/50"
                  autoFocus
                />
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              
              {/* Quick search suggestions */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Model S', 'Model 3', 'SUVs', 'California', 'Pricing'].map((item) => (
                  <motion.button
                    key={item}
                    className="glass-effect py-2 px-4 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(`/vehicles?search=${item.toLowerCase()}`);
                    }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Close button for mobile */}
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setSearchOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ className, onSearchOpen, onUserClick }: { 
  className?: string,
  onSearchOpen?: () => void,
  onUserClick?: () => void
}) {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Create a breathing animation effect for the menu background
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
      <div className="flex items-center">
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
        
        <div className="flex items-center ml-3 gap-2">
          {/* Search button */}
          <motion.button
            className="w-8 h-8 flex items-center justify-center rounded-full glass-effect text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSearchOpen}
          >
            <Search className="w-4 h-4" />
          </motion.button>
          
          {/* User profile */}
          <motion.button
            className="w-8 h-8 flex items-center justify-center rounded-full glass-effect text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onUserClick}
          >
            <User className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
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
