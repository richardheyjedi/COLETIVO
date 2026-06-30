import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHITE_TEES = [
  {
    id: "tee-01",
    name: "Classic Boxy Tee // White",
    price: "R$ 149,90",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    details: "Algodão 220g / Modelagem Boxy / Gola de 3cm",
    tag: "Essential Core"
  },
  {
    id: "tee-02",
    name: "Heavyweight Street Tee",
    price: "R$ 169,90",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
    details: "Algodão Penteado 260g / Alta Densidade / Encolhimento Zero",
    tag: "Premium Heavy"
  },
  {
    id: "tee-03",
    name: "Cø. Archive Graphic Tee",
    price: "R$ 189,90",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    details: "Silk Screen Alta Definição / Modelagem Streetwear Oversized",
    tag: "Limited Graphic"
  },
  {
    id: "tee-04",
    name: "Minimalist Lounge Tee",
    price: "R$ 139,90",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    details: "Algodão Pima / Ultra Macio / Logo Bordado Minimalista",
    tag: "Lounge Fit"
  }
];

interface WhiteTeesCarouselProps {
  buttonLink: string;
  isExternal?: boolean;
  simpleCTA?: boolean;
}

export const WhiteTeesCarousel = ({ buttonLink, isExternal = false, simpleCTA = false }: WhiteTeesCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const denominator = scrollWidth - clientWidth;
    const progress = denominator > 0 ? scrollLeft / denominator : 0;
    setScrollProgress(progress);
  };

  const slide = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const offset = direction === "left" ? -350 : 350;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const renderButton = () => {
    const content = (
      <div className="relative z-10 flex items-center gap-4 font-bold text-xs uppercase tracking-[0.3em]">
        <span>Entrar na Loja</span>
        <ArrowUpRight size={16} />
      </div>
    );

    if (isExternal) {
      return (
        <a 
          href={buttonLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative overflow-hidden bg-brand-orange text-brand-true-black px-12 py-5 transition-all duration-700 hover:bg-brand-true-white hover:text-brand-true-black hover:scale-105 active:scale-95"
        >
          {content}
        </a>
      );
    }

    return (
      <Link 
        to={buttonLink}
        className="group relative overflow-hidden bg-brand-orange text-brand-true-black px-12 py-5 transition-all duration-700 hover:bg-brand-true-white hover:text-brand-true-black hover:scale-105 active:scale-95"
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      {/* Carrossel de Camisetas Brancas */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 bg-brand-true-black relative border-t border-brand-true-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header with Carousel Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-orange font-bold block mb-4">// SELECT_ESSENTIALS</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-brand-true-white">
                BASIC BLANKS // BRANCAS
              </h2>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => slide("left")} 
                className="w-12 h-12 border border-brand-true-white/10 flex items-center justify-center text-brand-true-white hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => slide("right")} 
                className="w-12 h-12 border border-brand-true-white/10 flex items-center justify-center text-brand-true-white hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel container */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pr-12 pb-8"
            style={{ scrollbarWidth: "none" }}
          >
            {WHITE_TEES.map((tee) => (
              <div 
                key={tee.id}
                className="min-w-[280px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start bg-brand-true-black border border-brand-true-white/15 p-4 hover:border-brand-orange transition-all duration-500 group text-left"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-brand-true-white/5 mb-6">
                  <img 
                    src={tee.image} 
                    alt={tee.name} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-brand-true-black border border-brand-true-white/10 text-[8px] font-bold font-mono tracking-widest text-brand-orange uppercase">
                      {tee.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-sm uppercase tracking-tighter text-brand-true-white group-hover:text-brand-orange transition-colors">
                      {tee.name}
                    </h3>
                    <span className="font-display font-black text-sm text-brand-orange shrink-0">
                      {tee.price}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-brand-true-white/40 leading-relaxed font-semibold">
                    {tee.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar indicator */}
          <div className="mt-8 w-full h-[1px] bg-brand-true-white/10 relative">
            <div 
              className="absolute h-[2px] bg-brand-orange top-[-0.5px] transition-all duration-300"
              style={{ 
                left: `${scrollProgress * 75}%`, 
                width: "25%" 
              }}
            />
          </div>

          {/* Simple Clean Button */}
          {simpleCTA && (
            <div className="mt-16 flex justify-center">
              {renderButton()}
            </div>
          )}
        </div>
      </section>

      {/* Button to Enter Store (Full Section) */}
      {!simpleCTA && (
        <section className="py-24 md:py-40 bg-brand-true-black text-center border-t border-brand-true-white/5 relative overflow-hidden flex flex-col items-center justify-center px-6">
          <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-brand-pink/5 blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter mb-8 leading-tight text-brand-true-white">
              ACESSE A CURADORIA COMPLETA
            </h2>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-true-white/50 leading-relaxed mb-12 max-w-md">
              Entre na nossa loja virtual ou venha nos visitar em Farroupilha para conferir todas as peças, coleções limitadas e collab drops exclusivos.
            </p>
            {renderButton()}
          </div>
        </section>
      )}
    </>
  );
};
