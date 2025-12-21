import {
  FaChevronUp,
  FaFacebookF,
  FaSeedling,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "../Header/btf-logo.png";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = {
    col1: [
      "Home",
      "Ash Storage",
      "Contact Us",
      "Disclaimer & Terms",
      "Refund Policy",
    ],
    col2: [
      "Agreement",
      "Signature",
      "Payment Terms",
      "Privacy Policy",
      "Service Area",
    ],
    col3: ["Blog", "FAQ", "Landing Page", "Pay Now", "Testimonials"],
  };

  return (
    <footer className="bg-surface pt-16 pb-8 border-t border-gray-200 relative">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex items-start">
            <div className="flex items-center gap-3">
              <img className="h-[130px]" src={logo} alt="" />
            </div>
          </div>

          {/* Links Columns */}
          {[links.col1, links.col2, links.col3].map((col, idx) => (
            <div key={idx} className="space-y-3 text-sm font-body">
              {col.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-700 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-body">
          <p>Copyright © 2025 blacktulipfunerals. All rights reserved.</p>
          <div className="flex space-x-4">
            {[<FaFacebookF />, <FaTwitter />, <FaYoutube />].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-black text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={scrollToTop}
          className="bg-gray-700 text-white w-10 h-10 rounded flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors"
        >
          <FaChevronUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
