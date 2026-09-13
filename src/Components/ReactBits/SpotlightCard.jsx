/**
 * SpotlightCard — React Bits inspired interactive card with dynamic mouse-following spotlight glow.
 * Optimized for Rotaract Light Mode overhaul (Cranberry Red / Warm Orange / Rotaract Gold).
 *
 * Props:
 *   children          {ReactNode} — card inner content
 *   className         {string}    — card container styling
 *   spotlightColor    {string}    — radial spotlight color (defaults to Rotaract Cranberry Red light tint)
 */
import { useRef, useState } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(215, 25, 33, 0.12)",
  ...props
}) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[2rem] border border-stone-200/60 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      {...props}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
