import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Eye, 
  Upload, 
  Plus, 
  Trash2, 
  X, 
  RefreshCw, 
  Link2,
  Info
} from "lucide-react";

interface Look {
  id: string;
  title: string;
  category: string;
  model: string;
  location: string;
  image: string;
  year: string;
  shades?: string;
  credits?: string;
  isCustom?: boolean;
}

const DEFAULT_LOOKS: Look[] = [
  {
    id: "look-01",
    title: "Cøletivo Barbearia",
    category: "BARBEARIA",
    model: "Espaço Grooming",
    location: "Sede Cøletivo",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Estética Retrô-Industrial",
    credits: "Design: Cøletivo Hub"
  },
  {
    id: "look-02",
    title: "Curadoria Vestuário",
    category: "LOJA",
    model: "Araras Streetwear",
    location: "Sede Cøletivo",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Visual Merchandising",
    credits: "Styling: Cøletivo Retail"
  },
  {
    id: "look-03",
    title: "Bancada Barbearia",
    category: "BARBEARIA",
    model: "Estação Clássica",
    location: "Sede Cøletivo",
    image: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Equipamentos Prime",
    credits: "Grooming: Cøletivo Crew"
  },
  {
    id: "look-04",
    title: "Araras Industriais",
    category: "LOJA",
    model: "Espaço Comercial",
    location: "Sede Cøletivo",
    image: "https://images.unsplash.com/photo-1567401893930-7db751d7b63e?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Arquitetura Concreto",
    credits: "Design: Studio Cøletivo"
  },
  {
    id: "look-05",
    title: "Estúdio de Produção",
    category: "ESTÚDIO",
    model: "Sound Deck & Synth",
    location: "Cøletivo Lab",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Música & Criação",
    credits: "Produção: Cøletivo Sound"
  },
  {
    id: "look-06",
    title: "Espaço Convivência",
    category: "LOUNGE",
    model: "Café Gourmet Lounge",
    location: "Cøletivo Lounge",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Networking & Conexões",
    credits: "Cøletivo Experience"
  },
  {
    id: "look-07",
    title: "Editorial Streetwear A/W",
    category: "LOJA",
    model: "Heavy Cotton Hoodie",
    location: "São Paulo, BR",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Tons Terrosos & Texturas",
    credits: "Showroom Cøletivo"
  },
  {
    id: "look-08",
    title: "Curadoria Acessórios",
    category: "LOJA",
    model: "Bolsas Utilitárias",
    location: "São Paulo, BR",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Design Funcional",
    credits: "Styling: Cøletivo Crew"
  },
  {
    id: "look-09",
    title: "Lookbook Linha Core",
    category: "LOJA",
    model: "Camisetas Oversized",
    location: "São Paulo, BR",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Algodão Sustentável 260g",
    credits: "Campanha: Cøletivo Core"
  },
  {
    id: "look-10",
    title: "Estilo Urbano Ativo",
    category: "LOJA",
    model: "Puffer Jacket Concept",
    location: "Showroom Sul",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    shades: "Isolamento Térmico Técnico",
    credits: "Design: Studio Cøletivo"
  }
];

const LOCAL_STORAGE_KEY = "coletivo_custom_gallery";

interface EditorialPhotoGridProps {
  categoryFilter?: string;
  simpleMode?: boolean;
}

