import React, { useEffect, useRef } from "react";

/**
 * AuroraBackground — Inspired by React Bits (DavidHDev/react-bits)
 * Renders a dynamic, organic aurora canvas mesh tinted with Rotaract palette colors:
 * Cranberry (#D71921), Warm Orange (#F37021), and Gold (#FFC72C).
 * 
 * Features:
 * - Fluid harmonic sinusoidal motion for slow, elegant movement
 * - High-performance requestAnimationFrame loop with visibility change detection
 * - High Gaussian blur and large radius radial gradients for buttery-smooth blending
 * - Fully isolated from Dark Mode via CSS utilities
 */
const AuroraBackground = ({
  colorStops = ["#D71921", "#F37021", "#FFC72C"],
  amplitude = 1.0,
  speed = 0.6,
  opacity = 0.14,
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Parse hex to rgb
    const hexToRgb = (hex) => {
      const sanitized = hex.replace("#", "");
      const num = parseInt(sanitized, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const parsedColors = colorStops.map(hexToRgb);

    const handleResize = () => {
      // Use devicePixelRatio capped at 1.5 for performance and smoothness
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Dynamic wave emitters with individual harmonic trajectories
    const emitters = [
      {
        color: parsedColors[0] || { r: 215, g: 25, b: 33 }, // Cranberry
        baseX: 0.25,
        baseY: 0.2,
        radiusMult: 0.55,
        fX1: 0.7,
        fY1: 0.5,
        fX2: 0.4,
        fY2: 0.8,
        phase: 0.0,
        weight: 1.0,
      },
      {
        color: parsedColors[1] || { r: 243, g: 112, b: 33 }, // Orange
        baseX: 0.75,
        baseY: 0.35,
        radiusMult: 0.6,
        fX1: 0.5,
        fY1: 0.9,
        fX2: 0.8,
        fY2: 0.4,
        phase: 1.8,
        weight: 0.95,
      },
      {
        color: parsedColors[2] || { r: 255, g: 199, b: 44 }, // Gold
        baseX: 0.5,
        baseY: 0.65,
        radiusMult: 0.65,
        fX1: 0.6,
        fY1: 0.6,
        fX2: 0.3,
        fY2: 0.7,
        phase: 3.2,
        weight: 0.85,
      },
      {
        color: parsedColors[0] || { r: 215, g: 25, b: 33 }, // Cranberry bottom accent
        baseX: 0.85,
        baseY: 0.8,
        radiusMult: 0.5,
        fX1: 0.4,
        fY1: 0.7,
        fX2: 0.9,
        fY2: 0.5,
        phase: 4.5,
        weight: 0.9,
      },
      {
        color: parsedColors[1] || { r: 243, g: 112, b: 33 }, // Warm Orange mid-left accent
        baseX: 0.15,
        baseY: 0.75,
        radiusMult: 0.55,
        fX1: 0.8,
        fY1: 0.4,
        fX2: 0.5,
        fY2: 0.6,
        phase: 5.7,
        weight: 0.85,
      },
    ];

    let startTime = performance.now();
    let isPaused = false;

    const onVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        startTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (now) => {
      if (!isPaused) {
        const elapsed = (now - startTime) * 0.0004 * speed;

        ctx.clearRect(0, 0, width, height);

        // Global composite mode for luminous watercolor blending
        ctx.globalCompositeOperation = "source-over";

        emitters.forEach((e) => {
          const t = elapsed + e.phase;

          // Compound sinusoidal trajectory for natural wave flow
          const xOffset =
            (Math.sin(t * e.fX1) * 0.18 + Math.cos(t * e.fX2) * 0.1) *
            amplitude *
            width;
          const yOffset =
            (Math.cos(t * e.fY1) * 0.16 + Math.sin(t * e.fY2) * 0.08) *
            amplitude *
            height;

          const cx = e.baseX * width + xOffset;
          const cy = e.baseY * height + yOffset;

          // Breathing radius
          const rBase = Math.min(width, height) * e.radiusMult;
          const radius = rBase * (1 + 0.15 * Math.sin(t * 1.2));

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          const alpha = opacity * e.weight;
          grad.addColorStop(
            0,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${alpha.toFixed(3)})`
          );
          grad.addColorStop(
            0.5,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${(
              alpha * 0.5
            ).toFixed(3)})`
          );
          grad.addColorStop(
            1,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0)`
          );

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [colorStops, amplitude, speed, opacity]);

  return (
    <div
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full filter blur-[60px] md:blur-[90px] transform-gpu will-change-transform"
      />
    </div>
  );
};

export default AuroraBackground;
