"use client";

import { useEffect, useRef } from "react";

export default function CometCursor() {
  const ref = useRef(null);

  useEffect(() => {
    // Only on devices with a real pointer, and only if motion is OK
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    let particles = [];
    let mx = -100, my = -100, lastX = -100, lastY = -100;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      // spawn more particles when moving faster
      const dist = Math.hypot(mx - lastX, my - lastY);
      const n = Math.min(6, Math.ceil(dist / 8));
      for (let i = 0; i < n; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 4,
          y: my + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.6 - dist * 0.002,
          vy: (Math.random() - 0.5) * 0.6,
          life: 1,
          r: 0.8 + Math.random() * 1.6,
          amber: Math.random() > 0.35
        });
      }
      lastX = mx; lastY = my;
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.globalAlpha = p.life * 0.5;
        ctx.fillStyle = p.amber ? "#FFB35C" : "#5CC8FF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy; p.life -= 0.025;
      }
      particles = particles.filter((p) => p.life > 0);
      // comet head glow
      if (mx > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 14);
        g.addColorStop(0, "rgba(255,179,92,0.35)");
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 14, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    function onVis() {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />;
}
