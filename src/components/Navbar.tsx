
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Calendar, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
        theme === 'neoPulse' && "neo-pulse-nav",
        theme === 'quantumGlass' && "quantum-glass-nav",
        theme === 'orbitalDark' && "orbital-dark-nav"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={cn(
            "text-2xl font-bold",
            theme === 'neoPulse' && "neo-pulse-text",
            theme === 'quantumGlass' && "quantum-glass-text",
            theme === 'orbitalDark' && "orbital-dark-text"
          )}>
            BLITZ
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="mr-4">
            <ul className="flex space-x-2">
              <li>
                <Link to="/">
                  <Button 
                    variant={theme === 'neoPulse' ? 'glx-neo' : theme === 'quantumGlass' ? 'glx-glass' : 'glx-gradient'} 
                    size="sm" 
                    className={location.pathname === '/' ? 'border-white/30' : 'border-transparent'}
                  >
                    <Home className="h-4 w-4 mr-1" /> Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/vehicles">
                  <Button 
                    variant={theme === 'neoPulse' ? 'glx-neo' : theme === 'quantumGlass' ? 'glx-glass' : 'glx-gradient'} 
                    size="sm" 
                    className={location.pathname.includes('/vehicles') ? 'border-white/30' : 'border-transparent'}
                  >
                    <Car className="h-4 w-4 mr-1" /> Vehicles
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <Button 
                    variant={theme === 'neoPulse' ? 'glx-neo' : theme === 'quantumGlass' ? 'glx-glass' : 'glx-gradient'} 
                    size="sm" 
                    className={location.pathname === '/dashboard' ? 'border-white/30' : 'border-transparent'}
                  >
                    <User className="h-4 w-4 mr-1" /> Dashboard
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
          
          <ThemeSwitcher />
          
          <Link to="/book/model-s">
            <Button 
              variant={theme === 'neoPulse' ? 'tesla' : theme === 'quantumGlass' ? 'glx-glass' : 'blitz'}
              className={cn(
                "ml-2",
                theme === 'neoPulse' && "bg-gradient-to-r from-tesla-blue to-tesla-purple",
                theme === 'orbitalDark' && "bg-gradient-to-r from-tesla-purple to-tesla-blue"
              )}
            >
              <Calendar className="h-4 w-4 mr-2" /> Book Now
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black backdrop-blur-lg transition-transform duration-300 z-40 pt-20",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-8">
          <ul className="space-y-6">
            <li>
              <Link to="/" className="flex items-center text-xl">
                <Home className="h-6 w-6 mr-3" /> Home
              </Link>
            </li>
            <li>
              <Link to="/vehicles" className="flex items-center text-xl">
                <Car className="h-6 w-6 mr-3" /> Vehicles
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center text-xl">
                <User className="h-6 w-6 mr-3" /> Dashboard
              </Link>
            </li>
            <li className="pt-6">
              <Link to="/book/model-s">
                <Button className="w-full bg-gradient-to-r from-tesla-blue to-tesla-purple">
                  <Calendar className="h-5 w-5 mr-2" /> Book Now
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
