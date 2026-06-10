"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars = [];
    let meteors = [];
    let raf = 0;
    let mouseX = 0.5, mouseY = 0.5;
    let w = 0, h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 3 depth layers; farther stars are smaller, dimmer, slower
      const count = Math.min(180, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        depth: Math.random(), // 0 far … 1 near
        r: 0.4 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2
      }));
    }

    function spawnMeteor() {
      if (document.hidden || reduced) return;
      meteors.push({
        x: Math.random() * w * 0.8,
        y: Math.random() * h * 0.3,
        vx: 6 + Math.random() * 5,
        vy: 3 + Math.random() * 3,
        life: 1
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        const px = s.x + (mouseX - 0.5) * s.depth * 24;
        const py = s.y + (mouseY - 0.5) * s.depth * 24;
        ctx.globalAlpha = tw * (0.25 + s.depth * 0.6);
        ctx.fillStyle = s.depth > 0.85 ? "#FFB35C" : "#E8EDF5";
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.6 + s.depth * 0.7), 0, Math.PI * 2);
        ctx.fill();
      }
      // meteors
      for (const m of meteors) {
        ctx.globalAlpha = m.life * 0.9;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 8, m.y - m.vy * 8);
        grad.addColorStop(0, "#E8EDF5");
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 8, m.y - m.vy * 8);
        ctx.stroke();
        m.x += m.vx; m.y += m.vy; m.life -= 0.02;
      }
      meteors = meteors.filter((m) => m.life > 0);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onMouse(e) {
      mouseX = e.clientX / w;
      mouseY = e.clientY / h;
    }
    function onVisibility() {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    let meteorTimer;
    if (!reduced) {
      window.addEventListener("mousemove", onMouse);
      meteorTimer = setInterval(spawnMeteor, 7000);
      raf = requestAnimationFrame(draw);
    } else {
      draw(0); // single static frame
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(meteorTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
