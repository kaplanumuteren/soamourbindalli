import { Star, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

export default function Home({ homeSettings, galleryImages, testimonials }) {
  return (
    <div>
      <Hero homeSettings={homeSettings} />

      {/* ================= ABOUT SECTION ================= */}
      <section id="hakkimizda" className="py-24 bg-[#160B0E] relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-burgundy/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* About Image with Luxury Frames */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold to-brand-burgundy rounded-3xl blur-md opacity-30" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl">
                <img
                  src={homeSettings?.aboutImage || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"}
                  alt="So Amour Bindallı Mağazası"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Experience Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark border border-brand-gold/40 p-6 rounded-2xl shadow-xl hidden sm:flex items-center gap-4">
                <div className="text-brand-gold font-serif text-4xl font-extrabold">
                  {homeSettings?.aboutYears || "30+"}
                </div>
                <div className="text-left">
                  <span className="text-brand-ivory text-xs font-sans uppercase tracking-widest font-bold block">Yıllık</span>
                  <span className="text-brand-ivory/60 text-[10px] font-sans uppercase tracking-wider block">Deneyim & Güven</span>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
                BİZ KİMİZ?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2 leading-tight">
                {homeSettings?.aboutTitle || "Gecenizin Yıldızı Olmaya Hazırlanın"}
              </h2>
              <div className="h-1 w-20 bg-brand-gold my-5 rounded-full" />
              <p className="font-sans text-brand-ivory/70 text-base mb-6 leading-relaxed">
                So Amour Bindallı olarak, geleneksel Türk nakışlarını ve kadifesini modern tasarım çizgileriyle harmanlıyor; en özel gecenizde kendinizi bir saray kraliçesi gibi hissetmenizi sağlıyoruz. 30 yılı aşkın tecrübemizle hayalinizdeki zarafeti gerçeğe dönüştürüyoruz.
              </p>
              
              <Link
                to="/hakkimizda"
                className="w-fit inline-flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#160B0E] font-sans font-bold px-6 py-3 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Hikayemizi Keşfedin &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO PROMO SECTION ================= */}
      <section className="py-20 bg-[#160B0E]/50 border-t border-b border-brand-gold/10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
                ÖZEL SEÇKİLER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-ivory mt-2">
                Koleksiyonumuzu Keşfedin
              </h2>
            </div>
            <Link
              to="/koleksiyon"
              className="flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-sans font-bold text-sm uppercase tracking-wider transition-colors"
            >
              Tümünü İncele
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-6 scrollbar-hide pb-6">
            <div className="w-[80vw] md:w-auto shrink-0 snap-center relative rounded-2xl overflow-hidden aspect-[3/4] border border-brand-gold/20 group">
              <img
                src={homeSettings?.promo1Image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"}
                alt="Kiralık Bindallı Modelleri"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E]/90 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ivory">Kiralık Modeller</h3>
                <Link to="/koleksiyon?filter=rental" className="text-brand-gold text-xs sm:text-sm font-semibold mt-2 hover:underline">Koleksiyonu Gör &rarr;</Link>
              </div>
            </div>

            <div className="w-[80vw] md:w-auto shrink-0 snap-center relative rounded-2xl overflow-hidden aspect-[3/4] border border-brand-gold/20 group">
              <img
                src={homeSettings?.promo2Image || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"}
                alt="Satılık Bindallı Modelleri"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E]/90 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ivory">Satılık Modeller</h3>
                <Link to="/koleksiyon?filter=sale" className="text-brand-gold text-xs sm:text-sm font-semibold mt-2 hover:underline">Koleksiyonu Gör &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials reviews={testimonials} />
    </div>
  );
}
