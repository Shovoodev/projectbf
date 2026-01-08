import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../images/loginpage.png";

import {
  FiX,
  FiLock,
  FiUserPlus,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiUser,
  FiPhone,
} from "react-icons/fi";
const CORE = import.meta.env.VITE_API_URL;

const VerifiedEmailPopup = ({
  isOpen: externalIsOpen,
  onClose,
  buttonText = "Verify Email",
  triggerText = " Verify",
  showFeatures = false,
  autoOpen = false,
  autoOpenDelay = 1000,
  mode = "verifyEmail",
  children,
  onSuccess,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [tokenData, setTokenData] = useState({ token: "" });
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
    setTokenData("");
    setMessage({ text: "", type: "" });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!tokenData.trim() || !tokenData.trim()) {
      showMessage("Please fill in all fields", "error");
      setIsLoading(false);
      return;
    }

    if (!isValidToken(tokenData)) {
      showMessage("Please enter a valid Token", "error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${CORE}/blacktulipauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tokenData),
      });
      if (response.ok) {
        showMessage("verify successful!", "success");

        if (onSuccess) {
          onSuccess({ tokenData });
        }

        setTokenData("");

        setTimeout(() => {
          closePopup();
        }, 2000);
        const getuserbyToken = await fetch("/token", {
          credentials: "include",
        });
        const { userid } = getuserbyToken();
        // to do this

        const loginRes = await fetch(`${CORE}/get-user-by-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userid),
          credentials: "include",
        });

        const loginData = await loginRes.json();
        if (!loginData._id) throw new Error("Login failed");

        localStorage.setItem("user", JSON.stringify(loginData));

        navigate(`/${loginData._id}/deceasedpersondetails`);
      } else {
        const error = await response.json();
        showMessage(error.message || "Registration failed", "error");
      }
    } catch (error) {
      showMessage("Network error. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidToken = (tokenData) => {
    const tokenRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return tokenRegex.test(tokenData);
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
      case "verifyEmail":
        return (
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={tokenData}
                  onChange={(e) => setTokenData({ tokenData: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <FiArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {message.text && (
              <div
                className={`mt-4 p-3 rounded-lg text-center font-medium transition-all duration-300 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        );

      default:
        return (
          <>
            {showFeatures && (
              <div className="space-y-3 my-6">
                {[
                  "Exclusive discounts",
                  "Early access to sales",
                  "Personalized recommendations",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <FiCheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {message.text && (
              <div
                className={`mt-4 p-3 rounded-lg text-center font-medium transition-all duration-300 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <FiShield className="h-4 w-4 text-green-500" />
              <span>Your information is 100% secure. We won't spam you.</span>
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
          className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {triggerText}
        </button>
      )}

      {/* Main Popup Container */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={handleOverlayClick}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          className={`relative w-full h-full transform rounded-2xl transition-all duration-300 ${
            isOpen ? "scale-80 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="h-screen flex flex-col md:flex-row rounded-2xl bg-white">
            {/* Image Section - Left */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative">
              <img
                alt="Elegant floral background pattern"
                className="absolute inset-0 w-full h-full object-fit"
                src={img}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              <div className="relative h-full flex items-center p-12">
                <div className="text-white max-w-lg">
                  <div className="mb-10">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mb-8">
                      <FiUserPlus className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                      {mode === "enquirey" ? "How Can We Help?" : "Welcome"}
                    </h2>
                    <p className="text-xl opacity-90 leading-relaxed">
                      {mode === "enquirey"
                        ? "Our dedicated team is here to answer your questions and provide the support you need during this difficult time."
                        : "Your peace of mind is our priority. Register today to access premium features and exclusive offers."}
                    </p>
                  </div>

                  <div className="space-y-6 mt-12">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <FiCheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-lg">24/7 Professional Support</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <FiCheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-lg">Confidential & Secure</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <FiCheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-lg">Personalized Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 md:w-1/2 lg:w-2/5 h-full overflow-y-auto relative">
              <div className="h-full flex flex-col">
                <button
                  onClick={closePopup}
                  className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white text-gray-600 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 z-50 hover:rotate-90 shadow-lg"
                >
                  <FiX className="h-6 w-6" />
                </button>

                <div className="flex-1 p-6 md:p-8 lg:p-12">
                  <div className="max-w-md mx-auto h-full flex flex-col">
                    <div className="hidden md:block mb-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg">
                          <FiUserPlus className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="space-y-8">
                        <div className="text-center md:text-left"></div>

                        {renderContent()}
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiShield className="h-4 w-4 text-green-500" />
                          <span>Secure & Encrypted</span>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">
                            Need help?{" "}
                            <a
                              href="#"
                              className="text-blue-600 font-medium hover:underline"
                            >
                              Contact Support
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

export default VerifiedEmailPopup;
