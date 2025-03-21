import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Icon from Lucide-react (optional)

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to check scroll position
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Show button after 300px scroll
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 bg-[#8a8a8a] text-white p-3 rounded-full shadow-md transition-opacity duration-200 
        ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
