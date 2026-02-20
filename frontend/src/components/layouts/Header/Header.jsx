import { useState } from "react";
import { FaBars, FaChevronDown, FaPhone } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import logo from "./btf-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileDropdown = (name) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  const isAttendingLanding =
    location.pathname === "/attending-cremation-landing";

  const hiddenOnAttendingLanding = new Set(["/chepels", "/upcoming-funerals"]);

  const shouldHideLink = (to) => {
    return isAttendingLanding && hiddenOnAttendingLanding.has(to);
  };

  const hidePackagesMenu = isAttendingLanding;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 t font-body">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center h-26">
          <Link to="/home" className="">
            <img className="h-[130px]" src={logo} alt="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center text-xl font-medium text-gray-700">
            <Link to="/home" className="hover:text-primary">
              Home
            </Link>

            {/* Packages Dropdown (optional hide on attending landing) */}
            {!hidePackagesMenu && (
              <div className="relative group">
                <a
                  href="/packages"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Packages <FaChevronDown className="text-[10px]" />
                </a>
                <div className="absolute top-full left-0 mt-2 w-65 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/packages/attending-service-cremation"
                    className="dropdown-item"
                  >
                    Attending Service & Cremation
                  </Link>
                  <Link
                    to="/packages/viewing-and-cremention"
                    className="dropdown-item"
                  >
                    Viewing & Cremation
                  </Link>
                  <Link
                    to="/packages/no-service-cremention"
                    className="dropdown-item"
                  >
                    No Service Cremation
                  </Link>
                </div>
              </div>
            )}

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

            {/* Options Dropdown */}
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

                {/* ✅ Hide Chapels only when on /attending-cremation-landing */}
                {!shouldHideLink("/chepels") && (
                  <Link to="/chepels" className="dropdown-item">
                    Chapels
                  </Link>
                )}

                <Link to="/live-music" className="dropdown-item">
                  Live Music
                </Link>
              </div>
            </div>

            {/* Info Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary">
                Info <FaChevronDown className="text-[10px]" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/resources" className="dropdown-item">
                  Resources
                </Link>

                {/* ✅ Hide Upcoming Funerals only when on /attending-cremation-landing */}
                {!shouldHideLink("/upcoming-funerals") && (
                  <Link to="/upcoming-funerals" className="dropdown-item">
                    Upcoming Funerals
                  </Link>
                )}

                <Link to="/blog" className="dropdown-item">
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
            <Link
              to="/home"
              onClick={toggleMenu}
              className="block text-lg font-medium mb-4"
            >
              Home
            </Link>

            {/* Mobile Packages (optional hide on attending landing) */}
            {!hidePackagesMenu && (
              <>
                <Link
                  to="/packages"
                  onClick={() => {
                    toggleMobileDropdown("packages");
                    toggleMenu();
                  }}
                  className="flex items-center gap-1 hover:text-primary text-lg font-medium w-full mb-4"
                >
                  Packages <FaChevronDown className="text-[10px]" />
                </Link>

                {openMobileDropdown === "packages" && (
                  <div className="ml-4 mb-4 flex flex-col space-y-1">
                    <Link
                      to="/packages/attending-service-cremation"
                      onClick={toggleMenu}
                      className="dropdown-item"
                    >
                      Attending Service & Cremation
                    </Link>
                    <Link
                      to="/packages/viewing-and-cremention"
                      onClick={toggleMenu}
                      className="dropdown-item"
                    >
                      Viewing & Cremation
                    </Link>
                    <Link
                      to="/packages/no-service-cremention"
                      onClick={toggleMenu}
                      className="dropdown-item"
                    >
                      No Service Cremation
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* BTF */}
            <Link
              to="/about-btf"
              onClick={() => {
                toggleMobileDropdown("btf");
                toggleMenu();
              }}
              className="flex items-center gap-1 hover:text-primary text-lg font-medium w-full mb-4 "
            >
              BTF <FaChevronDown className="text-[10px]" />
            </Link>
            {openMobileDropdown === "btf" && (
              <div className="ml-4 mb-4 flex flex-col space-y-1">
                <Link to="/team" onClick={toggleMenu} className="dropdown-item">
                  Team
                </Link>
                <Link
                  to="/contact"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Contact
                </Link>
                <Link to="/news" onClick={toggleMenu} className="dropdown-item">
                  News
                </Link>
              </div>
            )}

            {/* Options */}
            <button
              onClick={() => toggleMobileDropdown("options")}
              className="flex items-center gap-1 w-full text-lg font-medium mb-4"
            >
              Options <FaChevronDown className="text-[10px]" />
            </button>
            {openMobileDropdown === "options" && (
              <div className="ml-4 mb-4 flex flex-col space-y-1">
                <Link
                  to="https://funeralstationery.com.au/"
                  target="_blank"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Stationery
                </Link>
                <Link
                  to="/coffins"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Coffins
                </Link>
                <Link
                  to="/music"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Music
                </Link>

                {/* ✅ Hide Chapels only when on /attending-cremation-landing */}
                {!shouldHideLink("/chepels") && (
                  <Link
                    to="/chepels"
                    onClick={toggleMenu}
                    className="dropdown-item"
                  >
                    Chapels
                  </Link>
                )}

                <Link
                  to="/live-music"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Live Music
                </Link>
              </div>
            )}

            {/* Info */}
            <button
              onClick={() => toggleMobileDropdown("info")}
              className="flex items-center gap-1 w-full text-lg font-medium mb-4"
            >
              Info <FaChevronDown className="text-[10px]" />
            </button>
            {openMobileDropdown === "info" && (
              <div className="ml-4 mb-4 flex flex-col space-y-1">
                <Link
                  to="/resources"
                  onClick={toggleMenu}
                  className="dropdown-item"
                >
                  Resources
                </Link>

                {/* ✅ Hide Upcoming Funerals only when on /attending-cremation-landing */}
                {!shouldHideLink("/upcoming-funerals") && (
                  <Link
                    to="/upcoming-funerals"
                    onClick={toggleMenu}
                    className="dropdown-item"
                  >
                    Upcoming Funerals
                  </Link>
                )}

                <Link to="/blog" onClick={toggleMenu} className="dropdown-item">
                  Blog
                </Link>
              </div>
            )}

            <Link
              to="/agreement"
              onClick={toggleMenu}
              className="block text-lg font-medium mb-4"
            >
              Agreement
            </Link>

            <a
              href="tel:1300110031"
              onClick={toggleMenu}
              className="btn-primary"
            >
              <FaPhone className="mr-2" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
