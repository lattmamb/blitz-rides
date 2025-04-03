
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, User } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-tesla-dark-80 backdrop-blur-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-tesla-blue" />
          <span className="text-xl font-bold gradient-text">CarFleet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/vehicles" className="text-white/80 hover:text-white transition-colors">
            Vehicles
          </Link>
          <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link to="/locations" className="text-white/80 hover:text-white transition-colors">
            Locations
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="border-tesla-blue/30 text-white hover:bg-tesla-blue/20">
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/book-now">
            <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
              Book Now
            </Button>
          </Link>
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
            to="/"
            className="text-white/80 hover:text-white py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/vehicles"
            className="text-white/80 hover:text-white py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Vehicles
          </Link>
          <Link
            to="/pricing"
            className="text-white/80 hover:text-white py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/locations"
            className="text-white/80 hover:text-white py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Locations
          </Link>
          <Link
            to="/about"
            className="text-white/80 hover:text-white py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-tesla-blue/30 text-white">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/book-now" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
