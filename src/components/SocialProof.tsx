import { useRef, CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const TESTIMONIALS = [
  {
    name: "Mik Arte",
    handle: "@mik.arte",
    text: "Isso aqui não é roupa, é identidade. Representa a alma da cena urbana com perfeição técnica."
  },
  {
    name: "Brisa 24",
    handle: "@brisa_24",
    text: "Me sinto parte de algo maior. O Cøletivo é elite no design e na essência cultural."
  },
  {
    name: "OG Nova",
    handle: "@og.nova",
    text: "Autêntico, bruto e necessário. Finalmente uma marca que entende o peso da rua sem forçar a barra, uma extensão do nosso movimento."
  },
  {
    name: "Vitor Core",
    handle: "@vitor.core",
    text: "Qualidade impecável e atendimento que realmente se importa com a cena local. O showroom é sensacional."
  }
];

export const CulturePartners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'lines,words' });
      gsap.fromTo(splitTitle.words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    gsap.fromTo(".testimonial-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-36 bg-brand-white text-brand-black border-b border-brand-black/5 relative transition-colors duration-500">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-[0.03] dark:opacity-[0.015] transition-opacity duration-500" 
        style={{ '--grid-color': 'currentColor' } as CSSProperties} 
      />

      <div className="container mx-auto px-6 lg:px-12 xl:px-24 relative z-10">
        {/* Title Stack */}
        <div className="flex flex-col mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold mb-6 italic">
            // Nosso espaço
          </span>
          <h2 
            ref={titleRef}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.1] text-brand-black max-w-4xl"
          >
            Nossos parceiros que <span className="font-sans font-light italic lowercase tracking-normal text-brand-pink">vivem</span> a cultura.
          </h2>
          <div className="w-12 h-[2px] bg-brand-pink mt-6" />
        </div>

        {/* Text Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="testimonial-card group flex flex-col justify-between p-8 md:p-10 bg-brand-cream/40 border border-brand-black/5 hover:border-brand-pink/30 hover:bg-brand-cream/80 transition-all duration-500 rounded-sm"
            >
              <div className="flex flex-col gap-6">
                {/* Styled Quote Mark Accent */}
                <span className="font-display font-black text-4xl text-brand-pink/20 group-hover:text-brand-pink/40 transition-colors duration-500 leading-none select-none">
                  “
                </span>
                
                <p className="text-lg md:text-xl font-sans font-medium italic leading-relaxed text-brand-black/80 group-hover:text-brand-black transition-colors duration-500">
                  {t.text}
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-brand-black/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm uppercase tracking-tight text-brand-black">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-pink/60 mt-1">
                    {t.handle}
                  </span>
                </div>
                
                <span className="text-[8px] font-mono text-brand-black/35 tracking-[0.3em] uppercase hidden sm:inline">
                  Verified_Voice
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
