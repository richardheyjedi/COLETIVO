import { useRef } from "react";
import { ArrowRight, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();

  useGSAP(() => {
    if (!containerRef.current || pathname !== "/") return;

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
        
        {pathname === "/" && (
          <div className="flex flex-col mb-32">
             <div
              ref={titleWrapperRef}
              className="flex flex-col items-center text-center max-w-7xl mx-auto"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-brand-pink font-bold mb-12 italic opacity-0 animate-[fadeIn_1s_ease-out_forwards] delay-300">// Final_Chapter</span>
              <h2 ref={titleRef} className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter uppercase text-brand-true-white">
                Faça parte do{" "}
                <span className="font-sans font-light lowercase tracking-normal text-brand-pink italic inline-block whitespace-nowrap">CØLETIVO.</span>
              </h2>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto w-full">
              {/* WhatsApp LOJA */}
              <a 
                href="https://wa.me/5554996027635" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 group relative overflow-hidden border border-brand-true-white/10 hover:border-brand-pink p-8 transition-all duration-500 bg-brand-true-white/5 text-center flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-pink font-bold block">// FALE CONOSCO //</span>
                <span className="relative z-10 font-display font-black uppercase tracking-[0.2em] text-sm text-brand-true-white group-hover:text-brand-pink transition-colors flex items-center gap-2">
                  WHATSAPP LOJA <ArrowUpRight size={14} />
                </span>
              </a>

              {/* WhatsApp REPRESENTAÇÃO */}
              <a 
                href="https://wa.me/5554991410021" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 group relative overflow-hidden border border-brand-true-white/10 hover:border-brand-purple p-8 transition-all duration-500 bg-brand-true-white/5 text-center flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-purple font-bold block">// FALE CONOSCO //</span>
                <span className="relative z-10 font-display font-black uppercase tracking-[0.2em] text-sm text-brand-true-white group-hover:text-brand-purple transition-colors flex items-center gap-2">
                  REPRESENTAÇÃO <ArrowUpRight size={14} />
                </span>
              </a>
            </div>
          </div>
        )}

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
                    <Link to="/representacao" className="hover:text-brand-true-white transition-colors">Representação</Link>
                    <Link to="/barbearia" className="hover:text-brand-true-white transition-colors">Barbearia</Link>
                    <Link to="/studio" className="hover:text-brand-true-white transition-colors">Cø. Studio</Link>
                    <Link to="/gestao" className="hover:text-brand-true-white transition-colors">Gestão</Link>
                    <Link to="/contato" className="hover:text-brand-true-white transition-colors">Contato</Link>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-pink">Social</span>
                <div className="flex flex-col gap-2 text-[10px] uppercase font-bold text-brand-true-white/40">
                   <a href="https://www.instagram.com/coletivo_co/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-true-white transition-colors">Instagram</a>
                   <a href="#" className="hover:text-brand-true-white transition-colors">TikTok</a>
                   <a href="#" className="hover:text-brand-true-white transition-colors">Spotify</a>
                   <a href="https://www.youtube.com/@coletivo.studioCO" target="_blank" rel="noopener noreferrer" className="hover:text-brand-true-white transition-colors">YouTube</a>
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
             <span className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40">Handcrafted in Farroupilha, RS</span>
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

