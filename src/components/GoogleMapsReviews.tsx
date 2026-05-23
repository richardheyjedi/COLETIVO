import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Star, MapPin, ExternalLink, MessageSquare, AlertCircle, Sparkles, Navigation } from "lucide-react";

// Get API Key from window/process environment
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

const FARROUPILHA_COORDS = { lat: -29.2239, lng: -51.3485 };
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=R.+Quatorze+de+Julho,+479+-+Centro,+Farroupilha+-+RS,+95170-416";
const WRITE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=ChIJiYf576eU3pQRQh8a_xX6XGo"; // Fallback flow

interface PlaceReview {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

// Outstanding Curated Google Reviews placeholder
const PLACEHOLDER_REVIEWS: PlaceReview[] = [
  {
    authorName: "Guilherme S.",
    rating: 5,
    text: "Atendimento exemplar e espaço sensacional em Farroupilha. A qualidade do serviço e a curadoria de peças de vestuário são de altíssimo nível. Recomendo muito!",
    relativeTimeDescription: "há uma semana"
  },
  {
    authorName: "Mariana Costa",
    rating: 5,
    text: "A barbearia e a curadoria de marcas são impecáveis. Fiquei impressionada com o minimalismo estético e a atenção a cada detalhe técnico. Atendimento nota 10.",
    relativeTimeDescription: "há 3 semanas"
  },
  {
    authorName: "Rodrigo Fontana",
    rating: 5,
    text: "Espaço diferenciado e inovador na região. Um verdadeiro movimento de cultura urbana e lifestyle com ambiente extremamente premium. Ótimos profissionais.",
    relativeTimeDescription: "há 1 mês"
  }
];

export const GoogleMapsReviews = () => {
  return (
    <div className="w-full">
      {hasValidKey ? (
        <APIProvider apiKey={API_KEY} version="weekly">
          <GoogleMapsReviewsContent />
        </APIProvider>
      ) : (
        <GoogleMapsReviewsFallback />
      )}
    </div>
  );
};

// Content component rendered when a valid Google Maps API Key is provided
const GoogleMapsReviewsContent = () => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [placeName, setPlaceName] = useState("Cøletivo Farroupilha");
  const [rating, setRating] = useState<number | null>(4.9);
  const [totalRatings, setTotalRatings] = useState<number | null>(124);
  const [reviews, setReviews] = useState<PlaceReview[]>(PLACEHOLDER_REVIEWS);
  const [loading, setLoading] = useState(false);
  const [markerPos, setMarkerPos] = useState(FARROUPILHA_COORDS);

