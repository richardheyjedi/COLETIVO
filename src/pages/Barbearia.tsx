import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight, Scissors } from "lucide-react";

export const Barbearia = () => {
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
    
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });

  }, { scope: containerRef });

  const services = [
    { name: "Corte Cøletivo", price: "R$ 80", desc: "Consultoria de visagismo, corte com técnicas avançadas, lavagem especial e finalização prime." },
    { name: "Barba Terapia", price: "R$ 60", desc: "Aparação, toalha quente, óleos essenciais, massagem facial e alinhamento milimétrico." },
    { name: "Combo Cøletivo", price: "R$ 130", desc: "A experiência completa. Corte e Barba executados com a nossa assinatura de excelência." },
    { name: "Acabamento", price: "R$ 40", desc: "Limpeza de perfil e nuca para manter o alinhamento em dia entre os cortes principais." },
    { name: "Camuflagem", price: "R$ 90", desc: "Tingimento sutil e natural para cabelos ou barba, cobrindo os fios brancos de forma homogênea." },
    { name: "Platinado / Coloração", price: "Sob consulta", desc: "Descoloração segura ou colorimetria criativa com produtos de altíssimo padrão." }
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
          <h1 ref={heroTitleRef} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase text-brand-true-white mb-12">
            A arte do <br/><span className="italic font-light lowercase font-sans text-brand-true-white">alinhamento.</span>
          </h1>
          <p className="max-w-xl text-xs md:text-sm uppercase tracking-widest text-brand-true-white/60 font-medium leading-loose fade-up opacity-0">
            Reinventamos a barbearia clássica. Um ambiente focado na precisão, conforto e na estética urbana. Seu momento, nosso compromisso.
          </p>
        </div>
      </section>

      {/* Services Menu */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 md:py-32 bg-brand-true-black relative border-t border-brand-true-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 fade-up">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-brand-true-white">Menu de<br/><span className="text-brand-pink italic">Serviços</span></h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-brand-true-white/40">* Valores sujeitos a alteração</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {services.map((svc, i) => (
              <div key={i} className="flex flex-col gap-4 fade-up group">
                <div className="flex items-center justify-between border-b border-brand-true-white/10 pb-4 group-hover:border-brand-pink transition-colors">
                  <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tighter">{svc.name}</h3>
                  <span className="font-mono text-sm tracking-widest text-brand-pink">{svc.price}</span>
                </div>
                <p className="text-xs uppercase tracking-widest font-medium text-brand-true-white/50 leading-relaxed pr-8">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-brand-true-black text-center flex flex-col items-center justify-center px-6 border-t border-brand-true-white/5">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 fade-up">
          Próximo Nível.
        </h2>
        <a href="#" className="fade-up group relative overflow-hidden bg-brand-true-white text-brand-true-black px-12 py-5 transition-all duration-700 hover:scale-105">
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-[0.3em]">Agendar Horário</span>
            <ArrowUpRight size={16} />
          </div>
        </a>
      </section>
    </div>
  );
};
