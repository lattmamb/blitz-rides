
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, User } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  }, [location.pathname]);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Handle "Start Your Journey" button click - navigate to vehicles page
  const handleStartJourney = () => {
    navigate("/vehicles");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-tesla-blue" />
          <span className="text-xl font-bold text-white">Unity Fleet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/vehicles" 
            className={`text-sm transition-colors ${isActiveRoute('/vehicles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Vehicles
          </Link>
          <Link 
            to="/pricing" 
            className={`text-sm transition-colors ${isActiveRoute('/pricing') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Services
          </Link>
          <Link 
            to="/locations" 
            className={`text-sm transition-colors ${isActiveRoute('/locations') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            UnityLink Hubs
          </Link>
          <Link 
            to="/about" 
            className={`text-sm transition-colors ${isActiveRoute('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            VisionOS
          </Link>
          <Link 
            to="/about" 
            className={`text-sm transition-colors ${isActiveRoute('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Rural Impact
          </Link>
        </div>

        {/* Right side button */}
        <div className="hidden md:block">
          <Button 
            className="bg-tesla-blue hover:bg-tesla-blue/90 text-white rounded-full py-2 px-5"
            onClick={handleStartJourney}
          >
            Start Your Journey
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect absolute top-full left-0 right-0 py-4 px-4 flex flex-col gap-4">
          <Link
            to="/vehicles"
            className={`py-2 transition-colors ${isActiveRoute('/vehicles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Vehicles
          </Link>
          <Link
            to="/pricing"
            className={`py-2 transition-colors ${isActiveRoute('/pricing') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Services
          </Link>
          <Link
            to="/locations"
            className={`py-2 transition-colors ${isActiveRoute('/locations') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            UnityLink Hubs
          </Link>
          <Link
            to="/about"
            className={`py-2 transition-colors ${isActiveRoute('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            VisionOS
          </Link>
          <Link
            to="/about"
            className={`py-2 transition-colors ${isActiveRoute('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Rural Impact
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Button 
              className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white rounded-full"
              onClick={handleStartJourney}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
