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

function App() {
  return (
    <Router>
      <div className="bg-[#160B0E] text-brand-ivory min-h-screen selection:bg-brand-gold selection:text-[#160B0E] overflow-x-hidden font-sans flex flex-col justify-between">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/koleksiyon" element={<Collection />} />
            <Route path="/urun/:id" element={<ProductDetail />} />
            <Route path="/galeri" element={<GalleryPage />} />
            <Route path="/iletisim" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;
