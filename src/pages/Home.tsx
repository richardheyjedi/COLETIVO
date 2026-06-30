import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { Manifesto } from "../components/Manifesto";
import { WhiteTeesCarousel } from "../components/WhiteTeesCarousel";
import { CulturePartners } from "../components/SocialProof";
import { BrandValues } from "../components/BrandValues";
import { EditorialPhotoGrid } from "../components/EditorialPhotoGrid";

export const Home = () => {
  return (
    <>
      <Hero />
      <Partners />
      <Manifesto />
      <WhiteTeesCarousel buttonLink="/loja" isExternal={false} simpleCTA={true} />
      <CulturePartners />
      <BrandValues />
      <EditorialPhotoGrid />
      
      {/* Endereço com Google Maps Iframe */}
      <section className="px-6 lg:px-12 xl:px-24 py-24 border-t border-brand-black/5 bg-brand-white">
        <div className="max-w-7xl mx-auto border-t border-brand-black/10 pt-16 flex flex-col lg:flex-row justify-between items-stretch gap-12">
          
          {/* Bloco de Texto Minimalista */}
          <div className="flex flex-col justify-between max-w-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-pink font-bold block mb-4 italic">
                // PRESENÇA FÍSICA
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter text-brand-black leading-none">
                Nossa Sede.
              </h2>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <span className="font-display font-bold text-lg uppercase tracking-tighter text-brand-black block">Farroupilha, RS</span>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-brand-black/50 leading-relaxed mt-1">
                  Rua Quatorze de Julho, 479<br />
                  Centro, Farroupilha - RS, 95170-416
                </p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=R.+Quatorze+de+Julho,+479+-+Centro,+Farroupilha+-+RS,+95170-416" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex text-[10px] font-mono font-bold uppercase tracking-widest text-brand-pink hover:text-brand-black transition-colors self-start border-b border-brand-pink/20 pb-1"
              >
                Como Chegar →
              </a>
            </div>
          </div>

          {/* Iframe do Google Maps Estilizado em Grayscale */}
          <div className="flex-1 min-h-[300px] border border-brand-black/10 grayscale invert-[0.03] contrast-[0.95] hover:grayscale-0 transition-all duration-700 relative overflow-hidden bg-neutral-100">
            <iframe
              title="Google Maps Cøletivo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.1764669894416!2d-51.3510860882672!3d-29.22384669430261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951e94a7efa78789%3A0xe65cfa15ff1a1f42!2sR.%20Quatorze%20de%20Julho%2C%20479%20-%20Centro%2C%20Farroupilha%20-%20RS%2C%2095170-416!5e0!3m2!1spt-BR!2sbr!4v1719743600000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>
    </>
  );
};

