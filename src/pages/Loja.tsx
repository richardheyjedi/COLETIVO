import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { WhiteTeesCarousel } from "../components/WhiteTeesCarousel";
import { useHeroTitleAnimation } from "../hooks/useHeroTitleAnimation";

const CURATED_BRANDS = [
  { name: "CØ. STUDIO", origin: "Farroupilha, RS", concept: "Linha própria focada em basics e streetwear minimalista" },
  { name: "PACE / ARCHIVE", origin: "São Paulo, BR", concept: "Techwear funcional e alfaiataria moderna desconstruída" },
  { name: "RAW CULTURE", origin: "Curitiba, PR", concept: "Inspirada no skate dos anos 90 com modelagens amplas" },
  { name: "UNDERGROUND PROJECT", origin: "Porto Alegre, RS", concept: "Gaphics brutas e estampas inspiradas no punk/hardcore" }
];

export const Loja = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  // Apply premium title entry animation
  useHeroTitleAnimation(heroTitleRef, containerRef, {
    splitType: "lines,words,chars",
    animateTarget: "chars",
    delay: 0.15,
    staggerAmount: 0.8,
  });

  return (
    <div ref={containerRef} className="bg-brand-true-black text-brand-true-white pt-32 min-h-screen relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-20 lg:py-32 flex flex-col justify-center border-b border-brand-true-white/5">
        {/* Background Accent */}
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] bg-brand-orange/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-brand-orange font-bold block mb-6 animate-[fadeIn_1s_ease-out_forwards] opacity-0">
            [System_Store // Active_Drop]
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase mb-12">
            CØ. RETAIL \ <span className="text-brand-orange italic font-light lowercase font-sans block sm:inline">curadoria.</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm uppercase tracking-[0.2em] text-brand-true-white/60 font-semibold leading-relaxed animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
            Não vendemos apenas roupas. Selecionamos conceitos que se materializam em peças de alta qualidade. Cada item reflete nossa imersão na cultura urbana.
          </p>
        </div>
      </section>

      {/* 2. Sobre a Loja */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 border-b border-brand-true-white/5 bg-brand-true-black/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-orange font-bold block mb-4">// CONCEITO_RETAIL</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-tight">
              A ESSÊNCIA DO NOSSO DESIGN E SELEÇÃO.
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8 text-[11px] uppercase tracking-widest font-semibold text-brand-true-white/60 leading-relaxed">
            <p>
              Buscamos ativamente por marcas independentes e drop autorais que priorizam a durabilidade, matéria-prima premium e modelagens que de fato funcionam no dia a dia urbano. 
            </p>
            <p>
              Nosso QG em Farroupilha funciona como o hub principal dessa curadoria, reunindo marcas parceiras e nossa própria linha de básicos de alto padrão.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border-t border-brand-true-white/10 pt-8">
              {[
                { title: "HEAVY COTTON", desc: "Gramaturas robustas que dão estrutura e caimento ideal no corpo." },
                { title: "SUSTENTÁVEL", desc: "Produção nacional ética e tecidos de algodão certificado." },
                { title: "BOX FIT", desc: "Modelagens quadradas modernas inspiradas no streetwear clássico." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-brand-orange">
                    <CheckCircle2 size={14} />
                    <span className="font-mono text-[10px] font-bold">{item.title}</span>
                  </div>
                  <p className="text-[9px] text-brand-true-white/40 font-medium normal-case tracking-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marcas */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 border-b border-brand-true-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-16">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-orange font-bold block mb-4">// BRAND_PORTFOLIO</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter">
              MARCAS REPRESENTADAS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CURATED_BRANDS.map((brand, i) => (
              <div 
                key={i} 
                className="group border border-brand-true-white/10 p-8 bg-brand-true-black hover:border-brand-orange/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-brand-orange/5 translate-x-6 -translate-y-6 group-hover:translate-x-3 group-hover:-translate-y-3 rounded-full transition-transform duration-500 blur-md" />
                <span className="text-[8px] font-mono text-brand-orange font-bold uppercase tracking-widest block mb-2">{brand.origin}</span>
                <h3 className="font-display font-bold text-lg uppercase tracking-tighter mb-4 text-brand-true-white group-hover:text-brand-orange transition-colors">
                  {brand.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-brand-true-white/50 leading-relaxed font-semibold">
                  {brand.concept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 5. Carousel & CTA Button */}
      <WhiteTeesCarousel buttonLink="https://wa.me/5554999999999" isExternal={true} />
    </div>
  );
};
