import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

export default function Collection({ products }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state with URL parameter
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && ["all", "rental", "sale"].includes(filterParam)) {
      setFilter(filterParam);
    } else {
      setFilter("all");
    }
  }, [searchParams]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter & Search products
  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "rental" && (product.type === "rental" || product.type === "rental-sale")) ||
      (filter === "sale" && (product.type === "sale" || product.type === "rental-sale"));
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-[#160B0E] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            SO AMOUR KOLEKSİYONU
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-ivory mt-2">
            Koleksiyonumuz
          </h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-sm mt-4">
            Hayalinizdeki kına gecesi için kiralık ve satılık özel tasarım lüks bindallılarımız.
          </p>
        </div>

        {/* Controls Row (Filters + Search) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-brand-gold/10 pb-8">
          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: "all", name: "Tümü" },
              { id: "rental", name: "Kiralık" },
              { id: "sale", name: "Satılık" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSearchParams({ filter: btn.id })}
                className={`font-sans font-medium text-xs tracking-wider px-5 py-3 rounded-full transition-all cursor-pointer border ${
                  filter === btn.id
                    ? "bg-brand-gold text-[#160B0E] border-brand-gold shadow-md shadow-brand-gold/10"
                    : "bg-[#160B0E]/30 text-brand-ivory border-brand-gold/20 hover:border-brand-gold/50"
                }`}
              >
                {btn.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Ürün veya model ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 pl-10 pr-4 text-brand-ivory font-sans focus:outline-none transition-all placeholder-brand-ivory/30 text-sm"
            />
            <Search size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-brand-gold/60" />
          </div>
        </div>

        {/* Grid Area */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-brand-gold/10 rounded-3xl">
            <p className="font-sans text-brand-ivory/50 text-base">Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
