import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronDown, FaPhone, FaSeedling } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 font-body">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <FaSeedling className="text-3xl text-primary" />
            <div className="hidden sm:block">
              <span className="block text-lg font-bold tracking-widest uppercase leading-none font-display">
                Black Tulip
              </span>
              <span className="block text-xs tracking-[0.2em] uppercase text-gray-500">
                Funerals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>

            {/* Packages Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary">
                Packages <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/packages/basic" className="dropdown-item">
                  Basic Package
                </Link>
                <Link to="/packages/standard" className="dropdown-item">
                  Standard Package
                </Link>
                <Link to="/packages/premium" className="dropdown-item">
                  Premium Package
                </Link>
              </div>
            </div>

            {/* BTF Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary">
                BTF <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/team" className="dropdown-item">
                  Team
                </Link>
                <Link to="/contact" className="dropdown-item">
                  Contact
                </Link>
                <Link to="/news" className="dropdown-item">
                  News
                </Link>
              </div>
            </div>

            <Link to="/options" className="hover:text-primary">
              Options
            </Link>

            <Link to="/info" className="hover:text-primary">
              Info
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center">
            <a
              href="tel:1300110031"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-900 hover:bg-gray-50"
            >
              <FaPhone className="mr-2 text-primary" /> 1300 11 0031
            </a>

            <button
              onClick={toggleMenu}
              className="ml-4 lg:hidden p-2 text-gray-500"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={toggleMenu}
        ></div>

        <div
          className={`absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-xl transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <Link to="/" className="block text-lg font-bold mb-6">
              Home
            </Link>

            {/* Packages */}
            <button
              onClick={() => toggleMobileDropdown("packages")}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              Packages <FaChevronDown />
            </button>
            {openMobileDropdown === "packages" && (
              <div className="ml-4 mb-4 space-y-2">
                <Link to="/packages/basic">Basic Package</Link>
                <Link to="/packages/standard">Standard Package</Link>
                <Link to="/packages/premium">Premium Package</Link>
              </div>
            )}

            {/* BTF */}
            <button
              onClick={() => toggleMobileDropdown("btf")}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              BTF <FaChevronDown />
            </button>
            {openMobileDropdown === "btf" && (
              <div className="ml-4 mb-4 space-y-2">
                <Link to="/team">Team</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/news">News</Link>
              </div>
            )}

            <Link to="/options" className="block text-lg mb-4">
              Options
            </Link>
            <Link to="/info" className="block text-lg mb-6">
              Info
            </Link>

            <a href="tel:1300110031" className="btn-primary">
              <FaPhone className="mr-2" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
