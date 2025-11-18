import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface ParticleTransitionProps {
  trigger: boolean;
  onComplete?: () => void;
  origin?: { x: number; y: number };
  direction?: 'forward' | 'backward' | 'center';
}

export const ParticleTransition: React.FC<ParticleTransitionProps> = ({
  trigger,
  onComplete,
  origin,
  direction = 'forward'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsActive(true);

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate particles
    const particleCount = 300;
    const particles: Particle[] = [];

    // Determine origin point
    const originX = origin?.x ?? window.innerWidth / 2;
    const originY = origin?.y ?? window.innerHeight / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      
      // Direction-based velocity
      let vx, vy;
      if (direction === 'forward') {
        vx = Math.cos(angle) * speed + 3;
        vy = Math.sin(angle) * speed;
      } else if (direction === 'backward') {
        vx = Math.cos(angle) * speed - 3;
        vy = Math.sin(angle) * speed;
      } else {
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }

      particles.push({
        x: originX,
        y: originY,
        vx,
        vy,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        size: 2 + Math.random() * 3,
        color: `hsla(${Math.random() * 60 + 200}, 70%, ${50 + Math.random() * 30}%, `
      });
    }

    particlesRef.current = particles;

    // Physics constants
    const GRAVITY = 0.15;
    const FRICTION = 0.98;
    const FADE_RATE = 0.015;

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      particles.forEach(particle => {
        if (particle.life > 0) {
          allDead = false;

          // Physics
          particle.vy += GRAVITY;
          particle.vx *= FRICTION;
          particle.vy *= FRICTION;

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Fade out
          particle.life -= FADE_RATE;

          // Draw particle
          const opacity = Math.max(0, particle.life);
          ctx.fillStyle = `${particle.color}${opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Add glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, `${particle.color}${opacity * 0.5})`);
          gradient.addColorStop(1, `${particle.color}0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (allDead) {
        setIsActive(false);
        onComplete?.();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [trigger, origin, direction, onComplete]);

  if (!isActive && !trigger) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default ParticleTransition;
