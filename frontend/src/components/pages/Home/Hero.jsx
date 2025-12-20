import HeroImage from "./images/Hero-Cover-2048x485.png";

const Hero = () => {
  // Using placeholders or the original URLs

  return (
    <section className="pt-16 pb-8 text-center bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="heading-xl">Black Tulip Funerals</h1>
        <p className="bold-paragraph">
          A place where you're treated like family
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        {/* Adjusted flex to grid for better control, but kept flex feel per design */}
        <div className="flex justify-center items-end gap-2 md:gap-6 flex-wrap">
          <img
            src={HeroImage}
            alt="Funeral Moments"
            className={`object-cover rounded-lg shadow-sm  transition-all duration-500
               
              `}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
