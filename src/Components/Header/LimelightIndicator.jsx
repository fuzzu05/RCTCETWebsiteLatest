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

      // Shift slightly to the right as requested (+6px)
      const shiftX = 6;
      const left = itemRect.left - containerRect.left + shiftX;
      const width = itemRect.width;

      return { left, width };
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
    ? "left 400ms cubic-bezier(0.22, 1, 0.36, 1), width 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease"
    : "opacity 200ms ease";

  const lampWidth = Math.max(28, Math.min(52, indicatorState.width * 0.55));

  return (
    <div
      className={`absolute -top-1 pointer-events-none transition-opacity !m-0 ${
        indicatorState.opacity === 1 ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${indicatorState.left}px`,
        width: `${indicatorState.width}px`,
        transition: transitionStyle,
      }}
      aria-hidden="true"
    >
      {/* 1. Horizontal glowing lamp emitter bar */}
      <div className="flex justify-center w-full">
        <div
          className="h-[3.5px] rounded-full bg-primary relative z-20"
          style={{
            width: `${lampWidth}px`,
            boxShadow:
              "0 0 10px rgb(var(--primary)), 0 0 20px rgb(var(--primary) / 0.9), 0 0 32px rgb(var(--primary) / 0.5)",
          }}
        />
      </div>

      {/* 2. Intense spotlight cone expanding to cover full item width from start to end */}
      <div
        className="absolute left-0 top-[2px] w-full h-14 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--primary) / 0.65) 0%, rgb(var(--primary) / 0.32) 42%, rgb(var(--primary) / 0.08) 78%, transparent 100%)",
          clipPath: "polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* 3. Core luminous ray column directly beneath the lamp */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[1px] w-[70%] h-10 pointer-events-none z-0 rounded-b-xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 50% 0%, rgb(var(--primary) / 0.70) 0%, rgb(var(--primary) / 0.28) 55%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* 4. Ambient light wash spreading softly across and beyond the item */}
      <div
        className="absolute -left-[10%] top-0 w-[120%] h-16 pointer-events-none z-0 rounded-b-full"
        style={{
          background:
            "radial-gradient(ellipse 70% 85% at 50% 0%, rgb(var(--primary) / 0.35) 0%, rgb(var(--primary) / 0.12) 60%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
};

export default LimelightIndicator;
