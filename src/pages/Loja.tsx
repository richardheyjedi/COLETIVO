import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight } from "lucide-react";
import { DropShowcase } from "../components/DropShowcase";

export const Loja = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (heroTitleRef.current) {
      const splitTitle = new SplitType(heroTitleRef.current, { types: 'lines,words' });
      gsap.fromTo(splitTitle.words,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.1 }
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-brand-white text-brand-black pt-32">
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[50vh] flex flex-col justify-center overflow-hidden bg-brand-white">
        <div className="max-w-6xl w-full">
          <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-brand-orange font-bold block mb-4 animate-[fadeIn_1s_ease-out_forwards] opacity-0">
            Retail // E-commerce
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase text-brand-black mb-8">
            Curadoria <br/><span className="text-brand-orange italic">Implacável.</span>
          </h1>
          <p className="max-w-xl text-xs md:text-sm uppercase tracking-widest text-brand-black/60 font-medium leading-loose animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
            Não somos um catálogo. Somos um manifesto vestível. Cada peça selecionada ou produzida pelo Cøletivo representa atitude, design técnico e durabilidade urbana.
          </p>
        </div>
      </section>

      {/* We reuse the DropShowcase component here to keep consistency and save code, but wrapped in its own context */}
      <DropShowcase />

      {/* Categories */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-orange text-brand-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter">Nossas Linhas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Apparel", d: "Camisetas pesadas, moletons estruturados e outerwear de alta performance." },
              { t: "Footwear", d: "Sneakers selecionados, parcerias exclusivas e silhuetas que definem a cultura." },
              { t: "Accessories", d: "Bolsas utilitárias, headwear tático e joias industriais para finalizar o core look." }
            ].map((cat, i) => (
              <div key={i} className="border border-brand-white/20 p-8 hover:bg-brand-white hover:text-brand-orange transition-colors duration-500 group">
                <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">{cat.t}</h3>
                <p className="text-xs uppercase tracking-widest leading-loose font-medium opacity-80 group-hover:opacity-100">{cat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-brand-white text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 text-brand-black">
          Acesse o catálogo.
        </h2>
        <a href="#" className="group relative overflow-hidden bg-brand-black text-brand-white px-12 py-5 transition-all duration-700 hover:scale-105">
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Ir para loja</span>
            <ArrowUpRight size={16} />
          </div>
        </a>
      </section>
    </div>
  );
};
