
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BlitzNav() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-lg bg-black/30' : ''
        }`}
      >
        <nav className={cn(
          "glass-effect backdrop-blur-md rounded-full py-3 px-6 shadow-lg transition-all duration-300",
          isScrolled ? "py-2 bg-glass border border-glass-border shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)]" : ""
        )}>
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link to="/" className="lg:mr-8 mr-4">
              <motion.div 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-tesla-blue to-tesla-purple flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-sm">GLX</span>
              </motion.div>
            </Link>
            
            {/* Desktop navigation */}
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isHovered = hoveredItem === item.name;
                
                return (
                  <li key={index} className="relative">
                    <Link
                      to={item.path}
                      className="text-sm md:text-base transition-colors relative py-1 px-2"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.span 
                        className={cn(
                          "relative z-10", 
                          isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
                        )}
                      >
                        {item.name}
                        
                        {/* Light glow effect on hover */}
                        <AnimatePresence>
                          {(isHovered && !isActive) && (
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
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <motion.span 
                className="w-5 h-0.5 bg-white rounded-full" 
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-5 h-0.5 bg-white rounded-full"
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-5 h-0.5 bg-white rounded-full"
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>
        
        {/* Subtle reflection effect */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-full"></div>
        
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
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              className="absolute top-20 left-4 right-4 bg-glass border border-glass-border rounded-xl shadow-2xl p-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <ul className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center p-3 rounded-lg transition-colors",
                          isActive 
                            ? "bg-tesla-blue/20 text-white" 
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        
                        {isActive && (
                          <motion.div 
                            className="ml-2 w-1.5 h-1.5 rounded-full bg-tesla-blue"
                            layoutId="mobile-active-indicator"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
