import img from "./images/Patrick-Harrison-Web-1-723x1024.png";
const MusicianProfile = () => {
  return (
    <section className="bg-white pb-16">
      <div className="section-container">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* Image */}
          <div className="w-full md:w-1/3">
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl bg-gray-200">
              <img
                alt="Patrick Harrison - Pianist"
                className="w-full h-full object-cover"
                src={img}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-4xl font-display font-bold italic mb-1 text-gray-900">
              Patrick Harrison
            </h2>
            <h3 className="text-lg font-bold text-gray-800 mb-6 font-body">
              (Pianist & Live Music Coordinator)
            </h3>

            <div className="text-gray-600 leading-relaxed space-y-4 font-body text-justify">
              <p className="bold-paragraph">
                <strong className="text-gray-900">Patrick Harrison</strong>, our
                in-house music coordinator, brings nearly two decades of piano
                expertise to our funeral services. With a Diploma and Bachelor's
                degree in Music Performance, Patrick's mastery spans Classical,
                Jazz, Blues, and Contemporary styles. His versatile talent has
                graced numerous events, from weddings to corporate functions.
              </p>
              <p className="bold-paragraph">
                Live music at a funeral can profoundly impact the emotional
                experience for families. Patrick's skilled performances create a
                personalised atmosphere, helping to honour the deceased and
                comfort mourners in a way recorded music simply cannot. His
                ability to adapt to various musical preferences ensures that
                each service is uniquely tailored to reflect the life being
                celebrated.
              </p>
              <p className="bold-paragraph">
                By choosing live music, families can experience a more intimate
                and meaningful farewell. Patrick's sensitive interpretations can
                evoke cherished memories, provide solace, and even bring moments
                of joy amidst grief. His presence adds a human touch that
                resonates deeply, transforming a somber occasion into a
                beautiful tribute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicianProfile;
