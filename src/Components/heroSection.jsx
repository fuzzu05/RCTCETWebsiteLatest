import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlurText from "./ReactBits/BlurText";
import ShinyText from "./ReactBits/ShinyText";

const BG_DESKTOP = "f_auto,q_auto:low,w_1400,c_fill,g_auto";
const BG_MOBILE = "f_auto,q_auto:low,w_600,c_fill,g_auto";

import { heroImages as imagesData } from "../data/heroImages";

export default function RotaractClubLayout() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount to catch any edge cases
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % imagesData.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const bgUrl = useMemo(() => {
    const transform = isMobile ? BG_MOBILE : BG_DESKTOP;
    return `https://res.cloudinary.com/dtc2xaeaf/image/upload/${transform}/${imagesData[bgIndex].id}`;
  }, [bgIndex, isMobile]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Slideshow using Framer Motion for smooth crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={bgUrl}
          alt={imagesData[bgIndex].title}
          className="absolute inset-0 w-full h-full object-cover z-0 contrast-[1.02] saturate-[1.05] dark:brightness-[0.95]"
        />
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          Refined Light Mode Overlay System (Dialed-Back & Vibrant)
          ════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* 1. Subtle Base Dimmer: softened in light mode to keep photos bright */}
        <div className="absolute inset-0 bg-black/15 dark:bg-black/45" />

        {/* 2. Soft Top Vignette: light gradient behind navbar */}
        <div className="absolute inset-x-0 top-0 h-28 md:h-36 bg-gradient-to-b from-black/25 via-black/10 to-transparent dark:from-black/50 dark:via-black/20" />

        {/* 3. Subtle Warm Rotaract Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D71921]/5 via-[#FFC72C]/5 to-[#F37021]/5 mix-blend-overlay dark:opacity-0 transition-opacity duration-500" />

        {/* 4. Soft Bottom Fade into Warm Beige (#FAF7F2) */}
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 md:h-60 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/30 to-transparent dark:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Center Content: Logo and Title */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center px-3 w-full max-w-[95vw] md:max-w-5xl">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_400/v1756746594/logo_pdqctw.svg"
          alt="Rotaract Club Logo"
          className="h-28 w-28 md:h-40 md:w-40 mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        />

        {/* Shiny Badge above Hero Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md border border-stone-200/60 dark:border-white/10 shadow-sm mb-4">
          <ShinyText text="ROTARACT DISTRICT 3141" className="text-xs font-bold tracking-widest" />
        </div>

        <h1
          className="text-[12vw] sm:text-6xl md:text-[5.5rem] lg:text-[6rem] font-black uppercase leading-[1.05] tracking-tighter select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
        >
          <BlurText
            text="ROTARACT CLUB"
            className="justify-center whitespace-nowrap"
            textClassName="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            delay={0.08}
            startDelay={0.05}
            duration={0.65}
          />
          <br />
          <BlurText
            text="OF TCET"
            className="justify-center whitespace-nowrap"
            textClassName="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            delay={0.08}
            startDelay={0.25}
            duration={0.65}
          />
        </h1>
      </div>

      {/* Top Right: Event Name */}
      <div className="absolute top-24 md:top-10 right-4 md:right-5 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md border border-stone-200/60 dark:border-white/10 shadow-sm"
          >
            <ShinyText
              text={imagesData[bgIndex].title}
              className="text-sm md:text-base font-bold tracking-wider"
            />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}