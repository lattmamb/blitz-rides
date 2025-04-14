
import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

export default function BlitzNav() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Subscribe", path: "/pricing" },
    { name: "Locations", path: "/locations" }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <nav className="glass-effect backdrop-blur-md rounded-full py-3 px-6 shadow-lg">
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`text-sm md:text-base transition-colors ${
                  location.pathname === item.path
                    ? "text-white font-medium"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="h-0.5 bg-tesla-blue mt-1 rounded-full"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
