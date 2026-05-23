import { useRef } from "react";
import { ArrowRight, Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();

  useGSAP(() => {
    if (!containerRef.current) return;

    let splitTitle: SplitType | null = null;
    if (titleRef.current) {
      splitTitle = new SplitType(titleRef.current, { types: 'lines,chars' });
      gsap.fromTo(splitTitle.chars,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleWrapperRef.current,
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      if (splitTitle) splitTitle.revert();
    };
  }, { scope: containerRef, dependencies: [pathname] });

  return (
    <footer ref={containerRef} className="py-24 bg-brand-true-black border-t border-brand-true-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 text-brand-true-white">
        
        <div className="flex flex-col mb-32">
           <div
            ref={titleWrapperRef}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-brand-pink font-bold mb-12 italic opacity-0 animate-[fadeIn_1s_ease-out_forwards] delay-300">// Final_Chapter</span>
            <h2 ref={titleRef} className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase text-brand-true-white">
              Expressa<br />
              <span className="font-sans font-light lowercase tracking-normal text-brand-pink block -mt-2 sm:-mt-4 italic">øu morra.</span>
            </h2>
          </div>

          <div className="mt-24 flex flex-col items-center">
            <button className="group relative overflow-hidden border border-brand-true-white px-16 py-6 transition-all duration-700 bg-transparent">
              <div className="absolute inset-0 bg-brand-true-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 font-bold uppercase tracking-[0.5em] text-[10px] text-brand-true-white group-hover:text-brand-true-black transition-colors duration-500 flex items-center gap-4">
                Entrar no Arquivo <ArrowUpRight size={14} />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 border-t border-brand-true-white/10 pt-12">
          <div className="flex flex-col gap-2">
             <span className="font-display text-4xl tracking-tighter leading-none">cøletivo.</span>
             <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">System_Authenticated // 100% Brazilian Pride</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-4">
             <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-pink">Navigation</span>
                <div className="flex flex-col gap-2 text-[10px] uppercase font-bold text-brand-true-white/40">
                   <Link to="/loja" className="hover:text-brand-true-white transition-colors">Loja</Link>
                   <Link to="/sobre" className="hover:text-brand-true-white transition-colors">Sobre a Marca</Link>
                   <Link to="/studio" className="hover:text-brand-true-white transition-colors">Cø. Studio</Link>
                   <Link to="/barbearia" className="hover:text-brand-true-white transition-colors">Barbearia</Link>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-pink">Social</span>
                <div className="flex flex-col gap-2 text-[10px] uppercase font-bold text-brand-true-white/40">
                   <a href="#" className="hover:text-brand-true-white transition-colors">Instagram</a>
                   <a href="#" className="hover:text-brand-true-white transition-colors">TikTok</a>
                   <a href="#" className="hover:text-brand-true-white transition-colors">Spotify</a>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-pink">Legal</span>
                <div className="flex flex-col gap-2 text-[10px] uppercase font-bold text-brand-true-white/40">
                   <a href="#" className="hover:text-brand-true-white transition-colors">Privacy</a>
                   <a href="#" className="hover:text-brand-true-white transition-colors">Terms</a>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
             <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40">Handcrafted in São Paulo, BR</span>
             <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40">&copy; 2024 Digital Rights Reserved</span>
          </div>
        </div>
      </div>

      {/* Extreme background text */}
      <div className="absolute -bottom-40 left-0 w-full flex justify-center pointer-events-none opacity-[0.02]">
         <span className="font-display text-[40vw] uppercase leading-none select-none text-brand-white">FIN.</span>
      </div>
    </footer>
  );
};

