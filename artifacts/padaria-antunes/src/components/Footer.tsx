import { Instagram, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import waIcon from "@assets/whatsapp_(1)_1773369929854.png";
import { Link } from "wouter";
import logo from "@assets/ChatGPT_Image_12_de_mar._de_2026,_23_54_08_(1)_1773370616306.png";
import ethosLogo from "@assets/Captura_de_tela_2026-02-26_010155-removebg-preview_-_Copia_(2)_1773374255518.png";
import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL =
  "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: "#0f0000" }}>
      {/* Gold top accent */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #cb9921, #e8b832, #cb9921, transparent)" }} />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-4">
            <img src={logo} alt="Pão do Antunes" className="w-auto object-contain mb-4" style={{ height: "110px", mixBlendMode: "screen" }} />
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tradição e qualidade todos os dias. Pão artesanal, salgados e muito mais para o seu time.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/paodoantunes"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: "#25d366" }}
              >
                <img src={waIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
              </button>
              <a
                href="mailto:paodoantunes@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#cb9921] transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-[#cb9921] font-bold text-sm uppercase tracking-widest mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Navegação
            </h4>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {[
                { label: "Início", path: "/" },
                { label: "Nossos Produtos", path: "/produtos" },
                { label: "Convênio Empresarial", path: "/convenio" },
              ].map((l) => (
                <li key={l.path}>
                  <Link href={l.path}>
                    <div className="text-white/60 hover:text-[#cb9921] cursor-pointer transition-colors">
                      {l.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <h4 className="text-[#cb9921] font-bold text-sm uppercase tracking-widest mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Horários
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {[
                { dia: "Segunda a Sábado", hora: "6h às 19:30" },
                { dia: "Domingo", hora: "Fechado" },
              ].map((h) => (
                <li key={h.dia} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#cb9921] shrink-0" />
                  <span>
                    <span className="text-white/80">{h.dia}</span>
                    <span className="text-white/40 mx-2">·</span>
                    <span className="text-white/60">{h.hora}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[#cb9921] font-bold text-sm uppercase tracking-widest mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Contato
            </h4>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#cb9921] shrink-0 mt-0.5" />
                <span className="text-white/60">Pão do Antunes<br />Belo Horizonte · MG</span>
              </li>
              <li>
                <button onClick={() => trackWhatsAppConversion(WHATSAPP_URL)} className="flex items-center gap-3 group">
                  <img src={waIcon} alt="WhatsApp" className="w-4 h-4 object-contain" />
                  <span className="text-white/60 group-hover:text-white transition-colors">(31) 99738-3530</span>
                </button>
              </li>
              <li>
                <a href="mailto:paodoantunes@gmail.com" className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-[#cb9921] shrink-0" />
                  <span className="text-white/60 group-hover:text-white transition-colors">paodoantunes@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/paodoantunes" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                  <Instagram className="w-4 h-4 text-[#cb9921] shrink-0" />
                  <span className="text-white/60 group-hover:text-white transition-colors">@paodoantunes</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70" style={{ fontFamily: "'Poppins', sans-serif" }}>
            © {new Date().getFullYear()} Pão do Antunes · Todos os direitos reservados
          </p>

          {/* Ethos credit */}
          <a
            href="https://ethosoftware.com.br/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 group transition-all duration-200 px-3 py-1.5 rounded-full hover:bg-white/10"
          >
            <span className="text-sm text-white/70 group-hover:text-white transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Desenvolvido por
            </span>
            <img
              src={ethosLogo}
              alt="Ethos Software"
              className="h-7 w-auto object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Ethos Software
            </span>
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-[#cb9921] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ArrowUp className="w-4 h-4" />
            Voltar ao topo
          </button>
        </div>
      </div>
    </footer>
  );
}
