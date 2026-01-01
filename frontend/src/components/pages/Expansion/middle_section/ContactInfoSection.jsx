import img from "./images/contact-ceo.webp";
const ContactInfoSection = () => {
  return (
    <section
      id="contact-information-section"
      className="py-16 bg-white scroll-mt-24"
    >
      <div className="text-left">
        {/* --- HEADING --- */}
        <div className="mb-12">
          <h5 className="heading-lg">Contact Information</h5>
        </div>

        {/* --- IMAGE --- */}
        {/* Removed mx-auto to align left */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-2xl">
          <img
            src={img}
            alt="Scott Harris - Founding Director & CEO"
            className="w-full h-auto object-cover"
          />
        </div>
   
        {/* --- DETAILS --- */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Scott Harris
          </h2>
          <h3 className="text-xl font-display font-medium text-gray-500 mb-6">
            Founding Director & CEO
          </h3>
        
          <div className="flex flex-col gap-2 font-body text-gray-700 text-lg">
            <p>
              <span className="font-bold text-black">Mobile:</span> 0466 277 700
            </p>
            <p>
              <span className="font-bold text-black">Office:</span> 9954 6655
            </p>
            <p>
              <span className="font-bold text-black">Email:</span>{" "}
              <a
                href="mailto:scott@funera.sydney"
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                scott@funera.sydney
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;

