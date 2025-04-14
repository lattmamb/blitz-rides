
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:animate-shine",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 backdrop-blur-md after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        ghost: "hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
        tesla: "relative overflow-hidden bg-tesla-blue text-white hover:bg-tesla-blue/90 before:content-[''] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:animate-shine",
        glass: "bg-glass relative backdrop-blur-md border-glass-border hover:border-glass-highlight hover:bg-glass-highlight transition-colors before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-30 after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        blitz: "relative overflow-hidden bg-gradient-to-r from-tesla-blue to-tesla-purple text-white hover:scale-[1.03] active:scale-[0.97] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:transition-opacity hover:after:opacity-100 after:opacity-0",
        // New enhanced glass variants
        'glx-glass': "relative overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-30 after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_35px_-5px_rgba(10,132,255,0.3)]",
        'glx-neo': "relative overflow-hidden backdrop-blur-lg bg-black/40 border border-tesla-blue/30 text-white hover:border-tesla-blue transition-all before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-tesla-blue/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:animate-shine after:transition-opacity shadow-[0_8px_16px_rgba(0,0,0,0.5),0_0_0_1px_rgba(10,132,255,0.1)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_0_1px_rgba(10,132,255,0.3)]",
        'glx-gradient': "relative overflow-hidden bg-gradient-to-r from-tesla-blue/90 to-tesla-purple/90 text-white hover:scale-[1.03] active:scale-[0.97] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/20 before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-white/30 after:opacity-0 hover:after:opacity-100 after:transition-opacity shadow-[0_8px_16px_rgba(0,0,0,0.25),0_0_0_1px_rgba(94,92,230,0.1)] hover:shadow-[0_8px_25px_rgba(10,132,255,0.3),0_0_0_1px_rgba(94,92,230,0.3)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-14 rounded-md px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
