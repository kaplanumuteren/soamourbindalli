import { useState, useEffect, useRef } from "react";
import { Star, Quote, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials({ reviews = [] }) {
  const [activeImage, setActiveImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  if (!reviews || reviews.length === 0) return null;

  // Group size based on viewport width
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused && maxIndex > 0) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? 0 : prevIndex + 1
          ),
        4000 // Slide every 4 seconds
      );
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-[#160B0E] relative overflow-hidden border-t border-brand-gold/10 text-left">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-burgundy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            MUTLU GELİNLERİMİZ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2">
            Gelinlerimizin Değerlendirmeleri
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-base mt-4 text-center">
            En özel günlerinde So Amour zarafetini taşıyan mutlu gelinlerimizin gerçek yorumları ve fotoğrafları.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group/carousel px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Viewport */}
          <div className="overflow-hidden pb-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
              }}
            >
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-[#1c0e12] border border-brand-gold/10 hover:border-brand-gold/30 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-brand-gold/5 group">
                    {/* Optional Photo Section */}
                    {rev.image && (
                      <div 
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#160B0E] cursor-zoom-in"
                        onClick={() => setActiveImage(rev.image)}
                      >
                        <img
                          src={rev.image}
                          alt={`${rev.name} - ${rev.model}`}
                          className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#160B0E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="p-3 bg-brand-gold/80 text-[#160B0E] rounded-full shadow-lg">
                            <ZoomIn size={18} />
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Review Text & Rating */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow relative">
                      <Quote className="absolute top-6 right-6 text-brand-gold/5 group-hover:text-brand-gold/10 transition-colors w-12 h-12 stroke-[1.5]" />
                      
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} className="text-brand-gold fill-brand-gold" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="font-sans text-brand-ivory/80 text-sm sm:text-base leading-relaxed mb-6 italic flex-grow">
                        "{rev.text}"
                      </p>

                      {/* Author Info */}
                      <div className="border-t border-brand-gold/10 pt-5 mt-auto flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center font-serif font-bold text-brand-gold text-sm shrink-0">
                          {rev.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-brand-ivory text-sm">{rev.name}</h4>
                          <div className="flex flex-wrap gap-x-2 text-[10px] uppercase font-bold tracking-wider text-brand-gold/80 mt-0.5">
                            <span>{rev.model}</span>
                            <span className="text-brand-ivory/30">•</span>
                            <span className="text-brand-ivory/40 font-normal font-sans">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-3 p-2 bg-[#1c0e12]/95 hover:bg-brand-burgundy text-brand-gold rounded-full border border-brand-gold/20 shadow-2xl transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100"
                title="Önceki"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-3 p-2 bg-[#1c0e12]/95 hover:bg-brand-burgundy text-brand-gold rounded-full border border-brand-gold/20 shadow-2xl transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100"
                title="Sonraki"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(maxIndex + 1)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? "w-8 bg-brand-gold" : "w-2 bg-brand-gold/30"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for review image */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#160B0E]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer z-55"
          >
            <X size={24} />
          </button>
          <img
            src={activeImage}
            alt="Mutlu Gelinimiz"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl border border-brand-gold/30 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
