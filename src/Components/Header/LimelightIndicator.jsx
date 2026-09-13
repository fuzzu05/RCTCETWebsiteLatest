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
  const limelightWidth = 48; // 48px width for the horizontal lamp

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
      className={`absolute top-[-4px] z-20 pointer-events-none w-12 transition-opacity ${
        indicatorState.opacity === 1 ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${indicatorState.left}px`,
        transition: transitionStyle,
      }}
      aria-hidden="true"
    >
      {/* 1. Horizontal glowing bar (the limelight lamp emitter) */}
      <div
        className="w-12 h-[4px] rounded-full bg-primary"
        style={{
          boxShadow:
            "0 0 10px rgb(var(--primary)), 0 0 20px rgb(var(--primary) / 0.8), 0 0 32px rgb(var(--primary) / 0.5)",
        }}
      />

      {/* 2. Soft ambient aura (wide diffused light wash over active item) */}
      <div
        className="absolute left-[-60%] top-[2px] w-[220%] h-16 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at top, rgb(var(--primary) / 0.40) 0%, rgb(var(--primary) / 0.12) 50%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      {/* 3. Tapered spotlight cone (clear, visible light beam shining down over the text) */}
      <div
        className="absolute left-[-35%] top-[4px] w-[170%] h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--primary) / 0.65) 0%, rgb(var(--primary) / 0.28) 40%, rgb(var(--primary) / 0.06) 80%, transparent 100%)",
          clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
};

export default LimelightIndicator;
