'use client';

import React, { useEffect, useRef } from 'react';

export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Draw static background once
    const drawStaticBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a few static stars
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.6 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Draw static eclipse
      const planetCenterX = canvas.width / 2;
      const planetCenterY = canvas.height + 100;
      const planetRadius = canvas.width * 0.6;
      
      ctx.beginPath();
      ctx.ellipse(planetCenterX, planetCenterY, planetRadius, planetRadius * 0.4, 0, 0, Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Draw horizon line
      ctx.beginPath();
      ctx.ellipse(planetCenterX, planetCenterY, planetRadius, planetRadius * 0.4, 0, 0, Math.PI, true);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawStaticBackground();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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