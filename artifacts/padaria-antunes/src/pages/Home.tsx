import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import waIcon from "@assets/whatsapp_(1)_1773369929854.png";

import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL =
  "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

const heroSlides = [
  { img: "prod-bread.png", label: "Pães Artesanais", color: "#cb9921" },
  { img: "prod-savory.png", label: "Salgados Frescos", color: "#560000" },
  { img: "prod-coffee.png", label: "Cafés Especiais", color: "#8B4513" },
  { img: "prod-sweets.png", label: "Doces & Bolos", color: "#cb9921" },
  { img: "prod-sandwich.png", label: "Lanches Premium", color: "#560000" },
];

const cartoonSteps = [
  {
    emoji: "📱",
    cardBg: "linear-gradient(145deg, #560000 0%, #800000 100%)",
    textColor: "#fff",
    titleColor: "#e8b832",
    descColor: "#ffffff",
    detailBg: "rgba(203,153,33,0.2)",
    detailColor: "#e8c84a",
    badgeBg: "#cb9921",
    badgeText: "#1a0000",
    connectorColor: "#cb9921",
    step: "01",
    title: "Contato via WhatsApp",
    desc: "Você entra em contato pelo WhatsApp ou e-mail. Nossa equipe responde com agilidade — sem burocracia, sem formulários.",
    detail: "Disponíveis seg–sáb das 6h às 19:30",
  },
  {
    emoji: "🤝",
    cardBg: "linear-gradient(145deg, #cb9921 0%, #e8b832 100%)",
    textColor: "#1a0000",
    titleColor: "#3d0000",
    descColor: "#ffffff",
    detailBg: "rgba(61,0,0,0.12)",
    detailColor: "#560000",
    badgeBg: "#560000",
    badgeText: "#e8b832",
    connectorColor: "#7a2a00",
    step: "02",
    title: "Convênio Formalizado",
    desc: "Definimos juntos o perfil da empresa, os produtos preferidos e condições. Assinamos o convênio e pronto — é parceiro!",
    detail: "Processo 100% digital, sem burocracia",
  },
  {
    emoji: "☕",
    cardBg: "linear-gradient(145deg, #7a2a00 0%, #9b3800 100%)",
    textColor: "#fff",
    titleColor: "#e8b832",
    descColor: "#ffffff",
    detailBg: "rgba(203,153,33,0.2)",
    detailColor: "#e8c84a",
    badgeBg: "#cb9921",
    badgeText: "#1a0000",
    connectorColor: "#a07a18",
    step: "03",
    title: "Pedido do Dia",
    desc: "Cada dia, basta enviar o pedido antes do horário de corte. Café da manhã, lanche da tarde, reuniões — tudo na medida certa.",
    detail: "Pedidos até 18h para entrega no dia seguinte",
  },
  {
    emoji: "🚐",
    cardBg: "linear-gradient(145deg, #a07a18 0%, #cb9921 100%)",
    textColor: "#1a0000",
    titleColor: "#3d0000",
    descColor: "#ffffff",
    detailBg: "rgba(61,0,0,0.12)",
    detailColor: "#560000",
    badgeBg: "#560000",
    badgeText: "#e8b832",
    connectorColor: "#560000",
    step: "04",
    title: "Produção & Entrega",
    desc: "Nossa padaria inicia a produção cedo para garantir qualidade em cada item. A entrega é realizada diretamente na porta da sua empresa, com pontualidade.",
    detail: "Entregas a partir das 6h da manhã",
  },
  {
    emoji: "💳",
    cardBg: "linear-gradient(145deg, #3d0000 0%, #560000 100%)",
    textColor: "#fff",
    titleColor: "#e8b832",
    descColor: "#ffffff",
    detailBg: "rgba(203,153,33,0.2)",
    detailColor: "#e8c84a",
    badgeBg: "#cb9921",
    badgeText: "#1a0000",
    connectorColor: null,
    step: "05",
    title: "Fatura no Final do Mês",
    desc: "Fechamos o mês com um único boleto e relatório detalhado de todo consumo. Financeiro feliz, equipe feliz!",
    detail: "Nota fiscal + relatório de consumo incluídos",
  },
];

