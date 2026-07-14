import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero({ homeSettings }) {
  return (
    <div className="relative h-[100dvh] flex items-center justify-center bg-[#160B0E] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65 md:opacity-80 scale-105 transform transition-transform duration-10000"
        style={{
          backgroundImage: `url('${homeSettings?.heroBgImage || "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1920&q=80"}')`
        }}
      />
      {/* Royal Color Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E] via-transparent to-[#160B0E]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#160B0E]/90 via-[#160B0E]/50 to-transparent" />

      {/* Decorative Gold Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-burgundy/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-left z-10 w-full">
        <div className="max-w-3xl">

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-ivory leading-tight mb-6 animate-fade-in-up">
            {homeSettings?.heroTitle || "En Özel Gününüzde Saray İhtişamı"}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-brand-ivory/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {homeSettings?.heroSubtitle || "Hayalinizdeki kına gecesi için en seçkin Bindallı modelleri kiralık ve satılık seçenekleriyle So Amour'da."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#koleksiyon"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20 hover:scale-105 transition-all text-base tracking-wider w-full sm:w-auto"
            >
              Koleksiyonu Keşfet
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a 
        href="#koleksiyon" 
        className="absolute bottom-20 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-brand-gold text-brand-ivory transition-all cursor-pointer animate-bounce"
      >
        <ChevronDown size={28} className="text-brand-gold" />
      </a>
    </div>
  );
}
