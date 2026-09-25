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
    width: 0,
    height: 40,
    opacity: 0,
    isReady: false,
  });

  const isFirstRender = useRef(true);

  const calculateGeometry = useCallback(
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
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // Perfectly centered over the active item (0 offset)
      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;
      const height = itemRect.height;

      return { left, width, height };
    },
    [navItemRefs, containerRef]
  );

  const applyPosition = useCallback(
    (smooth = true) => {
      if (activeIndex === -1) {
        setIndicatorState((prev) => ({ ...prev, opacity: 0 }));
        return true;
      }

      const geom = calculateGeometry(activeIndex);
      if (geom === null) {
        return false;
      }

      setIndicatorState((prev) => ({
        left: geom.left,
        width: geom.width,
        height: geom.height,
        opacity: 1,
        isReady: smooth ? prev.isReady : false,
      }));
      return true;
    },
    [activeIndex, calculateGeometry]
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

    let isMounted = true;

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) handleReposition();
      }).catch(() => { });
    }

    const t1 = setTimeout(handleReposition, 100);
    const t2 = setTimeout(handleReposition, 350);

    return () => {
      isMounted = false;
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
      ? "left 400ms cubic-bezier(0.22, 1, 0.36, 1), width 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease"
      : "opacity 200ms ease";

  const lampRatio = 0.55; // Lamp bar is 55% of the active item width
  const lampLeftPct = ((1 - lampRatio) / 2) * 100; // 22.5%
  const lampRightPct = (1 - (1 - lampRatio) / 2) * 100; // 77.5%

  return (
    <div
      className={`absolute -top-1 pointer-events-none transition-opacity !m-0 ${indicatorState.opacity === 1 ? "opacity-100" : "opacity-0"
        }`}
      style={{
        left: `${indicatorState.left}px`,
        width: `${indicatorState.width}px`,
        height: `${indicatorState.height + 4}px`,
        transition: transitionStyle,
      }}
      aria-hidden="true"
    >
      {/* 1. Floor puddle: Ground spotlight reflection at the base (as in reference image) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-3px] pointer-events-none rounded-full z-0"
        style={{
          width: "65%",
          height: "14px",
          background:
            "radial-gradient(ellipse at center, rgb(var(--primary) / 0.35) 0%, rgb(var(--primary) / 0.12) 55%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* 2. Spotlight cone: Clean downward trapezoid beam expanding from lamp to item width */}
      <div
        className="absolute left-0 top-[3px] w-full h-[calc(100%-4px)] pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--primary) / 0.45) 0%, rgb(var(--primary) / 0.22) 40%, rgb(var(--primary) / 0.06) 80%, transparent 100%)",
          clipPath: `polygon(${lampLeftPct}% 0%, ${lampRightPct}% 0%, 100% 100%, 0% 100%)`,
          filter: "blur(1.5px)",
        }}
      />

      {/* 3. Soft ambient glow around the beam for natural atmosphere */}
      <div
        className="absolute -left-[6%] top-0 w-[112%] h-[calc(100%+2px)] pointer-events-none z-0 rounded-b-xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 50% 0%, rgb(var(--primary) / 0.20) 0%, rgb(var(--primary) / 0.06) 60%, transparent 95%)",
          filter: "blur(4px)",
        }}
      />

      {/* 4. Top horizontal glowing lamp emitter bar */}
      <div className="flex justify-center w-full relative z-20">
        <div
          className="h-[3.5px] rounded-full bg-primary"
          style={{
            width: `${lampRatio * 100}%`,
            boxShadow:
              "0 0 8px rgb(var(--primary)), 0 0 16px rgb(var(--primary) / 0.8), 0 0 24px rgb(var(--primary) / 0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default LimelightIndicator;
