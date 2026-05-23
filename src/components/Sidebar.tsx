import { motion, AnimatePresence } from "motion/react";
import { Instagram, Twitter, X, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Sobre a marca", href: "/sobre" },
    { name: "Representação", href: "/representacao" },
    { name: "Barbearia", href: "/barbearia" },
    { name: "Loja", href: "/loja" },
    { name: "Studio", href: "/studio" },
    { name: "Gestão", href: "/gestao" },
    { name: "Contato", href: "/contato" }
  ];

  const BRAND_COLORS = ["bg-brand-pink", "bg-brand-purple", "bg-brand-green", "bg-brand-orange"];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between py-12 px-10">
      {/* Brand Label */}
      <div className="mb-16">
        <Link to="/" onClick={() => setIsOpen(false)} className="group cursor-pointer">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-brand-pink rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-black/40 italic">System_Active</span>
          </div>
          <span className="font-display font-black text-3xl tracking-tighter lowercase text-brand-black">
            cøletivo.
          </span>
          <div className="h-[2px] w-12 bg-brand-black mt-4"></div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
        {links.map((link, i) => (
          <Link 
            key={i}
            to={link.href} 
            onClick={() => setIsOpen(false)}
            className="group py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] font-bold text-brand-black/60 hover:text-brand-black transition-all duration-300 border-b border-brand-black/5 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className={`w-[2px] h-0 group-hover:h-3 ${BRAND_COLORS[i % BRAND_COLORS.length]} transition-all duration-300`} />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {link.name}
              </span>
            </div>
            <div className={`w-1 h-1 rounded-full ${BRAND_COLORS[i % BRAND_COLORS.length]} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </Link>
        ))}
      </nav>

      {/* Footer / Social */}
      <div className="flex flex-col gap-10">
        <div className="p-6 bg-brand-cream border border-brand-black/5 rounded-sm">
           <span className="text-[8px] font-mono uppercase tracking-widest text-brand-black/40 block mb-4">// Redes_Sociais</span>
           <div className="flex gap-6 text-brand-black">
              <a href="#" className="hover:text-brand-pink transition-colors">
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a href="#" className="hover:text-brand-purple transition-colors">
                <Twitter size={18} strokeWidth={2} />
              </a>
           </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <div className="w-8 h-px bg-brand-black/10" />
             <div className="text-[10px] tracking-widest font-mono font-bold text-brand-black italic">
               CØ-2024
             </div>
          </div>
          <div className="text-[9px] tracking-[0.2em] font-sans opacity-40 uppercase text-brand-black px-10">
            Archi-v // São Paulo, BR
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-0 h-screen w-64 bg-brand-white border-r border-brand-black/10 z-[80] hidden md:block shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-black/40 backdrop-blur-md z-[90] md:hidden"
            />
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-brand-white z-[100] md:hidden shadow-[-20px_0_40px_rgba(0,0,0,0.1)]"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-brand-black hover:text-brand-pink transition-colors"
              >
                <X size={24} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-6 z-[60] md:hidden bg-brand-black text-brand-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <Menu size={20} />
      </button>
    </>
  );
};


