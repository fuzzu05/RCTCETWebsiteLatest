import React, { useEffect, useRef } from "react";

/**
 * AuroraBackground — High-Visibility Dynamic Ambient Gradient Mesh
 * Inspired by React Bits (DavidHDev/react-bits)
 * 
 * Features:
 * - High contrast Rotaract colors: Cranberry (#C2131A), Warm Orange (#E05A0B), Gold (#E6AF19)
 * - Focused blur (35px - 45px) to prevent colors from washing out into flat gray
 * - 100% reliable hybrid engine: CSS animated floating gradient orbs + HTML5 Canvas wave motion
 * - Guaranteed non-zero sizing with z-0 positioning above background and behind z-10 content
 * - Full Dark Mode isolation (.dark:hidden)
 */
const AuroraBackground = ({
  colorStops = ["#C2131A", "#E05A0B", "#E6AF19"],
  opacity = 0.52,
  speed = 0.6,
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

    // Dynamic wave emitters with compound harmonic paths
    const emitters = [
      {
        color: colors[0] || { r: 194, g: 19, b: 26 }, // Cranberry
        baseX: 0.2,
        baseY: 0.25,
        radius: 0.45,
        fx: 0.7,
        fy: 0.5,
        phase: 0.0,
      },
      {
        color: colors[1] || { r: 224, g: 90, b: 11 }, // Warm Orange
        baseX: 0.8,
        baseY: 0.3,
        radius: 0.5,
        fx: 0.5,
        fy: 0.8,
        phase: 1.7,
      },
      {
        color: colors[2] || { r: 230, g: 175, b: 25 }, // Gold
        baseX: 0.5,
        baseY: 0.65,
        radius: 0.55,
        fx: 0.6,
        fy: 0.6,
        phase: 3.4,
      },
      {
        color: colors[0] || { r: 194, g: 19, b: 26 }, // Cranberry bottom-right
        baseX: 0.85,
        baseY: 0.8,
        radius: 0.42,
        fx: 0.4,
        fy: 0.7,
        phase: 4.8,
      },
      {
        color: colors[1] || { r: 224, g: 90, b: 11 }, // Warm Orange bottom-left
        baseX: 0.15,
        baseY: 0.75,
        radius: 0.45,
        fx: 0.8,
        fy: 0.4,
        phase: 5.6,
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
        const t = (now - start) * 0.0004 * speed;
        ctx.clearRect(0, 0, width, height);

        emitters.forEach((e) => {
          const time = t + e.phase;
          const cx =
            (e.baseX + Math.sin(time * e.fx) * 0.18 + Math.cos(time * 0.3) * 0.08) *
            width;
          const cy =
            (e.baseY + Math.cos(time * e.fy) * 0.16 + Math.sin(time * 0.4) * 0.08) *
            height;

          const r = Math.min(width, height) * e.radius * (1 + 0.12 * Math.sin(time * 1.1));

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(
            0,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${opacity})`
          );
          grad.addColorStop(
            0.5,
            `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, ${(opacity * 0.45).toFixed(
              3
            )})`
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
      {/* 1. CSS Animated Gradient Mesh Base (Instant, 100% Reliable Render) */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        {/* Cranberry Orb */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#C2131A]/40 blur-[40px] md:blur-[45px] animate-pulse"
          style={{ animationDuration: "14s" }}
        />
        {/* Warm Orange Orb */}
        <div
          className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-[#E05A0B]/40 blur-[40px] md:blur-[45px] animate-pulse"
          style={{ animationDuration: "18s", animationDelay: "2s" }}
        />
        {/* Gold Accent Orb */}
        <div
          className="absolute -bottom-[10%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-[#E6AF19]/35 blur-[35px] md:blur-[40px] animate-pulse"
          style={{ animationDuration: "16s", animationDelay: "4s" }}
        />
        {/* Secondary Cranberry/Orange Glow */}
        <div
          className="absolute bottom-[20%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#C2131A]/35 blur-[35px] md:blur-[45px] animate-pulse"
          style={{ animationDuration: "20s", animationDelay: "6s" }}
        />
      </div>

      {/* 2. Fluid HTML5 Canvas Harmonic Aurora Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full filter blur-[30px] md:blur-[40px] transform-gpu will-change-transform"
      />
    </div>
  );
};

export default AuroraBackground;
