import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#160B0E] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transform transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1920&q=80')`
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
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up">
            <Sparkles size={14} />
            Sarayların Büyüleyici Güzelliği
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-ivory leading-tight mb-6 animate-fade-in-up">
            En Özel Gününüzde <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold">
              Saray İhtişamı
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-brand-ivory/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Hayalinizdeki kına gecesi için en seçkin Kaftan & Bindallı modelleri ve büyüleyici kına elbiseleri So Amour'da.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#koleksiyon"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20 hover:scale-105 transition-all text-base tracking-wider"
            >
              Koleksiyonu Keşfet
              <ArrowRight size={18} />
            </a>
            <a
              href="#iletisim"
              className="flex items-center justify-center gap-2 border border-brand-ivory/30 hover:border-brand-gold bg-[#160B0E]/40 hover:bg-[#160B0E]/80 text-brand-ivory hover:text-brand-gold font-sans font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all text-base tracking-wider"
            >
              Rezervasyon Yap
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-brand-ivory/60 text-xs font-sans uppercase tracking-[0.2em]">Aşağı Kaydır</span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-brand-gold to-transparent animate-bounce" />
      </div>
    </div>
  );
}
