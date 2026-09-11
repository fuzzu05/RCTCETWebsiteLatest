import React, { useEffect, useRef } from "react";

/**
 * AuroraBackground — Subtle Editorial Ambient Canvas
 * Guided by Leonxlnx/taste-skill and pbakaus/impeccable
 * 
 * Features:
 * - Ultra-light neutral palette: Warm Oat (#F3E8DC), Muted Peach (#F7DED0), and whisper of Rotaract Cranberry (#D71921 @ ~3-4%)
 * - High Gaussian diffusion (blur-[140px] md:blur-[180px]) melting colors into a seamless warm ambient glow
 * - Controlled low opacity (0.06 - 0.08 max) preserving clean typography and contrast
 * - Fully isolated from Dark Mode (.dark:hidden)
 */
const AuroraBackground = ({
  colorStops = ["#F3E8DC", "#F7DED0", "#D71921"],
  opacity = 0.07,
  speed = 0.35,
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const hexToRgb = (hex) => {
      const sanitized = hex.replace("#", "");
      const num = parseInt(sanitized, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const colors = colorStops.map(hexToRgb);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Emitters with gentle, slow harmonic drift
    const emitters = [
      {
        // Soft Warm Oat
        color: colors[0] || { r: 243, g: 232, b: 220 },
        baseX: 0.25,
        baseY: 0.2,
        radius: 0.6,
        fx: 0.4,
        fy: 0.3,
        phase: 0.0,
        alphaMult: 1.0,
      },
      {
        // Ultra-light muted peach
        color: colors[1] || { r: 247, g: 222, b: 208 },
        baseX: 0.75,
        baseY: 0.35,
        radius: 0.65,
        fx: 0.3,
        fy: 0.5,
        phase: 1.5,
        alphaMult: 0.9,
      },
      {
        // Subtle Rotaract Cranberry whisper (max ~4%)
        color: colors[2] || { r: 215, g: 25, b: 33 },
        baseX: 0.5,
        baseY: 0.6,
        radius: 0.55,
        fx: 0.35,
        fy: 0.4,
        phase: 3.0,
        alphaMult: 0.5, // 0.07 * 0.5 = 0.035 (3.5% max)
      },
      {
        // Soft Warm Oat lower accent
        color: colors[0] || { r: 243, g: 232, b: 220 },
        baseX: 0.8,
        baseY: 0.8,
        radius: 0.55,
        fx: 0.25,
        fy: 0.45,
        phase: 4.2,
        alphaMult: 0.85,
      },
      {
        // Ultra-light muted peach lower-left
        color: colors[1] || { r: 247, g: 222, b: 208 },
        baseX: 0.2,
        baseY: 0.75,
        radius: 0.6,
        fx: 0.45,
        fy: 0.25,
        phase: 5.4,
        alphaMult: 0.85,
      },
    ];

    let start = performance.now();
    let isPaused = false;

    const onVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) start = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (now) => {
      if (!isPaused) {
        const t = (now - start) * 0.0003 * speed;
        ctx.clearRect(0, 0, width, height);

        emitters.forEach((e) => {
          const time = t + e.phase;
          const cx =
            (e.baseX + Math.sin(time * e.fx) * 0.12 + Math.cos(time * 0.2) * 0.06) *
            width;
          const cy =
            (e.baseY + Math.cos(time * e.fy) * 0.1 + Math.sin(time * 0.25) * 0.05) *
            height;

          const r = Math.min(width, height) * e.radius * (1 + 0.08 * Math.sin(time * 0.8));

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          const currentAlpha = (opacity * e.alphaMult).toFixed(4);
          grad.addColorStop(
            0,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${currentAlpha})`
          );
          grad.addColorStop(
            0.6,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${(
              currentAlpha * 0.4
            ).toFixed(4)})`
          );
          grad.addColorStop(
            1,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0)`
          );

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [colorStops, opacity, speed]);

  return (
    <div
      className={`fixed inset-0 w-full h-full min-h-screen z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Ultra-soft Warm Ambient Underlay */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#F3E8DC] blur-[140px] md:blur-[180px]"
        />
        <div
          className="absolute top-[25%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-[#F7DED0] blur-[140px] md:blur-[180px]"
        />
        <div
          className="absolute -bottom-[10%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-[#F3E8DC] blur-[140px] md:blur-[180px]"
        />
      </div>

      {/* 2. Fluid Harmonic Canvas Wave Layer with Deep Diffusion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full filter blur-[140px] md:blur-[180px] transform-gpu will-change-transform"
      />
    </div>
  );
};

export default AuroraBackground;
