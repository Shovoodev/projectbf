import {
  FaChevronUp,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
const FooterWithoutLinks = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className=" pt-2 pb-8 border-t border-gray-200 relative">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">

        {/* Bottom Bar */}
        <div className=" border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-body">
          <p>
            Copyright © {new Date().getFullYear()} OVANTA Pty Ltd. All rights reserved.
          </p>
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

export default FooterWithoutLinks;
