import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface PageTransitionOverlayProps {
  children: (displayLocation: any) => React.ReactNode;
}

export const PageTransitionOverlay = ({ children }: PageTransitionOverlayProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusText, setStatusText] = useState("SYNCHRONIZING");

  // Keep track of the page loading state sequence
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);

      // Randomize vintage technical phrases on route transitions
      const phrases = [
        "RETRIEVING_CULTURE",
        "SYNCING_ARCHIVE",
        "LOADING_EDITION",
        "CONNECTING_COLETIVO",
        "STREET_LOOKBOOK_LOAD",
        "UPDATING_VIEW"
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setStatusText(randomPhrase);

      // 1. Stage midpoint: When the screen is fully dark/covered, switch core page content
      const timerSplit = setTimeout(() => {
        setDisplayLocation(location);
        // Gently reset scroll position to top on transition midpoint
        window.scrollTo(0, 0);
      }, 500);

      // 2. Stage end: Finish the slide-out and set transition state to idle
      const timerEnd = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);

      return () => {
        clearTimeout(timerSplit);
        clearTimeout(timerEnd);
      };
    }
  }, [location, displayLocation]);

  // Curtain slider animations configuration
  const curtainVariants = {
    initial: {
      y: "-100%"
    },
    animate: {
      y: ["-100%", "0%", "0%", "100%"],
      transition: {
        times: [0, 0.45, 0.55, 1],
        duration: 1.0,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const textContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 1, 0],
      transition: {
        times: [0, 0.25, 0.75, 1],
        duration: 1.0,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* 
        This is the actual page content under control.
        We pass the displayLocation so it only changes routes at the midpoint of the transition overlay.
      */}
      <div className={`transition-all duration-700 ${isTransitioning ? "blur-[2px] opacity-20 scale-[0.985]" : "blur-0 opacity-100 scale-100"}`}>
        {children(displayLocation)}
      </div>

      {/* Dynamic Animated Underlay / Overlay panels */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-auto">
            {/* Panel 1: Brand Pink Curtain */}
            <motion.div
              variants={curtainVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-brand-pink z-10"
              style={{ originY: 0 }}
            />

            {/* Panel 2: Brand True Black Curtain (lagged slightly for staggers) */}
            <motion.div
              variants={{
                initial: { y: "-100%" },
                animate: {
                  y: ["-100%", "0%", "0%", "100%"],
                  transition: {
                    times: [0, 0.45, 0.55, 1],
                    duration: 1.0,
                    delay: 0.08,
                    ease: [0.76, 0, 0.24, 1]
                  }
                }
              }}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-brand-true-black z-20 flex flex-col justify-center items-center overflow-hidden"
              style={{ originY: 0 }}
            >
              {/* Inline Film Grain overlay specific to transition for high-fidelity look */}
              <div className="absolute inset-0 grain-overlay opacity-[0.25] mix-blend-overlay pointer-events-none" />

              {/* Viewfinder Camera Lines */}
              <div className="absolute inset-10 border border-white/5 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/25" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/25" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/25" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/25" />
              </div>

              {/* Technical / Editorial Content Inside Overlay */}
              <motion.div
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center text-center px-6 relative z-30 select-none"
              >
                {/* Active scanline visual */}
                <div className="w-[120px] h-[1px] bg-brand-pink/50 mb-8 overflow-hidden relative">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "linear"
                    }}
                    className="w-1/2 h-full bg-brand-pink"
                  />
                </div>

                {/* Main branding text */}
                <h3 className="font-display font-black text-2xl sm:text-4xl tracking-widest text-brand-true-white mb-3">
                  CØLETIVO<span className="text-brand-pink font-sans font-light italic tracking-normal ml-1">.</span>
                </h3>

                {/* Rotating or loading metadata bar */}
                <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.4em] text-brand-true-white/40 uppercase">
                  <span>{statusText}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
                  <span>v0.1_2026</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
