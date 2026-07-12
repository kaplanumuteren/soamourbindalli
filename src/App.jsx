import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// Data
import { products } from "./data/products";

function App() {
  // Initialize products state from localStorage or fallback to default data
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

  // Handle updating products list (Add, Edit, Delete)
  const handleUpdateProducts = (newList) => {
    setProductsList(newList);
    localStorage.setItem("soamour_products", JSON.stringify(newList));
  };

  return (
    <Router>
      <div className="bg-[#160B0E] text-brand-ivory min-h-screen selection:bg-brand-gold selection:text-[#160B0E] overflow-x-hidden font-sans flex flex-col justify-between">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/koleksiyon" element={<Collection products={productsList} />} />
            <Route path="/urun/:id" element={<ProductDetail products={productsList} />} />
            <Route path="/galeri" element={<GalleryPage />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route 
              path="/admin" 
              element={<Admin products={productsList} onUpdateProducts={handleUpdateProducts} />} 
            />
          </Routes>
        </div>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;
