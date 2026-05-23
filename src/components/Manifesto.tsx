import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgTextWrapperRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Background text parallax
    gsap.to(bgTextWrapperRef.current, {
      xPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Continuous subtle animation for depth and movement
    gsap.to(bgTextRef.current, {
      yPercent: 5,
      rotation: 2,
      scale: 1.03,
      duration: 10,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'lines,words,chars' });
      gsap.fromTo(splitTitle.chars, 
        { opacity: 0, y: 30, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          stagger: 0.05, 
          duration: 1, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    gsap.fromTo(textContentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="manifesto" className="py-24 md:py-40 bg-brand-true-black relative overflow-hidden">
      {/* Background Typography as Texture */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden flex items-center justify-center -z-10">
        <div ref={bgTextWrapperRef} className="will-change-transform">
          <span ref={bgTextRef} className="font-display text-[60vw] text-brand-true-white/[0.03] uppercase leading-none italic font-bold whitespace-nowrap block will-change-transform">
            Manifestø Movement
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-24 relative">
        {/* Decorative Scribbles from Guidelines */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/2">
          <svg viewBox="0 0 100 100" className="w-64 h-64 text-brand-true-white fill-none stroke-current" strokeWidth="1.5">
            <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M85,15 L15,85" />
          </svg>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
          
          {/* Left Side: Visual/Statement */}
          <div className="lg:col-span-12 mb-12">
            <div
              ref={titleWrapperRef}
              className="flex flex-col items-center text-center"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-brand-pink font-bold mb-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">Nossa Essência</span>
              <h2 ref={titleRef} className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] text-brand-true-white perspective-1000">
                Somos o eco<br/>
                <span className="font-sans font-light lowercase tracking-normal text-brand-pink italic">das ruas.</span>
              </h2>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="lg:col-span-5">
             <div
              ref={textContentRef}
              className="flex flex-col gap-8"
            >
              <div className="w-12 h-[1px] bg-brand-pink" />
              <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter text-brand-true-white leading-tight">
                Design como<br/>ferramenta de<br/>resistência.
              </h3>
              <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-true-white/50 leading-loose">
                Não seguimos calendários. Seguimos pulsos. O Cøletivo nasceu da necessidade de materializar o invisível — o sentimento que nasce nas bordas e conquista os centros.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div
              ref={cardRef}
              className="bg-brand-purple p-8 sm:p-12 md:p-20 text-brand-true-white relative overflow-hidden"
            >
              {/* Corner Tag */}
              <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
                <span className="font-mono text-[8px] opacity-40 uppercase tracking-widest leading-none">Record: 01A</span>
                <span className="font-mono text-[8px] opacity-40 uppercase tracking-widest leading-none mt-1">Status: Original</span>
              </div>

              <p className="text-xl md:text-3xl font-sans font-light italic leading-relaxed text-brand-true-white/80 mb-12">
                "Acreditamos que cada textura, cada corte e cada fibra carrega uma história que merece ser contada. No Cøletivo, a moda é o museu e o seu corpo é a exposição viva."
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-true-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Transmissão em Tempo Real</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t border-brand-true-white/10 pt-8 mt-4 uppercase font-bold text-[8px] tracking-[0.5em] opacity-40">
                  <div className="flex flex-col gap-1">
                    <span>Est. 2024</span>
                    <span>Brasil</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>Authentic</span>
                    <span>Verified</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>High</span>
                    <span>Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Marks */}
      <div className="absolute bottom-20 right-[15%] text-brand-pink opacity-20 pointer-events-none rotate-12">
        <span className="font-display text-[15rem] leading-none select-none">CØ.</span>
      </div>
    </section>
  );
};
