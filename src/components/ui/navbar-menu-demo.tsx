
import React, { useState } from "react";
import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/ui/navbar-menu";
import BlitzNav from "@/components/ui/blitz-hero/BlitzNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserCircle, Bell, MessageCircle, LogOut } from "lucide-react";

export default function NavbarDemo() {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div className="relative h-14 my-4 flex items-center justify-center z-50">
      <BlitzNav />
      
      {/* Right side elements */}
      <motion.div 
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative group">
          <Button 
            size="icon" 
            variant="glx-glass"
            className="bg-white/5 hover:bg-white/10 border-none rounded-full w-9 h-9"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <span className="absolute top-0 right-0 w-2 h-2 bg-tesla-red rounded-full"></span>
          
          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-2 w-48 p-3 hidden group-hover:block">
            <div className="backdrop-blur-xl bg-white/5 rounded-lg shadow-lg p-2 text-xs text-white/80">
              You have 3 unread notifications
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <Button 
            size="icon" 
            variant="glx-glass"
            className="bg-white/5 hover:bg-white/10 border-none rounded-full w-9 h-9"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-2 w-48 p-3 hidden group-hover:block">
            <div className="backdrop-blur-xl bg-white/5 rounded-lg shadow-lg p-2 text-xs text-white/80">
              Your messages are up to date
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <Avatar className="h-9 w-9 border-2 border-tesla-blue/30 hover:border-tesla-blue/80 transition-colors">
            <AvatarImage src="/avatar-demo.jpg" alt="User" />
            <AvatarFallback className="bg-white/5 text-white">BW</AvatarFallback>
          </Avatar>
          
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 w-48 hidden group-hover:block">
            <div className="backdrop-blur-xl bg-white/5 rounded-lg shadow-lg overflow-hidden border-none">
              <div className="p-3 border-b border-white/10">
                <div className="font-medium">Bruce Wayne</div>
                <div className="text-xs text-white/70">bruce@wayne.com</div>
              </div>
              <div className="p-1">
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-md text-sm transition-colors">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-md text-sm transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
