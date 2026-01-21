import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
const CORE = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "Google",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9()+\-\s]+$/;

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required.";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!emailRegex.test(value)) return "Invalid email address.";
        return "";
      case "message":
        return value.trim() ? "" : "Message is required.";
      case "phone":
        return value && !phoneRegex.test(value) ? "Invalid phone number." : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) nextErrors[key] = err;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched(
      Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {})
    );

    if (!validateForm()) return;

    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(`${CORE}/new-client-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

        credentials: "include",
      });
      if (res.ok) {
        console.log(
          "Enquiry submitted successfully! We'll contact you shortly.",
          "success"
        );
      }
      // await emailjs.send(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   formData,
      //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      // );

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: null,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        suburb: "",
        source: "Google",
      });
    } catch (err) {
      console.log(err);

      setStatus({
        loading: false,
        success: null,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  const isFormReady = formData.name && formData.email && formData.message;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: Contact Form */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 font-display">
              Get in Touch With
            </h2>
            {/* Using italic font-display to mimic the script look, 
                or you can import a script font like 'Great Vibes' */}
            <h1 className="text-4xl md:text-5xl font-display italic font-bold text-gray-900 mb-8">
              Black Tulip Funerals
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div>
                <input
                  name="name"
                  type="email"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  onBlur={handleBlur}
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                  aria-describedby={
                    errors.name && touched.name ? "name-error" : undefined
                  }
                  className={`w-full bg-white border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none ${
                    errors.name && touched.name
                      ? "focus:border-red-500"
                      : "focus:border-black"
                  } transition-colors`}
                  required
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  onBlur={handleBlur}
                  aria-invalid={
                    errors.phone && touched.phone ? "true" : "false"
                  }
                  aria-describedby={
                    errors.phone && touched.phone ? "phone-error" : undefined
                  }
                  className={`w-full bg-white border ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none ${
                    errors.phone && touched.phone
                      ? "focus:border-red-500"
                      : "focus:border-black"
                  } transition-colors`}
                />
                {errors.phone && touched.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  onBlur={handleBlur}
                  aria-invalid={
                    errors.email && touched.email ? "true" : "false"
                  }
                  aria-describedby={
                    errors.email && touched.email ? "email-error" : undefined
                  }
                  className={`w-full bg-white border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none ${
                    errors.email && touched.email
                      ? "focus:border-red-500"
                      : "focus:border-black"
                  } transition-colors`}
                  required
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* How did you hear about us? */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  How did you hear about us?
                </label>
                <div className="relative">
                  <select
                    name="source"
                    type="email"
                    placeholder="How did you Hear about us"
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        source: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                  >
                    <option>Google</option>
                    <option>Social Media</option>
                    <option>Word of Mouth</option>
                    <option>Other</option>
                  </select>
                  {/* Custom Arrow Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  type="text"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  onBlur={handleBlur}
                  rows="4"
                  aria-invalid={
                    errors.message && touched.message ? "true" : "false"
                  }
                  aria-describedby={
                    errors.message && touched.message
                      ? "message-error"
                      : undefined
                  }
                  className={`w-full bg-white border ${
                    errors.message && touched.message
                      ? "border-red-500"
                      : "border-gray-400"
                  } text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none ${
                    errors.message && touched.message
                      ? "focus:border-red-500"
                      : "focus:border-black"
                  } transition-colors resize-none`}
                ></textarea>
                {errors.message && touched.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Messages */}
              {status.success && (
                <div
                  className="text-green-600 font-medium"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {status.success}
                </div>
              )}
              {status.error && (
                <div
                  className="text-red-600 font-medium"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  {status.error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status.loading || !isFormReady}
                  className="bg-black text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Info & Map */}
          <div className="flex flex-col h-full">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Contact Info
            </h2>

            {/* Map Container */}
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 mb-6 shadow-sm">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.846877906972!2d151.2092953152108!3d-33.86881968065624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Contact Box */}
            <div className="border-2 border-gray-900 rounded-xl p-6 text-center flex flex-col justify-center items-center gap-2 bg-white shadow-sm">
              <p className="text-base md:text-lg font-bold text-gray-900">
                The Black Tulip Funeral's team are available 24/7
              </p>
              <div className="flex items-center gap-3 mt-1">
                <FaPhoneVolume className="text-pink-600 text-2xl md:text-3xl rotate-[-10deg]" />
                <a
                  href="tel:1300110031"
                  className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-gray-700 transition-colors font-display"
                >
                  1300 11 0031
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
