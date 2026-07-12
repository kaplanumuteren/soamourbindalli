import { useState, useEffect } from "react";
import { 
  Plus, Edit2, Trash2, LogOut, Package, Grid, 
  DollarSign, List, ShieldAlert, Sparkles, Save, X 
} from "lucide-react";

export default function Admin({ products, onUpdateProducts }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // CRUD States
  const [activeTab, setActiveTab] = useState("overview"); // overview, products
  const [editingProduct, setEditingProduct] = useState(null); // null for adding new, product object for editing
  const [showFormModal, setShowFormModal] = useState(false);

  // Form Fields
  const [formFields, setFormFields] = useState({
    name: "",
    category: "kaftan",
    type: "rental-sale",
    priceRental: "",
    priceSale: "",
    description: "",
    image: "",
    features: ""
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "soamouradmin") {
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

  // Open modal for Adding Product
  const handleAddClick = () => {
    setEditingProduct(null);
    setFormFields({
      name: "",
      category: "kaftan",
      type: "rental-sale",
      priceRental: "",
      priceSale: "",
      description: "",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
      features: ""
    });
    setShowFormModal(true);
  };

  // Open modal for Editing Product
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormFields({
      name: product.name,
      category: product.category,
      type: product.type,
      priceRental: product.priceRental || "",
      priceSale: product.priceSale || "",
      description: product.description || "",
      image: product.image || "",
      features: product.features ? product.features.join(", ") : ""
    });
    setShowFormModal(true);
  };

  // Handle Delete Product
  const handleDeleteClick = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
    }
  };

  // Handle Save Product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (!formFields.name || !formFields.image) {
      alert("Lütfen ürün adı ve görsel URL alanlarını doldurun.");
      return;
    }

    const formattedFeatures = formFields.features
      ? formFields.features.split(",").map((f) => f.trim()).filter((f) => f !== "")
      : [];

    const productData = {
      name: formFields.name,
      category: formFields.category,
      type: formFields.type,
      priceRental: formFields.priceRental ? parseInt(formFields.priceRental) : null,
      priceSale: formFields.priceSale ? parseInt(formFields.priceSale) : null,
      description: formFields.description,
      image: formFields.image,
      features: formattedFeatures
    };

    if (editingProduct) {
      // Update
      const updated = products.map((p) => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      );
      onUpdateProducts(updated);
    } else {
      // Add
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const updated = [...products, { id: newId, ...productData }];
      onUpdateProducts(updated);
    }

    setShowFormModal(false);
    setEditingProduct(null);
  };

  // Count Statistics
  const totalProducts = products.length;
  const kaftansCount = products.filter((p) => p.category === "kaftan").length;
  const dressesCount = products.filter((p) => p.category === "dress").length;
  const accessoriesCount = products.filter((p) => p.category === "accessory").length;

  // Render Login Page
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-brand-gold/10 pb-6 mb-8 gap-4">
          <div>
            <span className="text-brand-gold text-sm font-sans uppercase tracking-[0.2em] font-semibold">
              KONTROL PANELİ
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-ivory mt-1">
              Yönetici Paneli
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-brand-burgundy text-brand-ivory hover:bg-brand-burgundy hover:text-brand-ivory font-sans font-semibold px-4 py-2.5 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
          >
            <LogOut size={14} />
            Güvenli Çıkış
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-brand-gold/10 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-sans font-semibold text-sm tracking-wide border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-ivory/60 hover:text-brand-gold"
            }`}
          >
            <Grid size={16} />
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-sans font-semibold text-sm tracking-wide border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === "products"
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-ivory/60 hover:text-brand-gold"
            }`}
          >
            <List size={16} />
            Ürün Yönetimi
          </button>
        </div>

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-4 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Package size={26} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-xs font-sans uppercase tracking-wider">Toplam Ürün</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mt-1">{totalProducts} Adet</h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-4 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Sparkles size={26} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-xs font-sans uppercase tracking-wider">Kaftan & Bindallı</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mt-1">{kaftansCount} Adet</h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-4 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <Sparkles size={26} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-xs font-sans uppercase tracking-wider">Kına Elbisesi</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mt-1">{dressesCount} Adet</h3>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#160B0E]/40 border border-brand-gold/10 p-6 rounded-2xl flex items-center gap-5 shadow-lg">
                <div className="p-4 bg-brand-gold/10 rounded-xl text-brand-gold border border-brand-gold/20">
                  <DollarSign size={26} />
                </div>
                <div>
                  <span className="text-brand-ivory/40 text-xs font-sans uppercase tracking-wider">Aksesuar</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-ivory mt-1">{accessoriesCount} Adet</h3>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-[#160B0E]/40 border border-brand-gold/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-brand-ivory mb-4">Hızlı Aksiyonlar</h3>
              <p className="font-sans text-brand-ivory/60 text-sm mb-6">Aşağıdaki butonları kullanarak hızlıca yeni ürünler ekleyebilir veya doğrudan ürün listesine geçebilirsiniz.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddClick}
                  className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  <Plus size={16} />
                  Yeni Ürün Ekle
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className="flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold text-brand-ivory hover:bg-brand-gold/10 font-sans font-semibold px-6 py-3 rounded-xl transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  Ürün Listesini Yönet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRODUCTS LIST TAB ================= */}
        {activeTab === "products" && (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-brand-ivory">Koleksiyon Ürünleri</h3>
              <button
                onClick={handleAddClick}
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-[#160B0E] font-sans font-bold px-4 py-2 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
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
                      <th className="px-6 py-4">Kiralık Fiyatı</th>
                      <th className="px-6 py-4">Satılık Fiyatı</th>
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
                        <td className="px-6 py-4 font-semibold text-brand-gold">
                          {p.priceRental ? `${p.priceRental.toLocaleString("tr-TR")} ₺` : "-"}
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {p.priceSale ? `${p.priceSale.toLocaleString("tr-TR")} ₺` : "-"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-2 bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 rounded-lg text-brand-gold transition-all cursor-pointer"
                              title="Düzenle"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(p.id)}
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

      </div>

      {/* ================= ADD/EDIT FORM MODAL ================= */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-[#160B0E]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c0e12] border border-brand-gold/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 p-2 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-full text-brand-gold border border-brand-gold/20 transition-all z-10 cursor-pointer"
              title="Kapat"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-gold mb-6 border-b border-brand-gold/10 pb-4">
              {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-left">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Ürün Adı</label>
                <input
                  type="text"
                  required
                  value={formFields.name}
                  onChange={(e) => setFormFields((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Örn. Yakut Saten Kaftan"
                  className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Category */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Kategori</label>
                  <select
                    value={formFields.category}
                    onChange={(e) => setFormFields((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none cursor-pointer"
                  >
                    <option value="kaftan" className="bg-[#160B0E]">Kaftan & Bindallı</option>
                    <option value="dress" className="bg-[#160B0E]">Kına Elbisesi</option>
                    <option value="accessory" className="bg-[#160B0E]">Aksesuar</option>
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Hizmet Türü</label>
                  <select
                    value={formFields.type}
                    onChange={(e) => setFormFields((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none cursor-pointer"
                  >
                    <option value="rental-sale" className="bg-[#160B0E]">Kiralık & Satılık</option>
                    <option value="rental" className="bg-[#160B0E]">Sadece Kiralık</option>
                    <option value="sale" className="bg-[#160B0E]">Sadece Satılık</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Görsel URL</label>
                  <input
                    type="text"
                    required
                    value={formFields.image}
                    onChange={(e) => setFormFields((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="Resim linki..."
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Rental Price */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Kiralama Fiyatı (₺)</label>
                  <input
                    type="number"
                    disabled={formFields.type === "sale"}
                    value={formFields.priceRental}
                    onChange={(e) => setFormFields((prev) => ({ ...prev, priceRental: e.target.value }))}
                    placeholder="Örn. 4500 (Boş bırakabilirsiniz)"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all disabled:opacity-30"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Satın Alma Fiyatı (₺)</label>
                  <input
                    type="number"
                    disabled={formFields.type === "rental"}
                    value={formFields.priceSale}
                    onChange={(e) => setFormFields((prev) => ({ ...prev, priceSale: e.target.value }))}
                    placeholder="Örn. 12000 (Boş bırakabilirsiniz)"
                    className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all disabled:opacity-30"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Ürün Özellikleri (Virgülle Ayırın)</label>
                <input
                  type="text"
                  value={formFields.features}
                  onChange={(e) => setFormFields((prev) => ({ ...prev, features: e.target.value }))}
                  placeholder="Kadife Kumaş, El İşçiliği Sırma, Pelerin Dahil..."
                  className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-widest text-brand-gold mb-2">Açıklama</label>
                <textarea
                  value={formFields.description}
                  onChange={(e) => setFormFields((prev) => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  placeholder="Ürün açıklamasını buraya yazın..."
                  className="w-full bg-[#160B0E]/60 border border-brand-gold/20 focus:border-brand-gold rounded-xl py-3 px-4 text-brand-ivory font-sans focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-brand-gold/10">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
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