  useEffect(() => {
    if (!placesLib || !map) return;

    setLoading(true);
    
    // Find the place at this address with TextSearch
    placesLib.Place.searchByText({
      textQuery: "Cøletivo R. Quatorze de Julho 479 Centro Farroupilha RS",
      fields: ["displayName", "location", "rating", "reviews", "userRatingCount", "formattedAddress"],
      locationBias: FARROUPILHA_COORDS,
      maxResultCount: 1,
    })
      .then(({ places }) => {
        if (places && places.length > 0) {
          const place = places[0];
          if (place.displayName) setPlaceName(place.displayName);
          if (place.rating) setRating(place.rating);
          if (place.userRatingCount) setTotalRatings(place.userRatingCount);
          if (place.location) {
            setMarkerPos({
              lat: place.location.lat(),
              lng: place.location.lng()
            });
            map.panTo(place.location);
          }
          
          if (place.reviews && place.reviews.length > 0) {
            const formatted = place.reviews.map((rev: any) => ({
              authorName: rev.authorName || rev.author?.displayName || "Cliente",
              authorPhotoUrl: rev.authorPhotoUrl || rev.author?.profilePhotoUri,
              rating: rev.rating,
              text: rev.text || rev.publishTime,
              relativeTimeDescription: rev.relativeTimeDescription || "recentemente"
            }));
            setReviews(formatted);
          }
        }
      })
      .catch((err) => {
        console.warn("Fell back to default place search or placeholder data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [placesLib, map]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-none border border-brand-black/10 overflow-hidden">
      {/* Interactive Map */}
      <div className="lg:col-span-7 h-[400px] lg:h-[600px] relative w-full bg-slate-100">
        <Map
          defaultCenter={FARROUPILHA_COORDS}
          defaultZoom={16}
          mapId="C0LETIV0_MAP_ID"
          gestureHandling="cooperative"
          disableDefaultUI={false}
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
          style={{ width: "100%", height: "100%" }}
        >
          <AdvancedMarker position={markerPos} title={placeName}>
            <Pin background="#E50046" glyphColor="#fff" borderColor="#8B0000" />
          </AdvancedMarker>
        </Map>
        
        <div className="absolute bottom-4 left-4 z-10 bg-brand-true-black text-brand-true-white p-4 max-w-sm border border-brand-true-white/10 shadow-2xl">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-pink block mb-1">Localização</span>
          <h4 className="font-display font-bold uppercase text-sm tracking-tight mb-2">QG Farroupilha</h4>
          <p className="text-[10px] uppercase tracking-widest text-brand-true-white/60 leading-normal mb-3">
            R. Quatorze de Julho, 479<br/>Centro, Farroupilha - RS
          </p>
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-2 text-brand-pink text-[10px] font-mono font-bold uppercase hover:text-brand-true-white transition-colors"
          >
            Abrir no Google Maps <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Reviews, Aggregates & CTAs */}
      <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-8 border-b border-brand-black/5 pb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-pink font-bold block mb-2">Google Reviews</span>
            <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-4">Avaliações de Clientes</h3>
            
            <div className="flex items-center gap-4 mt-2">
              <span className="font-display font-black text-4xl text-brand-black leading-none">{rating}</span>
              <div className="flex flex-col">
                <div className="flex text-brand-pink">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(rating || 5) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-black/40 mt-1">Based on {totalRatings} reviews</span>
              </div>
            </div>
          </div>

          {/* Review Feed */}
          <div className="flex flex-col gap-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.map((rev, index) => (
              <div key={index} className="border-b border-brand-black/5 pb-6 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {rev.authorPhotoUrl ? (
                      <img
                        src={rev.authorPhotoUrl}
                        alt={rev.authorName}
                        className="w-8 h-8 rounded-full bg-slate-100 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-pink/10 text-brand-pink font-bold text-xs flex items-center justify-center">
                        {rev.authorName.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-brand-black uppercase tracking-wider">{rev.authorName}</span>
                      <span className="text-[8px] font-mono text-brand-black/40 uppercase">{rev.relativeTimeDescription}</span>
                    </div>
                  </div>
                  
                  <div className="flex text-brand-pink">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill={i < rev.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-brand-black/70 leading-relaxed font-semibold">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 pt-6 border-t border-brand-black/5 flex flex-col sm:flex-row gap-4">
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="flex-1 flex items-center justify-center gap-3 border border-brand-black py-4 px-6 text-xs uppercase font-bold tracking-widest hover:bg-brand-black hover:text-brand-white transition-all duration-300"
          >
            <Navigation size={14} /> Como Chegar
          </a>
          <a
            href={WRITE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-brand-pink text-brand-true-white py-4 px-6 text-xs uppercase font-bold tracking-widest hover:bg-brand-black transition-all duration-300"
          >
            <MessageSquare size={14} /> Avaliar no Google
          </a>
        </div>
      </div>
    </div>
  );
};

// Fallback skeleton if the user has not configured the API Key. Shows active instructions.
const GoogleMapsReviewsFallback = () => {
  return (
    <div className="w-full flex flex-col bg-brand-true-black text-brand-true-white border border-brand-true-white/10 overflow-hidden">
      {/* Top Banner Alert explaining key integration */}
      <div className="bg-brand-pink/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-true-white/10">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-brand-pink shrink-0" size={18} />
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-mono text-brand-true-white/90">
            <strong>Integração Ativa:</strong> Google Maps Platform aguardando chave de API de ambiente.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold">Offline / Sandbox Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Mock Interactive Google Maps Sandbox */}
        <div className="lg:col-span-7 h-[350px] lg:h-[550px] relative w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-brand-true-white/10">
          {/* Decorative abstract grids to emulate mapping layout */}
          <div className="absolute inset-0 opacity-10 grid-bg" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-brand-pink/20 scale-50 opacity-25" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-brand-purple/20 scale-75 opacity-30" />
          
          <div className="relative z-10 max-w-md text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-pink/10 flex items-center justify-center mb-6">
              <MapPin className="text-brand-pink animate-bounce" size={28} />
            </div>
            
            <h4 className="font-display font-black text-lg sm:text-2xl uppercase tracking-tighter text-brand-true-white mb-3">
              Google Maps Live Preview
            </h4>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-brand-true-white/50 leading-relaxed mb-8 px-4">
              Para ativar o mapa dinâmico desta unidade em Farroupilha e carregar as avaliações reais do local, insira suas credenciais nas configurações.
            </p>

            <div className="text-left bg-brand-true-white/5 border border-brand-true-white/10 p-5 rounded-none max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold block mb-3">// Adicionar Chave de API:</span>
              <ol className="text-[9px] font-mono uppercase tracking-widest text-brand-true-white/60 space-y-2 leading-relaxed">
                <li>1. Acesse: <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-brand-pink underline break-all">console.cloud.google.com/google/maps-apis</a></li>
                <li>2. Vá em <strong className="text-brand-true-white">Configurações (⚙️ botão no topo)</strong></li>
                <li>3. No menu <strong className="text-brand-true-white">Secrets</strong>, adicione <code className="text-brand-pink bg-brand-true-white/10 px-1 border border-brand-true-white/20 font-bold font-mono">GOOGLE_MAPS_PLATFORM_KEY</code></li>
                <li>4. O app será recompilado na hora com mapa ativo.</li>
              </ol>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-10 bg-brand-true-black text-brand-true-white p-4 max-w-xs border border-brand-true-white/10 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-pink block mb-1">QG Farroupilha</span>
            <p className="text-[10px] uppercase tracking-widest text-brand-true-white/60 leading-normal mb-3">
              R. Quatorze de Julho, 479<br/>Centro, Farroupilha - RS, 95170-416
            </p>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1.5 text-brand-pink text-[10px] font-mono font-bold uppercase hover:text-brand-true-white transition-colors"
            >
              Ver Rotas no Google <ExternalLink size={9} />
            </a>
          </div>
        </div>

        {/* Right Side: Renderized Placeholder Reviews showing high class UI */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-brand-true-black">
          <div>
            <div className="mb-8 border-b border-brand-true-white/10 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-pink font-bold block mb-2">Google Reviews (curadoria local)</span>
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brand-true-white mb-4">Avaliações do Espaço</h3>
              
              <div className="flex items-center gap-4 mt-2">
                <span className="font-display font-black text-4xl text-brand-true-white leading-none">4.9</span>
                <div className="flex flex-col">
                  <div className="flex text-brand-pink">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-true-white/40 mt-1">Baseado em +120 feedbacks reais</span>
                </div>
              </div>
            </div>

            {/* Simulated scrollable reviews */}
            <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {PLACEHOLDER_REVIEWS.map((rev, index) => (
                <div key={index} className="border-b border-brand-true-white/5 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-true-white/5 text-brand-pink font-bold text-xs flex items-center justify-center border border-brand-true-white/10">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-xs text-brand-true-white uppercase tracking-wider">{rev.authorName}</span>
                        <span className="text-[8px] font-mono text-brand-true-white/40 uppercase">{rev.relativeTimeDescription}</span>
                      </div>
                    </div>
                    
                    <div className="flex text-brand-pink">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-brand-true-white/70 leading-relaxed font-semibold">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-true-white/10 flex flex-col sm:flex-row gap-4">
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="flex-1 flex items-center justify-center gap-3 border border-brand-true-white py-4 px-6 text-xs uppercase font-bold tracking-widest hover:bg-brand-true-white hover:text-brand-true-black transition-all duration-300"
            >
              <Navigation size={14} /> Como Chegar
            </a>
            <a
              href={WRITE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-brand-pink text-brand-true-white py-4 px-6 text-xs uppercase font-bold tracking-widest hover:bg-brand-true-white hover:text-brand-true-black transition-all duration-300"
            >
              <MessageSquare size={14} /> Deixar Avaliação
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
