
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "relative z-10 mt-24",
      theme === 'neoPulse' && "neo-pulse-nav",
      theme === 'quantumGlass' && "quantum-glass-nav",
      theme === 'orbitalDark' && "orbital-dark-nav"
    )}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className={cn(
              "text-2xl font-bold block mb-4",
              theme === 'neoPulse' && "neo-pulse-text",
              theme === 'quantumGlass' && "quantum-glass-text",
              theme === 'orbitalDark' && "orbital-dark-text"
            )}>
              BLITZ
            </Link>
            <p className="text-white/70 mb-6">
              Premium electric vehicle subscriptions for the modern driver. Experience luxury without commitment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-tesla-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-tesla-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-tesla-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-tesla-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Vehicles
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/book/model-s" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Book Now
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-tesla-blue flex-shrink-0 mt-0.5" />
                <span className="text-white/70">123 Electric Ave, San Francisco, CA 94104</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-tesla-blue" />
                <span className="text-white/70">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-tesla-blue" />
                <span className="text-white/70">info@blitz-ev.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">Subscribe to receive updates on new vehicles and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="tesla-input flex-1 rounded-r-none"
              />
              <button
                type="submit"
                className={cn(
                  "px-4 rounded-r-lg text-white",
                  theme === 'neoPulse' && "bg-gradient-to-r from-tesla-blue to-tesla-purple",
                  theme === 'quantumGlass' && "bg-glass border-l-0 border-white/10",
                  theme === 'orbitalDark' && "bg-gradient-to-r from-tesla-purple to-tesla-blue"
                )}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/60 text-sm">
          <p>&copy; {currentYear} BLITZ Electric Vehicle Subscriptions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
