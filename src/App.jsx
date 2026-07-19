import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import About from "./pages/About";

// Supabase Client
import { supabase } from "./supabaseClient";

// Data & Settings Defaults
import { products } from "./data/products";
import { galleryImages } from "./data/galleryData";
import { defaultHomeSettings, defaultContactSettings } from "./data/defaultSettings";

function AppContent({
  productsList,
  galleryList,
  homeSettings,
  contactSettings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddGallery,
  onUpdateGallery,
  onDeleteGallery,
  onUpdateHomeSettings,
  onUpdateContactSettings,
  testimonialsList,
  onAddTestimonial,
  onUpdateTestimonial,
  onDeleteTestimonial,
  isLoading
}) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  if (isLoading && !isAdminPage) {
    return (
      <div className="bg-[#160B0E] text-brand-ivory min-h-screen flex items-center justify-center font-serif text-2xl tracking-widest uppercase">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-brand-gold text-sm font-sans font-bold tracking-[0.2em]">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#160B0E] text-brand-ivory min-h-screen selection:bg-brand-gold selection:text-[#160B0E] overflow-x-hidden font-sans flex flex-col justify-between">
      <div>
        {!isAdminPage && <Navbar contactSettings={contactSettings} />}
        
        <Routes>
          <Route 
            path="/" 
            element={<Home homeSettings={homeSettings} galleryImages={galleryList} testimonials={testimonialsList} />} 
          />
          <Route 
            path="/hakkimizda" 
            element={<About homeSettings={homeSettings} contactSettings={contactSettings} />} 
          />
          <Route 
            path="/koleksiyon" 
            element={<Collection products={productsList} />} 
          />
          <Route 
            path="/urun/:id" 
            element={<ProductDetail products={productsList} contactSettings={contactSettings} />} 
          />
          <Route 
            path="/galeri" 
            element={
              <GalleryPage 
                galleryImages={testimonialsList
                  .filter((t) => t.image)
                  .map((t) => ({
                    id: t.id,
                    url: t.image,
                    title: t.name,
                    desc: `${t.model || "Bindallı"} - ${t.date || ""}`
                  }))
                } 
              />
            } 
          />
          <Route 
            path="/iletisim" 
            element={<Contact contactSettings={contactSettings} />} 
          />
          <Route 
            path="/admin" 
            element={
              <Admin 
                products={productsList} 
                onAddProduct={onAddProduct}
                onUpdateProduct={onUpdateProduct}
                onDeleteProduct={onDeleteProduct}
                gallery={galleryList}
                onAddGallery={onAddGallery}
                onUpdateGallery={onUpdateGallery}
                onDeleteGallery={onDeleteGallery}
                homeSettings={homeSettings}
                onUpdateHomeSettings={onUpdateHomeSettings}
                contactSettings={contactSettings}
                onUpdateContactSettings={onUpdateContactSettings}
                testimonials={testimonialsList}
                onAddTestimonial={onAddTestimonial}
                onUpdateTestimonial={onUpdateTestimonial}
                onDeleteTestimonial={onDeleteTestimonial}
              />
            } 
          />
        </Routes>
      </div>
      
      {!isAdminPage && <Footer contactSettings={contactSettings} />}
      {!isAdminPage && <FloatingActions contactSettings={contactSettings} />}
    </div>
  );
}

