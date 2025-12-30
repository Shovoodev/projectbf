const ChapelSection = ({ title, image, children, background = "bg-white" }) => {
  return (
    <section className={`section-padding ${background}`}>
      <div className="section-container">
        {/* Image Area */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg mb-12 group">
          <img
            alt={`${title} Interior`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
          />

          {/* Optional Slider Controls (Visual Only based on HTML) */}
        </div>

        {/* Text Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg uppercase tracking-wide">{title}</h2>
          <div className="space-y-6 text-gray-600 leading-loose font-light font-body text-justify md:text-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapelSection;
