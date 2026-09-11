import React from "react";

/**
 * MeshBackground — Pure CSS Ambient Mesh Background
 * Lightweight, zero WebGL/canvas dependencies, warm and subtle aesthetic.
 *
 * Requirements:
 * - Base container: #FAF7F2 (Warm Beige)
 * - 3 fixed, low-opacity ambient floating blur circles:
 *   - Top Left: w-[600px] h-[600px] bg-[#F7E7D7] rounded-full blur-[100px] opacity-70
 *   - Center Right: w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-[120px] opacity-50
 *   - Bottom Left: w-[450px] h-[450px] bg-[#D71921]/08 rounded-full blur-[110px] opacity-40
 * - Light SVG noise grain overlay (mix-blend-overlay opacity-[0.025])
 * - Preserves dark mode compatibility (dark:bg-[#1a1410] / dark:hidden for light orbs)
 */
const MeshBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FAF7F2] dark:bg-[#1a1410] select-none"
      aria-hidden="true"
    >
      {/* 3 fixed, low-opacity ambient floating blur circles (Light mode only) */}
      <div className="absolute inset-0 w-full h-full dark:hidden">
        {/* Top Left: w-[600px] h-[600px] bg-[#F7E7D7] rounded-full blur-[100px] opacity-70 */}
        <div
          className="absolute -top-[100px] -left-[100px] w-[600px] h-[600px] bg-[#F7E7D7] rounded-full blur-[100px] opacity-70 animate-pulse transform-gpu"
          style={{ animationDuration: "8s" }}
        />

        {/* Center Right: w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-[120px] opacity-50 */}
        <div
          className="absolute top-[35%] -right-[100px] w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-[120px] opacity-50 transform-gpu"
        />

        {/* Bottom Left: w-[450px] h-[450px] bg-[#D71921]/08 rounded-full blur-[110px] opacity-40 */}
        <div
          className="absolute -bottom-[80px] left-[5%] w-[450px] h-[450px] bg-[#D71921]/[0.08] rounded-full blur-[110px] opacity-40 transform-gpu"
        />
      </div>

      {/* Light SVG noise grain overlay (mix-blend-overlay opacity-[0.025]) */}
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
