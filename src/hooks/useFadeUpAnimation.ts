import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference once at module load
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * useFadeUpAnimation
 *
 * Reusable GSAP hook that animates all elements matching `.fade-up`
 * inside the provided scope element. Each element fades in and slides up
 * as it enters the viewport.
 *
 * Respects prefers-reduced-motion: when set, elements are made instantly
 * visible without animation.
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useFadeUpAnimation(containerRef);
 *   // Then add className="fade-up" to any element inside containerRef
 */
export const useFadeUpAnimation = (
  scopeRef: RefObject<HTMLElement | null>,
  options?: {
    /** Y offset to start from (default: 40) */
    yOffset?: number;
    /** Animation duration in seconds (default: 1) */
    duration?: number;
    /** GSAP ease string (default: "power3.out") */
    ease?: string;
    /** Scroll trigger start (default: "top 80%") */
    start?: string;
  }
) => {
  const {
    yOffset = 40,
    duration = 1,
    ease = "power3.out",
    start = "top 80%",
  } = options ?? {};

  useGSAP(
    () => {
      if (!scopeRef.current) return;

      const elements = scopeRef.current.querySelectorAll<HTMLElement>(".fade-up");
      if (!elements.length) return;

      // Skip animation entirely for reduced-motion users —
      // just show elements immediately
      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: el,
              start,
              // once: true — kills ScrollTrigger after first play to free memory
              once: true,
            },
            // Clear will-change after animation completes
            onComplete: () => {
              el.style.willChange = "auto";
            },
          }
        );
        // Set will-change before animation starts
        el.style.willChange = "transform, opacity";
      });
    },
    { scope: scopeRef, dependencies: [yOffset, duration, ease, start] }
  );
};
