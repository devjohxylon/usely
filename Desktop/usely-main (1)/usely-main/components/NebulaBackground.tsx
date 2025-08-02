'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  hue: number;
  pulse: number;
}

export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const nebulas: Nebula[] = [];

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 60 + 200
      });
    }

    // Initialize nebulas
    for (let i = 0; i < 3; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 200,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nebulas first (so they don't cover the planet)
      nebulas.forEach(nebula => {
        nebula.pulse += 0.01;
        const pulseOpacity = nebula.opacity * (0.8 + 0.2 * Math.sin(nebula.pulse));
        
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `hsla(${nebula.hue}, 70%, 60%, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `hsla(${nebula.hue}, 50%, 40%, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Update and draw particles (stars) before the planet
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Parallax effect disabled to prevent mouse interference
        // const mouseX = mouseRef.current.x;
        // const mouseY = mouseRef.current.y;
        // const centerX = canvas.width / 2;
        // const centerY = canvas.height / 2;
        // const deltaX = (mouseX - centerX) * 0.0001;
        // const deltaY = (mouseY - centerY) * 0.0001;
        
        // particle.x += deltaX;
        // particle.y += deltaY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${particle.opacity})`;
        ctx.fill();

        // Draw glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 80%, ${particle.opacity * 0.3})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fill();
      });

      // Draw curved planet at the bottom
      const planetCenterX = canvas.width / 2;
      const planetCenterY = canvas.height + 75; // Move it a bit more down
      const planetRadius = canvas.width * 0.5; // Keep the same radius
      
      // Create planet shape with curved top - more oval-like
      ctx.beginPath();
      ctx.ellipse(planetCenterX, planetCenterY, planetRadius, planetRadius * 0.5, 0, 0, Math.PI, true);
      ctx.closePath();
      
      // Fill planet with solid black
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Add subtle gradient on top for 3D effect
      const topGradient = ctx.createLinearGradient(
        planetCenterX, planetCenterY - planetRadius * 0.5,
        planetCenterX, planetCenterY - planetRadius * 0.1
      );
      topGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      topGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = topGradient;
      ctx.fill();

      // Draw bright horizon line
      ctx.beginPath();
      ctx.ellipse(planetCenterX, planetCenterY, planetRadius, planetRadius * 0.5, 0, 0, Math.PI, true);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add glow effect to horizon
      ctx.beginPath();
      ctx.ellipse(planetCenterX, planetCenterY, planetRadius, planetRadius * 0.5, 0, 0, Math.PI, true);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Add vertical black bars on left and right sides with heavy blur effect
      const barWidth = canvas.width * 0.2; // 20% of screen width
      
      // Left bar with heavy blur effect - moved further left
      for (let i = 0; i < 15; i++) {
        const offset = i * 4;
        const opacity = 0.25 - (i * 0.015);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(offset - 50, 0, barWidth, canvas.height);
      }
      
      // Right bar with heavy blur effect - moved further right
      for (let i = 0; i < 15; i++) {
        const offset = i * 4;
        const opacity = 0.25 - (i * 0.015);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(canvas.width - barWidth - offset + 50, 0, barWidth, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Disable mouse event listeners to prevent interference
    // const handleMouseMove = (e: MouseEvent) => {
    //   mouseRef.current.x = e.clientX;
    //   mouseRef.current.y = e.clientY;
    // };

    // const handleTouchMove = (e: TouchEvent) => {
    //   if (e.touches[0]) {
    //     mouseRef.current.x = e.touches[0].clientX;
    //     mouseRef.current.y = e.touches[0].clientY;
    //   }
    // };

    // window.addEventListener('mousemove', handleMouseMove);
    // window.addEventListener('touchmove', handleTouchMove, { passive: true });

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      // window.removeEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 bg-[#0a0a0a]"
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none',
          touchAction: 'none'
        }}
      />
    </div>
  );
} 