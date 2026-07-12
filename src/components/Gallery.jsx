import { useState, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({ galleryImages = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Navigate functions
  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section id="galeri" className="py-24 bg-[#160B0E]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            MUTLU GELİNLERİMİZ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2">
            Kına Gecesi Galerisi
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-base mt-4">
            En özel gecelerinden unutulmaz karelerle saray ihtişamını yaşayan mutlu gelinlerimizin fotoğrafları.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-brand-gold/10 hover:border-brand-gold/30 shadow-md transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#160B0E]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="absolute top-6 right-6 p-2 bg-brand-gold/10 rounded-full text-brand-gold border border-brand-gold/20">
                  <ZoomIn size={20} />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-ivory">{img.title}</h3>
                <p className="font-sans text-xs text-brand-gold mt-1">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Slider Navigation */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#160B0E]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-6 right-6 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55"
            title="Kapat"
          >
            <X size={28} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55 hover:scale-110 active:scale-95"
            title="Önceki"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="max-w-4xl w-full flex flex-col items-center px-12"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking details
          >
            <div className="relative group max-h-[75vh]">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[75vh] object-contain rounded-2xl border border-brand-gold/30 shadow-2xl transition-all duration-300"
              />
            </div>
            
            <div className="text-center mt-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ivory">
                {activeImage.title}
              </h3>
              <p className="font-sans text-sm text-brand-gold mt-2">
                {activeImage.desc}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55 hover:scale-110 active:scale-95"
            title="Sonraki"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
