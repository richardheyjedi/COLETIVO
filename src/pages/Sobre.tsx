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
            Quem Somos // Cøletivo
          </span>
          <h1 ref={heroTitleRef} className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter uppercase text-brand-black mb-12 perspective-1000">
            A CØLETIVO é um hub multifacetado especializado no{" "}
            <span className="font-sans font-light italic lowercase text-brand-pink tracking-normal block sm:inline">desenvolvimento, gestão e expansão</span>{" "}
            de marcas de streetwear.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 fade-up opacity-0">
            <div></div>
            <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-brand-black/60 leading-loose">
              Mais do que uma representação comercial, atuamos como uma plataforma de crescimento para marcas que desejam fortalecer sua presença no varejo e no atacado.
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
            <h2 className="font-display font-black text-4xl uppercase tracking-tighter">Nossa Estrutura</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 fade-up">
            <p className="text-xl font-light italic text-brand-true-white/80">"Nossa estrutura integra gestão estratégica, representação comercial, inteligência digital, showroom, relacionamento, desenvolvimento de produto e experiências conectadas à cultura urbana."</p>
            <p className="text-sm font-medium uppercase tracking-[0.1em] text-brand-true-white/50 leading-loose">
               Hoje atendemos centenas de clientes ativos e operamos uma das maiores estruturas especializadas em streetwear do Sul do Brasil.
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
          <div className="max-w-4xl mx-auto mb-16 text-center fade-up">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-brand-black leading-tight">
              Resultados construídos através de{" "}
              <span className="text-brand-true-white block sm:inline">relacionamento, estratégia e mercado.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 fade-up">
            {[
              { n: "+20", l: "anos de experiência" },
              { n: "+400", l: "clientes ativos" },
              { n: "SUL", l: "Atuação em RS, SC e PR" },
              { n: "TOP", l: "Representação das principais marcas de streetwear do país" },
              { n: "NAT", l: "Equipe nacional de representantes e prepostos" },
              { n: "360°", l: "Operação 360° para marcas em crescimento" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-display font-black text-5xl md:text-7xl text-brand-black tracking-tighter">{stat.n}</span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-black/80 font-bold max-w-[200px]">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-brand-white text-center flex flex-col items-center justify-center px-6">
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-12 fade-up">
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
