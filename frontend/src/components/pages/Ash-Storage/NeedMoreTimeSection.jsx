const NeedMoreTimeSection = () => {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="section-container">
        {/* --- CONTENT CONTAINER --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight mb-6">
            Need More Time?
            <br />
            We Understand.
          </h2>

          {/* Description */}
          <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            If you’re uncertain about when to collect your loved one’s ashes,
            we’re here to help. Speak with our caring team to explore storage or
            memorial options that honor your family’s traditions.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Let's Talk Button */}
            <a
              href="tel:1300110031"
              className="btn-primary flex items-center justify-center gap-3 bg-black text-white px-8 py-3 rounded-full uppercase font-bold text-sm w-full sm:w-auto hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              Let's Talk
            </a>

            {/* Arrange a Visit Button */}
            <a
              href="#"
              className="flex items-center
 justify-center gap-3 bg-transparent text-black border border-black px-8 py-3 rounded-full uppercase font-bold text-sm w-full sm:w-auto hover:bg-black hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              Arrange a Visit
            </a>
          </div>

          {/* Footer Note */}
          <h3 className="text-gray-500 font-body text-sm font-medium">
            All queries are replied within 24h.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default NeedMoreTimeSection;
