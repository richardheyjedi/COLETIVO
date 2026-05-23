import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const VALUES = [
  {
    title: "100% Brasileiro",
    desc: "Produzido e concebido em território nacional. Valorizando a estética e a mão de obra local.",
    id: "BR-ORIGIN"
  },
  {
    title: "Comunidade",
    desc: "Não vendemos para clientes. Cultivamos um ecossistema de criadores e visionários.",
    id: "CO-UNION"
  },
  {
    title: "Colaborações",
    desc: "Conexões reais que transcendem a moda. Música, arte e performance integrados.",
    id: "CO-LABS"
  },
  {
    title: "Vanguarda",
    desc: "Design autoral que desafia o status quo. Estética bruta, execução refinada.",
    id: "AV-GARDE"
  }
];

const BRAND_ACCENT_COLORS = ["text-brand-pink", "text-brand-purple", "text-brand-green", "text-brand-orange"];
const BRAND_BG_COLORS = ["bg-brand-pink", "bg-brand-purple", "bg-brand-green", "bg-brand-orange"];

export const BrandValues = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'lines,words' });
      gsap.fromTo(splitTitle.words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
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
    <section ref={containerRef} className="py-24 md:py-40 bg-brand-white border-t border-brand-black/5">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        <div className="flex flex-col mb-32 items-center text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold mb-8 italic">// Nossos Pilares</span>
          <h2 ref={titleRef} className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-none text-brand-black max-w-4xl">
            Fundamentos <br />
            <span className="text-brand-pink italic">Criativos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-12">
          {VALUES.map((v, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="flex flex-col gap-8 group relative p-6 xl:p-8 border border-brand-black/5 hover:border-brand-black transition-all duration-500 bg-brand-white"
            >
              {/* Decorative Brand Scribble bg */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none ${BRAND_ACCENT_COLORS[index % BRAND_ACCENT_COLORS.length]}`}>
                 {index === 0 && (
                   <svg viewBox="0 0 100 100" className="fill-current">
                     <path d="M50,10 Q60,50 50,90 M10,50 Q50,60 90,50" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" />
                   </svg>
                 )}
                 {index === 1 && (
                   <svg viewBox="0 0 100 100" className="fill-current">
                     <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="20" fill="none" />
                   </svg>
                 )}
                 {index === 2 && (
                   <svg viewBox="0 0 100 100" className="fill-current">
                     <path d="M20,20 L80,80 M80,20 L20,80" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" />
                   </svg>
                 )}
                 {index === 3 && (
                   <svg viewBox="0 0 100 100" className="fill-current">
                     <path d="M50,10 L50,90 M10,30 L90,30 M10,70 L90,70" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" />
                   </svg>
                 )}
              </div>

              <div className="flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className={`font-mono text-[10px] font-bold ${BRAND_ACCENT_COLORS[index % BRAND_ACCENT_COLORS.length]}`}>
                    // 0{index + 1}
                  </span>
                  {/* Small Symbol */}
                  <div className={`${BRAND_ACCENT_COLORS[index % BRAND_ACCENT_COLORS.length]} transition-transform duration-700 group-hover:rotate-180`}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5">
                      {index === 0 && <path d="M12,2 L12,22 M2,12 L22,12 M5,5 L19,19 M19,5 L5,19" />}
                      {index === 1 && <circle cx="12" cy="12" r="8" />}
                      {index === 2 && <path d="M4,4 L20,20 M20,4 L4,20" />}
                      {index === 3 && <path d="M12,2 L12,22 M2,7 L22,7 M2,17 L22,17" />}
                    </svg>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl lg:text-lg xl:text-xl 2xl:text-2xl uppercase tracking-tighter text-brand-black group-hover:text-brand-pink transition-colors duration-500 mb-6 font-bold break-words">
                  {v.title}
                </h3>
              </div>

              <p className="text-brand-black/50 text-[11px] uppercase tracking-widest leading-loose font-medium relative z-10">
                {v.desc}
              </p>
              
              {/* Box Corner accent */}
              <div className={`absolute bottom-0 right-0 w-8 h-8 ${BRAND_BG_COLORS[index % BRAND_BG_COLORS.length]} scale-0 group-hover:scale-100 transition-transform origin-bottom-right duration-500`} />
            </div>
          ))}
        </div>

        {/* Identity reinforcement */}
        <div className="mt-24 md:mt-40 border-t border-brand-black/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
           <div className="font-display text-4xl md:text-6xl text-brand-black opacity-10 select-none">CØLETIVO.</div>
           <div className="flex gap-8">
              <div className="w-2 h-2 rounded-full bg-brand-pink shadow-[0_0_10px_rgba(229,0,70,0.5)]" />
              <div className="w-2 h-2 rounded-full bg-brand-purple" />
              <div className="w-2 h-2 rounded-full bg-brand-green" />
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
           </div>
           <div className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-20">São Paulo Digital Archive</div>
        </div>
      </div>
    </section>
  );
};

