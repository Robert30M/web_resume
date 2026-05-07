'use client';

import React, { useEffect, useRef } from 'react';

const ShootingStarsBackground = () => {
  const canvasRef = useRef(null);
  const mouseTrailRef = useRef([]); 
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      mouseTrailRef.current.push({
        x: e.clientX,
        y: e.clientY,
      });

      if (mouseTrailRef.current.length > 22) {
        mouseTrailRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Background stars
    const stars = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let shootingStars = [];

    const createShootingStar = () => {
      const startFromEdge = Math.random();
      let x, y;

      if (startFromEdge < 0.25) { x = Math.random() * width; y = -50; }
      else if (startFromEdge < 0.5) { x = width + 50; y = Math.random() * height * 0.6; }
      else if (startFromEdge < 0.75) { x = Math.random() * width; y = height + 50; }
      else { x = -50; y = Math.random() * height * 0.6; }

      shootingStars.push({
        x, y,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 18 + 12,
        angle: Math.random() * Math.PI * 0.6 - Math.PI * 0.3,
        opacity: 1,
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Twinkling stars
      ctx.fillStyle = '#e0f0ff';
      stars.forEach((star) => {
        const twinkle = Math.sin(Date.now() / 200 + star.x) * 0.25;
        ctx.globalAlpha = Math.max(0.2, star.alpha + twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const rad = s.angle;

        ctx.strokeStyle = `rgba(224, 240, 255, ${s.opacity})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(rad) * s.length, s.y - Math.sin(rad) * s.length);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();

        s.x += Math.cos(rad) * s.speed;
        s.y += Math.sin(rad) * s.speed;
        s.opacity -= 0.018;

        if (s.opacity <= 0) shootingStars.splice(i, 1);
      }

      // ==================== SUBTLE LINEAR CURSOR TAIL ====================
      const trail = mouseTrailRef.current;
      if (trail.length > 1) {
        for (let i = 0; i < trail.length - 1; i++) {
          const alpha = (i + 1) / trail.length * 0.65;   // much lower opacity
          const thickness = (i + 1) / trail.length * 4 + 1.2;

          ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`; // softer blue
          ctx.lineWidth = thickness;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 6;        // ← Reduced glow

          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.stroke();
        }

        // Very subtle cursor head
        const head = trail[trail.length - 1];
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const starInterval = setInterval(() => {
      if (Math.random() < 0.7) createShootingStar();
    }, 180);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(starInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #0a1429 0%, #02060f 70%)',
      }}
    />
  );
};

export default ShootingStarsBackground;