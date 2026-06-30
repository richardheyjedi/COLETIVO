import { useRef } from "react";
import { ArrowUpRight, Scissors } from "lucide-react";
import { useFadeUpAnimation } from "../hooks/useFadeUpAnimation";
import { useHeroTitleAnimation } from "../hooks/useHeroTitleAnimation";

export const Barbearia = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  // Apply premium title entry animation
  useHeroTitleAnimation(heroTitleRef, containerRef, {
    splitType: "lines,words,chars",
    animateTarget: "chars",
    delay: 0.15,
    staggerAmount: 0.8,
  });

  // Shared scroll-triggered fade-up for all .fade-up elements
  useFadeUpAnimation(containerRef, { start: "top 85%" });

  const services = [
    { name: "Acabamento pesinho", price: "R$ 20,00", time: "15 min" },
    { name: "Barba na máquina", price: "R$ 35,00", time: "30 min" },
    { name: "Barba Terapia", price: "R$ 50,00", time: "45 min" },
    { name: "Cabelo Barba", price: "R$ 90,00", time: "60 min" },
    { name: "Corte", price: "R$ 50,00", time: "45 min" },
    { name: "Luzes", price: "R$ 200,00", time: "120 min" },
    { name: "Platinado Global", price: "R$ 250,00", time: "120 min" },
    { name: "Sobrancelha", price: "R$ 20,00", time: "15 min" }
  ];

  return (
    <div ref={containerRef} className="bg-brand-true-black text-brand-true-white pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 z-0">
          <img src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=1974&auto=format&fit=crop" alt="Barbershop" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-true-black to-brand-true-black/20" />
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <Scissors size={32} className="text-brand-pink mb-8 fade-up opacity-0" />
          <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-brand-pink font-bold block mb-4 fade-up opacity-0">
            Grooming & Lifestyle
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter uppercase text-brand-true-white mb-12">
            Estilo faz parte <span className="italic font-light lowercase font-sans text-brand-pink block sm:inline">da experiência.</span>
          </h1>
          <p className="max-w-xl text-xs md:text-sm uppercase tracking-widest text-brand-true-white/60 font-medium leading-loose fade-up opacity-0">
            A barbearia da CØLETIVO oferece atendimento especializado em um ambiente que valoriza cuidado, identidade e relacionamento através de experiências conectadas ao lifestyle urbano.
          </p>
        </div>
      </section>

      {/* Services Menu */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black relative border-t border-brand-true-white/5">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 fade-up">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-brand-true-white">
              Tabela de<br/><span className="text-brand-pink italic">Serviços</span>
            </h2>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-true-white/40">* Valores & tempos de execução sugeridos</span>
          </div>

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 border-b border-brand-true-white/20 pb-4 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-true-white/40 font-bold fade-up">
            <div className="col-span-6 md:col-span-7">Serviço</div>
            <div className="col-span-3 md:col-span-3">Preço</div>
            <div className="col-span-3 md:col-span-2 text-right">Tempo</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col border-b border-brand-true-white/10 fade-up">
            {services.map((svc, i) => (
              <div 
                key={i} 
                className="grid grid-cols-1 sm:grid-cols-12 py-5 border-t border-brand-true-white/10 hover:bg-brand-true-white/5 transition-all duration-300 px-4 group items-center"
              >
                {/* Service Name */}
                <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                  <span className="hidden sm:inline text-[9px] font-mono text-brand-pink opacity-30 group-hover:opacity-100 transition-opacity">
                    // 0{i + 1}
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-tighter text-brand-true-white group-hover:text-brand-pink transition-colors">
                    {svc.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="col-span-3 md:col-span-3 mt-2 sm:mt-0 font-mono text-sm sm:text-base text-brand-pink font-bold flex justify-between sm:justify-start items-center">
                  <span className="sm:hidden text-[9px] font-mono uppercase tracking-widest text-brand-true-white/40">Preço:</span>
                  <span>{svc.price}</span>
                </div>

                {/* Time */}
                <div className="col-span-3 md:col-span-2 mt-1 sm:mt-0 font-mono text-sm sm:text-base text-brand-true-white/60 group-hover:text-brand-true-white transition-colors flex justify-between sm:justify-end items-center">
                  <span className="sm:hidden text-[9px] font-mono uppercase tracking-widest text-brand-true-white/40">Tempo:</span>
                  <span>{svc.time}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Visual Gallery */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 bg-brand-true-black relative border-t border-brand-true-white/5">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col mb-16 fade-up">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-brand-pink font-bold block mb-4">// VISUAL_ARCHIVE</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-brand-true-white">
              O ESPAÇO & O OFÍCIO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tag: "SPACE_01 // CHAIR", 
                url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
                desc: "Cadeiras clássicas e ambiente industrial climatizado."
              },
              { 
                tag: "DETAIL_02 // TOOLS", 
                url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
                desc: "Ferramentas de precisão e insumos de alta qualidade."
              },
              { 
                tag: "CRAFT_03 // STYLE", 
                url: "https://images.unsplash.com/photo-1605497746445-97d1b0a9eaf4?q=80&w=800&auto=format&fit=crop",
                desc: "Técnicas de corte e barba sob medida para sua identidade."
              }
            ].map((img, idx) => (
              <div key={idx} className="flex flex-col gap-4 group fade-up">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-brand-true-white/10 group-hover:border-brand-pink transition-colors duration-500">
                  <img 
                    src={img.url} 
                    alt={img.tag}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 bg-brand-true-black border border-brand-true-white/10 text-[8px] font-bold font-mono tracking-widest text-brand-pink uppercase">
                      {img.tag}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-brand-true-white/40 leading-relaxed font-semibold px-2">
                  {img.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 md:py-40 bg-brand-true-black text-center flex flex-col items-center justify-center px-6 border-t border-brand-true-white/5">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 fade-up">
          Próximo Nível.
        </h2>
        <a href="https://wa.me/5554999999999" target="_blank" rel="noopener noreferrer" className="fade-up group relative overflow-hidden bg-brand-true-white text-brand-true-black px-12 py-5 transition-all duration-700 hover:scale-105">
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Agendar Horário</span>
            <ArrowUpRight size={16} />
          </div>
        </a>
      </section>
    </div>
  );
};
