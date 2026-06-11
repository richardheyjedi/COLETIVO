import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Expressø",
    price: "R$ 128,90",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop",
    category: "Basic Line",
    tagline: "Essential Streetwear Piece"
  },
  {
    id: 2,
    name: "Moletom Traços",
    price: "R$ 289,90",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783ee4a?q=80&w=1974&auto=format&fit=crop",
    category: "Limited Edition",
    tagline: "Hand-finished Details"
  },
  {
    id: 3,
    name: "Calça Cargo Roots",
    price: "R$ 254,90",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    category: "Workwear",
    tagline: "Durability Meets Style"
  },
  {
    id: 4,
    name: "Gorro Cøletivo",
    price: "R$ 89,90",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1887&auto=format&fit=crop",
    category: "Accessories",
    tagline: "Winter Essential"
  }
];

export const DropShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

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
            trigger: titleWrapperRef.current,
            start: "top 80%",
          }
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });

    pathsRef.current.forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: path,
          start: "top 85%",
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="drop" className="py-24 md:py-32 bg-brand-white">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        {/* Section Header */}
        <div ref={titleWrapperRef} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
             <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              Current Release // Vol. 01
            </span>
            <h2 ref={titleRef} className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[1.05] text-brand-black">
              The <span className="font-sans font-light italic lowercase tracking-normal text-brand-pink">Archive</span> Collection
            </h2>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-black/50 mb-8 max-w-xs leading-loose">
              Peças limitadas. Design autoral. Criado para durar além das tendências.
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full border border-brand-black/10 flex items-center justify-center font-mono text-[10px]">01</div>
               <div className="w-12 h-12 rounded-full border border-brand-black/10 flex items-center justify-center font-mono text-[10px]">04</div>
            </div>
          </div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className={`group flex flex-col md:col-span-6 lg:col-span-5 ${index % 2 === 0 ? "" : "md:mt-32 lg:col-start-8"}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream border border-brand-black/5 group-cursor-pointer cursor-none">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating "View" Cursor Hack for this specific card */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <div className="w-24 h-24 bg-brand-black text-white rounded-full flex flex-col items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                      <span className="text-[10px] uppercase font-bold tracking-widest">Detail</span>
                      <ArrowUpRight size={16} />
                   </div>
                </div>

                {/* Tags */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   <span className="px-3 py-1 bg-brand-white text-[9px] font-bold uppercase tracking-widest shadow-sm">
                     {product.category}
                   </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-8 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter text-brand-black group-hover:text-brand-pink transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-black/30">
                    // {product.tagline}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="relative">
                    {/* Scribble Price Container */}
                    <svg viewBox="0 0 100 40" className="absolute -inset-4 w-[calc(100%+2rem)] h-full opacity-60 text-brand-pink fill-none stroke-current pointer-events-none" style={{ strokeWidth: 1.5 }}>
                      <path 
                        ref={el => pathsRef.current[index] = el}
                        d="M10,5 Q50,2 95,8 Q98,20 90,32 Q50,38 5,30 Q2,15 10,5 Z" 
                      />
                    </svg>
                    <span className="text-xl font-display font-bold text-brand-black relative z-10">{product.price}</span>
                  </div>
                  <div className="w-full h-[1px] bg-brand-black/10 mt-2 group-hover:bg-brand-pink transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* View All Bottom */}
        <div className="mt-32 flex justify-center">
            <button className="group flex flex-col items-center gap-4">
               <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-brand-black/40 group-hover:text-brand-black transition-colors">Explorar Todo o Arquivo</span>
               <div className="w-px h-16 bg-brand-black/10 group-hover:h-24 transition-all duration-700 group-hover:bg-brand-pink" />
            </button>
        </div>
      </div>
    </section>
  );
};

