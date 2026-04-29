import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import waIcon from "@assets/whatsapp_(1)_1773369929854.png";

import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL = "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

const categories = [
  { label: "Todos",    emoji: "🛒", id: "Todos" },
  { label: "Pães",     emoji: "🍞", id: "Pães" },
  { label: "Salgados", emoji: "🥐", id: "Salgados" },
  { label: "Cafés",    emoji: "☕", id: "Cafés" },
  { label: "Doces",    emoji: "🎂", id: "Doces" },
  { label: "Lanches",  emoji: "🥪", id: "Lanches" },
];

const products = [
  { id: 1,  name: "Pão Francês",                category: "Pães",     img: "pao-frances.png",   tag: "Clássico",    desc: "Crocante por fora, macio por dentro. Produzido diariamente durante a madrugada." },
  { id: 2,  name: "Pão Integral",               category: "Pães",     img: "pao-integral.png",  tag: "Saudável",    desc: "Rico em fibras, com semente de linhaça e gergelim. Ótimo para o café corporativo." },
  { id: 3,  name: "Pão de Fermentação Natural", category: "Pães",     img: "sourdough.png",     tag: "Artesanal",   desc: "Sourdough com casca crocante e miolo aerado. Fermentado por 18h." },
  { id: 4,  name: "Ciabatta",                   category: "Pães",     img: "ciabatta.png",      tag: "Especial",    desc: "Textura rústica e levemente crocante. Ideal para bruschettas e canapés." },

  { id: 5,  name: "Coxinha de Frango",          category: "Salgados", img: "coxinha.png",       tag: "Favorito",    desc: "Massa fina e recheio generoso de frango desfiado com catupiry." },
  { id: 6,  name: "Pão de Queijo",              category: "Salgados", img: "pao-queijo.png",    tag: "Mineiro",     desc: "Receita mineira tradicional, com polvilho azedo e queijo meia-cura." },
  { id: 7,  name: "Esfiha Aberta",              category: "Salgados", img: "esfiha.png",        tag: "Fresco",      desc: "Massa leve com recheio de carne temperada ou queijo e tomate." },
  { id: 8,  name: "Empada de Palmito",          category: "Salgados", img: "empada.png",        tag: "Especial",    desc: "Massa amanteigada com recheio cremoso de palmito e requeijão." },

  { id: 9,  name: "Café Expresso",              category: "Cafés",    img: "cafe-expresso.png", tag: "Clássico",    desc: "Grãos selecionados, torra média. Encorpado e aromático para começar bem o dia." },
  { id: 10, name: "Cappuccino",                 category: "Cafés",    img: "cappuccino.png",    tag: "Cremoso",     desc: "Espuma de leite artesanal com pitada de canela e chocolate em pó." },
  { id: 11, name: "Suco de Laranja",            category: "Cafés",    img: "suco-laranja.png",  tag: "Natural",     desc: "Espremido na hora, sem conservantes, na medida certa de acidez e doçura." },
  { id: 12, name: "Chá de Ervas",               category: "Cafés",    img: "cha-ervas.png",     tag: "Relaxante",   desc: "Mix de camomila, hortelã e capim-limão. Ótimo para reuniões e pausas." },

  { id: 13, name: "Bolo de Cenoura",            category: "Doces",    img: "bolo-cenoura.png",  tag: "Caseiro",     desc: "Massa macia com cobertura de chocolate granulado. Receita tradicional." },
  { id: 14, name: "Brigadeiro Gourmet",         category: "Doces",    img: "brigadeiro.png",    tag: "Gourmet",     desc: "Chocolate belga 70% cacau, sem açúcar refinado. Derrete na boca." },
  { id: 15, name: "Torta de Morango",           category: "Doces",    img: "torta-morango.png", tag: "Fresco",      desc: "Base crocante, creme de baunilha e morangos frescos selecionados." },
  { id: 16, name: "Sonho de Creme",             category: "Doces",    img: "sonho.png",         tag: "Favorito",    desc: "Massa frita aerada com recheio generoso de creme de confeiteiro." },

  { id: 17, name: "Misto Quente",               category: "Lanches",  img: "misto-quente.png",  tag: "Clássico",    desc: "Pão de forma artesanal, presunto e queijo prato. Crocante e gratinado." },
  { id: 18, name: "Bauru Especial",             category: "Lanches",  img: "bauru.png",         tag: "Especial",    desc: "Rosbife, queijo derretido, pepino, tomate e maionese da casa." },
  { id: 19, name: "Wrap Natural",               category: "Lanches",  img: "wrap.png",          tag: "Saudável",    desc: "Folha de alface, frango grelhado, cenoura ralada e molho de iogurte." },
  { id: 20, name: "Sanduíche de Atum",          category: "Lanches",  img: "sanduiche-atum.png",tag: "Leve",        desc: "Atum temperado com ervas, tomate e folhas verdes no pão ciabatta." },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Clássico:  { bg: "#FFF0E0", text: "#c05c00" },
  Saudável:  { bg: "#E8F5E9", text: "#2e7d32" },
  Artesanal: { bg: "#FCE4EC", text: "#880e4f" },
  Especial:  { bg: "#EDE7F6", text: "#4527a0" },
  Favorito:  { bg: "#FFF3E0", text: "#e65100" },
  Mineiro:   { bg: "#FFF8E1", text: "#f57f17" },
  Fresco:    { bg: "#E1F5FE", text: "#0277bd" },
  Cremoso:   { bg: "#F3E5F5", text: "#6a1b9a" },
  Natural:   { bg: "#E8F5E9", text: "#1b5e20" },
  Relaxante: { bg: "#E0F7FA", text: "#006064" },
  Caseiro:   { bg: "#FFF8E1", text: "#795548" },
  Gourmet:   { bg: "#212121", text: "#d4af37" },
  Leve:      { bg: "#E3F2FD", text: "#1565c0" },
};

