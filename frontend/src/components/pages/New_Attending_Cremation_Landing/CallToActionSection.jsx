import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { FaPhone } from "react-icons/fa6";
const CORE = import.meta.env.VITE_API_URL;

const CallToActionSection = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({
    loading: false,
    success: null,
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
  });

  const mobileRegex = /^[0-9()+\-\s]+$/;

  const validateField = (name, value) => {
    let error = "";

    if (name === "first_name") {
      if (!value.trim()) {
        error = "First name is required.";
      }
    } else if (name === "last_name") {
      if (!value.trim()) {
        error = "Last name is required.";
      }
    } else if (name === "mobile") {
      if (!value.trim()) {
        error = "Mobile number is required.";
      } else if (!mobileRegex.test(value)) {
        error = "Please enter a valid mobile number.";
      }
    }

    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Only validate if field is required
    if (name !== "message") {
      const error = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const isFormValid =
    formData.first_name.trim() &&
    formData.last_name.trim() &&
    formData.mobile.trim() &&
    !fieldErrors.first_name &&
    !fieldErrors.last_name &&
    !fieldErrors.mobile &&
    mobileRegex.test(formData.mobile.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const errors = {
      first_name: validateField("first_name", formData.first_name),
      last_name: validateField("last_name", formData.last_name),
      mobile: validateField("mobile", formData.mobile),
    };

    setFieldErrors(errors);

    if (errors.first_name || errors.last_name || errors.mobile) {
      return;
    }

    setStatus({ loading: true, success: null });

    try {
      const fd = new FormData();
      fd.append("first_name", formData.first_name);
      fd.append("last_name", formData.last_name);
      fd.append("mobile", formData.mobile);
      fd.append("message", formData.message);

      // API call
      const message = JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
        message: formData.message,
      });
      try {
        const res = await fetch(`${CORE}/new-client-enquiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: message,
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("API call failed");
        }
      } catch (err) {
        console.log("API error:", err);
      }

      // EmailJS
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_IDTWO;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceID && templateID && publicKey) {
        try {
          const formElement = formRef.current;
          formElement.first_name.value = formData.first_name;
          formElement.last_name.value = formData.last_name;
          formElement.mobile.value = formData.mobile;
          formElement.message.value = formData.message;

          await emailjs.sendForm(serviceID, templateID, formElement, publicKey);
        } catch (err) {
          console.error("EmailJS error:", err);
        }
      }

      setStatus({
        loading: false,
        success: "Request submitted successfully. We'll contact you shortly!",
      });
      setFormData({
        first_name: "",
        last_name: "",
        mobile: "",
        message: "",
      });
      setFieldErrors({
        first_name: "",
        last_name: "",
        mobile: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        loading: false,
        success: null,
      });
    }
  };

  return (
    <section className="bg-surface py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 lg:pr-12">
            <span className="font-display text-lg text-gray-500 uppercase tracking-widest">
              Start Here
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              Book Your Funeral Service
            </h2>
            <p className="text-gray-600 text-lg">
              Planning a service can be overwhelming, but we’re here to make it
              simple.
            </p>

            <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row sm:items-center sm:justify-start">
              <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full mx-auto sm:mx-0">
                <FaPhone />
              </div>
              <a
                href="tel:1300110031"
                className="text-2xl font-body  text-gray-900"
              >
                1300 11 0031
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-8 rounded-xl shadow-lg border flex flex-col items-center">
            <h3 className="text-2xl font-display font-bold mb-2 text-center w-full">
              Request A Call Back
            </h3>
            <p className="text-gray-500 text-sm mb-6 text-center w-full">
              Our caring team will respond promptly.
            </p>
            {/*  Request Call Back Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 w-full"
              noValidate
            >
              {status.success && (
                <div
                  className="text-green-600 font-medium p-3 rounded bg-green-50 border border-green-200 text-center"
                  role="status"
                  aria-live="polite"
                >
                  {status.success}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name *"
                    value={formData.first_name}
                    onChange={handleFieldChange}
                    className={`w-full border p-2 rounded transition-colors ${
                      fieldErrors.first_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  {fieldErrors.first_name && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name *"
                    value={formData.last_name}
                    onChange={handleFieldChange}
                    className={`w-full border p-2 rounded transition-colors ${
                      fieldErrors.last_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  {fieldErrors.last_name && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile *"
                  value={formData.mobile}
                  onChange={handleFieldChange}
                  aria-label="Mobile number"
                  className={`w-full border p-2 rounded transition-colors ${
                    fieldErrors.mobile
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {fieldErrors.mobile && (
                  <p className="text-red-600 text-sm mt-1">
                    {fieldErrors.mobile}
                  </p>
                )}
              </div>

              {/* Message Box */}
              <textarea
                className="w-full border border-gray-200 p-2 rounded resize-none h-24"
                name="message"
                value={formData.message}
                onChange={handleFieldChange}
                placeholder="Type Message Here... (Optional)"
              ></textarea>

              {/* Multiple admin emails */}
              <input
                type="hidden"
                name="to_email"
                value="admin1@email.com,admin2@email.com"
              />

              <button
                type="submit"
                disabled={!isFormValid || status.loading}
                className="w-full bg-black text-white font-bold uppercase py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                {status.loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
