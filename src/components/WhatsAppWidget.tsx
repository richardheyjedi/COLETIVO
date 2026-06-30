import { useState } from "react";
import { MessageSquare, X, ArrowUpRight, ShoppingBag, Briefcase } from "lucide-react";

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Contact Dropdown Card */}
      {isOpen && (
        <div className="mb-4 bg-brand-true-black border border-brand-true-white/10 text-brand-true-white p-6 w-80 shadow-2xl animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-brand-true-white/10">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-brand-pink">Atendimento Direto</span>
              <h4 className="font-display font-black text-sm uppercase tracking-tight">Fale Conosco</h4>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-brand-true-white/60 hover:text-brand-pink transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Shop Button */}
            <a 
              href="https://wa.me/5554996027635" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 border border-brand-true-white/10 hover:border-brand-pink bg-brand-true-white/5 hover:bg-brand-pink/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-brand-pink" />
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-brand-true-white/40">Varejo & Dúvidas</span>
                  <span className="text-xs uppercase font-bold tracking-wider">LOJA</span>
                </div>
              </div>
              <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Representation Button */}
            <a 
              href="https://wa.me/5554991410021" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 border border-brand-true-white/10 hover:border-brand-purple bg-brand-true-white/5 hover:bg-brand-purple/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Briefcase size={16} className="text-brand-purple" />
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-brand-true-white/40">Expansão & Multimarcas</span>
                  <span className="text-xs uppercase font-bold tracking-wider">REPRESENTAÇÃO</span>
                </div>
              </div>
              <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-true-white/10 flex justify-between items-center text-[8px] font-mono text-brand-true-white/40 uppercase tracking-widest">
            <span>Farroupilha, RS</span>
            <span>Retorno Rápido</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-black dark:bg-brand-pink text-brand-true-white dark:text-brand-true-white shadow-2xl flex items-center justify-center group hover:scale-105 active:scale-95 transition-all duration-300 border border-brand-true-white/10 cursor-pointer"
        aria-label="Fale Conosco"
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <MessageSquare size={20} className="group-hover:rotate-6 transition-transform" />
        )}
      </button>
    </div>
  );
};