export const EditorialPhotoGrid = ({ categoryFilter, simpleMode = false }: EditorialPhotoGridProps = {}) => {
  const [looks, setLooks] = useState<Look[]>([]);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedLookIndex, setSelectedLookIndex] = useState<number | null>(null);
  
  // Create / Upload Modal States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("LOJA");
  const [newModel, setNewModel] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newYear, setNewYear] = useState("2026");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and load looks from local storage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setLooks(JSON.parse(saved));
      } catch (e) {
        setLooks(DEFAULT_LOOKS);
      }
    } else {
      setLooks(DEFAULT_LOOKS);
    }
  }, []);

  // Save looks to local storage on changes
  const saveLooks = (updatedLooks: Look[]) => {
    setLooks(updatedLooks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLooks));
  };

  // Reset to default gallery looks
  const handleResetDefault = () => {
    if (window.confirm("Deseja realmente restaurar as fotos padrão da galeria? Todas as enviadas serão removidas.")) {
      saveLooks(DEFAULT_LOOKS);
    }
  };

  // Filter gallery looks
  const filteredLooks = looks.filter(look => {
    if (categoryFilter) return look.category === categoryFilter;
    if (activeTab === "ALL") return true;
    if (activeTab === "CUSTOM") return look.isCustom;
    return look.category === activeTab;
  });

  // Handle Drag & Drop Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("A imagem é muito grande. Escolha uma imagem de até 2MB para garantir fidelidade de salvamento.");
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFileBase64(reader.result as string);
    };
    reader.onerror = () => {
      setErrorMessage("Erro ao ler o arquivo de imagem.");
    };
    reader.readAsDataURL(file);
  };

  // Reset Form
  const resetUploadForm = () => {
    setNewTitle("");
    setNewCategory("STREETWEAR");
    setNewModel("");
    setNewLocation("");
    setNewYear("2026");
    setNewImageUrl("");
    setSelectedFileBase64(null);
    setErrorMessage("");
    setIsUploadOpen(false);
  };

  // Submit New Look
  const handleAddLook = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setErrorMessage("O título é obrigatório.");
      return;
    }

    let finalImageUrl = "";
    if (uploadType === "file") {
      if (!selectedFileBase64) {
        setErrorMessage("Por favor, adicione uma imagem.");
        return;
      }
      finalImageUrl = selectedFileBase64;
    } else {
      if (!newImageUrl.trim()) {
        setErrorMessage("Por favor, insira a URL da imagem.");
        return;
      }
      finalImageUrl = newImageUrl.trim();
    }

    const newLook: Look = {
      id: `look-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      model: newModel.trim() || "Cøletivo Crew",
      location: newLocation.trim() || "Sul do País",
      image: finalImageUrl,
      year: newYear.trim() || "2026",
      shades: "Look Customizado",
      credits: "Enviado por: Usuário",
      isCustom: true
    };

    const updated = [newLook, ...looks];
    saveLooks(updated);
    resetUploadForm();
  };

  // Delete individual look
  const handleDeleteLook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Excluir esta foto da galeria?")) {
      const updated = looks.filter(look => look.id !== id);
      saveLooks(updated);
      if (selectedLookIndex !== null) {
        setSelectedLookIndex(null);
      }
    }
  };

  // Navigation inside Lightbox Overlay
  const handlePrevLook = () => {
    if (selectedLookIndex === null) return;
    const prevIndex = (selectedLookIndex - 1 + filteredLooks.length) % filteredLooks.length;
    setSelectedLookIndex(prevIndex);
  };

  const handleNextLook = () => {
    if (selectedLookIndex === null) return;
    const nextIndex = (selectedLookIndex + 1) % filteredLooks.length;
    setSelectedLookIndex(nextIndex);
  };

  const currentLookInLightbox = selectedLookIndex !== null ? filteredLooks[selectedLookIndex] : null;

  return (
    <section id="looks" className="py-24 md:py-32 bg-brand-cream border-t border-brand-black/5 relative overflow-hidden">
      {/* Background Decorative Mesh Elements */}
      <div className="absolute top-[20%] left-[-5%] w-[35%] h-[35%] bg-brand-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-brand-purple/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 xl:px-24">
        {/* Gallery Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-brand-black/5 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.5em] text-brand-pink font-bold block mb-4 italic">
              {simpleMode ? "// Lookbook & Editorial" : "// Registro interno dos ambientes"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-brand-black">
              {simpleMode ? "Lookbook" : "Galeria"} <span className="font-sans font-light italic lowercase text-brand-pink">Cøletivo.</span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end w-full md:w-auto">
            <p className="text-xs tracking-[0.15em] font-medium text-brand-black/50 mb-6 max-w-md leading-relaxed text-left md:text-right">
              {simpleMode 
                ? "Uma seleção de editoriais, detalhes e peças da nossa curadoria de streetwear. Clique em qualquer foto para ver os créditos e detalhes visuais." 
                : "Um registro dinâmico do design interior, ambientes e conexões da nossa sede. Clique em qualquer foto para ver os detalhes ou envie as suas fotos para personalizar a galeria."}
            </p>

            {!simpleMode && (
              <div className="flex flex-wrap gap-3 self-start md:self-auto">
                {/* Reset Defaults button */}
                <button
                  onClick={handleResetDefault}
                  className="flex items-center gap-2 border border-brand-black/10 px-4 py-2 hover:border-brand-black hover:bg-brand-black/5 transition-all duration-300 text-[10px] font-mono uppercase font-bold text-brand-black/60 hover:text-brand-black"
                  title="Restaurar fotos padrão"
                >
                  <RefreshCw size={11} />
                  Restaurar Padrão
                </button>

                {/* Upload photo button */}
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="flex items-center gap-2 bg-brand-black hover:bg-brand-pink text-brand-true-white px-5 py-2 transition-all duration-300 text-[10px] font-mono uppercase font-black tracking-wider"
                >
                  <Plus size={14} />
                  Enviar Foto
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Tabs row */}
        {!simpleMode && (
          <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
            {[
              { tag: "ALL", label: "Tudo" },
              { tag: "LOJA", label: "Loja" },
              { tag: "BARBEARIA", label: "Barbearia" },
              { tag: "ESTÚDIO", label: "Estúdio" },
              { tag: "LOUNGE", label: "Lounge" },
              { tag: "CUSTOM", label: "Enviados por você" }
            ].map((tab) => {
              // Check if there are any custom looks before displaying tab or just show it
              if (tab.tag === "CUSTOM" && !looks.some(l => l.isCustom)) return null;
              
              return (
                <button
                  key={tab.tag}
                  onClick={() => setActiveTab(tab.tag)}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-mono tracking-widest transition-all duration-300 border ${
                    activeTab === tab.tag
                      ? "bg-brand-black border-brand-black text-brand-true-white font-bold"
                      : "bg-transparent border-brand-black/10 text-brand-black/60 hover:border-brand-black/30 hover:text-brand-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Beautiful Real CSS Masonry Columns Layout */}
        <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          
          {/* Elegant Uploader Prompt Card in the masonry */}
          {!simpleMode && (
            <div 
              onClick={() => setIsUploadOpen(true)}
              className="break-inside-avoid mb-6 group flex flex-col justify-center items-center gap-4 border-2 border-dashed border-brand-black/15 hover:border-brand-pink/50 cursor-pointer w-full p-8 aspect-[3/4] bg-brand-white/30 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-brand-black/10 flex items-center justify-center text-brand-black/40 group-hover:text-brand-pink group-hover:border-brand-pink/30 group-hover:bg-brand-pink/5 transition-all duration-500">
                <Plus size={20} className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="text-center">
                <span className="font-display font-black text-sm uppercase text-brand-black group-hover:text-brand-pink transition-colors tracking-tight block">
                  ENVIAR FOTO
                </span>
                <span className="text-[10px] font-mono text-brand-black/40 uppercase tracking-widest mt-1 block">
                  Arraste ou cole links
                </span>
              </div>
            </div>
          )}

          {/* Active Looks Cards */}
          <AnimatePresence mode="popLayout">
            {filteredLooks.map((look, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={look.id}
                onClick={() => setSelectedLookIndex(index)}
                className="break-inside-avoid mb-6 group flex flex-col gap-3 cursor-pointer relative bg-brand-white p-3 border border-brand-black/5 hover:border-brand-black/30 hover:shadow-lg transition-all duration-500"
              >
                {/* Visual Image container - aspect ratio is kept dynamic with fallback */}
                <div className="relative overflow-hidden bg-brand-cream">
                  {/* Image tag with high fidelity - naturally sized for masonry look */}
                  <img 
                    src={look.image} 
                    alt={look.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[500px] object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
                  />
                  
                  {/* Subtle noise Overlay for cohesive street style theme */}
                  <div className="absolute inset-0 bg-brand-black/10 opacity-30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Tag Indicator */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    <span className="px-2 py-1 bg-brand-black text-brand-true-white text-[8px] font-bold tracking-widest font-mono">
                      {look.category}
                    </span>
                    {look.isCustom && (
                      <span className="px-2 py-1 bg-brand-pink text-brand-true-white text-[8px] font-bold uppercase tracking-widest font-mono">
                        ENVIADO
                      </span>
                    )}
                  </div>

                  {/* Absolute Delete Button for easy management right on grid hover */}
                  {!simpleMode && (
                    <button
                      onClick={(e) => handleDeleteLook(look.id, e)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-brand-true-white/95 backdrop-blur-sm flex items-center justify-center text-brand-black/50 hover:text-brand-pink hover:bg-brand-black shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                      title="Excluir da galeria"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                  {/* Hover action banner */}
                  <div className="absolute inset-0 bg-brand-black/60 md:opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500">
                    <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-brand-true-white">
                      <div className="w-10 h-10 rounded-full bg-brand-pink/90 flex items-center justify-center text-brand-true-white shadow-md">
                        <Eye size={16} />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-bold text-brand-white/80">
                        Visualizar Foto
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info and Location styling - titles are in normal sentence casing */}
                <div className="flex flex-col pt-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-bold text-sm text-brand-black tracking-tight truncate group-hover:text-brand-pink transition-colors">
                      {look.title}
                    </h3>
                    <span className="font-mono text-[9px] text-brand-pink font-bold shrink-0">
                      /{look.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1.5 text-brand-black/45 hover:text-brand-black/70 transition-colors">
                    <MapPin size={10} className="text-brand-pink shrink-0" />
                    <span className="text-[9px] font-mono uppercase tracking-widest truncate">
                      {look.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* --- ADD / UPLOAD PHOTO DIALOG / MODAL --- */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetUploadForm}
              className="absolute inset-0 bg-brand-true-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="relative w-full max-w-lg bg-brand-white p-6 md:p-8 border border-brand-black/10 text-brand-black z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={resetUploadForm}
                className="absolute top-6 right-6 text-brand-black/40 hover:text-brand-black hover:rotate-90 transition-all duration-300"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[9px] font-mono font-bold text-brand-pink uppercase tracking-widest">// CØLETIVO DIGITAL ARCHIVE</span>
                <h3 className="font-display font-black text-2xl uppercase tracking-tighter mt-1">Enviar Nova Imagem</h3>
                <p className="text-[11px] font-medium text-brand-black/45 uppercase mt-1 tracking-wider leading-relaxed">
                  Personalize sua experiência adicionando fotos à coleção.
                </p>
              </div>

              <form onSubmit={handleAddLook} className="flex flex-col gap-5">
                {/* Source Picker */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-2">
                    Origem da Foto
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setUploadType("file"); setErrorMessage(""); }}
                      className={`flex items-center justify-center gap-2 py-2.5 border text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 ${
                        uploadType === "file"
                          ? "bg-brand-black border-brand-black text-brand-true-white"
                          : "border-brand-black/10 hover:border-brand-black text-brand-black/60 hover:text-brand-black"
                      }`}
                    >
                      <Upload size={12} />
                      Arquivo Local
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUploadType("url"); setErrorMessage(""); }}
                      className={`flex items-center justify-center gap-2 py-2.5 border text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 ${
                        uploadType === "url"
                          ? "bg-brand-black border-brand-black text-brand-true-white"
                          : "border-brand-black/10 hover:border-brand-black text-brand-black/60 hover:text-brand-black"
                      }`}
                    >
                      <Link2 size={12} />
                      Link de Imagem
                    </button>
                  </div>
                </div>

                {/* Loader Input elements */}
                {uploadType === "file" ? (
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-2">
                      Upload de Arquivo (Máx: 2MB)
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                        dragActive 
                          ? "border-brand-pink bg-brand-pink/5" 
                          : "border-brand-black/10 hover:border-brand-black/30"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {selectedFileBase64 ? (
                        <div className="flex flex-col items-center gap-3 w-full">
                          <img 
                            src={selectedFileBase64} 
                            alt="Preview" 
                            className="h-24 w-auto object-cover border border-brand-black/5 shadow-sm"
                          />
                          <span className="text-[9px] font-mono text-brand-green font-bold uppercase tracking-widest flex items-center gap-1">
                            ✓ Arquivo Carregado com Sucesso
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full border border-brand-black/5 bg-brand-black/[0.02] flex items-center justify-center text-brand-black/40">
                            <Upload size={16} />
                          </div>
                          <div className="text-center">
                            <span className="text-xs font-bold block mb-1">
                              Clique para escolher ou arraste a imagem
                            </span>
                            <span className="text-[9px] font-mono text-brand-black/40 uppercase tracking-widest block">
                              PNG, JPG ou WEBP de até 2MB
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-2">
                      URL da Imagem
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => { setNewImageUrl(e.target.value); setErrorMessage(""); }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-4 py-3 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-wider bg-transparent outline-none pr-10"
                      />
                      <Link2 size={14} className="absolute right-3.5 top-3.5 text-brand-black/30" />
                    </div>
                    {newImageUrl && (
                      <div className="mt-3 border border-brand-black/5 p-2 bg-brand-cream flex justify-center">
                        <img 
                          src={newImageUrl} 
                          alt="Preview URL" 
                          onError={() => setErrorMessage("Não foi possível carregar a imagem a partir deste link.")}
                          className="max-h-24 object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Form Metadata Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-1.5">
                      Título
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Ex: Streetwear Sul"
                      className="w-full px-3 py-2.5 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-wider outline-none bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-1.5">
                      Categoria
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-widest outline-none bg-brand-white"
                    >
                      <option value="LOJA">LOJA</option>
                      <option value="BARBEARIA">BARBEARIA</option>
                      <option value="ESTÚDIO">ESTÚDIO</option>
                      <option value="LOUNGE">LOUNGE</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-1.5">
                      Modelo / Autor
                    </label>
                    <input
                      type="text"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      placeholder="Ex: Richard R."
                      className="w-full px-3 py-2.5 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-wider outline-none bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 font-bold block mb-1.5">
                      Cidade / Ano
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Porto Alegre"
                        className="w-full px-2 py-2.5 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-wider outline-none bg-transparent"
                      />
                      <input
                        type="text"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        placeholder="2026"
                        className="w-full px-2 py-2.5 border border-brand-black/10 focus:border-brand-pink text-xs uppercase tracking-wider outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-brand-pink/5 border border-brand-pink/20 text-brand-pink font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Info size={11} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-brand-black hover:bg-brand-pink text-brand-true-white font-mono text-xs uppercase font-black py-4 transition-all duration-300 tracking-widest flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <Plus size={14} />
                  Publicar na Galeria
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CINEMATIC LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedLookIndex !== null && currentLookInLightbox && (
          <div className="fixed inset-0 z-[10000] flex flex-col justify-center items-center pointer-events-auto select-none">
            {/* Blurry dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLookIndex(null)}
              className="absolute inset-0 bg-brand-true-black/95 backdrop-blur-md"
            />

            {/* Close button top right */}
            <button
              onClick={() => setSelectedLookIndex(null)}
              className="absolute top-6 right-6 md:top-8 md:right-10 z-[10100] w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-brand-true-white hover:text-brand-pink hover:border-brand-pink/50 hover:scale-105 hover:rotate-90 transition-all duration-300 cursor-pointer"
              title="Fechar Visualizador"
            >
              <X size={18} />
            </button>

            {/* Main Stage Viewport Content */}
            <div className="relative w-full max-w-5xl px-6 md:px-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-center z-10">
              
              {/* Left Column: Big Image Display with Camera Viewfinder lines */}
              <div className="col-span-12 md:col-span-7 flex justify-center items-center relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[4/5] bg-brand-true-black overflow-hidden border border-white/10 group">
                
                {/* Visual Viewfinder framing borders */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentLookInLightbox.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    src={currentLookInLightbox.image}
                    alt={currentLookInLightbox.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700"
                  />
                </AnimatePresence>

                {/* Left/Right floating click indicators on image edges */}
                <button
                  onClick={handlePrevLook}
                  className="absolute left-6 w-10 h-10 rounded-full bg-brand-true-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-brand-pink hover:text-white transition-all duration-300 z-20 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNextLook}
                  className="absolute right-6 w-10 h-10 rounded-full bg-brand-true-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-brand-pink hover:text-white transition-all duration-300 z-20 cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right Column: Complete Editorial Metadata Sheet */}
              <div className="col-span-12 md:col-span-5 flex flex-col justify-center text-brand-true-white w-full">
                <div className="border-b border-white/10 pb-6 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-brand-pink text-brand-true-white text-[9px] font-mono font-bold tracking-widest uppercase">
                      {currentLookInLightbox.category}
                    </span>
                    <span className="px-2.5 py-1 bg-brand-black text-brand-true-white border border-white/10 text-[9px] font-mono font-bold tracking-widest uppercase">
                      FRAME // 0{selectedLookIndex + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tighter text-brand-true-white leading-tight">
                    {currentLookInLightbox.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest uppercase text-brand-true-white/60 mb-8">
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span>Localização:</span>
                    <span className="text-brand-true-white font-bold flex items-center gap-1">
                      <MapPin size={10} className="text-brand-pink" />
                      {currentLookInLightbox.location}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span>Fotógrafo / Criador:</span>
                    <span className="text-brand-true-white font-bold">{currentLookInLightbox.credits || "Cøletivo Crew"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span>Espaço / Legenda:</span>
                    <span className="text-brand-true-white font-bold">{currentLookInLightbox.model}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span>Ano da Foto:</span>
                    <span className="text-brand-true-white font-bold">{currentLookInLightbox.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span>Estilo Visual:</span>
                    <span className="text-brand-true-white font-bold">{currentLookInLightbox.shades || "Identidade Autoral"}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (currentLookInLightbox.id) {
                        const updated = looks.filter(l => l.id !== currentLookInLightbox.id);
                        saveLooks(updated);
                        setSelectedLookIndex(null);
                      }
                    }}
                    className="flex-1 py-3 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-400 font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={12} />
                    Excluir Foto
                  </button>
                  <button
                    onClick={() => setSelectedLookIndex(null)}
                    className="flex-1 py-3 bg-brand-true-white hover:bg-brand-pink text-brand-true-black hover:text-brand-true-white font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300"
                  >
                    Voltar à Galeria
                  </button>
                </div>
              </div>

            </div>

            {/* Quick slide progress indicators at the bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
              {filteredLooks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedLookIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedLookIndex ? "w-6 bg-brand-pink" : "w-1.5 bg-white/20 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

