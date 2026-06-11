import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight, Camera, PenTool, Video, Aperture } from "lucide-react";
import { Link } from "react-router-dom";

export const Studio = () => {
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
    <div ref={containerRef} className="bg-brand-true-black text-brand-true-white pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[70vh] flex flex-col justify-end overflow-hidden pb-32">
        <div className="absolute inset-0 opacity-30 z-0">
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="Creative Studio" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-true-black via-brand-true-black/50 to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-start gap-8">
          <div className="flex items-center gap-4 animate-[fadeIn_1s_ease-out_forwards] opacity-0">
            <div className="w-3 h-3 bg-brand-purple rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-brand-purple font-bold block">
              Nosso Espaço // Estúdio
            </span>
          </div>
          <h1 ref={heroTitleRef} className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter uppercase text-brand-true-white">
            Criatividade <span className="text-brand-purple italic lowercase font-sans font-light block sm:inline">em movimento.</span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base uppercase tracking-[0.15em] text-brand-true-white/60 font-semibold leading-relaxed animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
            O estúdio da CØLETIVO é um espaço dedicado à música, produção e desenvolvimento criativo.<br/><br/>
            Além de receber artistas e projetos culturais, também oferece formação para DJs e profissionais que desejam aprofundar seus conhecimentos em mixagem e produção musical.
          </p>
        </div>
      </section>

      {/* Showroom & Gourmet */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black border-t border-brand-true-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            
            {/* Showroom */}
            <div className="flex flex-col gap-6 group border border-brand-true-white/10 p-10 hover:border-brand-purple transition-colors duration-500">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-true-white/30 group-hover:text-brand-purple transition-colors">Showroom</span>
              <h3 className="font-display font-bold text-3xl uppercase tracking-tighter text-brand-true-white group-hover:text-brand-purple transition-colors">Onde os negócios acontecem.</h3>
              <p className="text-xs uppercase tracking-[0.1em] leading-loose font-semibold opacity-60">
                Nosso showroom foi criado para proporcionar experiências que aproximam marcas e lojistas.<br/><br/>
                Um ambiente pensado para apresentar coleções, fortalecer relacionamentos, gerar oportunidades comerciais e criar conexões de longo prazo.
              </p>
            </div>

            {/* Gourmet */}
            <div className="flex flex-col gap-6 group border border-brand-true-white/10 p-10 hover:border-brand-purple transition-colors duration-500">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-true-white/30 group-hover:text-brand-purple transition-colors">Área Gourmet / Relacionamento</span>
              <h3 className="font-display font-bold text-3xl uppercase tracking-tighter text-brand-true-white group-hover:text-brand-purple transition-colors">Relacionamentos que geram negócios.</h3>
              <p className="text-xs uppercase tracking-[0.1em] leading-loose font-semibold opacity-60">
                Dentro do nosso showroom criamos um ambiente pensado para receber clientes, parceiros e marcas.<br/><br/>
                Um espaço onde gastronomia, networking e negócios acontecem de forma natural, fortalecendo conexões e criando novas oportunidades.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="w-full h-[50vh] overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1627483296617-640a2bb1fb98?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" alt="Studio Detail" referrerPolicy="no-referrer" />
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-brand-purple text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 text-brand-true-white">
          Tire o projeto do papel.
        </h2>
        <Link to="/contato" className="group relative overflow-hidden bg-brand-true-black text-brand-true-white px-12 py-5 transition-all duration-700 hover:scale-105">
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Solicitar Orçamento</span>
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </section>
    </div>
  );
};