const marqueeItems = ["🍞 Pão Francês", "☕ Café Expresso", "🥐 Croissant", "🧀 Pão de Queijo", "🍓 Torta de Morango", "🥪 Bauru Especial", "🍫 Brigadeiro", "🌿 Chá Natural", "🥖 Sourdough", "🍗 Coxinha de Frango"];

function ProductCard({ prod }: { prod: typeof products[0] }) {
  const tag = tagColors[prod.tag] ?? { bg: "#f0f0f0", text: "#333" };
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}images/${prod.img}`}
          alt={prod.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: tag.bg, color: tag.text, fontFamily: "'Open Sans', sans-serif" }}
        >
          {prod.tag}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-bold text-[#cb9921] uppercase tracking-widest mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          {prod.category}
        </div>
        <h3 className="text-base font-bold text-[#1a1a1a] mb-2 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          {prod.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {prod.desc}
        </p>
      </div>
    </div>
  );
}

function ProductCarousel({ filtered }: { filtered: typeof products }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
      setCurrentIdx(0);
    }
  }, [filtered]);

  const getCardWidth = () => {
    if (!scrollRef.current) return 0;
    const container = scrollRef.current;
    const firstCard = container.querySelector("[data-card]") as HTMLElement | null;
    return firstCard ? firstCard.offsetWidth + 16 : container.offsetWidth * 0.8 + 16;
  };

  const scrollTo = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    scrollRef.current.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;
    const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setCurrentIdx(Math.min(idx, filtered.length - 1));
  };

  const showPrev = currentIdx > 0;
  const showNext = currentIdx < filtered.length - 1;

  return (
    <div className="relative">
      {showPrev && (
        <button
          onClick={() => scrollTo("left")}
          className="absolute left-0 top-[104px] -translate-y-1/2 -translate-x-1/2 z-20 bg-white rounded-full shadow-lg p-2 border border-gray-100"
          style={{ color: "#560000" }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {showNext && (
        <button
          onClick={() => scrollTo("right")}
          className="absolute right-0 top-[104px] -translate-y-1/2 translate-x-1/2 z-20 bg-white rounded-full shadow-lg p-2 border border-gray-100"
          style={{ color: "#560000" }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filtered.map((prod) => (
          <div
            key={prod.id}
            data-card
            className="shrink-0 w-[78%] sm:w-[44%] snap-start"
          >
            <ProductCard prod={prod} />
          </div>
        ))}
        <div className="shrink-0 w-4" />
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {currentIdx + 1} / {filtered.length}
        </span>
        <div className="flex gap-1.5 ml-2">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardWidth = getCardWidth();
                scrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                setCurrentIdx(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === currentIdx ? "w-5 h-2 bg-[#560000]" : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState("Todos");

  const filtered = active === "Todos" ? products : products.filter(p => p.category === active);

  return (
    <div className="w-full bg-[#FFF8F3] pt-[80px] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 px-4 text-center" style={{ background: "linear-gradient(135deg, #2d0000 0%, #560000 55%, #6b0000 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #cb9921 0%, transparent 50%), radial-gradient(circle at 80% 20%, #cb9921 0%, transparent 40%)" }} />

        {["🍞", "☕", "🥐", "🎂", "🥪", "🧀"].map((em, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl select-none pointer-events-none opacity-20"
            style={{ top: `${10 + (i * 15) % 80}%`, left: i % 2 === 0 ? `${4 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${4 + i * 3}%` : undefined }}
            animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
          >{em}</motion.div>
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#cb9921]/40 text-[#cb9921] text-sm font-bold mb-6"
            style={{ backgroundColor: "rgba(203,153,33,0.12)", fontFamily: "'Open Sans', sans-serif" }}
          >
            🛒 Nossa Vitrine
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Fresco todo dia,<br />
            <span style={{ color: "#cb9921" }}>feito com amor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Pães artesanais, salgados, cafés, doces e lanches preparados diariamente para encantar sua equipe.
          </motion.p>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#cb9921] py-3 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="inline-flex gap-10"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-[#1a0000] font-bold text-sm tracking-wide" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {item} <span className="opacity-40 mx-2">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="sticky top-[80px] z-40 bg-[#FFF8F3] border-b border-[#cb9921]/20 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(cat.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                backgroundColor: active === cat.id ? "#560000" : "white",
                color: active === cat.id ? "white" : "#560000",
                border: `2px solid ${active === cat.id ? "#560000" : "#560000"}20`,
                boxShadow: active === cat.id ? "0 4px 14px rgba(86,0,0,0.3)" : "none",
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-bold text-[#560000]">{filtered.length}</span> produtos encontrados
          </p>
          <div className="flex items-center gap-2 text-xs text-[#1a4d00] bg-[#E8F5E9] px-4 py-2 rounded-full font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="w-2 h-2 bg-[#25d366] rounded-full animate-pulse inline-block" />
            Produzindo hoje
          </div>
        </div>

        {/* Carousel — mobile & tablet only */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <ProductCarousel filtered={filtered} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Grid — desktop only */}
        <motion.div layout className="hidden lg:grid grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((prod, idx) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: idx * 0.04, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8 }}
                className="cursor-default"
              >
                <ProductCard prod={prod} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── CORPORATE BANNER ── */}
      <section className="py-16 px-4 mx-4 mb-8 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0000 0%, #2d0000 60%, #0f0000 100%)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Cardápio Corporativo
            </h2>
            <p className="text-white/60 text-base mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Montamos um cardápio personalizado para sua empresa com volumes, frequência e produtos sob medida. Mais variedade, melhor preço.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white"
              style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
            >
              <img src={waIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
              Solicitar cardápio completo
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {[
              { emoji: "📋", label: "Cardápio personalizado" },
              { emoji: "🔄", label: "Entrega recorrente" },
              { emoji: "💳", label: "Faturamento mensal" },
              { emoji: "⚡", label: "Atendimento prioritário" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-white/70 text-xs font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-4 text-center bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <ShoppingBag className="w-10 h-10 text-[#cb9921] mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-[#560000] mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Quer ver ainda mais opções?
          </h3>
          <p className="text-gray-500 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Temos um cardápio completo com opções sazonais, especiais para eventos e personalizadas para sua empresa.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-lg shadow-xl"
            style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
          >
            <img src={waIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
            Pedir cardápio completo
          </motion.button>
        </div>
      </section>
    </div>
  );
}
