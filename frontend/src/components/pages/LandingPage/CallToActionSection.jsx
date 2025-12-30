import React from "react";
import { FaPhone } from "react-icons/fa6";

const CallToActionSection = () => {
  return (
    <section className="bg-surface py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Start Here / Booking Info */}
          <div className="flex flex-col justify-center space-y-6 lg:pr-12">
            <div>
              <span className="font-display text-lg text-gray-500 uppercase tracking-widest">
                Start Here
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2 mb-4">
                Book Your Funeral Service
              </h2>
              <p className="text-gray-600 font-body text-lg">
                Planning a service can be overwhelming, but we’re here to make
                it simple.
              </p>
            </div>

            {/* Phone Box */}
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full text-xl shadow-lg">
                <FaPhone />
              </div>
              <a
                href="tel:1300110031"
                className="text-3xl font-display font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                1300 11 0031
              </a>
            </div>
          </div>

          {/* RIGHT: Request Call Back Form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Request A Call Back
            </h3>
            <p className="text-gray-500 text-sm mb-6 font-body">
              Our caring team will respond promptly.
            </p>

            <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs uppercase font-bold text-gray-500 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase font-bold text-gray-500 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 focus:border-black focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label className="text-xs uppercase font-bold text-gray-500 mb-1">
                  Mobile *
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded p-2 focus:border-black focus:outline-none"
                  required
                />
              </div>

              {/* Service Selection */}
              <div className="flex flex-col">
                <label className="text-xs uppercase font-bold text-gray-500 mb-1">
                  Service Type *
                </label>
                <select className="w-full border border-gray-300 rounded p-2 focus:border-black focus:outline-none bg-white">
                  <option value="No Service — Direct Cremation">
                    No Service — Direct Cremation
                  </option>
                  <option value="Macarthur Viewing & Cremation">
                    Macarthur Viewing & Cremation
                  </option>
                  <option value="Attending Service Cremation">
                    Attending Service Cremation
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white font-bold uppercase py-3 rounded hover:bg-gray-800 transition-colors mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
