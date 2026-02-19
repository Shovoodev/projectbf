import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { FaPhone } from "react-icons/fa6";
const CORE = import.meta.env.VITE_API_URL;

const CallToActionSection = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const mobileRegex = /^[0-9()+\-\s]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(formRef.current);
    const first_name = (fd.get("first_name") || "").toString().trim();
    const last_name = (fd.get("last_name") || "").toString().trim();
    const mobile = (fd.get("mobile") || "").toString().trim();

    if (!first_name || !last_name || !mobile) {
      setStatus({
        loading: false,
        success: null,
        error: "Please fill in First name, Last name and Mobile.",
      });
      return;
    }

    if (!mobileRegex.test(mobile)) {
      setStatus({
        loading: false,
        success: null,
        error: "Please enter a valid mobile number.",
      });
      return;
    }
    try {
      const res = await fetch(`${CORE}/new-client-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: fd,

        credentials: "include",
      });
      if (res.ok) {
        console.log(
          "Enquiry submitted successfully! We'll contact you shortly.",
          "success",
        );
      }

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: null,
      });
    } catch (err) {
      console.log(err);
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_IDTWO;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setStatus({
        loading: false,
        success: null,
        error: "Email service not configured (check env vars).",
      });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      setStatus({
        loading: false,
        success: "Request submitted successfully.",
        error: null,
      });
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        loading: false,
        success: null,
        error: "Something went wrong. Please try again.",
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

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 w-full"
              noValidate
            >
              {status.error && (
                <div
                  className="text-red-600 font-medium mb-2 text-center"
                  role="alert"
                  aria-live="assertive"
                >
                  {status.error}
                </div>
              )}
              {status.success && (
                <div
                  className="text-green-600 font-medium mb-2 text-center"
                  role="status"
                  aria-live="polite"
                >
                  {status.success}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name *"
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name *"
                  required
                  className="border p-2 rounded"
                />
              </div>

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile *"
                required
                aria-label="Mobile number"
                className="border p-2 rounded w-full"
              />

              <select name="service_type" className="border p-2 rounded w-full">
                <option>Attending Service Cremation</option>
                <option>Viewing & Cremation</option>
                <option>No Service — Direct Cremation</option>
              </select>

              {/* Multiple admin emails */}
              <input
                type="hidden"
                name="to_email"
                value="admin1@email.com,admin2@email.com"
              />

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-black text-white font-bold uppercase py-3 rounded disabled:opacity-60 disabled:cursor-not-allowed"
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
