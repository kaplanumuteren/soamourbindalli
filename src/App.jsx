import { useState } from "react";
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

// Data & Settings Defaults
import { products } from "./data/products";
import { galleryImages } from "./data/galleryData";
import { defaultHomeSettings, defaultContactSettings } from "./data/defaultSettings";

function AppContent({
  productsList, handleUpdateProducts,
  galleryList, handleUpdateGallery,
  homeSettings, handleUpdateHomeSettings,
  contactSettings, handleUpdateContactSettings
}) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="bg-[#160B0E] text-brand-ivory min-h-screen selection:bg-brand-gold selection:text-[#160B0E] overflow-x-hidden font-sans flex flex-col justify-between">
      <div>
        {!isAdminPage && <Navbar contactSettings={contactSettings} />}
        
        <Routes>
          <Route 
            path="/" 
            element={<Home homeSettings={homeSettings} galleryImages={galleryList} />} 
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
            element={<GalleryPage galleryImages={galleryList} />} 
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
                onUpdateProducts={handleUpdateProducts}
                gallery={galleryList}
                onUpdateGallery={handleUpdateGallery}
                homeSettings={homeSettings}
                onUpdateHomeSettings={handleUpdateHomeSettings}
                contactSettings={contactSettings}
                onUpdateContactSettings={handleUpdateContactSettings}
              />
            } 
          />
        </Routes>
      </div>
      
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingActions contactSettings={contactSettings} />}
    </div>
  );
}

function App() {
  // 1. Products State
  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem("soamour_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved products:", e);
      }
    }
    return products;
  });

  const handleUpdateProducts = (newList) => {
    setProductsList(newList);
    localStorage.setItem("soamour_products", JSON.stringify(newList));
  };

  // 2. Gallery State
  const [galleryList, setGalleryList] = useState(() => {
    const saved = localStorage.getItem("soamour_gallery");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved gallery:", e);
      }
    }
    return galleryImages;
  });

  const handleUpdateGallery = (newList) => {
    setGalleryList(newList);
    localStorage.setItem("soamour_gallery", JSON.stringify(newList));
  };

  // 3. Homepage Settings State
  const [homeSettings, setHomeSettings] = useState(() => {
    const saved = localStorage.getItem("soamour_home_settings_v3");
    if (saved) {
      try {
        return { ...defaultHomeSettings, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error parsing home settings:", e);
      }
    }
    return defaultHomeSettings;
  });

  const handleUpdateHomeSettings = (newSettings) => {
    setHomeSettings(newSettings);
    localStorage.setItem("soamour_home_settings_v3", JSON.stringify(newSettings));
  };

  // 4. Contact Settings State
  const [contactSettings, setContactSettings] = useState(() => {
    const saved = localStorage.getItem("soamour_contact_settings_v3");
    if (saved) {
      try {
        return { ...defaultContactSettings, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error parsing contact settings:", e);
      }
    }
    return defaultContactSettings;
  });

  const handleUpdateContactSettings = (newSettings) => {
    setContactSettings(newSettings);
    localStorage.setItem("soamour_contact_settings_v3", JSON.stringify(newSettings));
  };

  return (
    <Router>
      <AppContent 
        productsList={productsList}
        handleUpdateProducts={handleUpdateProducts}
        galleryList={galleryList}
        handleUpdateGallery={handleUpdateGallery}
        homeSettings={homeSettings}
        handleUpdateHomeSettings={handleUpdateHomeSettings}
        contactSettings={contactSettings}
        handleUpdateContactSettings={handleUpdateContactSettings}
      />
    </Router>
  );
}

export default App;
