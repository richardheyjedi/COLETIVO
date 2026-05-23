import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight, Target, Activity, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Representacao = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (heroTitleRef.current) {
      const splitTitle = new SplitType(heroTitleRef.current, { types: 'lines,words' });
      gsap.fromTo(splitTitle.words,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );
    }
    
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-brand-white text-brand-black pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[60vh] flex flex-col justify-center border-b border-brand-black/10">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-8 fade-up opacity-0">
            Cøletivo // Representação_Comercial
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase text-brand-black mb-12">
            Expandimos mercados.<br />
            <span className="font-sans font-light italic lowercase text-brand-black/40 tracking-normal border-b-2 border-brand-pink">Ampliamos o impacto.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 fade-up opacity-0">
            <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-black/60 leading-loose col-start-1 md:col-start-2">
              Atuamos como um braço estratégico focado na expansão comercial e posicionamento de mercado. Não apenas vendemos produtos, mas construímos autoridade de marca.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black text-brand-true-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 flex flex-col items-center text-center fade-up">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6">Por que escolher o Cøletivo?</h2>
            <div className="w-16 h-[2px] bg-brand-pink" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: <Target size={24} />, t: "Posicionamento", d: "Colocamos sua marca nos canais e prateleiras certas, atraindo o público ideal." },
              { i: <Activity size={24} />, t: "Resultados Ativos", d: "Gestão comercial com foco em metas escaláveis e tráfego qualificado de vendas." },
              { i: <Zap size={24} />, t: "Agilidade", d: "Conexões diretas e networking consolidado que aceleram a entrada no mercado." },
              { i: <TrendingUp size={24} />, t: "Crescimento", d: "Análise de dados constante para otimizar conversões e expandir a atuação." }
            ].map((b, i) => (
              <div key={i} className="p-8 border border-brand-true-white/10 flex flex-col gap-6 fade-up hover:border-brand-pink transition-colors duration-300">
                <div className="text-brand-pink">{b.i}</div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter">{b.t}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-true-white/50 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-brand-black mb-20 fade-up">O Processo</h2>
          
          <div className="flex flex-col gap-16">
            {[
              { n: "01", t: "Imersão & Diagnóstico", d: "Analisamos o produto, mercado, e potencial de aderência para definir a melhor rota." },
              { n: "02", t: "Estratégia de Expansão", d: "Mapeamento das áreas de atuação, definição de clientes alvo e planejamento comercial." },
              { n: "03", t: "Conexão & Execução", d: "Atuação ativa na prospecção, visitação, negociação e ativação nas lojas parceiras." },
              { n: "04", t: "Gestão do Relacionamento", d: "Acompanhamento pós-venda, treinamentos, sell-out e manutenção da parceria a longo prazo." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start fade-up border-b border-brand-black/5 pb-16 last:border-0 last:pb-0">
                <div className="text-brand-pink font-display font-black text-6xl md:text-8xl leading-none opacity-20">{step.n}</div>
                <div className="flex flex-col gap-4 mt-2">
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tighter text-brand-black">{step.t}</h3>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-medium text-brand-black/60 max-w-2xl leading-loose">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-brand-purple text-brand-white text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 fade-up text-brand-white">
          Vamos expandir juntos?
        </h2>
        <p className="text-xs font-mono uppercase tracking-[0.2em] mb-12 fade-up opacity-70">Aumente o alcance e os resultados da sua marca.</p>
        <Link to="/contato" className="fade-up group relative overflow-hidden border border-brand-white px-12 py-5 transition-all duration-700 hover:bg-brand-white hover:text-brand-purple">
          <div className="relative z-10 flex items-center gap-4 transition-colors duration-500">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Solicite uma Proposta</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </Link>
      </section>
    </div>
  );
};
