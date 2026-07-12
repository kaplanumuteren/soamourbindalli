import { Star, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

export default function Home({ homeSettings, galleryImages }) {
  return (
    <div>
      <Hero homeSettings={homeSettings} />

      {/* ================= HAKKIMIZDA SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-left">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-burgundy/10 rounded-full blur-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* About Image with Luxury Frames */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold to-brand-burgundy rounded-3xl blur-md opacity-30" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                alt="So Amour Kaftan & Bindallı Showroom"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Experience Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark border border-brand-gold/40 p-6 rounded-2xl shadow-xl hidden sm:flex items-center gap-4">
              <div className="text-brand-gold font-serif text-4xl font-extrabold">
                {homeSettings?.aboutYears || "30+"}
              </div>
              <div className="text-brand-ivory text-xs font-sans font-semibold uppercase tracking-wider leading-relaxed">
                Yıllık Sektör <br /> Tecrübesi
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-6">
            <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
              BİZ KİMİZ?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2 leading-tight">
              {homeSettings?.aboutTitle || "Gecenizin Yıldızı Olmaya Hazırlanın"}
            </h2>
            <div className="h-1 w-20 bg-brand-gold my-5 rounded-full" />
            <p className="font-sans text-brand-ivory/70 text-base mb-8 leading-relaxed whitespace-pre-line">
              {homeSettings?.aboutDesc || 
                "So Amour Kına & Bindallı olarak, kına gecelerinizin ve düğün öncesi törenlerinizin ne denli özel ve anlamlı olduğunu çok iyi biliyoruz. 30 yılı aşkın tecrübemizle, geleneksel Türk nakışlarını ve kadifesini modern tasarım çizgileriyle harmanlıyor; her gelinimizin kendini bir saray kraliçesi gibi hissetmesini sağlıyoruz."
              }
            </p>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Star size={20} className="fill-current" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-ivory">A Sınıf Kalite</h4>
                  <p className="font-sans text-brand-ivory/60 text-xs mt-1">İthal ipek kadifeler, el işi sırma nakışlar ve orijinal boncuklar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-ivory">Kuru Temizleme</h4>
                  <p className="font-sans text-brand-ivory/60 text-xs mt-1">Her kiralamadan sonra profesyonel, hijyenik kuru temizleme.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-ivory">Kişiye Özel Tadilat</h4>
                  <p className="font-sans text-brand-ivory/60 text-xs mt-1">Gelinimizin ölçülerine göre uzman terzilerimizce birebir uyarlama.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-ivory">Komple Konsept</h4>
                  <p className="font-sans text-brand-ivory/60 text-xs mt-1">Kaftandan tepsisine, tahtından dans şovlarına aradığınız her şey.</p>
                </div>
              </div>
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

          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-6 scrollbar-hide pb-6">
            <div className="w-[80vw] md:w-auto shrink-0 snap-center relative rounded-2xl overflow-hidden aspect-[3/4] border border-brand-gold/20 group">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                alt="Kaftan Koleksiyonu"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E]/90 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="font-serif text-xl font-bold text-brand-ivory">Kaftan & Bindallı</h3>
                <Link to="/koleksiyon" className="text-brand-gold text-xs font-semibold mt-2 hover:underline">Modelleri Gör &rarr;</Link>
              </div>
            </div>

            <div className="w-[80vw] md:w-auto shrink-0 snap-center relative rounded-2xl overflow-hidden aspect-[3/4] border border-brand-gold/20 group">
              <img
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
                alt="Kına Elbisesi Koleksiyonu"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E]/90 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="font-serif text-xl font-bold text-brand-ivory">Kına Elbiseleri</h3>
                <Link to="/koleksiyon" className="text-brand-gold text-xs font-semibold mt-2 hover:underline">Modelleri Gör &rarr;</Link>
              </div>
            </div>

            <div className="w-[80vw] md:w-auto shrink-0 snap-center relative rounded-2xl overflow-hidden aspect-[3/4] border border-brand-gold/20 group">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
                alt="Aksesuar Koleksiyonu"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E]/90 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="font-serif text-xl font-bold text-brand-ivory">Özel Aksesuarlar</h3>
                <Link to="/koleksiyon" className="text-brand-gold text-xs font-semibold mt-2 hover:underline">Modelleri Gör &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <Gallery galleryImages={galleryImages} />
    </div>
  );
}