function App() {
  const [productsList, setProductsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [homeSettings, setHomeSettings] = useState(defaultHomeSettings);
  const [contactSettings, setContactSettings] = useState(defaultContactSettings);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and Sync Supabase Data
  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchProducts(),
          fetchGallery(),
          fetchSettings()
        ]);
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  // 1. Fetch Products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProductsList(data || []);
  };

  // 2. Fetch Gallery
  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) {
      console.error("Error fetching gallery:", error);
      return;
    }

    const formatted = (data || []).map(item => ({
      id: item.id,
      title: item.title,
      desc: item.description,
      url: item.url
    }));
    setGalleryList(formatted);
  };

  // 3. Fetch Settings
  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("*");
    
    if (error) {
      console.error("Error fetching settings:", error);
      return;
    }

    let home = defaultHomeSettings;
    let contact = defaultContactSettings;
    let testimonials = [];

    if (data && data.length > 0) {
      const homeRow = data.find(r => r.key === "home");
      const contactRow = data.find(r => r.key === "contact");
      const testimonialsRow = data.find(r => r.key === "testimonials");
      
      if (homeRow) home = { ...defaultHomeSettings, ...homeRow.value };
      if (contactRow) contact = { ...defaultContactSettings, ...contactRow.value };
      
      if (testimonialsRow) {
        testimonials = testimonialsRow.value;
      } else {
        // Seed testimonials row in existing settings table
        const { error: seedErr } = await supabase
          .from("settings")
          .insert({ key: "testimonials", value: testimonials });
        if (seedErr) console.error("Error seeding testimonials:", seedErr);
      }
    } else {
      // Seed all defaults
      const { error: seedErr } = await supabase
        .from("settings")
        .insert([
          { key: "home", value: defaultHomeSettings },
          { key: "contact", value: defaultContactSettings },
          { key: "testimonials", value: testimonials }
        ]);
      if (seedErr) console.error("Error seeding settings:", seedErr);
    }
    setHomeSettings(home);
    setContactSettings(contact);
    setTestimonialsList(testimonials);
  };

  // ----------------------------------------------------
  // PRODUCTS CRUD HANDLERS
  // ----------------------------------------------------
  const handleAddProduct = async (productData) => {
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select();
    
    if (error) {
      alert("Ürün eklenirken bir hata oluştu: " + error.message);
    } else if (data) {
      setProductsList([...productsList, data[0]]);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const { id, ...fieldsToUpdate } = updatedProduct;
    const { data, error } = await supabase
      .from("products")
      .update(fieldsToUpdate)
      .eq("id", id)
      .select();
    
    if (error) {
      alert("Ürün güncellenirken bir hata oluştu: " + error.message);
    } else if (data) {
      setProductsList(productsList.map(p => p.id === updatedProduct.id ? data[0] : p));
    }
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    
    if (error) {
      alert("Ürün silinirken bir hata oluştu: " + error.message);
    } else {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  // ----------------------------------------------------
  // GALLERY CRUD HANDLERS
  // ----------------------------------------------------
  const handleAddGallery = async (galleryData) => {
    const dbData = {
      title: galleryData.title,
      description: galleryData.desc,
      url: galleryData.url
    };
    
    const { data, error } = await supabase
      .from("gallery")
      .insert(dbData)
      .select();
    
    if (error) {
      alert("Galeri görseli eklenirken bir hata oluştu: " + error.message);
    } else if (data) {
      const item = data[0];
      setGalleryList([...galleryList, { id: item.id, title: item.title, desc: item.description, url: item.url }]);
    }
  };

  const handleUpdateGallery = async (updatedItem) => {
    const dbData = {
      title: updatedItem.title,
      description: updatedItem.desc,
      url: updatedItem.url
    };
    
    const { data, error } = await supabase
      .from("gallery")
      .update(dbData)
      .eq("id", updatedItem.id)
      .select();
    
    if (error) {
      alert("Galeri görseli güncellenirken bir hata oluştu: " + error.message);
    } else if (data) {
      const item = data[0];
      setGalleryList(galleryList.map(g => g.id === item.id ? { id: item.id, title: item.title, desc: item.description, url: item.url } : g));
    }
  };

  const handleDeleteGallery = async (id) => {
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);
    
    if (error) {
      alert("Galeri görseli silinirken bir hata oluştu: " + error.message);
    } else {
      setGalleryList(galleryList.filter(g => g.id !== id));
    }
  };

  // ----------------------------------------------------
  // SETTINGS HANDLERS
  // ----------------------------------------------------
  const handleUpdateHomeSettings = async (newSettings) => {
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "home", value: newSettings });
    
    if (error) {
      alert("Ayarlar kaydedilirken bir hata oluştu: " + error.message);
    } else {
      setHomeSettings(newSettings);
    }
  };

  const handleUpdateContactSettings = async (newSettings) => {
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "contact", value: newSettings });
    
    if (error) {
      alert("Ayarlar kaydedilirken bir hata oluştu: " + error.message);
    } else {
      setContactSettings(newSettings);
    }
  };

  // ----------------------------------------------------
  // TESTIMONIALS CRUD HANDLERS
  // ----------------------------------------------------
  const handleUpdateTestimonials = async (newTestimonials) => {
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "testimonials", value: newTestimonials });
    
    if (error) {
      alert("Yorumlar kaydedilirken bir hata oluştu: " + error.message);
    } else {
      setTestimonialsList(newTestimonials);
    }
  };

  const handleAddTestimonial = (testimonialData) => {
    const newId = testimonialsList.length > 0 ? Math.max(...testimonialsList.map(t => t.id)) + 1 : 1;
    const updatedList = [...testimonialsList, { ...testimonialData, id: newId }];
    handleUpdateTestimonials(updatedList);
  };

  const handleUpdateTestimonial = (updatedTestimonial) => {
    const updatedList = testimonialsList.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t);
    handleUpdateTestimonials(updatedList);
  };

  const handleDeleteTestimonial = (id) => {
    const updatedList = testimonialsList.filter(t => t.id !== id);
    handleUpdateTestimonials(updatedList);
  };

  return (
    <Router>
      <AppContent 
        productsList={productsList}
        galleryList={galleryList}
        homeSettings={homeSettings}
        contactSettings={contactSettings}
        testimonialsList={testimonialsList}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddGallery={handleAddGallery}
        onUpdateGallery={handleUpdateGallery}
        onDeleteGallery={handleDeleteGallery}
        onUpdateHomeSettings={handleUpdateHomeSettings}
        onUpdateContactSettings={handleUpdateContactSettings}
        onAddTestimonial={handleAddTestimonial}
        onUpdateTestimonial={handleUpdateTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        isLoading={isLoading}
      />
    </Router>
  );
}

export default App;
