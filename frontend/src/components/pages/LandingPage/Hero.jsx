import { FaArrowRight, FaCircleCheck, FaPhone } from "react-icons/fa6";

const Hero = () => {
  const features = [
    { text: "Award-Winning Compassionate Care" },
    { text: "Personalised Tributes for Every Life" },
    { text: "Affordable, Transparent Farewell Package" },
    { text: "Trusted by 8,000+ Families in Sydney" },
  ];

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Funeral service with flowers on coffin"
          className="w-full h-full object-cover"
          src="https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/funeral-arrangements.jpeg"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 section-container w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* --- LEFT SIDE: CONTENT --- */}
          <div className="text-white space-y-6">
            <h2 className="font-display italic text-2xl md:text-3xl text-gray-200">
              Black Tulip Funerals
            </h2>

            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Turning Moments of <br />
              Loss Into Memories of <br />
              Love
            </h1>

            <p className="text-lg md:text-xl font-light text-gray-300 max-w-xl">
              Trusted by Thousands, Guided by Compassion.
            </p>

            {/* Features List (Grid Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 py-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-white text-black rounded-full p-0.5 flex-shrink-0">
                    <FaCircleCheck className="text-sm" />
                  </div>
                  <span className="text-sm md:text-base font-body text-gray-200 leading-snug">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="tel:1300110031"
                className="btn-primary bg-white text-black border border-white hover:bg-gray-200 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase transition-colors"
              >
                <FaPhone className="text-sm" /> 1300 11 0031
              </a>
              <a
                href="#"
                className="btn-primary bg-transparent text-white border border-white hover:bg-white hover:text-black flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase transition-colors"
              >
                ENQUIRE NOW <FaArrowRight className="text-sm" />
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: EMPTY (Space for Image Visuals) --- */}
          <div className="hidden lg:block">
            {/* The background image serves as the visual here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
