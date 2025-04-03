
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarDemo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
    <div className="relative w-full flex items-center justify-center py-6">
      <AnimatePresence>
        {!isScrolled ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Navbar className="top-2" />
          </motion.div>
        ) : (
          <FloatingNavBubbles />
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingNavBubbles() {
  const bubbleItems = [
    { label: "Vehicles", to: "/vehicles" },
    { label: "Fleet", to: "/fleet" },
    { label: "Plans", to: "/pricing" },
    { label: "Locations", to: "/locations" },
  ];

  // Calculate positions for the bubbles floating around the edges
  const positions = [
    { x: "left-4", y: "top-24" },
    { x: "right-4", y: "top-36" },
    { x: "left-4", y: "top-48" },
    { x: "right-4", y: "top-60" },
  ];

  // Random animation properties for floating effect
  const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {bubbleItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            transition: { delay: index * 0.1, duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          className={`fixed ${positions[index].x} ${positions[index].y} pointer-events-auto`}
        >
          <motion.div
            animate={{
              y: [getRandomFloat(-5, 5), getRandomFloat(-8, 8), getRandomFloat(-5, 5)],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: getRandomFloat(2, 4),
            }}
          >
            <a 
              href={item.to} 
              className="glass-card w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#9b87f5]/40 backdrop-blur-sm border border-[#9b87f5]/30 shadow-lg hover:bg-[#9b87f5]/60 transition-colors"
            >
              {item.label.charAt(0)}
            </a>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-20 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Vehicles">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/vehicles?type=sedan">Sedans</HoveredLink>
            <HoveredLink to="/vehicles?type=suv">SUVs</HoveredLink>
            <HoveredLink to="/vehicles?type=truck">Trucks</HoveredLink>
            <HoveredLink to="/vehicles?type=sports">Sports</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Fleet">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Model S"
              to="/vehicles/model-s"
              src="https://assets.aceternity.com/demos/tesla-model-s.webp"
              description="Luxury sedan with exceptional range and performance."
            />
            <ProductItem
              title="Model X"
              to="/vehicles/model-x"
              src="https://assets.aceternity.com/demos/tesla-model-x.webp"
              description="SUV with falcon-wing doors and spacious interior."
            />
            <ProductItem
              title="Model 3"
              to="/vehicles/model-3"
              src="https://assets.aceternity.com/demos/tesla-model-3.webp"
              description="Affordable sedan with cutting-edge technology."
            />
            <ProductItem
              title="Cybertruck"
              to="/vehicles/cybertruck"
              src="https://assets.aceternity.com/demos/tesla-cybertruck.webp"
              description="Revolutionary electric pickup truck with futuristic design."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Plans">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/pricing#daily">Daily Rental</HoveredLink>
            <HoveredLink to="/pricing#weekly">Weekly Rental</HoveredLink>
            <HoveredLink to="/pricing#monthly">Monthly Subscription</HoveredLink>
            <HoveredLink to="/pricing#corporate">Corporate Plans</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Locations">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/locations#california">California</HoveredLink>
            <HoveredLink to="/locations#new-york">New York</HoveredLink>
            <HoveredLink to="/locations#florida">Florida</HoveredLink>
            <HoveredLink to="/locations#texas">Texas</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
