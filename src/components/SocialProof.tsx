import { useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const TESTIMONIALS = [
  {
    type: "text" as const,
    name: "Mik Arte",
    handle: "@mik.arte",
    text: "Isso aqui não é roupa, é identidade. Representa a alma da cena urbana com perfeição técnica.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    col: "lg:col-span-4 md:col-span-6 col-span-1"
  },
  {
    type: "video" as const,
    name: "Luccas // Skater",
    handle: "@luccas.core",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-urban-skater-doing-tricks-on-a-rail-40618-large.mp4",
    col: "lg:col-span-4 md:col-span-6 col-span-1"
  },
  {
    type: "text" as const,
    name: "Brisa 24",
    handle: "@brisa_24",
    text: "Me sinto parte de algo maior. O Cøletivo é elite no design e na essência cultural.",
    img: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1887&auto=format&fit=crop",
    col: "lg:col-span-4 md:col-span-6 col-span-1"
  },
  {
    type: "video" as const,
    name: "Zoe _ Dancer",
    handle: "@zoe.street",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-in-a-parking-lot-427-large.mp4",
    col: "lg:col-span-5 md:col-span-6 col-span-1"
  },
  {
    type: "text" as const,
    name: "OG Nova",
    handle: "@og.nova",
    text: "Autêntico, bruto e necessário. Finalmente uma marca que entende o peso da rua sem forçar a barra, uma extensão do nosso movimento.",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
    col: "lg:col-span-7 md:col-span-12 col-span-1"
  }
];

export const SocialProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { types: 'lines,words' });
      gsap.fromTo(splitTitle.words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-brand-true-black">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        {/* Title Stack */}
        <div className="flex flex-col mb-24">
           <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold mb-6 italic">// Social Recognition</span>
           <h2 
            ref={titleRef}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl xl:text-9xl uppercase tracking-tighter leading-[0.8] text-brand-true-white/0"
          >
            Quem <span className="font-sans font-light italic lowercase tracking-normal text-brand-true-white">vive</span><br/>
            <span className="opacity-10 outline-text !-webkit-text-stroke-brand-true-white">a cultura.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {TESTIMONIALS.map((t, index) => {
            if (t.type === "video") {
              return (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className={`group relative overflow-hidden bg-brand-true-white/5 border border-brand-true-white/10 ${t.col} min-h-[400px] md:min-h-[auto] aspect-auto md:aspect-[4/5] lg:aspect-auto`}
                >
                  <video 
                    src={t.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-true-black/90 via-brand-true-black/20 to-transparent p-8 flex flex-col justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-brand-true-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 text-brand-true-white">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                    
                    <div className="flex justify-between items-end relative z-10 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-2xl uppercase tracking-tighter text-brand-true-white leading-none">{t.name}</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-true-white/50 mt-2">{t.handle}</span>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-pink text-white">
                        <span className="text-[10px] font-bold">REC</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`group flex flex-col justify-between p-8 border border-brand-true-white/10 hover:border-brand-true-white/30 transition-colors duration-500 ${t.col} min-h-[400px]`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-true-white/5 border border-brand-true-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xl uppercase tracking-tighter text-brand-true-white">{t.name}</span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-brand-true-white/30 mt-1">{t.handle}</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <p className="text-xl md:text-2xl font-sans font-medium italic leading-relaxed text-brand-true-white/80 group-hover:text-brand-true-white transition-colors duration-500">
                      "{t.text}"
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   <span className="text-[8px] font-mono text-brand-pink tracking-[0.5em] uppercase">Verified_Voice</span>
                   <div className="h-px flex-1 bg-brand-pink/40 ml-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

