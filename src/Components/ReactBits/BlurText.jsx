/**
 * BlurText — React Bits inspired word-by-word blur-to-sharp reveal.
 * Adapted for Rotaract Light Mode palette.
 * Depends on: framer-motion (already installed).
 *
 * Props:
 *   text        {string}  — text to animate
 *   className   {string}  — extra Tailwind / CSS classes for the wrapper span
 *   delay       {number}  — stagger delay per word in seconds (default 0.06)
 *   duration    {number}  — animation duration per word (default 0.55)
 *   once        {boolean} — only animate once when entering viewport (default true)
 *   threshold   {number}  — IntersectionObserver threshold (default 0.2)
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const wordVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 8,
  },
  visible: (i) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function BlurText({
  text = "",
  className = "",
  textClassName = "text-[#1F1A1C] dark:text-foreground",
  delay = 0.06,
  startDelay = 0,
  duration = 0.55,
  once = true,
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration,
                delay: startDelay + i * delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`inline-block ${textClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
