import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import logo from "@assets/ChatGPT_Image_12_de_mar._de_2026,_23_54_08_(1)_1773370616306.png";
import waIcon from "@assets/whatsapp_(1)_1773369929854.png";
import { trackWhatsAppConversion } from "@/lib/gtag";

const WHATSAPP_URL =
  "https://wa.me/5531997383530?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20conv%C3%AAnio%20da%20padaria%20para%20empresas%2Fpessoas.%20Poderiam%20me%20explicar%20como%20funciona%20e%20quais%20s%C3%A3o%20as%20condi%C3%A7%C3%B5es%3F";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Início", path: "/" },
    { label: "Produtos", path: "/produtos" },
    { label: "Convênio", path: "/convenio" },
  ];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 border-b border-[#cb9921]/20"
      style={{ backgroundColor: "#1a0000", height: "80px" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">

        {/* LEFT — Logo */}
        <Link href="/">
          <img
            src={logo}
            alt="Pão do Antunes"
            className="w-auto object-contain cursor-pointer shrink-0"
            style={{ height: "100px", mixBlendMode: "screen" }}
          />
        </Link>

        {/* CENTER — Nav links (absolutely centered so logo/button widths don't affect centering) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-9">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                className="cursor-pointer tracking-wide transition-colors duration-200 text-white hover:text-[#cb9921] text-[16px] font-bold"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* RIGHT — CTA + mobile toggle */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 text-[17px]"
            style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
          >
            <img src={waIcon} alt="WhatsApp" className="w-4 h-4 object-contain" />
            Peça agora
          </button>
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-t border-[#cb9921]/20 py-4 px-5 flex flex-col gap-1 shadow-2xl"
          style={{ backgroundColor: "#1a0000" }}
        >
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <div
                className={`block py-3 px-4 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                  location === link.path
                    ? "bg-[#cb9921]/15 text-[#cb9921]"
                    : "text-white hover:text-[#cb9921] hover:bg-white/5"
                }`}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </div>
            </Link>
          ))}
          <button
            onClick={() => trackWhatsAppConversion(WHATSAPP_URL)}
            className="flex items-center justify-center gap-2 mt-3 w-full py-3 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: "#25d366", fontFamily: "'Open Sans', sans-serif" }}
          >
            <img src={waIcon} alt="WhatsApp" className="w-4 h-4 object-contain" />
            Peça agora no WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
}
