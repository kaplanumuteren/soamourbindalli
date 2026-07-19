import { useState, useEffect } from "react";
import { 
  Plus, Edit2, Trash2, LogOut, Package, Grid, Image as ImageIcon,
  List, ShieldAlert, Sparkles, Save, X, Settings, Phone, MapPin, 
  Clock, Info, FileText, ChevronRight, ArrowLeft, MessageSquare, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const getDisplayImage = (img) => {
  if (!img) return "";
  if (typeof img === "string" && img.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(img);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
    } catch (e) {}
  }
  return img;
};

export default function Admin({ 
  products, onAddProduct, onUpdateProduct, onDeleteProduct,
  gallery, onAddGallery, onUpdateGallery, onDeleteGallery,
  homeSettings, onUpdateHomeSettings,
  contactSettings, onUpdateContactSettings,
  testimonials = [], onAddTestimonial, onUpdateTestimonial, onDeleteTestimonial
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState("overview"); // overview, products, gallery, content
  const [activeContentSubTab, setActiveContentSubTab] = useState("hero"); // hero, about, promo, contact

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  
  // Editing References
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Form Fields - Products
  const [productFields, setProductFields] = useState({
    name: "",
    category: "kaftan",
    type: "rental-sale",
    description: "",
    image: "",
    images: [],
    features: ""
  });

  // Form Fields - Gallery
  const [galleryFields, setGalleryFields] = useState({
    title: "",
    desc: "",
    url: ""
  });

  // Form Fields - Testimonials
  const [testimonialFields, setTestimonialFields] = useState({
    name: "",
    model: "",
    date: "",
    rating: 5,
    text: "",
    image: ""
  });

  // Form Fields - Page Settings (Home & Contact)
  const [homeFields, setHomeFields] = useState({
    heroTag: "",
    heroTitle: "",
    heroSubtitle: "",
    heroBgImage: "",
    aboutTitle: "",
    aboutDesc: "",
    aboutYears: "",
    aboutImage: "",
    promo1Image: "",
    promo2Image: "",
    promo3Image: ""
  });

  const [contactFields, setContactFields] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    hours: "",
    hoursSub: ""
  });

  // Initialize Page Fields from Props
  useEffect(() => {
    if (homeSettings) {
      setHomeFields({
        heroTag: homeSettings.heroTag || "",
        heroTitle: homeSettings.heroTitle || "",
        heroSubtitle: homeSettings.heroSubtitle || "",
        heroBgImage: homeSettings.heroBgImage || "",
        aboutTitle: homeSettings.aboutTitle || "",
        aboutDesc: homeSettings.aboutDesc || "",
        aboutYears: homeSettings.aboutYears || "",
        aboutImage: homeSettings.aboutImage || "",
        promo1Image: homeSettings.promo1Image || "",
        promo2Image: homeSettings.promo2Image || "",
        promo3Image: homeSettings.promo3Image || ""
      });
    }
  }, [homeSettings]);

  useEffect(() => {
    if (contactSettings) {
      setContactFields({
        phone: contactSettings.phone || "",
        whatsapp: contactSettings.whatsapp || "",
        email: contactSettings.email || "",
        address: contactSettings.address || "",
        hours: contactSettings.hours || "",
        hoursSub: contactSettings.hoursSub || ""
      });
    }
  }, [contactSettings]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "01030210") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_logged_in", "true");
      setLoginError("");
    } else {
      setLoginError("Geçersiz kullanıcı adı veya şifre!");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_logged_in");
  };

  // ----------------------------------------------------
  // PRODUCTS CRUD
  // ----------------------------------------------------
  const handleAddProductClick = () => {
    setEditingProduct(null);
    setProductFields({
      name: "",
      category: "kaftan",
      type: "rental-sale",
      description: "",
      image: "",
      images: [],
      features: ""
    });
    setShowProductModal(true);
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    let imgs = [];
    if (product.image) {
      if (typeof product.image === "string" && product.image.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(product.image);
          if (Array.isArray(parsed)) imgs = parsed;
        } catch (e) {}
      } else {
        imgs = [product.image];
      }
    }
    setProductFields({
      name: product.name,
      category: product.category,
      type: product.type,
      description: product.description || "",
      image: product.image || "",
      images: imgs,
      features: product.features ? product.features.join(", ") : ""
    });
    setShowProductModal(true);
  };

  const handleDeleteProductClick = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      onDeleteProduct(id);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFields.name || !productFields.images || productFields.images.length === 0) {
      alert("Lütfen ürün adı ekleyin ve en az bir görsel yükleyin.");
      return;
    }

    const formattedFeatures = productFields.features
      ? productFields.features.split(",").map((f) => f.trim()).filter((f) => f !== "")
      : [];

    const productData = {
      name: productFields.name,
      category: productFields.category || "kaftan",
      type: productFields.type,
      description: productFields.description,
      image: JSON.stringify(productFields.images),
      features: formattedFeatures
    };

    if (editingProduct) {
      onUpdateProduct({ id: editingProduct.id, ...productData });
    } else {
      onAddProduct(productData);
    }

    setShowProductModal(false);
    setEditingProduct(null);
  };

  // ----------------------------------------------------
  // GALLERY CRUD
  // ----------------------------------------------------
  const handleAddGalleryClick = () => {
    setEditingGallery(null);
    setGalleryFields({
      title: "",
      desc: "",
      url: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80"
    });
    setShowGalleryModal(true);
  };

  const handleEditGalleryClick = (item) => {
    setEditingGallery(item);
    setGalleryFields({
      title: item.title,
      desc: item.desc,
      url: item.url
    });
    setShowGalleryModal(true);
  };

  const handleDeleteGalleryClick = (id) => {
    if (window.confirm("Bu galeri görselini silmek istediğinize emin misiniz?")) {
      onDeleteGallery(id);
    }
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (!galleryFields.title || !galleryFields.url) {
      alert("Lütfen başlık ve görsel URL alanlarını doldurun.");
      return;
    }

    const itemData = {
      title: galleryFields.title,
      desc: galleryFields.desc,
      url: galleryFields.url
    };

    if (editingGallery) {
      onUpdateGallery({ id: editingGallery.id, ...itemData });
    } else {
      onAddGallery(itemData);
    }

    setShowGalleryModal(false);
    setEditingGallery(null);
  };

  // ----------------------------------------------------
  // TESTIMONIALS CRUD
  // ----------------------------------------------------
  const handleAddTestimonialClick = () => {
    setEditingTestimonial(null);
    setTestimonialFields({
      name: "",
      model: "",
      date: "",
      rating: 5,
      text: "",
      image: ""
    });
    setShowTestimonialModal(true);
  };

  const handleEditTestimonialClick = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialFields({
      name: testimonial.name,
      model: testimonial.model || "",
      date: testimonial.date || "",
      rating: testimonial.rating || 5,
      text: testimonial.text || "",
      image: testimonial.image || ""
    });
    setShowTestimonialModal(true);
  };

  const handleDeleteTestimonialClick = (id) => {
    if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      onDeleteTestimonial(id);
    }
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    if (!testimonialFields.name || !testimonialFields.text) {
      alert("Lütfen ad soyad ve yorum alanlarını doldurun.");
      return;
    }

    const testimonialData = {
      name: testimonialFields.name,
      model: testimonialFields.model,
      date: testimonialFields.date,
      rating: parseInt(testimonialFields.rating, 10),
      text: testimonialFields.text,
      image: testimonialFields.image
    };

    if (editingTestimonial) {
      onUpdateTestimonial({ id: editingTestimonial.id, ...testimonialData });
    } else {
      onAddTestimonial(testimonialData);
    }

    setShowTestimonialModal(false);
    setEditingTestimonial(null);
  };

  // ----------------------------------------------------
  // PAGE SETTINGS SAVE
  // ----------------------------------------------------
  const handleSavePageSettings = (e) => {
    e.preventDefault();
    if (activeContentSubTab === "hero" || activeContentSubTab === "about" || activeContentSubTab === "promo") {
      onUpdateHomeSettings(homeFields);
      alert("Ana sayfa içerik ayarları başarıyla kaydedildi!");
    } else if (activeContentSubTab === "contact") {
      onUpdateContactSettings(contactFields);
      alert("İletişim bilgileri başarıyla kaydedildi!");
    }
  };

  // ----------------------------------------------------
  // STATISTICS
  // ----------------------------------------------------
  const totalProducts = products.length;
  const rentalCount = products.filter((p) => p.type === "rental" || p.type === "rental-sale").length;
  const saleCount = products.filter((p) => p.type === "sale" || p.type === "rental-sale").length;
  const totalGallery = gallery.length;
  const totalTestimonials = testimonials.length;

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-24 bg-[#160B0E] min-h-screen flex items-center justify-center px-4 text-left">
        <div className="bg-[#1c0e12] border border-brand-gold/20 p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-brand-gold">SO AMOUR</h2>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-brand-ivory/60">Yönetici Girişi</span>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-brand-burgundy/20 border border-brand-burgundy rounded-xl text-brand-ivory text-xs flex items-center gap-2">
              <ShieldAlert size={16} className="text-brand-burgundy-light flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Örn. admin"
                className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all placeholder-brand-ivory/20"
              />
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all placeholder-brand-ivory/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>
          
          <div className="text-center mt-6">
            <span className="text-[10px] text-brand-ivory/40 font-sans">
              Varsayılan Şifre: <code className="bg-[#160B0E] px-1.5 py-0.5 rounded text-brand-gold">01030210</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-28 md:pb-24 bg-[#160B0E] min-h-screen text-left">
      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#160B0E]/95 backdrop-blur-md border-b border-brand-gold/20 shadow-lg py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col">
              <Link to="/" className="font-serif text-2xl font-bold tracking-wide text-brand-gold hover:text-brand-gold-light transition-colors">
                SO AMOUR
              </Link>
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-ivory/80 -mt-1">
                Yönetici Paneli
              </span>
            </div>

            {/* Desktop Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "overview"
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "products"
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                Ürün Yönetimi
              </button>

              <button
                onClick={() => setActiveTab("testimonials")}
                className={`px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "testimonials"
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                Yorum Yönetimi
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "content"
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                İçerik Düzenleme
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="flex items-center gap-1.5 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-semibold px-2.5 py-2 sm:px-4 rounded-xl transition-all text-xs tracking-wider uppercase"
                title="Siteye Git"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Siteye Git</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 border border-brand-burgundy bg-brand-burgundy/10 hover:bg-brand-burgundy text-brand-ivory font-sans font-semibold px-2.5 py-2 sm:px-4 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
                title="Çıkış"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#1c0e12]/95 backdrop-blur-md border-t border-brand-gold/20 shadow-2xl py-2.5 flex justify-around items-center px-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
            activeTab === "overview" ? "text-brand-gold" : "text-brand-ivory/60"
          }`}
        >
          <Grid size={18} />
          <span>Genel</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
            activeTab === "products" ? "text-brand-gold" : "text-brand-ivory/60"
          }`}
        >
          <Package size={18} />
          <span>Ürünler</span>
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
            activeTab === "testimonials" ? "text-brand-gold" : "text-brand-ivory/60"
          }`}
        >
          <MessageSquare size={18} />
          <span>Yorumlar</span>
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
            activeTab === "content" ? "text-brand-gold" : "text-brand-ivory/60"
          }`}
        >
          <Settings size={18} />
          <span>İçerik</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-0">

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 shadow-lg">
                <div className="p-2.5 md:p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 shrink-0">
                  <Package className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <span className="text-brand-ivory/40 text-[9px] md:text-[10px] font-sans uppercase tracking-wider block">Toplam Ürün</span>
                  <h3 className="font-serif text-base md:text-xl font-bold text-brand-ivory mt-0.5">{totalProducts} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 shadow-lg">
                <div className="p-2.5 md:p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 shrink-0">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <span className="text-brand-ivory/40 text-[9px] md:text-[10px] font-sans uppercase tracking-wider block">Kiralık Kaftan</span>
                  <h3 className="font-serif text-base md:text-xl font-bold text-brand-ivory mt-0.5">{rentalCount} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 shadow-lg">
                <div className="p-2.5 md:p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 shrink-0">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <span className="text-brand-ivory/40 text-[9px] md:text-[10px] font-sans uppercase tracking-wider block">Satılık Kaftan</span>
                  <h3 className="font-serif text-base md:text-xl font-bold text-brand-ivory mt-0.5">{saleCount} Adet</h3>
                </div>
              </div>



              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 shadow-lg">
                <div className="p-2.5 md:p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20 shrink-0">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <span className="text-brand-ivory/40 text-[9px] md:text-[10px] font-sans uppercase tracking-wider block">Müşteri Yorumu</span>
                  <h3 className="font-serif text-base md:text-xl font-bold text-brand-ivory mt-0.5">{totalTestimonials} Adet</h3>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl p-5 md:p-8 shadow-xl text-left">
              <h3 className="font-serif text-lg md:text-xl font-bold text-brand-ivory mb-4">Hızlı Aksiyonlar</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <button
                  onClick={handleAddProductClick}
                  className="w-full flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-3 md:px-4 py-3 md:py-3.5 rounded-xl shadow-lg transition-all text-[10px] md:text-xs uppercase tracking-wider cursor-pointer text-center"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Yeni Ürün</span>
                </button>
                <button
                  onClick={handleAddTestimonialClick}
                  className="w-full flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 bg-[#FF9F00] hover:bg-[#e08c00] text-white font-sans font-bold px-3 md:px-4 py-3 md:py-3.5 rounded-xl shadow-lg transition-all text-[10px] md:text-xs uppercase tracking-wider cursor-pointer text-center"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Yeni Yorum</span>
                </button>
                <button
                  onClick={() => setActiveTab("content")}
                  className="w-full flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-semibold px-3 md:px-4 py-3 md:py-3.5 rounded-xl transition-all text-[10px] md:text-xs uppercase tracking-wider cursor-pointer text-center"
                >
                  <Settings className="w-4 h-4 md:w-5 md:h-5" />
                  <span>İçerik Düzenle</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRODUCTS LIST TAB ================= */}
        {activeTab === "products" && (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-brand-ivory">Ürün Listesi</h3>
              <button
                onClick={handleAddProductClick}
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <Plus size={14} />
                Ürün Ekle
              </button>
            </div>

            {/* Products Card List (Mobile) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {products.length === 0 ? (
                <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-2xl text-center text-brand-ivory/40 text-xs">
                  Henüz ürün eklenmemiş.
                </div>
              ) : (
                products.map((p) => (
                  <div key={p.id} className="bg-[#1c0e12] border border-brand-gold/10 hover:border-brand-gold/20 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={getDisplayImage(p.image)}
                        alt={p.name}
                        className="w-12 h-16 object-cover rounded-lg border border-brand-gold/20 shrink-0"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-brand-ivory text-sm line-clamp-1">{p.name}</h4>
                        <span className="inline-block bg-brand-gold/10 text-brand-gold text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded border border-brand-gold/15 mt-2">
                          {p.type === "rental" ? "Kiralık" : p.type === "sale" ? "Satılık" : "Kiralık & Satılık"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handleEditProductClick(p)}
                        className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-xl text-brand-gold transition-all flex items-center justify-center cursor-pointer"
                        title="Düzenle"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProductClick(p.id)}
                        className="p-2.5 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-xl text-brand-burgundy transition-all flex items-center justify-center cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Products Table (Desktop) */}
            <div className="hidden md:block bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-[#160B0E]/80 border-b border-brand-gold/20 text-brand-gold text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Ürün</th>
                      <th className="px-6 py-4">Hizmet Türü</th>
                      <th className="px-6 py-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 text-brand-ivory/90">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#160B0E]/60 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={getDisplayImage(p.image)}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded-lg border border-brand-gold/20"
                          />
                          <span className="font-serif font-bold text-sm line-clamp-1">{p.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-brand-gold/20">
                            {p.type === "rental" ? "Kiralık" : p.type === "sale" ? "Satılık" : "Kiralık & Satılık"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-lg text-brand-gold transition-all cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProductClick(p.id)}
                              className="p-2 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-lg text-brand-burgundy transition-all cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= GALLERY LIST TAB ================= */}
        {activeTab === "gallery" && (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-brand-ivory">Galeri Görselleri</h3>
              <button
                onClick={handleAddGalleryClick}
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <Plus size={14} />
                Görsel Ekle
              </button>
            </div>

            {/* Gallery Card List (Mobile) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {gallery.length === 0 ? (
                <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-2xl text-center text-brand-ivory/40 text-xs">
                  Henüz görsel eklenmemiş.
                </div>
              ) : (
                gallery.map((item) => (
                  <div key={item.id} className="bg-[#1c0e12] border border-brand-gold/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded-lg border border-brand-gold/20 shrink-0"
                      />
                      <div className="overflow-hidden text-left">
                        <h4 className="font-serif font-bold text-brand-ivory text-sm truncate">{item.title}</h4>
                        <p className="text-brand-ivory/60 text-xs truncate mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handleEditGalleryClick(item)}
                        className="p-2.5 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-xl text-brand-gold transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryClick(item.id)}
                        className="p-2.5 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-xl text-brand-burgundy transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Gallery Table (Desktop) */}
            <div className="hidden md:block bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-[#160B0E]/80 border-b border-brand-gold/20 text-brand-gold text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Görsel</th>
                      <th className="px-6 py-4">Başlık</th>
                      <th className="px-6 py-4">Açıklama</th>
                      <th className="px-6 py-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 text-brand-ivory/90">
                    {gallery.map((item) => (
                      <tr key={item.id} className="hover:bg-[#160B0E]/60 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-lg border border-brand-gold/20"
                          />
                        </td>
                        <td className="px-6 py-4 font-serif font-bold text-sm">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 text-brand-ivory/60 text-xs">
                          {item.desc}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEditGalleryClick(item)}
                              className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-lg text-brand-gold transition-all cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteGalleryClick(item.id)}
                              className="p-2 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-lg text-brand-burgundy transition-all cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TESTIMONIALS LIST TAB ================= */}
        {activeTab === "testimonials" && (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-brand-ivory">Gelin Yorumları</h3>
              <button
                onClick={handleAddTestimonialClick}
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <Plus size={14} />
                Yorum Ekle
              </button>
            </div>

            {/* Testimonials Card List (Mobile) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {testimonials.length === 0 ? (
                <div className="bg-[#1c0e12] border border-brand-gold/10 p-8 rounded-2xl text-center text-brand-ivory/40 text-xs">
                  Henüz yorum eklenmemiş.
                </div>
              ) : (
                testimonials.map((t) => (
                  <div key={t.id} className="bg-[#1c0e12] border border-brand-gold/10 p-4 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4 className="font-serif font-bold text-brand-ivory text-sm">{t.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-brand-gold text-[10px] font-semibold">{t.model}</span>
                          <span className="text-brand-ivory/30">•</span>
                          <span className="text-brand-ivory/40 text-[10px]">{t.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-brand-gold">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={10} className="fill-brand-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="text-brand-ivory/80 text-xs italic bg-[#160B0E]/40 p-3 rounded-xl border border-brand-gold/5 text-left">
                      "{t.text}"
                    </p>
                    <div className="flex gap-3 justify-end pt-2 border-t border-brand-gold/5">
                      <button
                        onClick={() => handleEditTestimonialClick(t)}
                        className="flex-1 max-w-[120px] flex items-center justify-center gap-1.5 py-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-xl text-brand-gold text-xs font-sans font-bold transition-all cursor-pointer"
                      >
                        <Edit2 size={12} />
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonialClick(t.id)}
                        className="flex-1 max-w-[120px] flex items-center justify-center gap-1.5 py-2 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-xl text-brand-burgundy text-xs font-sans font-bold transition-all cursor-pointer"
                      >
                        <Trash2 size={12} />
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Testimonials Table (Desktop) */}
            <div className="hidden md:block bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-[#160B0E]/80 border-b border-brand-gold/20 text-brand-gold text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Gelin</th>
                      <th className="px-6 py-4">Model & Tarih</th>
                      <th className="px-6 py-4">Derece</th>
                      <th className="px-6 py-4">Yorum</th>
                      <th className="px-6 py-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 text-brand-ivory/90">
                    {testimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-[#160B0E]/60 transition-colors">
                        <td className="px-6 py-4 font-serif font-bold text-sm">
                          {t.name}
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <span className="text-brand-gold block font-semibold">{t.model}</span>
                          <span className="text-brand-ivory/40 block mt-0.5">{t.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-0.5 text-brand-gold">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-brand-gold" />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-brand-ivory/75 text-xs max-w-xs truncate" title={t.text}>
                          {t.text}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEditTestimonialClick(t)}
                              className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-lg text-brand-gold transition-all cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonialClick(t.id)}
                              className="p-2 bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/20 rounded-lg text-brand-burgundy transition-all cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTENT SETTINGS TAB ================= */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
            
            {/* Sidebar Subtabs */}
            <div className="lg:col-span-3 bg-[#1c0e12] border border-brand-gold/10 rounded-2xl p-1.5 lg:p-3 grid grid-cols-4 lg:flex lg:flex-col gap-1.5 lg:gap-2 shrink-0">
              <button
                onClick={() => setActiveContentSubTab("hero")}
                type="button"
                className={`px-2 py-3 lg:px-4 lg:py-3 rounded-xl font-sans text-[9px] lg:text-xs uppercase tracking-wider font-bold transition-all text-center lg:text-left flex justify-center lg:justify-between items-center gap-2 cursor-pointer ${
                  activeContentSubTab === "hero"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>
                  <span className="hidden lg:inline">Karşılama Alanı (Hero)</span>
                  <span className="lg:hidden">Karşılama</span>
                </span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
              <button
                onClick={() => setActiveContentSubTab("about")}
                type="button"
                className={`px-2 py-3 lg:px-4 lg:py-3 rounded-xl font-sans text-[9px] lg:text-xs uppercase tracking-wider font-bold transition-all text-center lg:text-left flex justify-center lg:justify-between items-center gap-2 cursor-pointer ${
                  activeContentSubTab === "about"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>
                  <span className="hidden lg:inline">Hakkımızda Alanı</span>
                  <span className="lg:hidden">Hakkımızda</span>
                </span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
              <button
                onClick={() => setActiveContentSubTab("promo")}
                type="button"
                className={`px-2 py-3 lg:px-4 lg:py-3 rounded-xl font-sans text-[9px] lg:text-xs uppercase tracking-wider font-bold transition-all text-center lg:text-left flex justify-center lg:justify-between items-center gap-2 cursor-pointer ${
                  activeContentSubTab === "promo"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>
                  <span className="hidden lg:inline">Öne Çıkan Görseller</span>
                  <span className="lg:hidden">Görseller</span>
                </span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
              <button
                onClick={() => setActiveContentSubTab("contact")}
                type="button"
                className={`px-2 py-3 lg:px-4 lg:py-3 rounded-xl font-sans text-[9px] lg:text-xs uppercase tracking-wider font-bold transition-all text-center lg:text-left flex justify-center lg:justify-between items-center gap-2 cursor-pointer ${
                  activeContentSubTab === "contact"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>
                  <span className="hidden lg:inline">İletişim & Randevu</span>
                  <span className="lg:hidden">İletişim</span>
                </span>
                <ChevronRight size={14} className="hidden lg:block" />
              </button>
            </div>

            {/* Subtab Content Form */}
            <div className="lg:col-span-9 bg-[#1c0e12] border border-brand-gold/15 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
              <form onSubmit={handleSavePageSettings} className="space-y-6">
                
                {/* HERO SUBTAB */}
                {activeContentSubTab === "hero" && (
                  <div className="space-y-5">
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2 text-left">
                      <FileText size={18} />
                      Karşılama Alanı (Hero) İçerikleri
                    </h3>


                    <div className="text-left">
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Büyük Başlık</label>
                      <input
                        type="text"
                        value={homeFields.heroTitle}
                        onChange={(e) => setHomeFields((p) => ({ ...p, heroTitle: e.target.value }))}
                        placeholder="Örn. En Özel Gününüzde Saray İhtişamı"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Alt Başlık & Tanıtım Metni</label>
                      <textarea
                        value={homeFields.heroSubtitle}
                        onChange={(e) => setHomeFields((p) => ({ ...p, heroSubtitle: e.target.value }))}
                        rows="3"
                        placeholder="Kısa bir karşılama sloganı yazın..."
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <ImageUploadField
                      label="Arka Plan Görseli"
                      value={homeFields.heroBgImage}
                      onChange={(url) => setHomeFields((p) => ({ ...p, heroBgImage: url }))}
                      placeholder="Yüksek çözünürlüklü Unsplash veya görsel linki..."
                    />
                  </div>
                )}

                {/* ABOUT SUBTAB */}
                {activeContentSubTab === "about" && (
                  <div className="space-y-5">
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2 text-left">
                      <Info size={18} />
                      Hakkımızda Alanı İçerikleri
                    </h3>

                    <div className="text-left">
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Bölüm Başlığı</label>
                      <input
                        type="text"
                        value={homeFields.aboutTitle}
                        onChange={(e) => setHomeFields((p) => ({ ...p, aboutTitle: e.target.value }))}
                        placeholder="Örn. Gecenizin Yıldızı Olmaya Hazırlanın"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Deneyim Yılı Göstergesi</label>
                        <input
                          type="text"
                          value={homeFields.aboutYears}
                          onChange={(e) => setHomeFields((p) => ({ ...p, aboutYears: e.target.value }))}
                          placeholder="Örn. 30+"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Hakkımızda Detaylı Açıklama</label>
                      <textarea
                        value={homeFields.aboutDesc}
                        onChange={(e) => setHomeFields((p) => ({ ...p, aboutDesc: e.target.value }))}
                        rows="6"
                        placeholder="Hakkımızda hikayesini ve açıklamasını yazın..."
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <ImageUploadField
                      label="Showroom Görseli"
                      value={homeFields.aboutImage}
                      onChange={(url) => setHomeFields((p) => ({ ...p, aboutImage: url }))}
                      placeholder="Showroom veya dükkan görseli linki..."
                    />
                  </div>
                )}

                {/* PROMO SUBTAB */}
                {activeContentSubTab === "promo" && (
                  <div className="space-y-5">
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2 text-left">
                      <FileText size={18} />
                      Ana Sayfa Öne Çıkan Kart Görselleri
                    </h3>
                    
                    <ImageUploadField
                      label="Kiralık Modeller Kart Görseli"
                      value={homeFields.promo1Image}
                      onChange={(url) => setHomeFields((p) => ({ ...p, promo1Image: url }))}
                      placeholder="Kiralık modeller tanıtım görseli..."
                    />

                    <ImageUploadField
                      label="Satılık Modeller Kart Görseli"
                      value={homeFields.promo2Image}
                      onChange={(url) => setHomeFields((p) => ({ ...p, promo2Image: url }))}
                      placeholder="Satılık modeller tanıtım görseli..."
                    />

                  </div>
                )}

                {/* CONTACT SUBTAB */}
                {activeContentSubTab === "contact" && (
                  <div className="space-y-5 text-left">
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2">
                      <Phone size={18} />
                      İletişim Bilgileri & Saatler
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Telefon Numarası (Görünür)</label>
                        <input
                          type="text"
                          value={contactFields.phone}
                          onChange={(e) => setContactFields((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="Örn. 0507 717 91 13"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">WhatsApp Telefon No (Sadece Sayı)</label>
                        <input
                          type="text"
                          value={contactFields.whatsapp}
                          onChange={(e) => setContactFields((p) => ({ ...p, whatsapp: e.target.value }))}
                          placeholder="Örn. 905077179113"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">E-Posta Adresi</label>
                        <input
                          type="email"
                          value={contactFields.email}
                          onChange={(e) => setContactFields((p) => ({ ...p, email: e.target.value }))}
                          placeholder="info@soamourbindalli.com"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Çalışma Saatleri</label>
                        <input
                          type="text"
                          value={contactFields.hours}
                          onChange={(e) => setContactFields((p) => ({ ...p, hours: e.target.value }))}
                          placeholder="Her Gün: 10:00 - 19:30"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Saat Alt Bilgisi (Örn. Randevu Durumu)</label>
                      <input
                        type="text"
                        value={contactFields.hoursSub}
                        onChange={(e) => setContactFields((p) => ({ ...p, hoursSub: e.target.value }))}
                        placeholder="(Randevulu Hizmet)"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Showroom Adresi</label>
                      <textarea
                        value={contactFields.address}
                        onChange={(e) => setContactFields((p) => ({ ...p, address: e.target.value }))}
                        rows="3"
                        placeholder="Mağaza açık adresini girin..."
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-brand-gold/10 text-right">
                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
                  >
                    <Save size={16} />
                    Değişiklikleri Kaydet
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>

      {/* ================= PRODUCT ADD/EDIT MODAL ================= */}
      {showProductModal && (
        <div className="fixed inset-0 z-55 bg-[#160B0E]/90 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-[#1c0e12] border-t md:border border-brand-gold/30 rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-brand-gold/10 text-left shrink-0">
              <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-gold">
                {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                type="button"
                className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 overflow-hidden">
              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-4 md:p-6 space-y-4 text-left flex-1">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Ürün Adı</label>
                  <input
                    type="text"
                    required
                    value={productFields.name}
                    onChange={(e) => setProductFields((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Örn. Yakut Saten Kaftan"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Hizmet Türü</label>
                  <select
                    value={productFields.type}
                    onChange={(e) => setProductFields((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none cursor-pointer"
                  >
                    <option value="rental-sale" className="bg-[#160B0E]">Kiralık & Satılık</option>
                    <option value="rental" className="bg-[#160B0E]">Sadece Kiralık</option>
                    <option value="sale" className="bg-[#160B0E]">Sadece Satılık</option>
                  </select>
                </div>

                <MultipleImageUploadField
                  label="Görseller"
                  images={productFields.images}
                  onChange={(urls) => setProductFields((prev) => ({ ...prev, images: urls }))}
                />

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Ürün Özellikleri (Virgülle Ayırın)</label>
                  <input
                    type="text"
                    value={productFields.features}
                    onChange={(e) => setProductFields((prev) => ({ ...prev, features: e.target.value }))}
                    placeholder="Kadife Kumaş, El İşçiliği Sırma, Pelerin Dahil..."
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Açıklama</label>
                  <textarea
                    value={productFields.description}
                    onChange={(e) => setProductFields((prev) => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    placeholder="Ürün açıklamasını buraya yazın..."
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 p-4 md:p-6 border-t border-brand-gold/10 bg-[#1c0e12] shrink-0">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-bold py-3.5 rounded-xl transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer text-center"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 rounded-xl shadow-lg transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= GALLERY ADD/EDIT MODAL ================= */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-55 bg-[#160B0E]/90 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-[#1c0e12] border-t md:border border-brand-gold/30 rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-brand-gold/10 text-left shrink-0">
              <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-gold">
                {editingGallery ? "Galeri Görselini Düzenle" : "Yeni Görsel Ekle"}
              </h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                type="button"
                className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveGallery} className="flex flex-col flex-1 overflow-hidden">
              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-4 md:p-6 space-y-4 text-left flex-1">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Görsel Başlığı</label>
                  <input
                    type="text"
                    required
                    value={galleryFields.title}
                    onChange={(e) => setGalleryFields((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Örn. Gelinimiz Zeynep'in Kına Çıkışı"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Görsel Açıklaması</label>
                  <input
                    type="text"
                    value={galleryFields.desc}
                    onChange={(e) => setGalleryFields((prev) => ({ ...prev, desc: e.target.value }))}
                    placeholder="Örn. Zümrüt Kaftan modelimiz ile"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>

                <ImageUploadField
                  label="Görsel"
                  value={galleryFields.url}
                  onChange={(url) => setGalleryFields((prev) => ({ ...prev, url: url }))}
                  placeholder="Görsel URL veya dosya yükleyin..."
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 p-4 md:p-6 border-t border-brand-gold/10 bg-[#1c0e12] shrink-0">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="flex-1 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-bold py-3.5 rounded-xl transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer text-center"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 rounded-xl shadow-lg transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= TESTIMONIAL ADD/EDIT MODAL ================= */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-55 bg-[#160B0E]/90 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-[#1c0e12] border-t md:border border-brand-gold/30 rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-brand-gold/10 text-left shrink-0">
              <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-gold">
                {editingTestimonial ? "Yorumu Düzenle" : "Yeni Yorum Ekle"}
              </h3>
              <button
                onClick={() => setShowTestimonialModal(false)}
                type="button"
                className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveTestimonial} className="flex flex-col flex-1 overflow-hidden">
              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-4 md:p-6 space-y-4 text-left flex-1">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Gelin Adı Soyadı</label>
                  <input
                    type="text"
                    required
                    value={testimonialFields.name}
                    onChange={(e) => setTestimonialFields((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Örn. Elif Yılmaz"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Tercih Ettiği Model</label>
                    <input
                      type="text"
                      value={testimonialFields.model}
                      onChange={(e) => setTestimonialFields((prev) => ({ ...prev, model: e.target.value }))}
                      placeholder="Örn. Yakut Kırmızı Kadife Kaftan"
                      className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Kına Tarihi / Dönemi</label>
                    <input
                      type="text"
                      value={testimonialFields.date}
                      onChange={(e) => setTestimonialFields((prev) => ({ ...prev, date: e.target.value }))}
                      placeholder="Örn. Haziran 2025"
                      className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Derecelendirme (Yıldız Sayısı)</label>
                  <select
                    value={testimonialFields.rating}
                    onChange={(e) => setTestimonialFields((prev) => ({ ...prev, rating: e.target.value }))}
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none cursor-pointer text-brand-ivory"
                  >
                    <option value="5" className="bg-[#160B0E]">5 Yıldız ★★★★★</option>
                    <option value="4" className="bg-[#160B0E]">4 Yıldız ★★★★</option>
                    <option value="3" className="bg-[#160B0E]">3 Yıldız ★★★</option>
                    <option value="2" className="bg-[#160B0E]">2 Yıldız ★★</option>
                    <option value="1" className="bg-[#160B0E]">1 Yıldız ★</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Değerlendirme Yorumu</label>
                  <textarea
                    required
                    value={testimonialFields.text}
                    onChange={(e) => setTestimonialFields((prev) => ({ ...prev, text: e.target.value }))}
                    rows="3"
                    placeholder="Gelinimizin yorumunu buraya yazın..."
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none mb-4"
                  />
                </div>

                <ImageUploadField
                  label="Gelin Fotoğrafı (İsteğe Bağlı)"
                  value={testimonialFields.image}
                  onChange={(url) => setTestimonialFields((prev) => ({ ...prev, image: url }))}
                  placeholder="Görsel linki yükleyin veya yapıştırın..."
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 p-4 md:p-6 border-t border-brand-gold/10 bg-[#1c0e12] shrink-0">
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  className="flex-1 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-bold py-3.5 rounded-xl transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer text-center"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 rounded-xl shadow-lg transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploadField({ label, value, onChange, placeholder }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Yüklemek için bir görsel seçmelisiniz.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (data && data.publicUrl) {
        onChange(data.publicUrl);
      }
    } catch (error) {
      alert("Görsel yüklenirken hata oluştu! Lütfen Supabase Storage panelinizde 'images' isminde, Public (herkese açık) bir bucket oluşturduğunuzdan emin olun.\\n\\nHata detayı: " + error.message);
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold">{label}</label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Resim linki..."}
            className="flex-1 bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all text-sm"
          />
          <label className="flex items-center justify-center bg-brand-gold hover:bg-brand-gold-light text-[#160B0E] font-sans font-bold px-4 rounded-xl cursor-pointer transition-all gap-2 text-sm shrink-0 min-w-[120px]">
            {uploading ? (
              <span className="animate-spin h-4 w-4 border-2 border-[#160B0E] border-t-transparent rounded-full"></span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                Yükle
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
        {value && (
          <div className="relative group w-20 h-20 rounded-lg overflow-hidden border border-brand-gold/20 bg-black/40">
            <img src={value} alt="Önizleme" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-0 bg-red-950/80 text-red-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
            >
              Kaldır
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MultipleImageUploadField({ label, images = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const handleUpload = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);
      const uploadedUrls = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (data && data.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }

      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      alert("Görseller yüklenirken hata oluştu! Hata detayı: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      onChange([...images, newUrl.trim()]);
      setNewUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMakeMain = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold">{label}</label>
      
      {/* Existing Images Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-[#160B0E]/40 border border-brand-gold/15 p-4 rounded-2xl">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-brand-gold/20 bg-black/40 flex flex-col justify-between">
              <img src={img} alt={`Görsel ${index + 1}`} className="w-full h-full object-cover" />
              
              {/* Main image badge */}
              {index === 0 ? (
                <div className="absolute top-2 left-2 bg-brand-gold text-[#160B0E] text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-md">
                  Ana Görsel
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMakeMain(index)}
                  className="absolute top-2 left-2 bg-black/75 hover:bg-brand-gold hover:text-[#160B0E] text-brand-gold text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  Ana Yap
                </button>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-brand-burgundy text-brand-ivory text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-md hover:bg-red-750 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                Kaldır
              </button>
              
              {/* Index indicator */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-brand-ivory/80 text-[10px] px-1.5 py-0.5 rounded-md font-sans">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Image Area */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Yeni görsel URL'si ekleyin..."
            className="flex-1 bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all text-sm"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="bg-[#160B0E]/60 border border-brand-gold/20 hover:border-brand-gold text-brand-gold font-sans font-bold px-4 rounded-xl cursor-pointer transition-all text-sm shrink-0 min-w-[80px]"
          >
            Ekle
          </button>
          
          <label className="flex items-center justify-center bg-brand-gold hover:bg-brand-gold-light text-[#160B0E] font-sans font-bold px-4 rounded-xl cursor-pointer transition-all gap-2 text-sm shrink-0 min-w-[120px]">
            {uploading ? (
              <span className="animate-spin h-4 w-4 border-2 border-[#160B0E] border-t-transparent rounded-full"></span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                Dosya Yükle
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-[10px] text-brand-ivory/40 italic pl-1">
          * Birden fazla görsel seçerek toplu olarak da yükleyebilirsiniz. İlk görsel otomatik olarak ana kapak görseli olur.
        </p>
      </div>
    </div>
  );
}
