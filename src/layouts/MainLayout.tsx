
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen bg-black text-white overflow-x-hidden",
      "bg-noise relative",
      theme === 'neoPulse' && "neo-pulse-bg",
      theme === 'quantumGlass' && "quantum-glass-bg",
      theme === 'orbitalDark' && "orbital-dark-bg"
    )}>
      {/* Theme-specific ambient effects */}
      <div className="fixed inset-0 pointer-events-none">
        {theme === 'neoPulse' && (
          <>
            <div className="star-cluster star-cluster-1 bg-tesla-blue/30"></div>
            <div className="star-cluster star-cluster-2 bg-tesla-purple/30"></div>
          </>
        )}
        
        {theme === 'quantumGlass' && (
          <>
            <div className="star-cluster star-cluster-1 bg-white/10"></div>
            <div className="star-cluster star-cluster-3 bg-white/5"></div>
          </>
        )}
        
        {theme === 'orbitalDark' && (
          <>
            <div className="star-cluster star-cluster-2 bg-tesla-purple/20"></div>
            <div className="star-cluster star-cluster-3 bg-tesla-blue/10"></div>
            <div className="grid-background opacity-10"></div>
          </>
        )}
      </div>
      
      <Navbar />
      
      <div className="relative z-10">
        {children || <Outlet />}
      </div>
      
      <Footer />
    </div>
  );
};

// MainLayout no longer needs to provide the ThemeProvider
// since it's now provided at the root level
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <MainLayoutContent children={children} />;
};

export default MainLayout;
