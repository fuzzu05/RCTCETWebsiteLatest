import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";

/**
 * LimelightIndicator
 *
 * Renders a glowing horizontal bar with a tapered spotlight cone
 * that dynamically centers over the active navigation item in the Header.
 * Automatically synchronizes with the active route and adapts to theme changes.
 */
const LimelightIndicator = ({ activeIndex, navItemRefs, containerRef }) => {
  const [indicatorState, setIndicatorState] = useState({
    left: 0,
    opacity: 0,
    isReady: false,
  });

  const isFirstRender = useRef(true);

  const calculateLeft = useCallback(
    (index) => {
      if (
        index === -1 ||
        !navItemRefs.current[index] ||
        !containerRef.current
      ) {
        return null;
      }

      const activeItem = navItemRefs.current[index];
      const limelightWidth = 44; // 11 * 4 = 44px (w-11)
      return (
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelightWidth / 2
      );
    },
    [navItemRefs, containerRef]
  );

  useLayoutEffect(() => {
    if (activeIndex === -1) {
      setIndicatorState((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const newLeft = calculateLeft(activeIndex);
    if (newLeft === null) return;

    if (isFirstRender.current) {
      // First measurement on page load: position immediately without transition
      isFirstRender.current = false;
      setIndicatorState({
        left: newLeft,
        opacity: 1,
        isReady: false,
      });

      // Enable smooth transitions for subsequent route changes
      const timer = setTimeout(() => {
        setIndicatorState((prev) => ({ ...prev, isReady: true }));
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setIndicatorState((prev) => ({
        ...prev,
        left: newLeft,
        opacity: 1,
      }));
    }
  }, [activeIndex, calculateLeft]);

  // Recalculate position on window resize, navbar resize, and font load
  useEffect(() => {
    const handleReposition = () => {
      if (activeIndex === -1) return;
      const newLeft = calculateLeft(activeIndex);
      if (newLeft !== null) {
        setIndicatorState((prev) => ({ ...prev, left: newLeft }));
      }
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

    return () => {
      window.removeEventListener("resize", handleReposition);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex, calculateLeft, containerRef]);

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
      className={`absolute top-[-3px] z-20 pointer-events-none w-11 ${
        indicatorState.opacity === 1 ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${indicatorState.left}px`,
        transition: transitionStyle,
      }}
      aria-hidden="true"
    >
      {/* Horizontal glowing bar */}
      <div className="w-11 h-[4px] rounded-full bg-primary shadow-[0_0_12px_rgb(var(--primary)/0.8)] dark:shadow-[0_0_16px_rgb(var(--primary)/0.9)]" />

      {/* Tapered spotlight cone */}
      <div
        className="absolute left-[-30%] top-[4px] w-[160%] h-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--primary) / 0.24) 0%, rgb(var(--primary) / 0.05) 60%, transparent 100%)",
          clipPath: "polygon(5% 100%, 25% 0, 75% 0, 95% 100%)",
        }}
      />
    </div>
  );
};

export default LimelightIndicator;
