
import React from 'react';
import { useTheme, ThemeType } from '@/context/ThemeContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Sparkles } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme} onValueChange={(value) => setTheme(value as ThemeType)}>
      <TabsList className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
        <TabsTrigger 
          value="neoPulse" 
          className="data-[state=active]:bg-tesla-blue/20 data-[state=active]:text-white" 
          aria-label="Neo Pulse Theme"
        >
          <Sparkles className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger 
          value="quantumGlass" 
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white" 
          aria-label="Quantum Glass Theme"
        >
          <Sun className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger 
          value="orbitalDark" 
          className="data-[state=active]:bg-tesla-purple/20 data-[state=active]:text-white" 
          aria-label="Orbital Dark Theme"
        >
          <Moon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
