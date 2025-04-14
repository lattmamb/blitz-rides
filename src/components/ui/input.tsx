
import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { theme } = useTheme();
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          theme === 'neoPulse' && "border-white/10 bg-black/50 focus-visible:ring-tesla-blue/50",
          theme === 'quantumGlass' && "border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-white/30",
          theme === 'orbitalDark' && "border-white/10 bg-black/50 focus-visible:ring-tesla-purple/50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
