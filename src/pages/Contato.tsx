import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ArrowUpRight, MapPin, Mail, Instagram } from "lucide-react";
import { GoogleMapsReviews } from "../components/GoogleMapsReviews";

export const Contato = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="bg-brand-white text-brand-black pt-32 min-h-screen">
      <section className="px-6 lg:px-12 xl:px-24 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
          
          {/* Header & Info */}
          <div className="flex-1 flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-8 animate-[fadeIn_1s_ease-out_forwards] opacity-0">
              Connection // Network
            </span>
            <h1 ref={heroTitleRef} className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[1.05] mb-12">
              Inicie \ <span className="italic font-light lowercase font-sans text-brand-pink block sm:inline">o diálogo.</span>
            </h1>

            <div className="flex flex-col gap-10 animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-brand-black/5 pb-8">
                <div className="flex items-start gap-4 group">
                  <MapPin className="text-brand-black/40 group-hover:text-brand-pink transition-colors shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-lg uppercase tracking-tighter mb-2">QG São Paulo</span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-black/50 leading-relaxed">
                      Av. Paulista, 1578<br/>São Paulo, BR - 01310-200
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <MapPin className="text-brand-black/40 group-hover:text-brand-pink transition-colors shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-lg uppercase tracking-tighter mb-2">QG Farroupilha</span>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-brand-black/50 leading-relaxed">
                      R. Quatorze de Julho, 479<br/>Centro, Farroupilha - RS, 95170-416
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                <div className="flex items-start gap-6 group cursor-pointer hover:opacity-100">
                  <Mail className="text-brand-black/40 group-hover:text-brand-pink transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-lg uppercase tracking-tighter mb-1 font-bold">Comercial & Press</span>
                    <a href="mailto:hello@coletivo.com" className="text-xs uppercase tracking-widest font-semibold text-brand-black/55 hover:text-brand-pink transition-colors">
                      hello@coletivo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer">
                  <Instagram className="text-brand-black/40 group-hover:text-brand-pink transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-lg uppercase tracking-tighter mb-1 font-bold">Social</span>
                    <a href="#" className="text-xs uppercase tracking-widest font-semibold text-brand-black/55 hover:text-brand-pink transition-colors">
                      @coletivo.archive
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-brand-true-black text-brand-true-white p-8 md:p-12 animate-[fadeIn_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.6s' }}>
             <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-10">Transmissão Direta</h3>
             <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-true-white/50">Identificação / Nome</label>
                  <input required type="text" id="name" className="bg-transparent border-b border-brand-true-white/20 py-3 text-sm focus:outline-none focus:border-brand-pink transition-colors w-full font-medium" />
                </div>
                
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-true-white/50">Ponto de Contato / Email</label>
                  <input required type="email" id="email" className="bg-transparent border-b border-brand-true-white/20 py-3 text-sm focus:outline-none focus:border-brand-pink transition-colors w-full font-medium" />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-true-white/50">Departamento / Assunto</label>
                  <select id="subject" className="bg-transparent border-b border-brand-true-white/20 py-3 text-sm focus:outline-none focus:border-brand-pink transition-colors w-full font-medium appearance-none rounded-none text-brand-true-white/80">
                    <option className="bg-brand-true-black">Representação</option>
                    <option className="bg-brand-true-black">Studio</option>
                    <option className="bg-brand-true-black">Consultoria / Gestão</option>
                    <option className="bg-brand-true-black">Barbearia (Dúvidas)</option>
                    <option className="bg-brand-true-black">Outros</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-true-white/50">Transmissão / Mensagem</label>
                  <textarea required id="message" rows={4} className="bg-transparent border-b border-brand-true-white/20 py-3 text-sm focus:outline-none focus:border-brand-pink transition-colors w-full font-medium resize-none"></textarea>
                </div>

                <button disabled={formState !== 'idle'} type="submit" className="mt-8 group relative overflow-hidden bg-brand-true-white text-brand-true-black px-12 py-5 transition-all duration-700 hover:bg-brand-pink hover:text-brand-true-white disabled:opacity-50 disabled:cursor-not-allowed border border-transparent">
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span className="text-xs uppercase font-bold tracking-[0.3em]">
                      {formState === 'idle' ? 'Enviar Transmissão' : formState === 'submitting' ? 'Enviando...' : 'Mensagem Recebida'}
                    </span>
                    {formState === 'idle' && <ArrowUpRight size={16} />}
                  </div>
                </button>
             </form>
          </div>

        </div>
      </section>

      {/* Google Maps & Client Reviews */}
      <section className="px-6 lg:px-12 xl:px-24 pb-32 border-t border-brand-black/10 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-4 italic">// PRESENÇA DIGITAL</span>
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-brand-black leading-none">
              Nossa Unidade & <span className="font-sans font-light italic lowercase text-brand-pink tracking-normal">feedbacks.</span>
            </h2>
          </div>
          <GoogleMapsReviews />
        </div>
      </section>
    </div>
  );
};
