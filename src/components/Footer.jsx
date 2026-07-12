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

const FacebookIcon = ({ size = 18 }) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
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
              Kına & Bindallı
            </p>
            <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed max-w-sm mb-6">
              Geleneksel motifleri modern tasarım çizgileriyle buluşturarak, hayatınızın en anlamlı gecesinde sizi bir kraliçe gibi hissettiriyoruz.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all"
                title="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all"
                title="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#160B0E] rounded-full border border-brand-gold/20 transition-all"
                title="Pinterest"
              >
                <Compass size={18} />
              </a>
            </div>
          </div>

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
              <li>Lüks Kaftan Kiralama</li>
              <li>Bindallı Satışı & Dikimi</li>
              <li>Özel Kına Elbisesi Tasarımı</li>
              <li>Terzilik & Ölçüye Özel Tadilat</li>
              <li>Özel Taç ve Duvak Tasarımı</li>
              <li>Kiralama ve Satış Danışmanlığı</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-gold/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-brand-ivory/40 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} So Amour Kına & Bindallı. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-6 font-sans text-brand-ivory/40 text-xs">
            <a href="#" className="hover:text-brand-gold transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Kullanım Şartları</a>
            <Link to="/admin" className="hover:text-brand-gold transition-colors text-brand-gold/60 font-semibold">Yönetici Girişi</Link>
          </div>
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