const faqs = [
  {
    q: "A padaria produz todos os dias?",
    a: "Sim! Produzimos diariamente de segunda a sábado. Tudo é preparado cedo pela manhã para garantir que os produtos cheguem frescos à sua empresa.",
  },
  {
    q: "Há um pedido mínimo por entrega?",
    a: "Temos um valor mínimo por pedido para garantir a viabilidade da entrega. Entre em contato pelo WhatsApp e nossa equipe te informa os detalhes conforme a sua região.",
  },
  {
    q: "Posso personalizar o cardápio para minha empresa?",
    a: "Com certeza! Uma das vantagens do convênio é justamente a personalização. Podemos montar um cardápio fixo rotativo ou trabalhar com pedidos variáveis conforme a necessidade do dia.",
  },
  {
    q: "Como é feito o pagamento mensal?",
    a: "No fechamento do mês, emitimos um boleto único com o total de todos os pedidos, acompanhado de relatório detalhado. O prazo de vencimento é combinado no momento do convênio.",
  },
];

const testimonials = [
  { text: "A padaria sempre entrega com pontualidade e os produtos chegam frescos. Nossa equipe adora!", author: "Equipe Administrativa", company: "Itaú", initial: "I" },
  { text: "O convênio facilitou muito o dia a dia do escritório. Burocracia zero e qualidade de sempre.", author: "Equipe Corporativa", company: "Santander", initial: "S" },
  { text: "Ótimo atendimento e organização nas entregas. Nunca tivemos problema de atraso.", author: "Setor Operacional", company: "Ferroeste", initial: "F" },
  { text: "A qualidade e apresentação dos produtos fazem toda diferença para nossas reuniões.", author: "Equipe Administrativa", company: "Uluru", initial: "U" },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const go = (i: number) => { setDir(i > current ? 1 : -1); setCurrent(i); };

  return (
    <div className="absolute inset-0">
      {/* Full-bleed image carousel */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/${heroSlides[current].img}`}
            alt={heroSlides[current].label}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Product label + dots at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-white/60 text-xs mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </p>
            <h3 className="text-white text-2xl font-bold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {heroSlides[current].label}
            </h3>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-7 h-2 bg-[#cb9921]" : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, isOpen, toggle, index }: { q: string; a: string; isOpen: boolean; toggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen ? "rgba(86,0,0,0.05)" : "#ffffff",
        border: isOpen ? "1px solid rgba(86,0,0,0.2)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: isOpen ? "0 4px 24px rgba(86,0,0,0.07)" : "0 1px 6px rgba(0,0,0,0.04)",
        transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
      }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center gap-5 px-6 py-5 text-left"
      >
        {/* Number badge */}
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
          style={{
            background: isOpen ? "linear-gradient(135deg,#560000,#800000)" : "rgba(86,0,0,0.08)",
            color: isOpen ? "#ffffff" : "#560000",
            fontFamily: "'Open Sans', sans-serif",
            transition: "all 0.3s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <span
          className="flex-1 font-semibold text-base leading-snug"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            color: isOpen ? "#560000" : "#1a1a1a",
            transition: "color 0.3s",
          }}
        >
          {q}
        </span>

        {/* Animated plus/minus */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isOpen ? "#560000" : "rgba(86,0,0,0.08)",
            transition: "background-color 0.3s",
          }}
        >
          <span className="text-base font-bold leading-none" style={{ color: isOpen ? "#ffffff" : "#560000" }}>
            +
          </span>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pl-[72px]">
              <div className="w-12 h-0.5 mb-3 rounded-full" style={{ backgroundColor: "#cb9921" }} />
              <p
                className="text-gray-500 text-sm leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileStep, setMobileStep] = useState(0);

  return (
    <div className="w-full bg-white pt-[80px]">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[100svh] md:min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden">

        {/* LEFT — Rich burgundy with depth */}
        <div className="w-full md:w-[52%] text-white py-10 px-5 sm:py-14 sm:px-8 md:py-16 md:px-14 flex flex-col justify-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3d0000 0%, #560000 50%, #6b0000 100%)" }}
        >
          {/* Decorative dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Warm glow corner */}
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#cb9921] rounded-full opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute top-12 -right-16 w-48 h-48 bg-white rounded-full opacity-5 blur-2xl pointer-events-none" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            className="relative z-10"
          >
            {/* Animated badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 text-[#3d0000] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md mb-5 sm:mb-[32px] text-[13px] sm:text-[15px]"
              style={{ backgroundColor: "#cb9921", fontFamily: "'Open Sans', sans-serif" }}
            >
              🥐 Produção diária, qualidade garantida
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] mb-4 sm:mb-6 font-bold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Convênio de<br />
              Padaria para<br />
              <span style={{ color: "#cb9921" }}>Empresas</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Café da manhã, salgados e lanches frescos entregues direto na sua empresa — sem complicação, com muito sabor.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
            >
              <button
                onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-base shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
              >
                <img src={waIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
                Falar no WhatsApp
              </button>
              <Link href="/convenio">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#560000] text-base font-bold shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Como funciona? <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            {/* Stats — updated, realistic */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } }}
              className="flex gap-0 border-t border-white/15 pt-4 sm:pt-6"
            >
              {[
                { n: "60+", label: "Convênios ativos", icon: "🏢" },
                { n: "Desde 2021", label: "No mercado", icon: "📅" },
                { n: "4.9 ★", label: "Avaliação no Google", icon: "⭐" },
              ].map((s, i) => (
                <div key={i} className={`flex-1 ${i > 0 ? "border-l border-white/15 pl-5 ml-5" : ""}`}>
                  <div className="text-base sm:text-xl md:text-2xl font-bold leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>{s.n}</div>
                  <div className="text-[10px] sm:text-xs text-white/55 mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT — Full-bleed carousel */}
        <div className="w-full md:w-[48%] relative min-h-[280px] sm:min-h-[380px] md:min-h-full overflow-hidden bg-black">
          <HeroCarousel />
        </div>
      </section>
      {/* ── ANIMATED CARTOON: COMO FUNCIONA ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#560000] mb-4"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Do Contato à Entrega
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Veja como é fácil ter um convênio de padaria na sua empresa. Do primeiro contato até o pão na mesa — tudo simples!
            </motion.p>
          </div>

          {/* Vertical timeline */}
          {/* ── MOBILE / TABLET: carousel ── */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileStep}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative rounded-3xl p-7 shadow-2xl overflow-hidden mx-auto max-w-sm"
                  style={{ background: cartoonSteps[mobileStep].cardBg }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ x: ["-110%", "110%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)" }}
                  />
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg shrink-0"
                      style={{ backgroundColor: cartoonSteps[mobileStep].badgeBg, color: cartoonSteps[mobileStep].badgeText, border: "2px solid rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif" }}>
                      {cartoonSteps[mobileStep].step}
                    </div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-5xl select-none"
                    >{cartoonSteps[mobileStep].emoji}</motion.div>
                  </div>
                  <div className="text-xs font-black mb-1" style={{ color: cartoonSteps[mobileStep].detailColor, fontFamily: "'Open Sans', sans-serif" }}>
                    Passo {cartoonSteps[mobileStep].step}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: cartoonSteps[mobileStep].titleColor, fontFamily: "'Open Sans', sans-serif" }}>
                    {cartoonSteps[mobileStep].title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#ffffff", fontFamily: "'Poppins', sans-serif" }}>
                    {cartoonSteps[mobileStep].desc}
                  </p>
                  <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: cartoonSteps[mobileStep].detailBg, color: cartoonSteps[mobileStep].detailColor, fontFamily: "'Poppins', sans-serif" }}>
                    {cartoonSteps[mobileStep].detail}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next buttons */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setMobileStep((p) => Math.max(0, p - 1))}
                  disabled={mobileStep === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all disabled:opacity-30"
                  style={{ backgroundColor: "#560000", color: "#cb9921" }}
                >‹</button>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  {cartoonSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setMobileStep(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === mobileStep ? 28 : 10,
                        height: 10,
                        backgroundColor: i === mobileStep ? "#cb9921" : "rgba(86,0,0,0.2)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setMobileStep((p) => Math.min(cartoonSteps.length - 1, p + 1))}
                  disabled={mobileStep === cartoonSteps.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all disabled:opacity-30"
                  style={{ backgroundColor: "#560000", color: "#cb9921" }}
                >›</button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: vertical timeline ── */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            {/* Center vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full"
              style={{ background: "linear-gradient(to bottom, #560000, #cb9921, #7a2a00, #a07a18, #3d0000)" }} />

            {/* Traveling dot on the line */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 shadow-lg"
              style={{ backgroundColor: "#cb9921", boxShadow: "0 0 12px rgba(203,153,33,0.8)" }}
            />

            <div className="flex flex-col gap-12">
              {cartoonSteps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex items-center">
                    {/* Left side */}
                    <div className={`w-[calc(50%-36px)] ${isLeft ? "flex justify-end" : ""}`}>
                      {isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: -60 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1, type: "spring", bounce: 0.35 }}
                          whileHover={{ scale: 1.03, y: -6 }}
                          className="relative rounded-3xl p-7 shadow-2xl overflow-hidden cursor-default w-full max-w-sm"
                          style={{ background: step.cardBg }}
                        >
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ x: ["-110%", "110%"] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: idx * 1 + 2, ease: "easeInOut" }}
                            style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)" }}
                          />
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                              className="text-5xl select-none"
                            >{step.emoji}</motion.div>
                            <div>
                              <div className="text-xs font-black mb-0.5" style={{ color: step.detailColor, fontFamily: "'Open Sans', sans-serif" }}>
                                Passo {step.step}
                              </div>
                              <h3 className="text-lg font-bold leading-tight" style={{ color: step.titleColor, fontFamily: "'Open Sans', sans-serif" }}>
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed mb-4" style={{ color: step.descColor, fontFamily: "'Poppins', sans-serif" }}>
                            {step.desc}
                          </p>
                          <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: step.detailBg, color: step.detailColor, fontFamily: "'Poppins', sans-serif" }}>
                            {step.detail}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    {/* Center node */}
                    <div className="relative z-20 flex items-center justify-center shrink-0 mx-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg shadow-xl"
                        style={{ backgroundColor: step.badgeBg, color: step.badgeText, fontFamily: "'Open Sans', sans-serif", border: "3px solid white" }}>
                        {step.step}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: idx * 0.3 }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: step.badgeBg }}
                      />
                    </div>
                    {/* Right side */}
                    <div className={`w-[calc(50%-36px)] ${!isLeft ? "flex justify-start" : ""}`}>
                      {!isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: 60 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1, type: "spring", bounce: 0.35 }}
                          whileHover={{ scale: 1.03, y: -6 }}
                          className="relative rounded-3xl p-7 shadow-2xl overflow-hidden cursor-default w-full max-w-sm"
                          style={{ background: step.cardBg }}
                        >
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ x: ["-110%", "110%"] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: idx * 1 + 2, ease: "easeInOut" }}
                            style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)" }}
                          />
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                              className="text-5xl select-none"
                            >{step.emoji}</motion.div>
                            <div>
                              <div className="text-xs font-black mb-0.5" style={{ color: step.detailColor, fontFamily: "'Open Sans', sans-serif" }}>
                                Passo {step.step}
                              </div>
                              <h3 className="text-lg font-bold leading-tight" style={{ color: step.titleColor, fontFamily: "'Open Sans', sans-serif" }}>
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed mb-4 text-[#ffffff]" style={{ color: step.descColor, fontFamily: "'Poppins', sans-serif" }}>
                            {step.desc}
                          </p>
                          <div className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: step.detailBg, color: step.detailColor, fontFamily: "'Poppins', sans-serif" }}>
                            {step.detail}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/convenio">
              <Button
                variant="outline"
                className="rounded-full border-[#560000] text-[#560000] hover:bg-[#560000] hover:text-white px-8 font-bold gap-2"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Ver mais detalhes do convênio <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* ── PRODUCTS TEASER ── */}
      <section className="py-24 bg-[#FFF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span
                className="inline-block text-[#cb9921] text-sm font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Produção Diária
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#560000]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Nossas Delícias
              </h2>
              <p className="text-gray-500 mt-3 max-w-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Produzimos diariamente com ingredientes selecionados para deixar sua equipe bem alimentada.
              </p>
            </div>
            <Link href="/produtos">
              <Button
                className="rounded-full font-bold px-6 gap-2 shadow-lg"
                style={{ backgroundColor: "#cb9921", color: "white", fontFamily: "'Open Sans', sans-serif" }}
              >
                Ver cardápio completo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { img: "prod-bread.png", title: "Pães", emoji: "🍞" },
              { img: "prod-savory.png", title: "Salgados", emoji: "🥐" },
              { img: "prod-coffee.png", title: "Cafés", emoji: "☕" },
              { img: "prod-sweets.png", title: "Doces", emoji: "🎂" },
              { img: "prod-sandwich.png", title: "Lanches", emoji: "🥪" },
            ].map((prod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-md"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/${prod.img}`}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="text-2xl mb-1">{prod.emoji}</div>
                  <h3 className="text-white text-xl font-bold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {prod.title}
                  </h3>
                  <div className="w-6 h-1 bg-[#cb9921] mt-1.5 group-hover:w-14 transition-all duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── TESTIMONIALS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0000 0%, #2d0000 60%, #0f0000 100%)" }}>
        {/* decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #cb9921 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #560000 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-1.5 rounded-full text-sm font-bold mb-4 border border-[#cb9921]/40 text-[#cb9921]"
              style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: "rgba(203,153,33,0.1)" }}
            >
              ⭐ Avaliações reais
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              O que nossos parceiros dizem
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 mt-3 text-base"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Mais de 100 empresas já simplificaram o café da manhã com a gente.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative rounded-3xl p-8 overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(203,153,33,0.08) 0%, transparent 60%)" }} />

                {/* Big decorative quote */}
                <div
                  className="absolute top-4 right-6 text-9xl font-serif leading-none select-none"
                  style={{ color: "#cb9921", opacity: 0.15, fontFamily: "Georgia, serif" }}
                >"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-5 relative z-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#cb9921] text-[#cb9921]" />
                  ))}
                </div>

                {/* Quote text */}
                <p
                  className="text-white/80 text-base leading-relaxed mb-7 relative z-10"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #cb9921, #e8b832)",
                      color: "#1a0000",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {t.company}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {t.author}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-xs text-[#cb9921]/70 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Parceiro ativo
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── FAQ ── */}
      <section className="py-24 relative overflow-hidden bg-[#FFF8F3]">
        {/* Subtle decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #560000 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #cb9921 0%, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header split */}
          <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
            <div className="md:w-1/3 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-[#560000]/20 text-[#560000]"
                  style={{ backgroundColor: "rgba(86,0,0,0.07)", fontFamily: "'Open Sans', sans-serif" }}
                >
                  💬 FAQ
                </div>
                <h2
                  className="font-bold mb-4 text-[50px]"
                  style={{ fontFamily: "'Open Sans', sans-serif", color: "#1a0000", lineHeight: "1.1" }}
                >
                  Dúvidas<br />
                  <span style={{ color: "#560000" }}>frequentes</span>
                </h2>
                <p className="text-gray-400 text-[17px] font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Tudo que você precisa saber antes de fechar o convênio.
                </p>
              </motion.div>
            </div>

            <div className="md:w-2/3 space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  index={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  toggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-4 pt-8 border-t border-[#560000]/10">
            <p className="text-gray-400 text-sm mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Não encontrou a resposta? Fale direto com a gente!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1fb855] text-white font-bold px-8 py-3 text-base"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
            >
              <img src={waIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
              Enviar pergunta no WhatsApp
            </motion.button>
          </div>
        </div>
      </section>
      {/* ── MAPA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#FFF8F3] px-5 py-2 rounded-full border border-[#560000]/20 mb-4"
            >
              <MapPin className="w-4 h-4 text-[#560000]" />
              <span className="text-[#560000] font-bold text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Onde Estamos
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[#560000]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Venha nos Conhecer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 mt-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Ou deixe que a gente vai até você — fazemos entregas na sua empresa!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                title="Localização Pão do Antunes"
                src="https://maps.google.com/maps?q=Pão+do+Antunes&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-5">
              {[
                { icon: "📍", title: "Endereço", content: "Pão do Antunes\nBelo Horizonte - MG" },
                { icon: "⏰", title: "Horário de Funcionamento", content: "Segunda a Sábado: 6h às 19:30\nDomingo: Fechado" },
                { icon: "📱", title: "WhatsApp", content: "(31) 99738-3530" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FFF8F3] rounded-2xl p-5 border border-[#cb9921]/20"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-[#560000] text-sm mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm whitespace-pre-line" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── CTA BANNER ── */}
      <section className="py-20 relative overflow-hidden bg-[#560000] text-center px-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#cb9921] via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="mb-5 text-[40px]">🥐☕🍞</div>
          <h2 className="md:text-5xl font-bold text-white mb-5 text-center text-[50px] ml-[10px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Pronto para transformar<br />as manhãs da sua equipe?
          </h2>
          <p className="text-white/75 text-left text-[20px] mb-[40px] mr-[40px] ml-[100px]" style={{ fontFamily: "'Poppins', sans-serif" }}>Fale com nossa equipe hoje mesmo. Sem compromisso</p>
          <Button
            size="lg"
            className="rounded-full px-10 text-lg font-bold shadow-xl gap-2 bg-[#25d366] hover:bg-[#1fb855] text-white"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
          >
            <img src={waIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
            Solicitar Proposta no WhatsApp
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
