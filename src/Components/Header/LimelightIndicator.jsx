import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";

/**
 * LimelightIndicator
 *
 * Renders a glowing horizontal light bar with a tapered spotlight cone
 * and soft ambient aura that dynamically centers over the active navigation item in the Header.
 * Automatically synchronizes with the active route and adapts to theme changes.
 */
const LimelightIndicator = ({ activeIndex, navItemRefs, containerRef }) => {
  const [indicatorState, setIndicatorState] = useState({
    left: 0,
    opacity: 0,
    isReady: false,
  });

  const isFirstRender = useRef(true);
  const limelightWidth = 36; // 36px sleek width for the horizontal lamp

  const calculateLeft = useCallback(
    (index) => {
      if (
        index === -1 ||
        !navItemRefs?.current ||
        !navItemRefs.current[index] ||
        !containerRef?.current
      ) {
        return null;
      }

      const activeItem = navItemRefs.current[index];
      return (
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelightWidth / 2
      );
    },
    [navItemRefs, containerRef, limelightWidth]
  );

  const applyPosition = useCallback(
    (smooth = true) => {
      if (activeIndex === -1) {
        setIndicatorState((prev) => ({ ...prev, opacity: 0 }));
        return true;
      }

      const newLeft = calculateLeft(activeIndex);
      if (newLeft === null) {
        return false;
      }

      setIndicatorState((prev) => ({
        left: newLeft,
        opacity: 1,
        isReady: smooth ? prev.isReady : false,
      }));
      return true;
    },
    [activeIndex, calculateLeft]
  );

  // Measure on layout effect and handle first render with animation frame retries
  useLayoutEffect(() => {
    let cancelled = false;

    const attemptPosition = (retryCount = 0) => {
      if (cancelled) return;
      const success = applyPosition(!isFirstRender.current);
      if (success) {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          setTimeout(() => {
            if (!cancelled) {
              setIndicatorState((prev) => ({ ...prev, isReady: true }));
            }
          }, 60);
        }
      } else if (retryCount < 6) {
        // Retry on next animation frame if DOM refs are still attaching
        requestAnimationFrame(() => attemptPosition(retryCount + 1));
      }
    };

    attemptPosition();

    return () => {
      cancelled = true;
    };
  }, [activeIndex, applyPosition]);

  // Recalculate on window resize, observer resize, font loads, and layout stabilization
  useEffect(() => {
    const handleReposition = () => {
      applyPosition(true);
    };

    window.addEventListener("resize", handleReposition, { passive: true });

    let resizeObserver;
    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleReposition);
      resizeObserver.observe(containerRef.current);
    }

    if (document.fonts) {
      document.fonts.ready.then(handleReposition).catch(() => {});
    }

    // Periodic check to ensure position is accurate after page fonts/assets finish loading
    const t1 = setTimeout(handleReposition, 100);
    const t2 = setTimeout(handleReposition, 350);

    return () => {
      window.removeEventListener("resize", handleReposition);
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [applyPosition, containerRef]);

  // Check user OS preference for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const transitionStyle = prefersReducedMotion
    ? "opacity 200ms ease"
    : indicatorState.isReady
    ? "left 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease"
    : "opacity 200ms ease";

  return (
    <div
      className={`absolute -top-1 pointer-events-none w-9 transition-opacity ${
        indicatorState.opacity === 1 ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${indicatorState.left}px`,
        transition: transitionStyle,
      }}
      aria-hidden="true"
    >
      {/* 1. Horizontal glowing lamp emitter bar */}
      <div
        className="w-9 h-[3px] rounded-full bg-primary relative z-10"
        style={{
          boxShadow:
            "0 0 8px rgb(var(--primary)), 0 0 16px rgb(var(--primary) / 0.6)",
        }}
      />

      {/* 2. Soft focused light beam directly underneath the lamp */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[2px] w-20 h-10 pointer-events-none rounded-b-2xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 90% at 50% 0%, rgb(var(--primary) / 0.22) 0%, rgb(var(--primary) / 0.08) 55%, transparent 90%)",
          filter: "blur(2px)",
        }}
      />

      {/* 3. Soft ambient glow wash spreading softly around active item */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-12 pointer-events-none rounded-b-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 85% at 50% 0%, rgb(var(--primary) / 0.14) 0%, rgb(var(--primary) / 0.04) 65%, transparent 100%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
};

export default LimelightIndicator;
