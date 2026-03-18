"use client";

import React, { useEffect, useRef } from "react";

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      ascending: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.ascending = Math.random() > 0.5;
      }

      update() {
        if (this.ascending) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 1) this.ascending = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.ascending = true;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      stars = [];
      // Cap at 180 stars max to prevent rAF > 16ms violations on large displays
      const numberOfStars = Math.min(
        Math.floor((canvas.width * canvas.height) / 5000),
        180
      );
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      frameCount++;
      // Throttle to ~30fps: only render every 2nd frame - cuts workload in half
      if (frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 bg-[#09090b]"
    />
  );
}
