import { Check, Star, MessageSquare } from "lucide-react";

export default function PackageCard({ pkg }) {
  const { name, price, popular, description, features } = pkg;

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] ${
        popular
          ? "bg-gradient-to-b from-brand-burgundy/60 to-[#160B0E]/80 border-2 border-brand-gold shadow-xl shadow-brand-gold/5"
          : "bg-[#160B0E]/30 border border-brand-gold/10 hover:border-brand-gold/30 shadow-md"
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-brand-gold text-[#160B0E] font-sans font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Star size={12} className="fill-current" />
          En Çok Tercih Edilen
        </div>
      )}

      {/* Package Name */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-brand-ivory mb-2">{name}</h3>
        <p className="font-sans text-sm text-brand-ivory/60 min-h-[40px]">{description}</p>
      </div>

      {/* Pricing */}
      <div className="mb-8 border-b border-brand-gold/10 pb-6">
        <span className="text-[10px] font-sans uppercase tracking-widest text-brand-gold">Başlayan Fiyatlarla</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-serif text-4xl font-extrabold text-brand-ivory">
            {price.toLocaleString("tr-TR")}
          </span>
          <span className="font-sans text-xl font-semibold text-brand-gold">₺</span>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 mt-1 p-0.5 rounded-full bg-brand-gold/10 text-brand-gold">
              <Check size={14} className="stroke-[3]" />
            </span>
            <span className="font-sans text-sm text-brand-ivory/80 leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={`https://wa.me/905000000000?text=Merhaba,%20"${name}"%20organizasyon%20paketiniz%20hakkında%20görüşmek%20istiyorum.`}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-center gap-2 font-sans font-bold py-3.5 px-6 rounded-xl transition-all tracking-wider text-sm ${
          popular
            ? "bg-brand-gold hover:bg-brand-gold-light text-[#160B0E] shadow-md shadow-brand-gold/10"
            : "bg-transparent hover:bg-brand-gold/10 border border-brand-gold text-brand-gold"
        }`}
      >
        <MessageSquare size={16} />
        Teklif Al & Detayları Konuş
      </a>
    </div>
  );
}
