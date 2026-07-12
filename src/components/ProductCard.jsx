import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, name, category, type, image } = product;

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
    <Link
      to={`/urun/${id}`}
      className="group relative bg-[#160B0E]/30 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 flex flex-col h-full shadow-md hover:shadow-brand-gold/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#160B0E]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Overlay on hover (Desktop only) */}
        <div className="absolute inset-0 bg-[#160B0E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
          <span className="p-3 bg-brand-gold text-[#160B0E] rounded-full hover:bg-brand-gold-light hover:scale-110 transition-all shadow-lg">
            <Eye size={20} />
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1">
          {type === "rental" && (
            <span className="bg-brand-burgundy text-brand-ivory text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-brand-gold/20 shadow-md">
              Kiralık
            </span>
          )}
          {type === "sale" && (
            <span className="bg-brand-gold text-[#160B0E] text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md">
              Satılık
            </span>
          )}
          {type === "rental-sale" && (
            <span className="bg-gradient-to-r from-brand-burgundy to-brand-gold text-brand-ivory text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-brand-gold/10 shadow-md">
              Kiralık & Satılık
            </span>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3 sm:p-6 flex flex-col flex-grow text-left">
        <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.2em] text-brand-gold/80 mb-1">
          {formatCategory(category)}
        </span>
        <h3 className="font-serif text-sm sm:text-lg font-semibold text-brand-ivory group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
          {name}
        </h3>
      </div>
    </Link>
  );
}
