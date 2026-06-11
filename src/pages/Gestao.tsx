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
          <h1 ref={heroTitleRef} className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter uppercase text-brand-black mb-12">
            Estratégia para marcas{" "}
            <span className="font-sans font-light italic lowercase text-brand-black/40 tracking-normal border-b-2 border-brand-green block sm:inline">que querem crescer.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
            <div></div>
            <p className="text-sm md:text-base font-medium uppercase tracking-[0.15em] text-brand-black/60 leading-loose">
              Atuamos de forma integrada nas áreas de gestão comercial, expansão nacional, posicionamento de marca, inteligência digital, inside sales, formação de equipes comerciais, mix de produtos, engenharia de produto, precificação e planejamento estratégico.<br/><br/>
              <span className="text-brand-black font-bold">Nosso objetivo é transformar marcas em operações sólidas, escaláveis e preparadas para crescer.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black text-brand-true-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-20 text-brand-true-white">Pilares de <span className="text-brand-green italic lowercase font-sans font-light">crescimento</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-10 xl:gap-16">
            {[
              { n: "01", t: "Gestão de Marcas", d: "Atuamos de forma integrada para transformar marcas em operações sólidas, escaláveis e preparadas para crescer com estruturação completa e visão de mercado." },
              { n: "02", t: "Licenciamento e Desenvolvimento", d: "Atuamos como agentes estratégicos no desenvolvimento e expansão de marcas. Conectamos marcas a indústrias parceiras, estruturamos projetos de licenciamento e criamos caminhos para crescimento sustentável através de produção, distribuição e desenvolvimento de produto." },
              { n: "03", t: "Inteligência Digital", d: "Nossa equipe de inteligência digital auxilia marcas na construção de estratégias mais eficientes através da análise de mercado, comportamento de consumo, posicionamento e oportunidades de crescimento." }
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
