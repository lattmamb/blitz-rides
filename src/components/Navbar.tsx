
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Handle "Book Now" button click - navigate to vehicles page
  const handleBookNow = () => {
    navigate("/vehicles");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="w-10 h-10 relative flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] opacity-70 blur-[10px] animate-pulse-glow"></div>
            <motion.div 
              className="text-[#9b87f5] font-bold text-2xl relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              U
            </motion.div>
          </motion.div>
          <span className="text-xl font-bold gradient-text relative overflow-hidden">
            Unity Fleet
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            />
          </span>
        </Link>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="absolute left-0 right-0 top-0 h-full flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container flex items-center">
                <input 
                  type="text" 
                  placeholder="Search vehicles, locations..." 
                  className="w-full py-5 px-6 bg-transparent text-lg text-white border-b-2 border-white/20 focus:border-tesla-blue/60 outline-none transition-all"
                  autoFocus
                />
                <button 
                  className="p-2 ml-2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`transition-colors ${isActiveRoute('/') ? 'text-white after:content-[""] after:block after:h-[2px] after:bg-tesla-blue after:mt-0.5' : 'text-white/80 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/vehicles" 
            className={`transition-colors ${isActiveRoute('/vehicles') ? 'text-white after:content-[""] after:block after:h-[2px] after:bg-tesla-blue after:mt-0.5' : 'text-white/80 hover:text-white'}`}
          >
            Vehicles
          </Link>
          <Link 
            to="/pricing" 
            className={`transition-colors ${isActiveRoute('/pricing') ? 'text-white after:content-[""] after:block after:h-[2px] after:bg-tesla-blue after:mt-0.5' : 'text-white/80 hover:text-white'}`}
          >
            Pricing
          </Link>
          <Link 
            to="/locations" 
            className={`transition-colors ${isActiveRoute('/locations') ? 'text-white after:content-[""] after:block after:h-[2px] after:bg-tesla-blue after:mt-0.5' : 'text-white/80 hover:text-white'}`}
          >
            Locations
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${isActiveRoute('/about') ? 'text-white after:content-[""] after:block after:h-[2px] after:bg-tesla-blue after:mt-0.5' : 'text-white/80 hover:text-white'}`}
          >
            About
          </Link>
          <button 
            onClick={() => setSearchOpen(true)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-white/10 hover:bg-white/5 hover:border-white/20 ${isActiveRoute('/dashboard') ? 'bg-white/10 text-white' : 'text-white'}`}
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white relative overflow-hidden group"
              onClick={handleBookNow}
            >
              <span className="relative z-10 flex items-center">
                Book Now 
                <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] transition-transform duration-300 group-hover:scale-105"></span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => setSearchOpen(true)}
            className="text-white/80 hover:text-white transition-colors p-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden glass-effect absolute top-full left-0 right-0 py-4 px-4 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className={`py-3 transition-colors ${isActiveRoute('/') ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              Home
            </Link>
            <Link
              to="/vehicles"
              className={`py-3 transition-colors ${isActiveRoute('/vehicles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              Vehicles
            </Link>
            <Link
              to="/pricing"
              className={`py-3 transition-colors ${isActiveRoute('/pricing') ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              Pricing
            </Link>
            <Link
              to="/locations"
              className={`py-3 transition-colors ${isActiveRoute('/locations') ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              Locations
            </Link>
            <Link
              to="/about"
              className={`py-3 transition-colors ${isActiveRoute('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full border-white/10 ${isActiveRoute('/dashboard') ? 'bg-white/10 text-white' : 'text-white'}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
