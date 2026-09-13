import React from 'react';

/**
 * ShinyText — React Bits Component
 * Creates an animated luminous sweep effect across text.
 * Strictly respects Light Mode charcoal contrast (#1F1A1C) with subtle Rotaract cranberry shine,
 * while preserving dark mode styling.
 *
 * Props:
 *   text      {string}  — text to display (or pass as children)
 *   disabled  {boolean} — disable animation
 *   speed     {number}  — animation duration in seconds (default 4)
 *   className {string}  — additional CSS classes
 */
const ShinyText = ({
  text,
  children,
  disabled = false,
  speed = 4,
  className = '',
}) => {
  const content = text ?? children;
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text inline-block font-bold tracking-wider uppercase ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        animationDuration,
      }}
    >
      {content}
    </span>
  );
};

export default ShinyText;
