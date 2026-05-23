import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Gestao = () => {
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
      {/* Hero */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[60vh] flex flex-col justify-center border-b border-brand-black/10">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-green font-bold block mb-8 animate-[fadeIn_1s_ease-out_forwards] opacity-0">
            Consulting // Operations
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase text-brand-black mb-12">
            Organizamos o caos.<br />
            <span className="font-sans font-light italic lowercase text-brand-black/40 tracking-normal border-b-2 border-brand-green">Escalamos o lucro.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
            <div></div>
            <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-black/60 leading-loose">
              A criatividade precisa de estrutura. Nossa área de gestão e consultoria implementa processos, avalia o modelo de negócios e cria a fundação técnica para que a sua estética possa prosperar no mercado real.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black text-brand-true-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-20 text-brand-true-white">Vértices da <span className="text-brand-green italic">Operação</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { n: "01", t: "Estratégia de Negócios", d: "Modelagem financiera, pricing, projeção de fluxo de caixa e reestruturação comercial para marcas em crescimento." },
              { n: "02", t: "Governança & Processos", d: "Mapeamento de processos internos, criação de manuais operacionais e implementação de cultura organizacional forte." },
              { n: "03", t: "Supply & Produção", d: "Consultoria em cadeia de suprimentos, negociação com fornecedores têxteis e parceiros de produção, visando qualidade e margem." }
            ].map((srv, i) => (
              <div key={i} className="flex flex-col gap-6 relative group">
                <div className="absolute -top-10 -left-6 text-9xl font-display font-black text-brand-true-white opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none select-none z-0">
                  {srv.n}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-[2px] bg-brand-green mb-8 scale-x-50 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tighter text-brand-true-white mb-4">{srv.t}</h3>
                  <p className="text-xs uppercase tracking-widest leading-loose font-medium opacity-50">{srv.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-brand-green text-brand-black text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 text-brand-black">
          Fale com um Especialista.
        </h2>
        <Link to="/contato" className="group relative overflow-hidden bg-brand-black text-brand-white px-12 py-5 transition-all duration-700 hover:scale-105">
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Mapear meu negócio</span>
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </section>
    </div>
  );
};
