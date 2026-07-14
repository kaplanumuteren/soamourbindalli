import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActions({ contactSettings }) {
  const phoneFormatted = contactSettings?.phone
    ? contactSettings.phone.replace(/\s+/g, "")
    : "+905000000000";

  return (
    <>
      {/* Phone Call Floating Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href={`tel:${phoneFormatted}`}
          className="group relative flex items-center justify-center w-14 h-14 bg-brand-burgundy text-brand-gold rounded-full shadow-xl border border-brand-gold/30 hover:bg-brand-burgundy-light hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Telefonla Ara"
        >
          <Phone size={24} className="animate-pulse" />
          {/* Tooltip */}
          <span className="absolute left-16 bg-[#160B0E] text-brand-ivory text-xs font-sans tracking-wide px-3 py-1.5 rounded-lg border border-brand-gold/20 shadow-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Hemen Arayın
          </span>
          {/* Outer Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full border border-brand-burgundy/40 animate-ping opacity-75 -z-10" />
        </a>
      </div>

      {/* WhatsApp Floating Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${contactSettings?.whatsapp || "905000000000"}?text=Merhaba,%20kına%20ve%20bindallı%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="WhatsApp Destek"
        >
          <MessageCircle size={26} className="fill-current" />
          {/* Tooltip */}
          <span className="absolute right-16 bg-[#160B0E] text-brand-ivory text-xs font-sans tracking-wide px-3 py-1.5 rounded-lg border border-brand-gold/20 shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            WhatsApp Destek
          </span>
          {/* Outer Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full border border-[#25D366]/40 animate-ping opacity-75 -z-10" />
        </a>
      </div>
    </>
  );
}
