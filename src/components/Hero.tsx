import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useHeroTitleAnimation } from "../hooks/useHeroTitleAnimation";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Apply premium title entry animation
  useHeroTitleAnimation(titleRef, containerRef, {
    splitType: "lines,words,chars",
    animateTarget: "chars",
    delay: 0.5,
    staggerAmount: 0.8,
    yOffset: 60,
  });

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(imageWrapperRef.current, { scale: 1.1, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }, 0)
      .fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.5)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 1.5);

    // Parallax on scroll
    gsap.to(imageWrapperRef.current, {
      yPercent: 15,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] lg:h-screen flex items-center justify-center overflow-hidden bg-brand-white pt-28 pb-12 md:py-0"
    >
      {/* Background Semantic Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />
      
      {/* Editorial Video - Main Visual */}
      <div 
        ref={imageWrapperRef}
        className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none bg-black"
      >
        <div className="absolute inset-0 bg-white/15 dark:bg-black/40 z-10 transition-colors duration-500" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          aria-label="Vídeo de fundo do CØLETIVO"
          className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
          referrerPolicy="no-referrer"
        >
          <source src="https://www.image2url.com/r2/default/videos/1782788850483-b9096a59-afa9-4904-9785-a09c03cbf870.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-white to-transparent z-10 transition-colors duration-500" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-24 relative z-20">
        <div className="flex flex-col items-center text-center">
          {/* Top Label */}
          <div
            ref={labelRef}
            className="flex items-center gap-4 mb-4 md:mb-6"
          >
            <span className="w-8 h-[1px] bg-brand-black/20" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-brand-black/40">
              Autumn / Winter Collection 24
            </span>
            <span className="w-8 h-[1px] bg-brand-black/20" />
          </div>

          {/* Main Title Stack */}
          <div 
            ref={textRef}
            className="relative"
          >
            <h1 
              ref={titleRef}
              className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-[1.15] tracking-tighter uppercase mb-4 md:mb-6 text-brand-black perspective-1000 max-w-3xl text-center"
            >
              O maior hub de streetwear, negócios e marcas
            </h1>

            {/* Float Floating Element (Asterisk) */}
            <div 
              className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-20 h-20 md:w-32 md:h-32 text-brand-pink opacity-20 pointer-events-none animate-[spin_20s_linear_infinite]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1">
                <path d="M50,10 L50,90 M10,50 L90,50 M20,20 L80,80 M80,20 L20,80" />
              </svg>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div
            ref={ctaRef}
            className="mt-6 md:mt-8 flex flex-col items-center"
          >
            <p className="w-full max-w-lg md:max-w-2xl px-4 text-xs sm:text-sm md:text-base font-medium text-brand-black/60 mb-6 md:mb-8 leading-relaxed tracking-wide">
              Há mais de 20 anos conectando marcas, lojistas, representantes e oportunidades através de uma operação completa de gestão, representação comercial, expansão de mercado e inteligência estratégica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="relative group overflow-hidden border border-brand-black px-8 py-4 transition-all duration-700 bg-brand-black">
                <div className="absolute inset-0 bg-brand-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[10px] text-brand-white group-hover:text-brand-black transition-colors duration-500">
                  CONHEÇA NOSSO ECOSSISTEMA
                </span>
              </button>
              <button className="relative group overflow-hidden border border-brand-pink bg-transparent px-8 py-4 transition-all duration-700">
                <div className="absolute inset-0 bg-brand-pink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[10px] text-brand-pink group-hover:text-brand-white transition-colors duration-500">
                  FALE COM UM ESPECIALISTA
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[9px] uppercase tracking-[0.5em] font-mono">Scroll</span>
        <div className="animate-bounce">
          <ArrowDown size={14} />
        </div>
      </div>

      {/* Corner Data */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-1 opacity-20">
        <span className="text-[9px] font-mono tracking-widest uppercase">System_Active: True</span>
        <span className="text-[9px] font-mono tracking-widest uppercase">Location: SP_BR</span>
      </div>
    </section>
  );
};;

