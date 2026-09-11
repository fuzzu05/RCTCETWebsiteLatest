import React from "react";

/**
 * MeshBackground — Pure CSS Ambient Mesh Background
 * High-performance, zero WebGL/canvas dependencies, non-distracting warmth
 * 
 * Orbs:
 * - Orb 1 (Top Left): Soft Oat/Beige warmth (#F7E7D7)
 * - Orb 2 (Center Right): Subtle Rotaract Warm Orange (#F37021 / 10%)
 * - Orb 3 (Bottom Left): Subtle Rotaract Cranberry Red (#D71921 / 8%)
 * 
 * Overlay:
 * - SVG grain/noise overlay (opacity 0.025 mix-blend-overlay)
 * - Fully isolated from Dark Mode (.dark:hidden)
 */
const MeshBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FAF7F2] dark:bg-[#1a1410] select-none"
      aria-hidden="true"
    >
      {/* 1. Pure CSS Animated Floating Orbs (Light Mode only) */}
      <div className="absolute inset-0 w-full h-full dark:hidden">
        {/* Orb 1 (Top Left): Soft Oat/Beige warmth */}
        <div
          className="absolute -top-[100px] -left-[100px] w-[600px] h-[600px] bg-[#F7E7D7] rounded-full blur-[100px] opacity-70 animate-pulse transform-gpu"
          style={{ animationDuration: "8s" }}
        />

        {/* Orb 2 (Center Right): Subtle Rotaract Warm Orange */}
        <div
          className="absolute top-[35%] -right-[100px] w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-[120px] opacity-50 transform-gpu"
        />

        {/* Orb 3 (Bottom Left): Subtle Rotaract Cranberry Red */}
        <div
          className="absolute -bottom-[80px] left-[5%] w-[450px] h-[450px] bg-[#D71921]/[0.08] rounded-full blur-[110px] opacity-40 transform-gpu"
        />
      </div>

      {/* 2. Light SVG Grain/Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] dark:opacity-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default MeshBackground;
