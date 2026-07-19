import { Compass, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const InstagramIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fill-current"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Footer({ contactSettings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#160B0E] border-t border-brand-gold/10 pt-16 pb-8 relative z-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <a href="#" className="font-serif text-3xl font-bold tracking-wide text-brand-gold">
              SO AMOUR
            </a>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-ivory/80 -mt-1 mb-6">
              Bindallı
            </p>
            <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed max-w-sm mb-6">
              Geleneksel motifleri modern tasarım çizgileriyle buluşturarak, hayatınızın en anlamlı gecesinde sizi bir kraliçe gibi hissettiriyoruz.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/soamourbindalli/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all"
                title="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`https://wa.me/${contactSettings?.whatsapp || "905077179113"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all"
                title="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links & Services Symmetrical Wrapper */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-ivory mb-6 border-l-2 border-brand-gold pl-3">
                Hızlı Linkler
              </h3>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <Link to="/" className="text-brand-ivory/60 hover:text-brand-gold transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link to="/hakkimizda" className="text-brand-ivory/60 hover:text-brand-gold transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to="/koleksiyon" className="text-brand-ivory/60 hover:text-brand-gold transition-colors">
                    Koleksiyonumuz
                  </Link>
                </li>
                <li>
                  <Link to="/galeri" className="text-brand-ivory/60 hover:text-brand-gold transition-colors">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className="text-brand-ivory/60 hover:text-brand-gold transition-colors">
                    İletişim & Randevu
                  </Link>
                </li>
              </ul>
            </div>

            {/* Business Info */}
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-ivory mb-6 border-l-2 border-brand-gold pl-3">
                Hizmetlerimiz
              </h3>
              <ul className="space-y-3 font-sans text-sm text-brand-ivory/60">
                <li>Lüks Bindallı Kiralama</li>
                <li>Özel Ölçü Bindallı Satışı</li>
                <li>Terzilik & Özel Tadilat</li>
                <li>Kiralama & Satış Danışmanlığı</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-gold/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-brand-ivory/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} So Amour Bindallı. Tüm Hakları Saklıdır.
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all group"
            title="Yukarı Git"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
