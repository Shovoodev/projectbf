import { useState } from "react";
import { FaBars, FaChevronDown, FaPhone, FaSeedling } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = ["Home", "Packages", "BTF", "Options", "Info", "Agreement"];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 font-body">
      <div className="section-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <FaSeedling className="text-3xl text-primary" />
            <div className="hidden sm:block">
              <span className="block text-lg font-bold tracking-widest uppercase leading-none font-display">
                Black Tulip
              </span>
              <span className="block text-xs tracking-[0.2em] uppercase text-gray-500">
                Funerals
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-primary transition-colors flex items-center gap-1 group"
              >
                {link}
                {["Packages", "BTF", "Options", "Info"].includes(link) && (
                  <FaChevronDown className="text-[10px] group-hover:mt-1 transition-all" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center">
            <a
              href="tel:1300110031"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <FaPhone className="mr-2 text-primary" /> 1300 11 0031
            </a>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="ml-4 lg:hidden p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Left to Right) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={toggleMenu}
        ></div>

        {/* Drawer Content */}
        <div
          className={`absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-xl font-bold uppercase">
                Menu
              </span>
              <button onClick={toggleMenu} className="p-2 text-gray-500">
                click here
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium text-gray-800 hover:text-primary border-b border-gray-100 pb-2"
                >
                  {link}
                </a>
              ))}
              <a href="tel:1300110031" className="btn-primary mt-4">
                <FaPhone className="mr-2" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
