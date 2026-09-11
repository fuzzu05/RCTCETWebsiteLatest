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
 * - Ambient scroll-driven gradient shifts (Cranberry Red -> Warm Orange -> Rotary Gold)
 * - Smooth entrance animations for cards & content sections
 * - Scoped exclusively to Light Mode (disabled/hidden in Dark Mode)
 */
export function initRotaractLightAnimations(theme) {
  // If in dark mode, do not apply light mode animations
  if (theme === 'dark') {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. Ambient Background Gradient Shift on scroll (Light Mode only)
    const ambientGlow = document.querySelector('#rotaract-ambient-glow');
    if (ambientGlow) {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })
      .to(ambientGlow, {
        background: 'radial-gradient(circle at 80% 20%, rgba(215, 25, 33, 0.07) 0%, rgba(243, 112, 33, 0.04) 40%, transparent 70%)',
        ease: 'none',
      })
      .to(ambientGlow, {
        background: 'radial-gradient(circle at 20% 50%, rgba(243, 112, 33, 0.08) 0%, rgba(255, 199, 44, 0.05) 50%, transparent 75%)',
        ease: 'none',
      })
      .to(ambientGlow, {
        background: 'radial-gradient(circle at 70% 80%, rgba(255, 199, 44, 0.08) 0%, rgba(215, 25, 33, 0.05) 45%, transparent 70%)',
        ease: 'none',
      });
    }

    // 2. Subtle entrance animations for light mode sections & cards
    const revealCards = document.querySelectorAll('.rotaract-fade-up, [data-rotaract-reveal]');
    revealCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  });

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
