import { motion } from "framer-motion";
import { FileText, Smartphone, Truck, CreditCard, CheckCircle, ArrowRight, Star, Building2, Clock, Zap, Shield, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import waIcon from "@assets/whatsapp_(1)_1773369929854.png";
import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL = "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

const steps = [
  {
    icon: FileText,
    emoji: "🤝",
    step: "01",
    title: "Faça o Convênio",
    desc: "Entre em contato e formalize a parceria em minutos. Sem burocracia — definimos juntos o perfil de consumo ideal para a sua empresa.",
    color: "#560000",
    bg: "#FFF0F0",
    accent: "#cb9921",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    step: "02",
    title: "Peça Durante o Mês",
    desc: "Sua equipe faz pedidos diários pelo WhatsApp — café da manhã, lanches ou encomendas para reuniões. Simples e rápido.",
    color: "#a07a18",
    bg: "#FFFBF0",
    accent: "#cb9921",
  },
  {
    icon: Truck,
    emoji: "🚐",
    step: "03",
    title: "Receba ou Retire",
    desc: "Entregamos pontualmente direto na sua empresa, com produtos frescos e de qualidade. Ou retire na loja quando preferir.",
    color: "#3d0000",
    bg: "#FFF5F5",
    accent: "#cb9921",
  },
  {
    icon: CreditCard,
    emoji: "💳",
    step: "04",
    title: "Pague no Final do Mês",
    desc: "Um único boleto com relatório detalhado do consumo. Facilita seu fluxo de caixa e elimina o trabalho do financeiro.",
    color: "#4d3500",
    bg: "#FFFBF0",
    accent: "#cb9921",
  },
];

const benefits = [
  { icon: CreditCard, emoji: "💰", title: "Faturamento unificado", desc: "Um boleto no fim do mês com relatório completo. Chega de reembolsos diários.", color: "#560000" },
  { icon: Clock, emoji: "⏰", title: "Entrega pontual", desc: "Seu café da manhã na hora certa, todo dia — sem atrasos, sem surpresas.", color: "#560000" },
  { icon: Shield, emoji: "✅", title: "Sem burocracia", desc: "Processo simples, rápido e transparente. Do convênio ao primeiro pedido em horas.", color: "#7a2a00" },
  { icon: Star, emoji: "⭐", title: "Qualidade garantida", desc: "Produtos frescos, feitos todo dia com ingredientes selecionados.", color: "#a07a18" },
  { icon: Zap, emoji: "⚡", title: "Atendimento prioritário", desc: "Parceiros conveniados têm prioridade nos pedidos e no atendimento.", color: "#560000" },
  { icon: Gift, emoji: "🎁", title: "Flexível para eventos", desc: "Reuniões, confraternizações, comemorações — atendemos sob medida.", color: "#3d0000" },
];


export default function HowItWorks() {
  return (
    <div className="w-full bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-24 px-4" style={{ background: "linear-gradient(135deg, #2d0000 0%, #560000 55%, #6b0000 100%)" }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #cb9921 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #cb9921 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#cb9921]/40 text-[#cb9921] text-sm font-bold mb-8"
            style={{ backgroundColor: "rgba(203,153,33,0.12)", fontFamily: "'Open Sans', sans-serif" }}
          >
            🤝 Convênio Empresarial
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            O café da manhã da sua<br />
            <span style={{ color: "#cb9921" }}>equipe sem complicação</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Pão artesanal, salgados e lanches entregues diariamente na sua empresa.
            Pague tudo de uma vez no fim do mês — simples assim.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg shadow-xl"
            style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
          >
            <img src={waIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
            Quero fazer um convênio
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Animated floating emojis */}
        {["🍞", "☕", "🥐", "🍩", "🥪"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl select-none pointer-events-none"
            style={{
              top: `${15 + i * 18}%`,
              left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined,
              opacity: 0.25,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            {emoji}
          </motion.div>
        ))}
      </section>

      {/* ── STEPS ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#560000]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Como funciona?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 mt-4 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Do contato ao pão na mesa — em 4 passos simples.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-3xl p-8 border cursor-default overflow-hidden bg-white shadow-sm group"
                style={{ borderColor: "#f3f4f6" }}
              >
                {/* Step number watermark */}
                <div
                  className="absolute -right-4 -bottom-4 text-[120px] font-black leading-none select-none"
                  style={{ color: step.color, opacity: 0.06, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {step.step}
                </div>

                <div className="flex items-start gap-5 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, -6, 6, -3, 3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: i * 1.2 + 2 }}
                    className="text-5xl shrink-0 mt-1"
                  >
                    {step.emoji}
                  </motion.div>

                  <div>
                    <div
                      className="inline-block text-xs font-black px-3 py-1 rounded-full mb-3"
                      style={{ backgroundColor: step.color, color: "white", fontFamily: "'Open Sans', sans-serif" }}
                    >
                      PASSO {step.step}
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: step.color, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {step.desc}
                    </p>
                    <div
                      className="mt-4 h-1 rounded-full w-10 group-hover:w-full transition-all duration-500"
                      style={{ backgroundColor: step.color + "30" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-4" style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #fff 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#560000]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Por que fazer convênio?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 cursor-default group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: i * 0.5 + 1 }}
                  className="text-4xl mb-4"
                >
                  {b.emoji}
                </motion.div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: b.color, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {b.desc}
                </p>
                <div
                  className="mt-4 h-1 rounded-full w-10 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: b.color + "30" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEAL FOR ── */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1a0000 0%, #2d0000 60%, #0f0000 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Ideal para todo tipo de empresa
            </h2>
            <p className="text-white/50" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Do pequeno escritório à grande corporação.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🏢", label: "Escritórios" },
              { emoji: "🏭", label: "Fábricas" },
              { emoji: "🏥", label: "Clínicas" },
              { emoji: "🏫", label: "Escolas" },
              { emoji: "💼", label: "Coworkings" },
              { emoji: "🛒", label: "Comércios" },
              { emoji: "🏗️", label: "Construtoras" },
              { emoji: "🏦", label: "Financeiras" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex flex-col items-center gap-3 rounded-2xl p-5 cursor-default"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-white/80 text-sm font-semibold text-center" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-[#FFF8F3] text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">🥐☕🍞</div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#560000] mb-5"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Pronto para simplificar<br />o café da manhã da sua equipe?
            </h2>
            <p className="text-gray-500 text-lg mb-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Fale com a gente agora. Sem compromisso — vamos explicar tudo e montar o plano ideal para você.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-lg shadow-xl"
              style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
            >
              <img src={waIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
              Fazer convênio agora
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
