import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Car, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import ParticleTransition from '@/components/ui/particle-transition';

const EnhancedNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particleOrigin, setParticleOrigin] = useState<{ x: number; y: number } | undefined>();
  const [triggerParticles, setTriggerParticles] = useState(false);
  const [particleDirection, setParticleDirection] = useState<'forward' | 'backward' | 'center'>('center');
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (location.pathname === path) return;
    
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setParticleOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    
    // Determine direction based on path
    const currentIndex = ['/', '/vehicles', '/dashboard'].indexOf(location.pathname);
    const targetIndex = ['/', '/vehicles', '/dashboard'].indexOf(path);
    setParticleDirection(targetIndex > currentIndex ? 'forward' : 'backward');
    
    setTriggerParticles(true);
    
    setTimeout(() => {
      navigate(path);
      setTriggerParticles(false);
    }, 500);
  }, [location.pathname, navigate]);
  
  return (
    <>
      <ParticleTransition 
        trigger={triggerParticles}
        origin={particleOrigin}
        direction={particleDirection}
      />
      
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled 
            ? "py-2 backdrop-blur-xl bg-background/60 border-b border-border/20" 
            : "py-4 backdrop-blur-md bg-background/20",
          "shadow-lg shadow-black/5"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
            onClick={(e) => handleNavClick(e, '/')}
          >
            <span className={cn(
              "text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent",
              "transition-all duration-300 group-hover:scale-105"
            )}>
              BLITZ
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="mr-4">
              <ul className="flex space-x-2">
                <li>
                  <Link 
                    to="/"
                    onClick={(e) => handleNavClick(e, '/')}
                  >
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className={cn(
                        "relative overflow-hidden transition-all duration-300",
                        "hover:bg-primary/10 hover:scale-105",
                        location.pathname === '/' && "bg-primary/20 text-primary"
                      )}
                    >
                      <Home className="h-4 w-4 mr-1" /> Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/vehicles"
                    onClick={(e) => handleNavClick(e, '/vehicles')}
                  >
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className={cn(
                        "relative overflow-hidden transition-all duration-300",
                        "hover:bg-primary/10 hover:scale-105",
                        location.pathname.includes('/vehicles') && "bg-primary/20 text-primary"
                      )}
                    >
                      <Car className="h-4 w-4 mr-1" /> Vehicles
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard"
                    onClick={(e) => handleNavClick(e, '/dashboard')}
                  >
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className={cn(
                        "relative overflow-hidden transition-all duration-300",
                        "hover:bg-primary/10 hover:scale-105",
                        location.pathname === '/dashboard' && "bg-primary/20 text-primary"
                      )}
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
                variant="default"
                className={cn(
                  "ml-2 relative overflow-hidden",
                  "bg-gradient-to-r from-primary to-primary/80",
                  "hover:shadow-lg hover:shadow-primary/50",
                  "hover:scale-105 transition-all duration-300"
                )}
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 px-4 backdrop-blur-xl bg-background/95 border-t border-border/20">
            <nav className="space-y-2 mt-4">
              <Link 
                to="/" 
                onClick={(e) => handleNavClick(e, '/')}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:translate-x-2",
                  location.pathname === '/' && "bg-primary/20 text-primary"
                )}
              >
                <Home className="inline h-4 w-4 mr-2" /> Home
              </Link>
              <Link 
                to="/vehicles" 
                onClick={(e) => handleNavClick(e, '/vehicles')}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:translate-x-2",
                  location.pathname.includes('/vehicles') && "bg-primary/20 text-primary"
                )}
              >
                <Car className="inline h-4 w-4 mr-2" /> Vehicles
              </Link>
              <Link 
                to="/dashboard" 
                onClick={(e) => handleNavClick(e, '/dashboard')}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:translate-x-2",
                  location.pathname === '/dashboard' && "bg-primary/20 text-primary"
                )}
              >
                <User className="inline h-4 w-4 mr-2" /> Dashboard
              </Link>
              <Link 
                to="/book/model-s"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </nav>
    </>
  );
};

export default EnhancedNavbar;
