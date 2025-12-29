import img from "./images/Digital-Storage-scaled.jpg";
const AshesStorageContentSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image */}
          <div className="rounded-xl overflow-hidden shadow-lg h-full">
            <img
              src={img}
              alt="Secure Ashes Storage"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
              Secure Ashes Storage After Cremation
            </h2>
            <div className="w-16 h-1 bg-black opacity-20"></div>
            <p className="text-gray-600  text-lg leading-relaxed text-justify">
              Some families choose not to collect their loved one’s ashes
              immediately after cremation, often due to cultural practices,
              grief, superstition, or practical circumstances. In many
              traditions, delaying collection can show respect, avoid perceived
              bad luck, or allow time for the family to prepare for
              memorialization according to specific rites. Black Tulip Funerals
              offers discreet and secure ashes storage for as long as required,
              providing peace of mind during a challenging time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AshesStorageContentSection;
