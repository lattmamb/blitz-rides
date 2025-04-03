
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car } from "lucide-react";

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

  // Handle "Start Journey" button click
  const handleStartJourney = () => {
    navigate("/vehicles");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-unity-blue" />
          <span className="text-xl font-bold text-white">Unity Fleet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#services" 
            className="text-white/80 hover:text-white transition-colors"
          >
            Services
          </a>
          <Link 
            to="/vehicles" 
            className={`transition-colors ${isActiveRoute('/vehicles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Vehicles
          </Link>
          <a 
            href="#unitylink"
            className="text-white/80 hover:text-white transition-colors"
          >
            UnityLink Hubs
          </a>
          <a 
            href="#vision"
            className="text-white/80 hover:text-white transition-colors"
          >
            VisionOS
          </a>
          <a 
            href="#token"
            className="text-white/80 hover:text-white transition-colors"
          >
            Atlas Token
          </a>
          <a 
            href="#impact"
            className="text-white/80 hover:text-white transition-colors"
          >
            Rural Impact
          </a>
        </div>

        {/* Right side button */}
        <div className="hidden md:block">
          <button 
            className="unity-button"
            onClick={handleStartJourney}
          >
            Start Your Journey
          </button>
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
        <div className="md:hidden bg-black/90 backdrop-blur-lg absolute top-full left-0 right-0 py-4 px-4 flex flex-col gap-4">
          <a
            href="#services"
            className="py-2 text-white/80 hover:text-white transition-colors"
          >
            Services
          </a>
          <Link
            to="/vehicles"
            className={`py-2 transition-colors ${isActiveRoute('/vehicles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
          >
            Vehicles
          </Link>
          <a
            href="#unitylink"
            className="py-2 text-white/80 hover:text-white transition-colors"
          >
            UnityLink Hubs
          </a>
          <a
            href="#vision"
            className="py-2 text-white/80 hover:text-white transition-colors"
          >
            VisionOS
          </a>
          <a
            href="#token"
            className="py-2 text-white/80 hover:text-white transition-colors"
          >
            Atlas Token
          </a>
          <a
            href="#impact"
            className="py-2 text-white/80 hover:text-white transition-colors"
          >
            Rural Impact
          </a>
          <div className="pt-2">
            <button 
              className="unity-button w-full"
              onClick={handleStartJourney}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
