
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  ...props
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative" {...props}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:text-tesla-blue transition-colors"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="glass-card neo-card overflow-hidden border-none shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
                
                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20 pointer-events-none"></div>
                
                {/* Blue glow accent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-tesla-blue blur-sm"></div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border-none glass-card backdrop-blur-md shadow-lg flex justify-center space-x-10 px-8 py-4"
    >
      {/* Top glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Bottom glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link to={href} className="flex space-x-2 group">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <motion.img
          src={src}
          width={140}
          height={70}
          alt={title}
          className="shrink-0 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover border border-white/10"
        />
      </motion.div>
      <div>
        <h4 className="text-xl font-bold mb-1 text-white group-hover:text-tesla-blue transition-colors">
          {title}
        </h4>
        <p className="text-white/70 text-sm max-w-[10rem] group-hover:text-white/90 transition-colors">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-white/80 hover:text-white transition-colors duration-200 relative group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-tesla-blue to-tesla-purple group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};
