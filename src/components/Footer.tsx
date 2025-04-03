
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-unity-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-unity-blue" />
              <span className="text-xl font-bold">Unity Fleet</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Revolutionizing rural mobility through AI, clean energy, and community-owned infrastructure. A Matthew Lamb initiative for economic transformation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-unity-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-unity-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-unity-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-unity-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Take-Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FlexRide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">On-Demand</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Access</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All-Access</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Decatur</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pana</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Taylorville</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mattoon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Effingham</a></li>
            </ul>
          </div>
          
          {/* Column 4 - Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Licensing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© 2025 Unity Fleet LLC. All rights reserved. | Powered by Atlas Intelligence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
