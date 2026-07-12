import { useState, useEffect } from "react";
import { 
  Plus, Edit2, Trash2, LogOut, Package, Grid, Image as ImageIcon,
  List, ShieldAlert, Sparkles, Save, X, Settings, Phone, MapPin, 
  Clock, Info, FileText, ChevronRight, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Admin({ 
  products, onAddProduct, onUpdateProduct, onDeleteProduct,
  gallery, onAddGallery, onUpdateGallery, onDeleteGallery,
  homeSettings, onUpdateHomeSettings,
  contactSettings, onUpdateContactSettings
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState("overview"); // overview, products, gallery, content
  const [activeContentSubTab, setActiveContentSubTab] = useState("hero"); // hero, about, contact

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  
  // Editing References
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);

  // Form Fields - Products
  const [productFields, setProductFields] = useState({
    name: "",
    category: "kaftan",
    type: "rental-sale",
    description: "",
    image: "",
    features: ""
  });

  // Form Fields - Gallery
  const [galleryFields, setGalleryFields] = useState({
    title: "",
    desc: "",
    url: ""
  });

  // Form Fields - Page Settings (Home & Contact)
  const [homeFields, setHomeFields] = useState({
    heroTag: "",
    heroTitle: "",
    heroSubtitle: "",
    heroBgImage: "",
    aboutTitle: "",
    aboutDesc: "",
    aboutYears: ""
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
        aboutYears: homeSettings.aboutYears || ""
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
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
      features: ""
    });
    setShowProductModal(true);
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setProductFields({
      name: product.name,
      category: product.category,
      type: product.type,
      description: product.description || "",
      image: product.image || "",
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
    if (!productFields.name || !productFields.image) {
      alert("Lütfen ürün adı ve görsel URL alanlarını doldurun.");
      return;
    }

    const formattedFeatures = productFields.features
      ? productFields.features.split(",").map((f) => f.trim()).filter((f) => f !== "")
      : [];

    const productData = {
      name: productFields.name,
      category: productFields.category,
      type: productFields.type,
      description: productFields.description,
      image: productFields.image,
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
  // PAGE SETTINGS SAVE
  // ----------------------------------------------------
  const handleSavePageSettings = (e) => {
    e.preventDefault();
    if (activeContentSubTab === "hero" || activeContentSubTab === "about") {
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
  const kaftansCount = products.filter((p) => p.category === "kaftan").length;
  const dressesCount = products.filter((p) => p.category === "dress").length;
  const accessoriesCount = products.filter((p) => p.category === "accessory").length;
  const totalGallery = gallery.length;

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
              Varsayılan Şifre: <code className="bg-[#160B0E] px-1.5 py-0.5 rounded text-brand-gold">soamouradmin</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#160B0E] min-h-screen text-left">
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
                onClick={() => setActiveTab("gallery")}
                className={`px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "gallery"
                    ? "text-brand-gold border-b-2 border-brand-gold pb-1"
                    : "text-brand-ivory hover:text-brand-gold"
                }`}
              >
                Galeri Yönetimi
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
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-1.5 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-semibold px-4 py-2 rounded-xl transition-all text-xs tracking-wider uppercase"
              >
                <ArrowLeft size={14} />
                Siteye Git
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 border border-brand-burgundy bg-brand-burgundy/10 hover:bg-brand-burgundy text-brand-ivory font-sans font-semibold px-4 py-2 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
              >
                <LogOut size={14} />
                Çıkış
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden border-t border-brand-gold/10 mt-3 pt-2 flex justify-around text-center">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
              activeTab === "overview" ? "text-brand-gold" : "text-brand-ivory/60"
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
              activeTab === "products" ? "text-brand-gold" : "text-brand-ivory/60"
            }`}
          >
            Ürünler
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
              activeTab === "gallery" ? "text-brand-gold" : "text-brand-ivory/60"
            }`}
          >
            Galeri
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
              activeTab === "content" ? "text-brand-gold" : "text-brand-ivory/60"
            }`}
          >
            İçerik
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-0">

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Package size={22} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-[10px] font-sans uppercase tracking-wider">Toplam Ürün</span>
                  <h3 className="font-serif text-xl font-bold text-brand-ivory mt-0.5">{totalProducts} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Sparkles size={22} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-[10px] font-sans uppercase tracking-wider">Kaftan & Bindallı</span>
                  <h3 className="font-serif text-xl font-bold text-brand-ivory mt-0.5">{kaftansCount} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Sparkles size={22} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-[10px] font-sans uppercase tracking-wider">Kına Elbisesi</span>
                  <h3 className="font-serif text-xl font-bold text-brand-ivory mt-0.5">{dressesCount} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Sparkles size={22} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-[10px] font-sans uppercase tracking-wider">Aksesuar</span>
                  <h3 className="font-serif text-xl font-bold text-brand-ivory mt-0.5">{accessoriesCount} Adet</h3>
                </div>
              </div>

              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-3.5 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <ImageIcon size={22} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-[10px] font-sans uppercase tracking-wider">Galeri Resmi</span>
                  <h3 className="font-serif text-xl font-bold text-brand-ivory mt-0.5">{totalGallery} Adet</h3>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-brand-ivory mb-4">Hızlı Aksiyonlar</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddProductClick}
                  className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  <Plus size={16} />
                  Yeni Ürün Ekle
                </button>
                <button
                  onClick={handleAddGalleryClick}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  <Plus size={16} />
                  Galeri Görseli Ekle
                </button>
                <button
                  onClick={() => setActiveTab("content")}
                  className="flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-semibold px-6 py-3 rounded-xl transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  <Settings size={16} />
                  Sayfa İçeriklerini Düzenle
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

            {/* Products Table */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-[#160B0E]/80 border-b border-brand-gold/20 text-brand-gold text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Ürün</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 text-brand-ivory/90">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#160B0E]/60 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded-lg border border-brand-gold/20"
                          />
                          <span className="font-serif font-bold text-sm line-clamp-1">{p.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-brand-gold/20">
                            {p.category === "kaftan"
                              ? "Kaftan"
                              : p.category === "dress"
                              ? "Elbise"
                              : "Aksesuar"}
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

            {/* Gallery Table */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl overflow-hidden shadow-2xl">
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

        {/* ================= CONTENT SETTINGS TAB ================= */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
            
            {/* Sidebar Subtabs */}
            <div className="lg:col-span-3 bg-[#1c0e12] border border-brand-gold/10 rounded-2xl p-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveContentSubTab("hero")}
                className={`w-full px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all text-left flex justify-between items-center cursor-pointer ${
                  activeContentSubTab === "hero"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>Karşılama Alanı (Hero)</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setActiveContentSubTab("about")}
                className={`w-full px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all text-left flex justify-between items-center cursor-pointer ${
                  activeContentSubTab === "about"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>Hakkımızda Alanı</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setActiveContentSubTab("contact")}
                className={`w-full px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all text-left flex justify-between items-center cursor-pointer ${
                  activeContentSubTab === "contact"
                    ? "bg-brand-gold text-[#160B0E]"
                    : "text-brand-ivory/60 hover:bg-brand-gold/10 hover:text-brand-gold"
                }`}
              >
                <span>İletişim & Randevu</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Subtab Content Form */}
            <div className="lg:col-span-9 bg-[#1c0e12] border border-brand-gold/15 p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSavePageSettings} className="space-y-6">
                
                {/* HERO SUBTAB */}
                {activeContentSubTab === "hero" && (
                  <div className="space-y-5">
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2">
                      <FileText size={18} />
                      Karşılama Alanı (Hero) İçerikleri
                    </h3>
                    
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Giriş Etiketi</label>
                      <input
                        type="text"
                        value={homeFields.heroTag}
                        onChange={(e) => setHomeFields((p) => ({ ...p, heroTag: e.target.value }))}
                        placeholder="Örn. Sarayların Büyüleyici Güzelliği"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Büyük Başlık</label>
                      <input
                        type="text"
                        value={homeFields.heroTitle}
                        onChange={(e) => setHomeFields((p) => ({ ...p, heroTitle: e.target.value }))}
                        placeholder="Örn. En Özel Gününüzde Saray İhtişamı"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div>
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
                    <h3 className="font-serif text-lg font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-3 flex items-center gap-2">
                      <Info size={18} />
                      Hakkımızda Alanı İçerikleri
                    </h3>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Bölüm Başlığı</label>
                      <input
                        type="text"
                        value={homeFields.aboutTitle}
                        onChange={(e) => setHomeFields((p) => ({ ...p, aboutTitle: e.target.value }))}
                        placeholder="Örn. Gecenizin Yıldızı Olmaya Hazırlanın"
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Hakkımızda Detaylı Açıklama</label>
                      <textarea
                        value={homeFields.aboutDesc}
                        onChange={(e) => setHomeFields((p) => ({ ...p, aboutDesc: e.target.value }))}
                        rows="6"
                        placeholder="Hakkımızda hikayesini ve açıklamasını yazın..."
                        className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* CONTACT SUBTAB */}
                {activeContentSubTab === "contact" && (
                  <div className="space-y-5">
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
                          placeholder="Örn. +90 (500) 000 00 00"
                          className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">WhatsApp Telefon No (Sadece Sayı)</label>
                        <input
                          type="text"
                          value={contactFields.whatsapp}
                          onChange={(e) => setContactFields((p) => ({ ...p, whatsapp: e.target.value }))}
                          placeholder="Örn. 905000000000"
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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
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
        <div className="fixed inset-0 z-55 bg-[#160B0E]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c0e12] border border-brand-gold/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer"
              title="Kapat"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-4">
              {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-left">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Kategori</label>
                  <select
                    value={productFields.category}
                    onChange={(e) => setProductFields((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none cursor-pointer"
                  >
                    <option value="kaftan" className="bg-[#160B0E]">Kaftan & Bindallı</option>
                    <option value="dress" className="bg-[#160B0E]">Kına Elbisesi</option>
                    <option value="accessory" className="bg-[#160B0E]">Aksesuar</option>
                  </select>
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
              </div>

              <ImageUploadField
                label="Görsel"
                value={productFields.image}
                onChange={(url) => setProductFields((prev) => ({ ...prev, image: url }))}
                placeholder="Görsel URL veya dosya yükleyin..."
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
                  rows="4"
                  placeholder="Ürün açıklamasını buraya yazın..."
                  className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-brand-gold/10">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-bold py-3.5 rounded-xl transition-all text-sm uppercase tracking-wider cursor-pointer text-center"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 z-55 bg-[#160B0E]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c0e12] border border-brand-gold/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all cursor-pointer"
              title="Kapat"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-4">
              {editingGallery ? "Galeri Görselini Düzenle" : "Yeni Görsel Ekle"}
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-5 text-left">
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

              <div className="flex gap-4 pt-4 border-t border-brand-gold/10">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="flex-1 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-bold py-3.5 rounded-xl transition-all text-sm uppercase tracking-wider cursor-pointer text-center"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-[#160B0E] font-sans font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
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
