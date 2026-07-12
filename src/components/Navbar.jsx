import { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ contactSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled ? null : setIsScrolled(true);
      } else {
        isScrolled ? setIsScrolled(false) : null;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Koleksiyon", href: "/koleksiyon" },
    { name: "Galeri", href: "/galeri" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-[#160B0E]/95 backdrop-blur-md border-b border-brand-gold/20 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col">
            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-brand-gold hover:text-brand-gold-light transition-colors">
              SO AMOUR
            </Link>
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-ivory/80 -mt-1">
              Kına & Bindallı
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-sans text-sm font-medium tracking-wider transition-colors ${
                  location.pathname === link.href
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href={`https://wa.me/${contactSettings?.whatsapp || "905000000000"}?text=Merhaba,%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-brand-gold/20 hover:scale-105 transition-all text-sm tracking-wider"
            >
              <PhoneCall size={16} />
              WhatsApp İletişim
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:text-brand-gold-light focus:outline-none cursor-pointer"
              aria-label="Menüyü Aç"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"
        } overflow-hidden bg-[#160B0E] border-b border-brand-gold/20`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md font-sans text-base font-medium tracking-wide transition-colors ${
                location.pathname === link.href
                  ? "bg-brand-burgundy-dark text-brand-gold"
                  : "text-brand-ivory hover:bg-brand-burgundy-dark hover:text-brand-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3">
            <a
              href={`https://wa.me/${contactSettings?.whatsapp || "905000000000"}?text=Merhaba,%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold text-[#160B0E] font-sans font-semibold px-5 py-3 rounded-full shadow-md"
            >
              <PhoneCall size={18} />
              WhatsApp İletişim
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
