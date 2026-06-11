import { motion } from "motion/react";
import { Menu, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isDark, toggleTheme } = useDarkMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 md:left-64 right-0 z-50 pl-6 pr-20 py-4 md:px-12 flex justify-between items-center border-b border-brand-black/10 bg-brand-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.02)] h-20 md:h-auto"
    >
      <Link to="/" className="flex items-center gap-10 group cursor-pointer text-brand-black md:hidden">
        <div className="flex flex-col">
          <span className="font-display font-black text-3xl md:text-5xl tracking-tighter lowercase leading-none">
            cøletivo.
          </span>
          <span className="text-[8px] font-sans uppercase tracking-[0.4em] opacity-40 leading-none mt-1">Est. 2024 / Brasil</span>
        </div>
      </Link>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden md:flex items-center gap-10 group cursor-pointer text-brand-black font-sans"
      >
        <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.3em] opacity-50 hidden md:inline font-bold">
           <span className="text-brand-pink">Archive</span> // 01 Expressø
        </motion.span>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex items-center gap-6 md:gap-12"
      >
        <motion.button
          variants={itemVariants}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-brand-black/5 transition-colors text-brand-black flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        <motion.div variants={itemVariants} className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-40 hidden md:block">
          System Ready // 2024
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};
