import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, name, category, type, priceRental, priceSale, image } = product;

  // Format category name for Turkish user-facing UI
  const formatCategory = (cat) => {
    switch (cat) {
      case "kaftan":
        return "Kaftan & Bindallı";
      case "dress":
        return "Kına Elbisesi";
      case "accessory":
        return "Aksesuar";
      default:
        return cat;
    }
  };

  return (
    <div className="group relative bg-[#160B0E]/30 rounded-3xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 flex flex-col h-full shadow-md hover:shadow-brand-gold/5">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#160B0E]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#160B0E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/urun/${id}`}
            className="p-3 bg-brand-gold text-[#160B0E] rounded-full hover:bg-brand-gold-light hover:scale-110 transition-all shadow-lg cursor-pointer"
            title="Detayları Gör"
          >
            <Eye size={20} />
          </Link>
          <a
            href={`https://wa.me/905000000000?text=Merhaba,%20"${name}"%20modeliniz%20hakkında%20detaylı%20bilgi%20ve%20fiyat%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-brand-burgundy text-brand-ivory border border-brand-gold/30 rounded-full hover:bg-brand-burgundy-light hover:scale-110 transition-all shadow-lg cursor-pointer"
            title="WhatsApp ile Sor"
          >
            <ShoppingBag size={20} />
          </a>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {type === "rental" && (
            <span className="bg-brand-burgundy text-brand-ivory text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-gold/20 shadow-md">
              Sadece Kiralık
            </span>
          )}
          {type === "sale" && (
            <span className="bg-brand-gold text-[#160B0E] text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
              Sadece Satılık
            </span>
          )}
          {type === "rental-sale" && (
            <span className="bg-gradient-to-r from-brand-burgundy to-brand-gold text-brand-ivory text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-gold/10 shadow-md">
              Kiralık & Satılık
            </span>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-sans uppercase tracking-[0.2em] text-brand-gold/80 mb-2">
          {formatCategory(category)}
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-brand-ivory hover:text-brand-gold transition-colors duration-300 mb-3 line-clamp-1">
          <Link to={`/urun/${id}`}>{name}</Link>
        </h3>

        {/* Pricing */}
        <div className="mt-auto pt-4 border-t border-brand-gold/10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {priceRental && (
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-wider text-brand-ivory/40">Kiralık</span>
              <span className="font-sans text-brand-gold font-bold text-lg">
                {priceRental.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          )}
          {priceSale && (
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-wider text-brand-ivory/40">Satılık</span>
              <span className="font-sans text-brand-ivory font-bold text-lg">
                {priceSale.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
