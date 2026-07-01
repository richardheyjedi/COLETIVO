import { CSSProperties } from "react";

/*
 * OPTIMIZED Partners Component
 *
 * Changes:
 * 1. Reduced from 4× to 2× duplication — 2× is sufficient for a seamless
 *    infinite loop on any screen width. 4× created ~20 DOM nodes just for
 *    a visual effect, hurting layout/paint performance.
 * 2. Added loading="lazy" + decoding="async" to logo images.
 * 3. Added will-change: transform on the animating wrapper (promotes to
 *    compositor layer — avoids layout/paint during scroll).
 * 4. Added fetchpriority="low" since logos are below-the-fold decoration.
 */

const ROW1_PARTNERS = [
  {
    name: "New Balance",
    logo: (
      <img
        src="https://i.ibb.co/ym3YCHMJ/company-new-balance-logo-png-20.png"
        alt="New Balance"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={48}
        className="h-10 md:h-12 w-auto object-contain invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "Adidas",
    logo: (
      <img
        src="https://i.ibb.co/qYZxNHDf/magnific-background-96647.png"
        alt="Adidas"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={56}
        className="h-12 md:h-14 w-auto object-contain scale-[1.2] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "High",
    logo: (
      <img
        src="https://i.ibb.co/Rp9qN9Yk/magnific-background-96646.png"
        alt="High"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={56}
        className="h-12 md:h-14 w-auto object-contain scale-[1.3] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "Orange",
    logo: (
      <img
        src="https://i.ibb.co/jvYvt47K/magnific-background-96645.png"
        alt="Orange"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={80}
        className="h-16 md:h-20 w-auto object-contain scale-[1.75] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "Approve",
    logo: (
      <img
        src="https://i.ibb.co/wF0sSNBY/magnific-background-96644.png"
        alt="Approve"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={80}
        className="h-16 md:h-20 w-auto object-contain scale-[1.85] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  }
];

const ROW2_PARTNERS = [
  {
    name: "Orange",
    logo: (
      <img
        src="https://i.ibb.co/jvYvt47K/magnific-background-96645.png"
        alt="Orange"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={80}
        className="h-16 md:h-20 w-auto object-contain scale-[1.75] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "Approve",
    logo: (
      <img
        src="https://i.ibb.co/wF0sSNBY/magnific-background-96644.png"
        alt="Approve"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={80}
        className="h-16 md:h-20 w-auto object-contain scale-[1.85] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "New Balance",
    logo: (
      <img
        src="https://i.ibb.co/ym3YCHMJ/company-new-balance-logo-png-20.png"
        alt="New Balance"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={48}
        className="h-10 md:h-12 w-auto object-contain invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "Adidas",
    logo: (
      <img
        src="https://i.ibb.co/qYZxNHDf/magnific-background-96647.png"
        alt="Adidas"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={56}
        className="h-12 md:h-14 w-auto object-contain scale-[1.2] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  },
  {
    name: "High",
    logo: (
      <img
        src="https://i.ibb.co/Rp9qN9Yk/magnific-background-96646.png"
        alt="High"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={120}
        height={56}
        className="h-12 md:h-14 w-auto object-contain scale-[1.3] invert dark:invert-0 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    )
  }
];

export const Partners = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-white text-brand-black border-b border-brand-black/5 overflow-hidden relative transition-colors duration-500">
      {/* Subtle grid accent background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-[0.03] dark:opacity-[0.015] transition-opacity duration-500"
        style={{ '--grid-color': 'currentColor' } as CSSProperties}
      />

      {/* Decorative ambient light */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-purple/5 dark:bg-brand-purple/10 blur-[80px] pointer-events-none transition-colors duration-500" />

      <div className="container mx-auto px-6 lg:px-12 xl:px-24 relative z-10">
        <div className="flex flex-col mb-14">
          <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold mb-4">
            Network // Expansion
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-brand-black transition-colors duration-500">
            Marcas que representamos e expandimos.
          </h3>
          <div className="w-12 h-[2px] bg-brand-pink mt-4" />
        </div>
      </div>

      <div className="flex flex-col gap-6 relative w-full select-none">
        {/* Row 1: Leftwards — 2× duplicate is sufficient for seamless loop */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4 md:gap-6 whitespace-nowrap py-1 w-fit pr-4 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer motion-reduce:animate-none"
            style={{ willChange: "transform" }}
          >
            {[...ROW1_PARTNERS, ...ROW1_PARTNERS].map((partner, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center bg-brand-black/[0.02] border border-brand-black/5 hover:border-brand-pink/30 hover:bg-brand-black/[0.05] px-10 py-5 min-w-[200px] md:min-w-[240px] h-16 md:h-20 transition-all duration-300 group"
              >
                <div className="opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightwards */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4 md:gap-6 whitespace-nowrap py-1 w-fit pr-4 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer motion-reduce:animate-none"
            style={{ willChange: "transform" }}
          >
            {[...ROW2_PARTNERS, ...ROW2_PARTNERS].map((partner, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center bg-brand-black/[0.02] border border-brand-black/5 hover:border-brand-purple/30 hover:bg-brand-black/[0.05] px-10 py-5 min-w-[200px] md:min-w-[240px] h-16 md:h-20 transition-all duration-300 group"
              >
                <div className="opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
