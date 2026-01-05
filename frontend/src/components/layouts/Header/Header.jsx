import { useState } from "react";
import { FaBars, FaChevronDown, FaPhone } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import logo from "./btf-logo.png";
import { useUser } from "../../hooks/useUser";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const { user } = useUser();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 t font-body">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center h-26">
          {/* Logo */}
          <Link to="/" className="">
            <img className="h-[130px]" src={logo} alt="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center text-xl font-medium text-gray-700">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>

            {/* Packages Dropdown */}
            <div className="relative group">
              <button className=" flex items-center gap-1 hover:text-primary">
                Packages <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/packages/basic" className="dropdown-item">
                  Basic Package
                </Link>
                <Link
                  to="/packages/viewing-and-cremention"
                  className="dropdown-item"
                >
                  Standard Package
                </Link>
                <Link
                  to="/packages/no-service-cremention"
                  className="dropdown-item"
                >
                  Premium Package
                </Link>
              </div>
            </div>

            {/* BTF Dropdown */}
            <div className="relative group">
              <a
                href="/about-btf"
                className="flex items-center gap-1 hover:text-primary"
              >
                BTF <FaChevronDown className="text-[10px]" />
              </a>
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

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary">
                Options <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="https://funeralstationery.com.au/"
                  target="_blank"
                  className="dropdown-item"
                >
                  Stationery
                </Link>
                <Link to="/coffins" className="dropdown-item">
                  Coffins
                </Link>
                <Link to="/music" className="dropdown-item">
                  Music
                </Link>
                <Link to="/chepels" className="dropdown-item">
                  Chapels
                </Link>
                <Link to="/live-music" className="dropdown-item">
                  Live Music
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary">
                Info <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/resources" target="_blank" className="dropdown-item">
                  Resources
                </Link>
                <Link to="/upcoming-funerals" className="dropdown-item">
                  Upcoming Funerals
                </Link>
                <Link to="/music" className="dropdown-item">
                  Blog
                </Link>
              </div>
            </div>

            <Link to="/agreement" className="hover:text-primary">
              Agreement
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
              <div className="ml-4 mb-4 flex flex-col space-y-2">
                <Link to="/packages/basic" className="block">
                  Basic Package
                </Link>
                <Link to="/packages/viewing-and-cremention" className="block">
                  Standard Package
                </Link>
                <Link to="/packages/no-service-cremention" className="block">
                  Premium Package
                </Link>
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
              <div className="ml-4 mb-4 flex flex-col space-y-2">
                <Link to="/team" className="block">
                  Team
                </Link>
                <Link to="/contact" className="block">
                  Contact
                </Link>
                <Link to="/news" className="block">
                  News
                </Link>
              </div>
            )}

            {/* Options */}
            <button
              onClick={() => toggleMobileDropdown("options")}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              Options <FaChevronDown />
            </button>
            {openMobileDropdown === "options" && (
              <div className="ml-4 mb-4 flex flex-col space-y-2">
                <Link
                  to="https://funeralstationery.com.au/"
                  target="_blank"
                  className="dropdown-item"
                >
                  Stationery
                </Link>
                <Link to="/coffins" className="dropdown-item">
                  Coffins
                </Link>
                <Link to="/music" className="dropdown-item">
                  Music
                </Link>
                <Link to="/chepels" className="dropdown-item">
                  Chapels
                </Link>
                <Link to="/live-music" className="dropdown-item">
                  Live Music
                </Link>
              </div>
            )}
            <button
              onClick={() => toggleMobileDropdown("info")}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              Info <FaChevronDown />
            </button>
            {openMobileDropdown === "info" && (
              <div className="ml-4 mb-4 flex flex-col space-y-2">
                <Link to="/resources" className="block">
                  Resources
                </Link>
                <Link to="/options/option-two" className="block">
                  Upcoming Funerals
                </Link>
                <Link to="/blog" className="block">
                  Blog
                </Link>
              </div>
            )}

            <Link to="/agreement" className="block text-lg font-bold mb-6">
              Agreement
            </Link>
            <a href="tel:1300110031" className="btn-primary">
              <FaPhone className="mr-2" /> Call Now
              {/* {!user ? (
                <button onClick={() => navigate(`/users/${user._id}`)}>
                  View User
                </button>
              ) : (
                <div>
                  <FaPhone className="mr-2" /> Call Now
                </div>
              )} */}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
