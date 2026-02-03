import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CORE = import.meta.env.VITE_API_URL;

import {
  FiX,
  FiMail,
  FiLock,
  FiUserPlus,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiUser,
  FiPhone,
  FiMessageSquare,
} from "react-icons/fi";

const PopupEnquirey = ({
  isOpen: externalIsOpen,
  onClose,
  title = "Get in Touch",
  mainTitle = "Send Us Your Enquiry",
  description = "We're here to help! Fill out the form below and our team will get back to you shortly.",
  buttonText = "Send Enquiry",
  showFeatures = false,
  autoOpen = false,
  autoOpenDelay = 1000,
  mode = "enquirey",
  children,
  triggerText = "Contact Us",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  useEffect(() => {
    if (autoOpen && !isOpen) {
      const timer = setTimeout(() => {
        openPopup();
      }, autoOpenDelay);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, autoOpenDelay]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const openPopup = () => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(true);
    }
  };

  const closePopup = () => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
    setUserData({ email: "", password: "" });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setMessage({ text: "", type: "" });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = isValidEmail(formData.email);
    const payload = {
      ...formData,
      email,
    };
    try {
      const res = await fetch(`${CORE}/new-client-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        showMessage(
          "Enquiry submitted successfully! We'll contact you shortly.",
          "success"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => {
          closePopup();
          navigate("/");
        }, 1500);
      } else {
        showMessage("Failed to submit enquiry. Please try again.", "error");
      }
    } catch (error) {
      showMessage("Network error. Please try again.", "error");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    switch (mode) {
      case "enquirey":
        return (
          <form onSubmit={handleEnquirySubmit} className="space-y-6">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <div className="relative group">
                  <FiUser className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5 transition-colors group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <FiMail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5 transition-colors group-focus-within:text-blue-500" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <FiPhone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5 transition-colors group-focus-within:text-blue-500" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Your Message *
                </label>
                <div className="relative group">
                  <FiMessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 h-4 sm:h-5 w-4 sm:w-5 transition-colors group-focus-within:text-blue-500" />
                  <textarea
                    placeholder="Please describe your enquiry in detail..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white min-h-[100px] sm:min-h-[140px] resize-none text-sm sm:text-base"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 sm:h-6 w-5 sm:w-6 border-2 sm:border-3 border-white border-t-transparent"></div>
                  <span className="text-sm sm:text-lg">Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-lg">{buttonText}</span>
                  <FiArrowRight className="h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {message.text && (
              <div
                className={`mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center font-medium transition-all duration-300 transform ${message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {message.type === "error" ? (
                    <FiX className="h-4 sm:h-5 w-4 sm:w-5" />
                  ) : (
                    <FiCheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                  )}
                  <span className="text-sm sm:text-base">{message.text}</span>
                </div>
              </div>
            )}
          </form>
        );

      default:
        return (
          <>
            {showFeatures && (
              <div className="space-y-3 sm:space-y-4 my-4 sm:my-6">
                {[
                  "Exclusive discounts",
                  "Early access to sales",
                  "Personalized recommendations",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 text-gray-700 bg-gray-50/50 p-2 sm:p-3 rounded-lg"
                  >
                    <FiCheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
                    <span className="text-sm sm:text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <form className="space-y-4 sm:space-y-5">
              <div className="relative group">
                <FiMail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5 transition-colors group-focus-within:text-blue-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span className="text-sm sm:text-base">{buttonText}</span>
                <FiArrowRight className="h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {message.text && (
              <div
                className={`mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center font-medium transition-all duration-300 ${message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
                  }`}
              >
                <span className="text-sm sm:text-base">{message.text}</span>
              </div>
            )}

            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50/50 p-2 sm:p-3 rounded-lg">
              <FiShield className="h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
              <span className="font-medium">Your information is 100% secure</span>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {externalIsOpen === undefined && !autoOpen && (
        <button
          onClick={openPopup}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            {triggerText}
            <FiArrowRight className="h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      )}

      {/* Main Popup Container */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={handleOverlayClick}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 sm:bg-black/80"
          style={{ backdropFilter: "blur(4px) sm:blur(8px)" }}
        ></div>

        {/* Popup Content */}
        <div
          className={`relative w-full h-full flex items-center justify-center p-2 sm:p-4 transform transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
        >
          <div className="w-full h-full sm:h-auto sm:max-h-[95vh] max-w-full sm:max-w-2xl flex rounded-none sm:rounded-2xl lg:rounded-3xl bg-white shadow-none sm:shadow-2xl overflow-hidden">
            {/* Single Panel - Form Only */}
            <div className="flex-1 w-full h-full overflow-y-auto relative bg-white sm:bg-gradient-to-br sm:from-gray-50 sm:via-white sm:to-blue-50/30">
              <div className="h-full flex flex-col">
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 z-50 hover:rotate-90 shadow-lg hover:shadow-xl hover:scale-110 group"
                  aria-label="Close popup"
                >
                  <FiX className="h-5 sm:h-6 w-5 sm:w-6 group-hover:rotate-90 transition-transform" />
                </button>

                {/* Header with Icon */}
                <div className="text-center mt-2 border-b border-gray-200/50">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4">
                    <FiUserPlus className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {title}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    {mainTitle}
                  </p>
                </div>

                {/* Main Content */}
                <div className=" overflow-y-auto">
                  <div className="max-w-lg mx-auto w-full flex flex-col gap-4 sm:gap-6">
                    {/* Description */}
                    <div className="text-center">
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-sm">
                      {renderContent()}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300/50">
                      <div className="flex flex-col items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="text-gray-500 text-center">
                          <p>
                            By submitting, you agree to our{" "}
                            <a href="#" className="text-blue-600 font-medium hover:underline">
                              Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 font-medium hover:underline">
                              Terms of Service
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupEnquirey;