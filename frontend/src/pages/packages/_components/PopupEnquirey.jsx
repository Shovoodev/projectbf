import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../images/loginpage.png";

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
  FiBook,
  FiTag,
  FiImage,
  FiCheck,
} from "react-icons/fi";
// import { pdf } from "@react-pdf/renderer";
import { useServiceApi } from "../../../utility/SelectedServiceProvider";
const CORE = import.meta.env.VITE_API_URL;

const PopupEnquirey = ({
  isOpen: externalIsOpen,
  onClose,
  title = "Complete Registration",
  mainTitle = "Create Your Account",
  description = "Register now to proceed with your selections",
  buttonText = "Register",
  showFeatures = false,
  autoOpen = false,
  autoOpenDelay = 1000,
  path = "newattendingservicecremationanswers",
  mode = "registration", // "registration", "enquirey", or "default"
  children,
  triggerText = "Complete Registration",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { selections } = useServiceApi();
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    excerpt: "",
    image: "",
  });
  useEffect(() => {
    if (autoOpen && !isOpen) {
      const timer = setTimeout(() => {
        openPopup();
      }, autoOpenDelay);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, autoOpenDelay, isOpen]);

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
    setUserData("");
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

    try {
      if (!userData.email || !userData.password) {
        throw new Error("Please fill in all fields");
      }

      if (!isValidEmail(userData.email)) {
        throw new Error("Invalid email address");
      }

      // Register
      const registerRes = await fetch(`${CORE}/blacktulipauth/newuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!registerRes.ok) {
        const err = await registerRes.json();
        throw new Error(err.message || "Registration failed");
      }

      // Login
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!loginRes.ok) throw new Error("Login failed");

      const loginData = await loginRes.json();
      localStorage.setItem("user", JSON.stringify(loginData));

      // Save selections
      await fetch(`${CORE}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
        credentials: "include",
      });
      setTimeout(() => {
        closePopup();
        navigate(`/fill-agreement-form`);
      }, 1500);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    closePopup();
    navigate(`/login`);
  };
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (!blogData.title.trim() || !blogData.content.trim()) {
        setMessage({
          text: "Please fill in all required fields (Title, Content, and Author)",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // API call to create blog
      const response = await fetch(`${CORE}/create-btf-new-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
        credentials: "include",
      });
      if (!response.ok) {
        // Try to parse error message, if any
        let errorMessage = "Failed to create blog post";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (error) {
          // If no JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: "Blog created successfully!",
          type: "success",
        });

        setBlogData({
          title: "",
          content: "",
          category: "",
          excerpt: "",
          image: "",
        });
        setTimeout(() => {
          setMessage({ text: "", type: "" });
          navigate("/blog");
        }, 3000);
      } else {
        setMessage({
          text: data.message || "Failed to create blog",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
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
      case "registration":
        return (
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
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

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-200"
                >
                  Log In
                </button>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <FiShield className="h-4 w-4 text-green-500" />
              <span>Your information is 100% secure. We won't spam you.</span>
            </div>
          </form>
        );
      case "createblog":
        return (
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div className="space-y-4">
              {/* Blog Title */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blog Title *
                </label>
                <div className="relative">
                  <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Enter blog title"
                    value={blogData.title}
                    onChange={(e) =>
                      setBlogData({
                        ...blogData,
                        title: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              {/* Category */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Category
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="e.g., Technology, Business, Lifestyle"
                    value={blogData.category}
                    onChange={(e) =>
                      setBlogData({
                        ...blogData,
                        category: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Featured Image URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={blogData.image}
                    onChange={(e) =>
                      setBlogData({
                        ...blogData,
                        image: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                {blogData.image && (
                  <div className="mt-2">
                    <img
                      src={blogData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Excerpt/Short Description
                </label>
                <textarea
                  placeholder="A brief summary of your blog post (2-3 sentences)"
                  value={blogData.excerpt}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      excerpt: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[80px] resize-none"
                  rows="2"
                  maxLength="200"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {blogData.excerpt?.length || 0}/200 characters
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blog Content *
                </label>
                <textarea
                  placeholder="Write your blog content here..."
                  value={blogData.content}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[200px] resize-none"
                  rows="6"
                  required
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {blogData.content?.length || 0} characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Blog...</span>
                </>
              ) : (
                <>
                  <span>Create Blog Post</span>
                  <FiCheck className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Status Message */}
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

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-600 text-sm">
                * Required fields. Your blog will be published immediately.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <FiShield className="h-4 w-4 text-blue-500" />
              <span>Blog content is saved securely</span>
            </div>
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

            <form className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={userData}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>{buttonText}</span>
                <FiArrowRight className="h-5 w-5" />
              </button>
            </form>

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
          <div
            className={`h-screen flex flex-col ${mode === "createblog" ? "md:flex-col" : "md:flex-row"} rounded-2xl bg-white`}
          >
            {/* Image Section - Left - Hide for createblog mode */}
            {mode !== "createblog" && (
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
                        <span className="text-lg">
                          24/7 Professional Support
                        </span>
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
            )}

            {/* Form Section - Full width for createblog, half for others */}
            <div
              className={`flex-1 ${mode === "createblog" ? "md:w-full" : "md:w-1/2 lg:w-2/5"} h-full overflow-y-auto relative`}
            >
              <div className="h-full flex flex-col">
                <button
                  onClick={closePopup}
                  className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white text-gray-600 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 z-50 hover:rotate-90 shadow-lg"
                >
                  <FiX className="h-6 w-6" />
                </button>

                {/* Mobile image - Hide for createblog */}
                {mode !== "createblog" && (
                  <div className="md:hidden relative h-64">
                    <img
                      alt="Background"
                      className="w-full h-full object-cover"
                      src={img}
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    </div>
                  </div>
                )}

                <div className="flex-1 p-6 md:p-8 lg:p-12">
                  <div
                    className={`${mode === "createblog" ? "max-w-4xl" : "max-w-md"} mx-auto h-full flex flex-col`}
                  >
                    {/* Header section - Adjust for createblog */}
                    {mode !== "createblog" ? (
                      <div className="hidden md:block mb-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg">
                            <FiUserPlus className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                              {title}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg">
                              <FiBook className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h1 className="text-3xl font-bold text-gray-900">
                                Create New Blog Post
                              </h1>
                              <p className="text-gray-600 mt-2">
                                Write and publish your new blog article
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="space-y-8">
                        {mode !== "createblog" && (
                          <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                              {mainTitle}
                            </h2>
                            <p className="text-gray-600 text-lg">
                              {description}
                            </p>
                          </div>
                        )}

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

export default PopupEnquirey;
