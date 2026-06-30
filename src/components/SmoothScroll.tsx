import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after a slight delay to allow the new page's DOM to render and layout to settle
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
};
