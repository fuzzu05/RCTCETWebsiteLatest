import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Synchronizes Lenis smooth scrolling with GSAP's ScrollTrigger and ticker.
 * Ensures silky smooth animations with zero lag or stuttering during scrolling.
 */
export function setupLenisGsapTicker(lenis) {
  if (!lenis) return () => {};

  // 1. Synchronize ScrollTrigger on Lenis scroll events
  lenis.on('scroll', ScrollTrigger.update);

  // 2. Drive Lenis through GSAP ticker
  const tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);

  // 3. Disable lag smoothing to prevent stuttering/jumping during frame drops
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerCallback);
  };
}

/**
 * Initializes Rotaract light-mode scroll animations:
 * - Rotaract Palette: Cranberry Red (#D71921), Warm Orange (#F37021), Yellow (#FFC72C), Warm Beige (#FAF7F2)
 * - Ambient scroll-driven gradient shifts
 * - Subtle entrance animations (fade-in, slide-up) for light-mode sections & cards
 * - Uses gsap.matchMedia & theme checks to strictly isolate light mode and preserve dark mode
 */
export function initRotaractLightAnimations(theme) {
  // Strict Isolation: If dark mode or user prefers reduced motion, skip animations
  if (theme === 'dark' || document.documentElement.classList.contains('dark')) {
    return () => {};
  }

  const mm = gsap.matchMedia();

  mm.add(
    {
      isNotReducedMotion: '(prefers-reduced-motion: no-preference)',
    },
    () => {
      // 1. Scroll-driven ambient background gradient shift (Light Mode only)
      const ambientGlow = document.querySelector('#rotaract-ambient-glow');
      if (ambientGlow) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          })
          .to(ambientGlow, {
            background:
              'radial-gradient(circle at 80% 20%, rgba(215, 25, 33, 0.08) 0%, rgba(243, 112, 33, 0.05) 40%, rgba(250, 247, 242, 0) 70%)',
            ease: 'none',
          })
          .to(ambientGlow, {
            background:
              'radial-gradient(circle at 20% 50%, rgba(243, 112, 33, 0.09) 0%, rgba(255, 199, 44, 0.06) 50%, rgba(250, 247, 242, 0) 75%)',
            ease: 'none',
          })
          .to(ambientGlow, {
            background:
              'radial-gradient(circle at 75% 85%, rgba(255, 199, 44, 0.09) 0%, rgba(215, 25, 33, 0.06) 45%, rgba(250, 247, 242, 0) 70%)',
            ease: 'none',
          });
      }

      // 2. Entrance animations (fade-in + slide-up) for light mode sections and cards
      const revealElements = document.querySelectorAll(
        '.rotaract-fade-up, [data-rotaract-reveal], .group.rounded-\\[2rem\\], .group.rounded-\\[2\\.5rem\\]'
      );

      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  );

  return () => {
    mm.revert();
  };
}

export { gsap, ScrollTrigger };

