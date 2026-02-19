import img from "./images/about-us-photo-2.1-683x1024.jpg";
const MissionVisionSection = () => {
  return (
    <section id="mission-vision" className="py-10bg-white">
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* --- COLUMN 1: OUR MISSION (Left) --- */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 h-full flex flex-col justify-center text-center lg:text-left hover:shadow-md transition-shadow duration-300">
            <h4 className="font-display font-bold text-gray-900 text-2xl md:text-3xl mb-6  inline-block pb-2 lg:self-start self-center">
              Our Mission
            </h4>
            <div>
              <p className="text-gray-600 text-lg md:text-base text-body-light text- leading-relaxed space-y-4 max-h-64 md:max-h-72 overflow-y-auto pr-3">
                At Black Tulip Funerals, our mission is focused on providing a dignified funeral service to our clients at the most affordable price possible. We believe that a funeral service should be a meaningful celebration of a person’s life, and that the choices made during the planning process can truly help to honour the deceased and preserve their legacy.s
                We strive to personalise each service to reflect the unique beliefs, culture, and nationality of our clients, and we offer a wide range of products and options to make the service more memorable and comforting for all those involved.

                As an Australian-owned independent family business, we are committed to delivering compassionate care, professional guidance, and unwavering support to families during one of life’s most difficult times. Our dedicated team takes pride in ensuring every detail is handled with respect, sensitivity, and integrity, allowing families to focus on remembering and celebrating their loved one.
              </p>
            </div>
          </div>

          {/* --- COLUMN 2: CENTER IMAGE --- */}
          <div className="h-full w-full flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[2/3] w-full max-w-sm lg:max-w-full relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img
                src={img}
                alt="Honoring Life"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* --- COLUMN 3: OUR VISION (Right) --- */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 h-full flex flex-col justify-center text-center lg:text-left hover:shadow-md transition-shadow duration-300">
            <h4 className="font-display font-bold text-gray-900 text-2xl md:text-3xl mb-6  inline-block pb-2 lg:self-start self-center">
              Our Vision
            </h4>
            <div>  <p className="text-gray-600 text-lg md:text-base text-body-light text- leading-relaxed max-h-64 md:max-h-72 overflow-y-auto pr-3">
              Looking to the future, our vision is to excel in the funeral
              service industry and deliver exceptional fixed priced services
              that goes above and beyond our clients’ expectations. We are
              committed to offering sincerity, dignity, and compassion in all
              that we do and to providing a transparent approach that removes
              any pressure or hard sell.
              Our goal is to streamline the entire funeral planning process
              and offer an all-inclusive, one-stop package that takes care of
              everything our clients need during this difficult time. We
              believe that by focusing on our clients’ needs and delivering
              exceptional service, we can become a trusted and respected
              leader in the funeral service industry.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
