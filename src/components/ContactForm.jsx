import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export default function ContactForm({ contactSettings }) {
  const contactDetails = [
    {
      id: 1,
      title: "Müşteri Hattı",
      value: contactSettings?.phone || "0507 717 91 13",
      link: `tel:${contactSettings?.phone ? contactSettings.phone.replace(/\s+/g, "") : "905077179113"}`,
      actionLabel: "Hemen Ara",
      icon: <Phone size={24} />,
    },
    {
      id: 2,
      title: "WhatsApp Bilgi Hattı",
      value: contactSettings?.phone || "0507 717 91 13",
      link: `https://wa.me/${contactSettings?.whatsapp || "905077179113"}?text=Merhaba,%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`,
      actionLabel: "Mesaj Gönder",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "E-Posta Adresi",
      value: contactSettings?.email || "info@soamourbindalli.com",
      link: `mailto:${contactSettings?.email || "info@soamourbindalli.com"}`,
      actionLabel: "E-Posta Yaz",
      icon: <Mail size={24} />,
    },
    {
      id: 4,
      title: "Çalışma Saatleri",
      value: contactSettings?.hours || "Pazartesi - Cumartesi: 08:30 - 19:30",
      subValue: contactSettings?.hoursSub || "(Pazar Günleri Kapalıdır)",
      icon: <Clock size={24} />,
    },
  ];

  return (
    <section id="iletisim" className="py-24 relative overflow-hidden bg-[#160B0E]/10">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-burgundy/10 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
            İLETİŞİM & RANDEVU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ivory mt-2">
            Mağazamıza Davetlisiniz
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          <p className="font-sans text-brand-ivory/60 text-base mt-4">
            Kaftan ve bindallı modellerimizi yakından görmek, kumaş kalitesini hissetmek ve ölçünüze özel tadilat detaylarını görüşmek için randevu alarak bizi ziyaret edebilirsiniz.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactDetails.map((item) => (
            <div
              key={item.id}
              className="bg-[#160B0E]/40 border border-brand-gold/10 hover:border-brand-gold/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between text-left h-full shadow-lg"
            >
              <div>
                <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 w-fit mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-brand-ivory text-base mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-ivory/80 text-sm leading-relaxed word-break break-all">
                  {item.value}
                </p>
                {item.subValue && (
                  <p className="font-sans text-brand-gold text-xs mt-1">
                    {item.subValue}
                  </p>
                )}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-gold-light text-xs font-semibold uppercase tracking-wider mt-6 transition-colors"
                >
                  {item.actionLabel}
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Address and Map Section */}
        <div className="bg-[#160B0E]/30 border border-brand-gold/15 rounded-3xl p-8 lg:p-10 text-left shadow-2xl flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 w-fit mb-5">
              <MapPin size={24} />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ivory mb-3">
              Merkez Mağazamız
            </h3>
            <p className="font-sans text-brand-ivory/80 text-base leading-relaxed mb-6">
              {contactSettings?.address || "Akdeniz, Mimar Kemalettin Cd. No:71/B, 35210 Konak/İzmir (Mimar Kemalettin İş Mer.)"}
            </p>
            <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed mb-8">
              Mimar Kemalettin İş Merkezi konumunda, İzmir Konak'ın en merkezi moda ve gelinlik caddesinde yer almaktayız. Toplu taşıma (metro, tramvay ve otobüs) ile kolaylıkla ulaşabilir, mağazamızı ziyaret edebilirsiniz.
            </p>
            <a
              href="https://maps.google.com/?q=So+Amour+Bindall%C4%B1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-6 py-3 rounded-xl shadow-md hover:scale-[1.02] transition-all text-sm tracking-wider"
            >
              Google Haritalar'da Aç
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Interactive Map */}
          <div className="lg:w-1/2 w-full aspect-video rounded-2xl overflow-hidden border border-brand-gold/20 relative group bg-[#160B0E]">
            <iframe
              title="Mağaza Konumu"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.7875694362415!2d27.13298287633421!3d38.42327387453948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9592a5bd593%3A0x32570b67c0c5e9!2sSo%20Amour%20Bindall%C4%B1!5e0!3m2!1str!2str!4v1783875955738!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(80%) grayscale(40%)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 border-2 border-brand-gold/10 group-hover:border-brand-gold/30 pointer-events-none transition-all duration-300 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
