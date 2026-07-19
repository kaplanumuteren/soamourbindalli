import { useEffect } from "react";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";
import { Sparkles, Calendar, Heart, ShieldCheck } from "lucide-react";

export default function Packages({ contactSettings }) {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#160B0E] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-brand-gold/10 pb-8">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            ORGANİZASYON VE HİZMETLERİMİZ
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-ivory mt-2">
            Kına Gecesi Paketleri
          </h1>
          <p className="font-sans text-brand-ivory/60 text-sm mt-2 max-w-xl">
            A'dan Z'ye profesyonel kına tahtı kurulumları, dans şovları, nedime ekipleri ve DJ hizmetlerimizle rüya gibi bir gece tasarlıyoruz.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} contactSettings={contactSettings} />
          ))}
        </div>

        {/* Custom Event Info Section */}
        <div className="bg-[#160B0E]/30 border border-brand-gold/15 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
          {/* Gradients */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-burgundy/10 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.2em] font-semibold">
                KİŞİYE ÖZEL KONSEPTLER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory mt-2 mb-4">
                Hayalinizdeki Konsepti Birlikte Tasarlayalım
              </h2>
              <p className="font-sans text-brand-ivory/70 text-sm sm:text-base leading-relaxed mb-6">
                Paketlerimizde yer alan standart içeriklerin dışında, tamamen size özel renk temaları (Kırmızı, Zümrüt Yeşili, Bordo, Mor, Gece Mavisi), özel giriş şovları ve ekstra nedime dans koreografileri planlayabiliriz. Siz hayal edin, biz gerçekleştirelim.
              </p>
              
              {/* Highlight Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold border border-brand-gold/20">
                    <Sparkles size={16} />
                  </div>
                  <span className="font-sans text-xs font-semibold text-brand-ivory/90 uppercase tracking-wider">Benzersiz Şovlar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold border border-brand-gold/20">
                    <Calendar size={16} />
                  </div>
                  <span className="font-sans text-xs font-semibold text-brand-ivory/90 uppercase tracking-wider">Esnek Planlama</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold border border-brand-gold/20">
                    <Heart size={16} />
                  </div>
                  <span className="font-sans text-xs font-semibold text-brand-ivory/90 uppercase tracking-wider">Mutlu Anılar</span>
                </div>
              </div>
            </div>

            {/* Custom CTA */}
            <div className="lg:col-span-4 text-center lg:text-right w-full">
              <a
                href={`https://wa.me/${contactSettings?.whatsapp || "905077179113"}?text=Merhaba,%20kişiye%20özel%20kına%20konsepti%20tasarımı%20hakkında%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all text-sm tracking-wider uppercase w-full sm:w-auto justify-center"
              >
                Bizimle İletişime Geçin
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
