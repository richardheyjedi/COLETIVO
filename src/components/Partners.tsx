import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PARTNERS = [
  "Branding Lab", "Urban Collective", "SP Archive", "Street Culture", "Vanguard", "Authentic", "Visual Studio"
];

const BRAND_COLORS = ["bg-brand-pink", "bg-brand-purple", "bg-brand-green", "bg-brand-orange"];

export const Partners = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;
    
    // Instead of measuring exactly, animating by -50% because we duplicated the items perfectly
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <section className="py-16 md:py-24 bg-brand-white border-b border-brand-black/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        <div className="flex flex-col mb-12">
           <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold mb-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">Network // Expansion</span>
           <h3 className="font-display font-bold text-2xl uppercase tracking-tighter text-brand-black opacity-0 animate-[fadeIn_1s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
             Marcas que representamos e expandimos.
           </h3>
        </div>
        
        <div className="relative overflow-hidden w-full">
          {/* Marquee effect */}
          <div 
            ref={marqueeRef}
            className="flex gap-16 md:gap-24 whitespace-nowrap py-10 w-fit"
          >
            {/* Real items and duplicated items side-by-side for infinite seamless loop */}
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-2 h-2 ${BRAND_COLORS[index % BRAND_COLORS.length]} rounded-full`} />
                <span className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-black opacity-10 hover:opacity-100 transition-opacity cursor-default">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
