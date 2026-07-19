import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Shield, Clock, Scissors, Award } from "lucide-react";

export default function ProductDetail({ products, contactSettings }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll to top when loading product detail
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 bg-[#160B0E] min-h-screen text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl font-bold text-brand-ivory">Ürün Bulunamadı</h2>
        <p className="font-sans text-brand-ivory/60 mt-4">Aradığınız model mevcut değil veya kaldırılmış olabilir.</p>
        <Link
          to="/koleksiyon"
          className="mt-8 inline-flex items-center gap-2 bg-brand-gold text-[#160B0E] font-sans font-bold px-6 py-3 rounded-xl transition-all"
        >
          <ArrowLeft size={16} />
          Koleksiyona Geri Dön
        </Link>
      </div>
    );
  }

  const { name, category, type, description, image, features } = product;

  // Parse images if stored as JSON string, fallback to single image
  let images = [];
  if (image) {
    if (typeof image === "string" && image.trim().startsWith("[")) {
      try {
        images = JSON.parse(image);
      } catch (e) {
        images = [image];
      }
    } else if (Array.isArray(image)) {
      images = image;
    } else {
      images = [image];
    }
  }
  if (images.length === 0) {
    images = ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"];
  }

  const formatCategory = (cat) => {
    switch (cat) {
      case "kaftan":
        return "Bindallı";
      case "dress":
        return "Kına Elbisesi";
      case "accessory":
        return "Aksesuar";
      default:
        return cat;
    }
  };

  const whatsappMessage = `Merhaba, web sitenizden "${name}" modelinizi gördüm. Bu ürünün ${
    type === "rental"
      ? "kiralama"
      : type === "sale"
      ? "satın alma"
      : "kiralama/satış"
  } koşulları hakkında detaylı bilgi ve randevu alabilir miyim?`;

  return (
    <div className="pt-28 pb-24 bg-[#160B0E] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Go Back */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/koleksiyon"
            className="inline-flex items-center gap-2 text-brand-ivory/60 hover:text-brand-gold font-sans text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} />
            Koleksiyona Dön
          </Link>
          <div className="hidden sm:flex items-center gap-2 font-sans text-xs text-brand-ivory/40 uppercase tracking-wider">
            <Link to="/" className="hover:text-brand-gold">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/koleksiyon" className="hover:text-brand-gold">Koleksiyon</Link>
            <span>/</span>
            <span className="text-brand-gold">{name}</span>
          </div>
        </div>

        {/* Product Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-brand-gold/20 bg-[#160B0E]/50 shadow-2xl">
              <img
                src={images[activeImageIndex]}
                alt={`${name} - ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Navigation Arrows (Only show if multiple images exist) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-brand-gold text-brand-ivory hover:text-[#160B0E] border border-brand-gold/25 hover:border-brand-gold flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-brand-gold text-brand-ivory hover:text-[#160B0E] border border-brand-gold/25 hover:border-brand-gold flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4">
                {type === "rental" && (
                  <span className="bg-brand-burgundy text-brand-ivory text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-brand-gold/20 shadow-md">
                    Kiralık
                  </span>
                )}
                {type === "sale" && (
                  <span className="bg-brand-gold text-[#160B0E] text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-md">
                    Satılık
                  </span>
                )}
                {type === "rental-sale" && (
                  <span className="bg-gradient-to-r from-brand-burgundy to-brand-gold text-brand-ivory text-xs font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-brand-gold/10 shadow-md">
                    Kiralık & Satılık
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation (Only show if multiple images exist) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-brand-gold scale-[1.03] shadow-md shadow-brand-gold/10"
                        : "border-brand-gold/25 hover:border-brand-gold/60"
                    }`}
                  >
                    <img src={img} alt={`Küçük görsel ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.2em] font-semibold">
                {formatCategory(category)}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2 mb-6 leading-tight">
                {name}
              </h1>
              <p className="font-sans text-brand-ivory/80 text-base leading-relaxed mb-8">
                {description}
              </p>

              {/* Features List */}
              {features && (
                <div className="mb-10">
                  <h3 className="text-brand-gold text-xs font-sans uppercase tracking-widest font-bold mb-4">
                    Ürün Detayları & İşçilik:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                        <span className="font-sans text-brand-ivory/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* WhatsApp Action */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl mt-auto">
              <a
                href={`https://wa.me/${contactSettings?.whatsapp || "905077179113"}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all text-sm tracking-wider uppercase cursor-pointer"
              >
                <MessageSquare size={18} />
                WhatsApp ile Sipariş & Bilgi Al
              </a>
            </div>
          </div>
        </div>

        {/* Quality Assurances Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-brand-gold/10 pt-16">
          <div className="flex gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 h-fit">
              <Scissors size={20} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-ivory text-sm uppercase tracking-wide">Özel Terzi Hizmeti</h4>
              <p className="font-sans text-brand-ivory/60 text-xs mt-1">Ölçülerinize uygun olarak profesyonelce tadilat yapılır.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 h-fit">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-ivory text-sm uppercase tracking-wide">3 Gün Kiralama Süresi</h4>
              <p className="font-sans text-brand-ivory/60 text-xs mt-1">Kiralama paketlerimizde kıyafetleriniz 3 gün sizde kalır.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 h-fit">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-ivory text-sm uppercase tracking-wide">Kuru Temizleme Dahil</h4>
              <p className="font-sans text-brand-ivory/60 text-xs mt-1">Kiraladığınız tüm kaftanların kuru temizlemesi bize aittir.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 h-fit">
              <Award size={20} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-ivory text-sm uppercase tracking-wide">Hijyen & Kalite Garantisi</h4>
              <p className="font-sans text-brand-ivory/60 text-xs mt-1">Her gelin için kaftanlar titizlikle sterilize edilip hazırlanır.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
