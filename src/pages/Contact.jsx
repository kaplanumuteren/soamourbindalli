import { useEffect } from "react";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-12 bg-[#160B0E] min-h-screen">
      <ContactForm />
    </div>
  );
}
