import { FaPhoneVolume } from "react-icons/fa6";

const Contact = () => {
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

                      <form className="space-y-5">
                          
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Suburb */}
              <div>
                <input
                  type="text"
                  placeholder="Suburb"
                  className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* How did you hear about us? */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  How did you hear about us?
                </label>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer">
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
                  rows="4"
                  placeholder="Message"
                  className="w-full bg-white border border-gray-400 text-gray-900 text-sm rounded-sm p-3 placeholder-gray-500 focus:outline-none focus:border-black transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Submit
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
