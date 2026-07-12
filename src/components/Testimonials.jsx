import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Elif Yılmaz",
      model: "Yakut Kırmızı Kadife Kaftan",
      date: "Haziran 2025",
      rating: 5,
      text: "Kaftanın kadife dokusu ve el işlemesi sırmaları o kadar kaliteliydi ki kına gecemde kendimi saray sultanı gibi hissettim. Showroom'daki ilgi ve ölçüme göre yapılan tadilat tam istediğim gibiydi. Kesinlikle tavsiye ederim!"
    },
    {
      id: 2,
      name: "Zeynep Demir",
      model: "Zümrüt Yeşili Modern Bindallı",
      date: "Ağustos 2025",
      rating: 5,
      text: "Kına elbisemi de kiralık kaftanımı da buradan seçtim. Her iki model de çok temiz ve ütülü bir şekilde teslim edildi. Kuru temizleme hizmetinin fiyata dahil olması büyük kolaylık. Herkese çok teşekkürler!"
    },
    {
      id: 3,
      name: "Merve Kaya",
      model: "Helenistik Kına Elbisesi",
      date: "Eylül 2025",
      rating: 5,
      text: "Provalarımız o kadar keyifli geçti ki... Terzileri çok profesyonel, elbiseyi üzerime tam oturacak şekilde sıfırdan ayarladılar. Kınada herkes elbiseme bayıldı. İyi ki yolum So Amour ile kesişmiş!"
    }
  ];

  return (
    <section className="py-24 bg-[#160B0E] relative overflow-hidden border-t border-brand-gold/10">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-burgundy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            MUTLULUK KARELERİ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2">
            Gelinlerimizin Yorumları
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-base mt-4 text-center">
            En özel günlerinde So Amour şıklığını tercih eden mutlu gelinlerimizin bizimle ilgili değerlendirmeleri.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1c0e12] border border-brand-gold/10 hover:border-brand-gold/30 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between text-left relative group hover:shadow-xl hover:shadow-brand-gold/5"
            >
              <Quote className="absolute top-6 right-6 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors w-12 h-12 stroke-[1.5]" />
              
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-sans text-brand-ivory/80 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

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
          ))}
        </div>
      </div>
    </section>
  );
}
