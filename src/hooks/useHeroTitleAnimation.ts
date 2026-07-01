import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

// Check for reduced motion preference once at module load
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * useHeroTitleAnimation
 *
 * Premium editorial text entrance animation for page hero headings.
 * Combines Y-translation, blur, and skew for a sophisticated reveal effect
 * inspired by luxury fashion and streetwear editorial design.
 *
 * Respects prefers-reduced-motion: when set, elements are made instantly
 * visible without any animation overhead (no SplitType DOM mutation,
 * no GSAP timeline creation).
 *
 * Usage:
 *   const titleRef = useRef<HTMLHeadingElement>(null);
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useHeroTitleAnimation(titleRef, containerRef);
 */
export const useHeroTitleAnimation = (
  titleRef: RefObject<HTMLHeadingElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
  options: {
    /** Split type passed to SplitType. Default: 'lines,words' */
    splitType?: "lines,words" | "lines,words,chars" | "words" | "chars";
    /** Which split targets to animate. Default: 'words' */
    animateTarget?: "words" | "chars" | "lines";
    /** Animation start delay in seconds. Default: 0.2 */
    delay?: number;
    /** Total stagger span in seconds. Default: 0.55 */
    staggerAmount?: number;
    /** Per-element duration in seconds. Default: 1.35 */
    duration?: number;
    /** Starting Y translation in px. Default: 85 */
    yOffset?: number;
    /** Starting skewX in degrees. Default: -6 */
    skewXStart?: number;
    /** Starting blur in px. Default: 10 */
    blurStart?: number;
  } = {}
) => {
  const {
    splitType = "lines,words",
    animateTarget = "words",
    delay = 0.2,
    staggerAmount = 0.55,
    duration = 1.35,
    yOffset = 85,
    skewXStart = -6,
    blurStart = 10,
  } = options;

  useGSAP(
    () => {
      if (!titleRef.current) return;

      // Skip the full animation for users who prefer reduced motion
      // — just make the element immediately visible
      if (prefersReducedMotion) {
        gsap.set(titleRef.current, { opacity: 1, visibility: "visible" });
        return;
      }

      const split = new SplitType(titleRef.current, { types: splitType });
      const targets: Element[] = split[animateTarget] ?? [];

      if (!targets.length) return;

      // Set initial state instantly (no flash of styled content)
      gsap.set(targets, {
        opacity: 0,
        y: yOffset,
        skewX: skewXStart,
        filter: `blur(${blurStart}px)`,
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        skewX: 0,
        filter: "blur(0px)",
        duration,
        ease: "expo.out",
        stagger: {
          amount: staggerAmount,
          // "center" stagger: words near the middle arrive first, spreading outward
          // gives a wave/ripple quality unique to editorial brands
          ease: "power1.inOut",
        },
        delay,
        // Remove inline filter after animation to let CSS take over
        clearProps: "filter,skewX,willChange",
      });

      return () => {
        split.revert();
      };
    },
    { scope: scopeRef }
  );
};
