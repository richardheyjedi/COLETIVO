import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * useFadeUpAnimation
 *
 * Reusable GSAP hook that animates all elements matching `.fade-up`
 * inside the provided scope element. Each element fades in and slides up
 * as it enters the viewport.
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
            },
          }
        );
      });
    },
    { scope: scopeRef, dependencies: [yOffset, duration, ease, start] }
  );
};
