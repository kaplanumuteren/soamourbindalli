import { useEffect } from "react";
import { Star, ShieldCheck, Heart, Award, ChevronRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function About({ homeSettings, contactSettings }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 bg-[#160B0E] min-h-screen text-left">
      {/* Hero Header */}
      <section className="relative py-20 border-b border-brand-gold/10 overflow-hidden bg-[#160B0E]/80">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('${homeSettings?.aboutImage || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80"}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160B0E] via-[#160B0E]/60 to-[#160B0E]" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.3em] font-semibold">
            SO AMOUR HİKAYESİ
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-ivory mt-4 leading-tight">
            Zarafet ve Gelenek
          </h1>
          <div className="h-1 w-24 bg-brand-gold mx-auto mt-6 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            30 yılı aşkın süredir, hayatınızın en kıymetli kına gecesi hatıralarını saray ihtişamıyla dokuyoruz.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-burgundy/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold to-brand-burgundy rounded-3xl blur-md opacity-25" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl">
              <img
                src={homeSettings?.aboutImage || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"}
                alt="So Amour Bindallı Mağazası"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark border border-brand-gold/40 p-6 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="text-brand-gold font-serif text-4xl font-extrabold">
                {homeSettings?.aboutYears || "30+"}
              </div>
              <div>
                <span className="text-brand-ivory text-xs font-sans uppercase tracking-widest font-bold block">Yıllık</span>
                <span className="text-brand-ivory/60 text-[10px] font-sans uppercase tracking-wider block">Deneyim & Güven</span>
              </div>
            </div>
          </div>

          {/* Narrative Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-ivory leading-tight">
              Sarayların Görkemi Modern Çizgilerle Buluşuyor
            </h2>
            <div className="h-[2px] w-16 bg-brand-gold my-5" />
            
            <div className="font-sans text-brand-ivory/80 text-base space-y-6 leading-relaxed">
              <p>
                So Amour Bindallı olarak, kına gecelerinizin ve düğün öncesi törenlerinizin kültürümüzdeki eşsiz ve derin anlamını çok iyi biliyoruz. Amacımız, bu özel kültürel mirası modern moda anlayışıyla sentezleyerek her bir gelinimize hayalindeki asil duruşu yaşatmaktır.
              </p>
              <p>
                Tasarımlarımızda ithal ipek kadifeler, asil atlas kumaşlar ve el işçiliği sırma nakışlar kullanıyoruz. Her parça, atölyemizde yetenekli zanaatkarlarımızın elinde özenle işlenmekte ve kristal boncuklarla zenginleştirilmektedir.
              </p>
              <p>
                Mağazamıza adım attığınız andan kına gecenizin son dakikasına kadar, uzman ekibimizle ölçü alımından kiralama/satış danışmanlığına kadar her süreçte yanınızda olmaktan onur duyuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Guarantees */}
      <section className="py-20 bg-[#160B0E]/50 border-t border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.2em] font-semibold">
            MARKAMIZIN TEMELLERİ
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-ivory mt-3 mb-16">
            So Amour Güvenceleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-3xl transition-all duration-300 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 group">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl text-brand-gold border border-brand-gold/20 w-fit mb-6">
                <Star size={24} className="fill-current" />
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-ivory mb-3">A Sınıf Kalite</h4>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
                İthal ipek kadifeler, özel dokuma atlaslar, hakiki sırma işlemeler ve ışıltılı el işi kristal süslemeler.
              </p>
            </div>

            <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-3xl transition-all duration-300 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 group">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl text-brand-gold border border-brand-gold/20 w-fit mb-6">
                <Heart size={24} className="fill-current" />
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-ivory mb-3">Kişiye Özel Ölçü</h4>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
                Uzman terzilerimiz eşliğinde gerçekleştirilen provalarla, bindallınız vücut hatlarınıza kusursuzca uyarlanır.
              </p>
            </div>

            <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-3xl transition-all duration-300 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 group">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl text-brand-gold border border-brand-gold/20 w-fit mb-6">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-ivory mb-3">Hijyen & Sterilite</h4>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
                Her kiralama öncesinde ve sonrasında derinlemesine kuru temizleme ve profesyonel buharlı sterilizasyon işlemleri.
              </p>
            </div>

            <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-3xl transition-all duration-300 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 group">
              <div className="p-3.5 bg-brand-gold/10 rounded-2xl text-brand-gold border border-brand-gold/20 w-fit mb-6">
                <Award size={24} />
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-ivory mb-3">Kapsamlı Konsept</h4>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
                Kiralama veya satın alma süreçlerinde, konseptinize en uyumlu aksesuar ve danışmanlık hizmeti bir arada sunulur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-ivory mb-4">
          Hayalinizdeki Bindallıyı Birlikte Seçelim
        </h2>
        <p className="font-sans text-brand-ivory/60 text-base mb-8 max-w-xl mx-auto">
          Mağazamızı ziyaret ederek modellerimizi yakından görebilir, uzmanlarımızla size en uygun kına konseptini tasarlayabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/iletisim"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-brand-gold/20 hover:scale-105 transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            İletişim & Randevu
            <ChevronRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${contactSettings?.whatsapp || "905077179113"}?text=Merhaba,%20bindalli%20modelleri%20ve%20randevu%20hakkinda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#160B0E] font-sans font-bold px-8 py-4 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            <PhoneCall size={16} />
            WhatsApp Hızlı İletişim
          </a>
        </div>
      </section>
    </div>
  );
}
