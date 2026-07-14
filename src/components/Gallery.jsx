import { useState, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Gallery({ galleryImages = [], showRedirectButton = true, limitImages = true }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const displayedImages = limitImages ? galleryImages.slice(0, 6) : galleryImages;

  // Navigate functions
  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? displayedImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === displayedImages.length - 1 ? 0 : prev + 1));
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

  const activeImage = activeIndex !== null ? displayedImages[activeIndex] : null;

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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {displayedImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-brand-gold/10 hover:border-brand-gold/30 shadow-md transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#160B0E]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
                <div className="absolute top-2 right-2 md:top-6 md:right-6 p-1.5 md:p-2 bg-brand-gold/10 rounded-full text-brand-gold border border-brand-gold/20">
                  <ZoomIn className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="font-serif text-xs md:text-lg font-bold text-brand-ivory">{img.title}</h3>
                <p className="font-sans text-[9px] md:text-xs text-brand-gold mt-0.5 md:mt-1">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {showRedirectButton && (
          <div className="text-center mt-12">
            <Link
              to="/galeri"
              className="inline-flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#160B0E] font-sans font-bold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-brand-gold/10 hover:scale-105"
            >
              Tüm Galeriyi Gör
            </Link>
          </div>
        )}
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
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55"
            title="Kapat"
          >
            <X className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-8 p-2 sm:p-3 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55 hover:scale-110 active:scale-95"
            title="Önceki"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="max-w-4xl w-full flex flex-col items-center px-4 sm:px-12"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking details
          >
            <div className="relative group max-h-[70vh] sm:max-h-[75vh]">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[70vh] sm:max-h-[75vh] object-contain rounded-2xl border border-brand-gold/30 shadow-2xl transition-all duration-300"
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
            className="absolute right-2 sm:right-8 p-2 sm:p-3 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55 hover:scale-110 active:scale-95"
            title="Sonraki"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
