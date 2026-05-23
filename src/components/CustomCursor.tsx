import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("group") ||
        target.closest(".group")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

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
