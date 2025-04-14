
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface VehicleStatValueProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

const VehicleStatValue: React.FC<VehicleStatValueProps> = ({ 
  icon: Icon, 
  label, 
  value,
  iconColor = "text-tesla-blue"
}) => {
  return (
    <motion.div 
      className="neo-card flex flex-col items-center p-3 rounded-xl"
      whileHover={{ y: -2, scale: 1.05 }}
    >
      <Icon className={`h-4 w-4 ${iconColor} mb-1`} />
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </motion.div>
  );
};

export default VehicleStatValue;
