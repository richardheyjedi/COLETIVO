import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

/*
 * OPTIMIZED: CustomCursor now skips entirely on touch/mobile devices.
 *
 * Previous problem:
 *   - Added window.addEventListener("mousemove") on ALL devices, including
 *     phones and tablets that have no mouse cursor.
 *   - Each mousemove fired setState twice, triggering React re-renders on
 *     events that occur 60+ times/sec on desktop — and uselessly on mobile.
 *   - Imported `motion` (Framer Motion) unnecessarily on mobile.
 *
 * Fix:
 *   - Detect pointer: coarse (touch) at module load — skip component entirely.
 *   - On desktop: use useSpring from motion (already in the bundle) but
 *     avoid the redundant setState for position (spring values handle it).
 */

// Detect touch/stylus devices: no need for a custom cursor on them.
const isTouchDevice =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Touch devices don't have a mouse cursor — bail out immediately
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.classList.contains("group") ||
        target.closest(".group") !== null;

      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices or before the cursor is first detected
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor bg-brand-pink"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          scale: isHovering ? 2.5 : 1,
        }}
      />
      <motion.div
        className="custom-cursor-follower hidden md:block"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 0.4,
          borderColor: isHovering ? "transparent" : "rgba(0, 0, 0, 0.3)",
        }}
      />
    </>
  );
};
