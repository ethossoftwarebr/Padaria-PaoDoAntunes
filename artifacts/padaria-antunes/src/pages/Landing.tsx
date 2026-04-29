import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, CalendarCheck, Clock, CheckCircle2,
  FileText, Coffee, Star, MapPin, Mail, Instagram, ChevronRight, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

import logoImage from "@assets/PAO_DO_ANTUNES_BRANCO_1773366134527.png";

import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL = "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

const handleWhatsAppClick = () => {
  trackWhatsAppConversion(WHATSAPP_URL);
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

function useScrolledNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return isScrolled;
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      el.style.transform = `translateY(${scrolled * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return { count, ref };
}

export default function Landing() {
  const isScrolled = useScrolledNav();
  const parallaxRef = useParallax();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: partnersCount, ref: partnersRef } = useCountUp(100);

  return (
    <div className="w-full bg-background min-h-screen font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#560000]/96 backdrop-blur-md shadow-xl shadow-black/30 py-3' : 'bg-gradient-to-b from-black/50 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src={logoImage} alt="Pão do Antunes Logo" className="h-10 sm:h-12 w-auto object-contain" />
          <div className="flex items-center gap-3">
            <Button
              variant="whatsapp"
              size="sm"
              className="hidden sm:flex rounded-full px-6 font-semibold tracking-wide gap-2"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4" />
              Falar sobre convênio
            </Button>
            <button
              className="sm:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 mb-1.5 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 mb-1.5 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden bg-[#560000]/98 border-t border-white/10 px-4 py-4"
            >
              <Button variant="whatsapp" className="w-full gap-2" onClick={() => { handleWhatsAppClick(); setMobileMenuOpen(false); }}>
                <MessageCircle className="w-4 h-4" />
                Falar sobre convênio
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0505]">
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0505] via-[#0a0505]/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-transparent to-transparent z-10" />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Padaria Pão do Antunes"
            className="w-full h-full object-cover opacity-70"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-5 px-4 py-1.5 rounded-full bg-[#cb9921]/20 border border-[#cb9921]/40 text-[#cb9921] font-medium text-sm tracking-wide">
              Especialistas em Atendimento Corporativo
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-white">
              Convênio de Padaria<br />para{" "}
              <span className="gold-gradient">Empresas</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
              Praticidade, qualidade e entregas para sua equipe. Fornecemos produtos frescos, desde cafés da manhã e lanches até grandes pedidos para reuniões e confraternizações.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick} className="gap-2 text-base font-semibold shadow-2xl">
                <MessageCircle className="w-5 h-5" />
                Falar sobre convênio
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base border-white/20 text-white hover:bg-white/10 backdrop-blur-sm" onClick={() => {
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Como funciona
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { value: "100+", label: "Empresas Parceiras" },
                { value: "Diárias", label: "Entregas Rápidas" },
                { value: "5⭐", label: "Avaliações" },
                { value: "1990", label: "Tradição desde" },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 bg-[#0f0808] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#cb9921] text-sm font-semibold tracking-widest uppercase mb-3 block">Simples e prático</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Como Funciona o Convênio</h2>
            <div className="w-20 h-1 bg-[#cb9921] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#cb9921]/30 to-transparent z-0"></div>

            {[
              { step: "01", title: "Faça o Convênio", desc: "Entre em contato e formalize a parceria com a padaria de forma rápida e simples." },
              { step: "02", title: "Peça Durante o Mês", desc: "Solicite produtos conforme a necessidade da sua empresa, quando quiser." },
              { step: "03", title: "Receba ou Retire", desc: "Entrega direto na empresa ou retire na padaria. Você escolhe o que for mais conveniente." },
              { step: "04", title: "Pague no Final do Mês", desc: "Um único pagamento mensal referente ao total consumido. Sem complicações." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#cb9921] flex items-center justify-center text-xl font-display font-bold text-[#cb9921] mb-6 bg-[#0f0808] shadow-lg shadow-[#cb9921]/10 group-hover:bg-[#cb9921] group-hover:text-black transition-all duration-400 group-hover:scale-110">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#cb9921] text-sm font-semibold tracking-widest uppercase mb-3 block">Vantagens exclusivas</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Por que empresas escolhem<br />o Pão do Antunes?</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Pensamos em cada detalhe para facilitar o dia a dia do seu negócio.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Facilidade para Empresas", desc: "Sem precisar pagar a cada pedido, reduzindo a burocracia diária da equipe." },
              { icon: Clock, title: "Entregas Recorrentes", desc: "Pontualidade e consistência nas entregas para que sua equipe não espere." },
              { icon: Coffee, title: "Produtos Frescos", desc: "Saídos do forno todo dia, garantindo o melhor sabor e qualidade sempre." },
              { icon: FileText, title: "Controle Mensal", desc: "Relatório detalhado do consumo mensal para sua gestão financeira com transparência." },
              { icon: CalendarCheck, title: "Pagamento Mensal", desc: "Um único pagamento no fechamento do mês, facilitando o fluxo de caixa." },
              { icon: CheckCircle2, title: "Praticidade Total", desc: "Ideal para escritórios, equipes operacionais e eventos corporativos." }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
                className="bg-[#141414] p-8 rounded-2xl border border-white/5 hover:border-[#cb9921]/30 hover:shadow-xl hover:shadow-[#cb9921]/5 transition-all duration-400 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#560000]/30 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-[#cb9921]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTER STATS BANNER */}
      <section className="py-16 bg-[#560000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#cb9921] via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" ref={partnersRef}>
            {[
              { value: `${partnersCount}+`, label: "Empresas Parceiras" },
              { value: "100%", label: "Frescos do Forno" },
              { value: "5⭐", label: "Avaliação Média" },
              { value: "+30 anos", label: "De Experiência" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GALLERY */}
      <section className="py-24 bg-[#080505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <span className="text-[#cb9921] text-sm font-semibold tracking-widest uppercase mb-3 block">Nossa produção</span>
              <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Produtos Frescos <br /><span className="text-[#cb9921] italic">Todos os Dias</span></h2>
              <div className="w-20 h-1 bg-[#560000] rounded-full"></div>
            </div>
            <Button variant="outline" onClick={handleWhatsAppClick} className="shrink-0 border-[#cb9921]/40 text-[#cb9921] hover:bg-[#cb9921] hover:text-black hover:border-[#cb9921] transition-all">
              Solicitar Cardápio Completo
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: '280px' }}>
            {[
              { img: "prod-bread.png", title: "Pães Artesanais", cls: "md:col-span-2 md:row-span-2", style: { gridRow: "span 2" } },
              { img: "prod-savory.png", title: "Salgados Variados", cls: "", style: {} },
              { img: "prod-coffee.png", title: "Cafés e Bebidas", cls: "", style: {} },
              { img: "prod-sweets.png", title: "Doces e Bolos", cls: "", style: {} },
              { img: "prod-sandwich.png", title: "Lanches Especiais", cls: "md:col-span-2", style: {} }
            ].map((prod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.7 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${prod.cls}`}
                style={prod.style}
                onClick={handleWhatsAppClick}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/${prod.img}`}
                  alt={prod.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white">{prod.title}</h3>
                  <div className="w-0 h-0.5 bg-[#cb9921] group-hover:w-12 transition-all duration-400 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#560000]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#cb9921]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#cb9921] text-sm font-semibold tracking-widest uppercase mb-3 block">Depoimentos</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-4">O que dizem nossas empresas parceiras</h2>
            <p className="text-white/50">A satisfação de quem confia no Pão do Antunes todos os dias.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: "A padaria sempre entrega com pontualidade e os produtos chegam frescos. Nosso time pede café da manhã com frequência e a qualidade é sempre excelente.", author: "Equipe administrativa", company: "Itaú", initial: "I" },
              { text: "O convênio facilitou muito o dia a dia do escritório. Podemos pedir durante o mês sem preocupação e o atendimento é sempre muito rápido.", author: "Equipe corporativa", company: "Santander", initial: "S" },
              { text: "Ótimo atendimento e muita organização nas entregas. Os produtos são muito elogiados pela equipe, principalmente os pães e salgados.", author: "Setor operacional", company: "Ferroeste", initial: "F" },
              { text: "Sempre que temos reuniões ou eventos na empresa, pedimos com eles. A qualidade e a apresentação dos produtos fazem toda diferença.", author: "Equipe administrativa", company: "Uluru", initial: "U" }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-[#cb9921]/20 transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-5 h-5 fill-[#cb9921] text-[#cb9921]" />
                    ))}
                  </div>
                  <p className="text-lg italic text-white/65 leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#560000]/50 flex items-center justify-center font-bold text-[#cb9921] border border-[#cb9921]/20 text-lg">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.company}</div>
                    <div className="text-sm text-white/40">{testimonial.author}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative bg-[#560000] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#cb9921]/15 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#cb9921] text-sm font-semibold tracking-widest uppercase mb-4 block"
          >
            Vamos conversar?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight"
          >
            Ficou interessado ou quer entender melhor como funciona o convênio?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Fale conosco pelo WhatsApp e tire suas dúvidas. Nossa equipe terá prazer em explicar tudo e ajudar sua empresa a aproveitar essa facilidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick} className="h-16 px-10 text-xl shadow-2xl shadow-black/40 gap-3 font-semibold">
              <MessageCircle className="w-6 h-6" />
              Falar sobre convênio agora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060303] pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-5">
              <img src={logoImage} alt="Pão do Antunes Logo" className="h-14 w-auto object-contain mb-6 opacity-90" />
              <p className="text-white/40 text-base mb-6 max-w-sm leading-relaxed">
                Qualidade e praticidade para sua empresa. Pães frescos, salgados e doces entregues com pontualidade todo dia.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/paodoantunes" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#cb9921] hover:border-[#cb9921]/40 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:paodoantunes@gmail.com"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#cb9921] hover:border-[#cb9921]/40 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
                <button onClick={handleWhatsAppClick}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contato</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={handleWhatsAppClick} className="flex items-center text-white/40 hover:text-[#cb9921] transition-colors group gap-3 text-sm">
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    WhatsApp — Falar sobre convênio
                  </button>
                </li>
                <li>
                  <a href="mailto:paodoantunes@gmail.com" className="flex items-center text-white/40 hover:text-[#cb9921] transition-colors group gap-3 text-sm">
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    paodoantunes@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/paodoantunes" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/40 hover:text-[#cb9921] transition-colors group gap-3 text-sm">
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    @paodoantunes
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Venha nos visitar</h4>
              <div className="flex text-white/40 gap-3 text-sm leading-relaxed">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Venha nos visitar e conhecer nossa produção artesanal pessoalmente.</p>
              </div>
              <div className="mt-6">
                <Button variant="whatsapp" size="sm" onClick={handleWhatsAppClick} className="gap-2 text-sm rounded-full px-5">
                  <MessageCircle className="w-4 h-4" />
                  Falar agora
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
            <p>&copy; {new Date().getFullYear()} Pão do Antunes. Todos os direitos reservados.</p>
            <p>Feito para empresas que valorizam qualidade.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.button
        onClick={handleWhatsAppClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 focus:outline-none group"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute inset-0 w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30"></span>
        <MessageCircle className="w-8 h-8 relative z-10" />
        <span className="absolute right-full mr-3 whitespace-nowrap bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Falar no WhatsApp
        </span>
      </motion.button>
    </div>
  );
}
