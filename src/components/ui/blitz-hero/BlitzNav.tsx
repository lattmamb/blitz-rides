
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

export default function BlitzNav() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Subscribe", path: "/pricing" },
    { name: "Locations", path: "/locations" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-black/30' : ''
      }`}
    >
      <nav className={`glass-effect backdrop-blur-md rounded-full py-3 px-6 shadow-lg transition-all duration-300 ${
        isScrolled ? 'py-2 bg-glass border border-glass-border' : ''
      }`}>
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.name;
            
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-sm md:text-base transition-colors relative`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.span 
                    className={`relative z-10 ${
                      isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.name}
                    
                    {/* Light glow effect on hover */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/5 rounded-full -z-10"
                          layoutId="hoverGlow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="h-0.5 bg-tesla-blue mt-1 rounded-full shadow-[0_0_5px_rgba(10,132,255,0.5)]"
                    />
                  )}
                  
                  {/* Hover indicator (shows when not active) */}
                  {!isActive && (
                    <motion.div
                      className="h-0.5 bg-white/30 mt-1 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Subtle reflection effect */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-full"></div>
      </nav>
      
      {/* Responsive mobile menu indicator (shown only on small screens) */}
      <motion.div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-tesla-blue rounded-full md:hidden"
        animate={{ 
          boxShadow: ['0 0 5px #0A84FF', '0 0 10px #0A84FF', '0 0 5px #0A84FF'] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}
