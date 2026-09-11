/**
 * SplitText — React Bits inspired character-by-character staggered reveal.
 * Adapted for Rotaract Light Mode palette.
 * Depends on: framer-motion (already installed).
 *
 * Props:
 *   text        {string}  — text to animate
 *   className   {string}  — classes applied to the outer wrapper
 *   charClassName {string} — classes applied per character span
 *   delay       {number}  — stagger delay per char in seconds (default 0.03)
 *   duration    {number}  — animation duration per char (default 0.5)
 *   once        {boolean} — only animate once on entering viewport (default true)
 *   threshold   {number}  — IntersectionObserver threshold (default 0.3)
 *   splitBy     {string}  — "char" (default) or "word"
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SplitText({
  text = "",
  className = "",
  charClassName = "",
  delay = 0.03,
  duration = 0.5,
  once = true,
  threshold = 0.3,
  splitBy = "char",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Build array of renderable segments
  const segments =
    splitBy === "word"
      ? text.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + "\u00A0" : w))
      : text.split("");

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`inline-block overflow-hidden ${className}`}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block ${charClassName}`}
          initial={{ opacity: 0, y: "100%", rotate: 4 }}
          animate={
            isInView
              ? { opacity: 1, y: "0%", rotate: 0 }
              : { opacity: 0, y: "100%", rotate: 4 }
          }
          transition={{
            duration,
            delay: i * delay,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {seg}
        </motion.span>
      ))}
    </span>
  );
}
