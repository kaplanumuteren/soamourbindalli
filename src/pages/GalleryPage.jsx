import { useEffect } from "react";
import Gallery from "../components/Gallery";

export default function GalleryPage({ galleryImages = [] }) {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-12 bg-[#160B0E] min-h-screen">
      <Gallery galleryImages={galleryImages} />
    </div>
  );
}
