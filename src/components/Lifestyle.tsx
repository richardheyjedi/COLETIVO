import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop", size: "col-span-2 row-span-1" },
  { img: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop", size: "col-span-1 row-span-1" },
  { img: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=1887&auto=format&fit=crop", size: "col-span-1 row-span-2" },
  { img: "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=1925&auto=format&fit=crop", size: "col-span-1 row-span-1" },
  { img: "https://images.unsplash.com/photo-1514316484710-8512965638b9?q=80&w=1887&auto=format&fit=crop", size: "col-span-2 row-span-1" }
];

export const Lifestyle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(textContentRef.current,
      { opacity: 0, x: -30 },
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

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 75%",
        }
      });
    }

    gsap.fromTo(imagesRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-brand-green">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <div
              ref={textContentRef}
              className="flex flex-col"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-black font-bold mb-8 italic">The Scene // Local Culture</span>
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.8] mb-8 text-brand-black relative">
                Mais que uma <span className="font-sans font-light italic lowercase tracking-normal">marca.</span><br />
                <span className="opacity-10 outline-text !-webkit-text-stroke-brand-black">Uma cena.</span>
                
                {/* Decorative Scribble Underline */}
                <svg viewBox="0 0 200 40" className="absolute -bottom-4 left-0 w-64 h-12 text-brand-pink fill-none stroke-current opacity-80" strokeWidth="3">
                  <path 
                    ref={pathRef}
                    d="M10,20 Q100,5 190,25 M15,30 Q100,10 185,35" 
                    strokeLinecap="round"
                  />
                </svg>
              </h2>
              <p className="text-brand-black/60 mb-12 max-w-sm font-medium text-[10px] uppercase tracking-[0.2em] leading-loose">
                Unindo artistas, criadores e a pulsação das ruas em um ecossistema de expressão autêntica.
              </p>
              
              <button className="flex items-center gap-6 group self-start">
                <span className="uppercase text-[10px] font-bold tracking-[0.5em] text-brand-black border-b border-brand-black/20 pb-2 group-hover:border-brand-pink group-hover:text-brand-pink transition-all duration-500">Documentação da Cena</span>
                <ArrowUpRight size={18} className="text-brand-black group-hover:text-brand-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              {GALLERY.map((item, index) => (
                <div
                  key={index}
                  ref={el => imagesRef.current[index] = el}
                  className={`${item.size} relative overflow-hidden bg-brand-white/20 border border-brand-black/5 group`}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={item.img} 
                      alt="Gallery"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 p-2 bg-brand-black/10 backdrop-blur-md border border-brand-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[8px] font-mono text-brand-black tracking-widest">IMG_0{index+1}_RAW</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

