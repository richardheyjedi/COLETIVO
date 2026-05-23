import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Sobre = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (heroTitleRef.current) {
      const splitTitle = new SplitType(heroTitleRef.current, { types: 'lines,words,chars' });
      gsap.fromTo(splitTitle.chars,
        { opacity: 0, y: 40, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.05, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );
    }
    
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-brand-white text-brand-black pt-32">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 xl:px-24 py-24 min-h-[70vh] flex flex-col justify-center border-b border-brand-black/10">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-8 fade-up opacity-0">
            Archive_Manifesto // Identity
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase text-brand-black mb-12 perspective-1000">
            Mais que uma marca.<br />
            <span className="font-sans font-light italic lowercase text-brand-pink tracking-normal">Um movimento.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 fade-up opacity-0">
            <div></div>
            <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-black/60 leading-loose">
              O Cøletivo não é apenas um estúdio, uma loja ou uma barbearia. É um ecossistema criativo projetado para elevar a estética, desafiar a norma e construir legados através do design, do estilo e da cultura.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black text-brand-true-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=1925&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover grayscale mix-blend-overlay" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 mx-auto">
          <div className="md:col-span-4 fade-up">
            <h2 className="font-display font-black text-4xl uppercase tracking-tighter">Nossa Origem</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 fade-up">
            <p className="text-xl font-light italic text-brand-true-white/80">"Nascemos da necessidade de materializar o invisível."</p>
            <p className="text-sm font-medium uppercase tracking-[0.1em] text-brand-true-white/50 leading-loose">
              Fundado em 2024, o Cøletivo começou como um pequeno grupo de mentes criativas insatisfeitas com o ordinário. Víamos o potencial de fundir diferentes disciplinas—barbearia clássica, moda streetwear e design estratégico—em um único espaço de experimentação. Hoje, somos um selo de excelência, com uma identidade forjada nas ruas, mas refinada para o mercado premium.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Missão", d: "Elevar o padrão estético e cultural, entregando experiências premium que conectam marcas e indivíduos à sua verdadeira essência.", c: "bg-brand-pink" },
              { t: "Visão", d: "Ser a principal referência em cultura urbana e sofisticação no país, ditando tendências e transformando o mercado de lifestyle.", c: "bg-brand-purple" },
              { t: "Valores", d: "Autenticidade indiscutível, qualidade implacável, inovação contínua e respeito absoluto à cultura que nos formou.", c: "bg-brand-green" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-6 fade-up border-t border-brand-black/10 pt-8 group">
                <div className={`w-8 h-8 ${item.c} rounded-none scale-50 group-hover:scale-100 transition-transform duration-500`} />
                <h3 className="font-display font-bold text-2xl uppercase tracking-tighter">{item.t}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-black/50 leading-loose">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers / Authority */}
      <section className="py-24 md:py-32 bg-brand-green border-t border-brand-black/10">
        <div className="container mx-auto px-6 lg:px-12 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 fade-up">
            {[
              { n: "+5K", l: "Clientes Atendidos" },
              { n: "12", l: "Marcas Representadas" },
              { n: "04", l: "Unidades Operacionais" },
              { n: "100%", l: "Foco na Experiência" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-display font-black text-6xl md:text-8xl text-brand-black tracking-tighter">{stat.n}</span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-black/70 font-bold">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-brand-white text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter mb-12 fade-up">
          Faça parte da <span className="text-brand-pink italic lowercase font-sans font-light">cultura.</span>
        </h2>
        <Link to="/contato" className="fade-up group relative overflow-hidden border border-brand-black px-12 py-5 transition-all duration-700 hover:bg-brand-black">
          <div className="relative z-10 flex items-center gap-4 group-hover:text-brand-white transition-colors duration-500">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Fale com o Cøletivo</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </Link>
      </section>
    </div>
  );
};
