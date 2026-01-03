import imgonw from "./images/onw.jpg";

// Card Component with "dark" mode support (Black/White backgrounds)
const FeatureCard = ({ title, text, dark }) => (
  <div
    className={`p-6 rounded-xl transition-shadow duration-300 h-full flex flex-col justify-center
      ${
        dark
          ? "bg-black border-black text-white"
          : "bg-white border-gray-200 text-gray-900 hover:shadow-md"
      }`}
  >
    <h5
      className={`font-display font-bold text-lg md:text-3xl mb-4 border-b pb-2 inline-block ${
        dark ? "border-gray-600" : "border-gray-200"
      }`}
    >
      {title}
    </h5>
    <p
      className={`font-body text-lg leading-relaxed ${
        dark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {text}
    </p>
  </div>
);

const KeyFeaturesSection = () => {
  const features = [
    {
      title: "Exclusivity in Serving the Niche Market",
      text: "We focus on providing specialised services to meet unique customer needs.",
      dark: true, // Black Box
    },
    {
      title: "Pioneering Innovation",
      text: "We offer innovative stationery and product offerings, thoroughly tested with external suppliers.",
      dark: false, // White Box
    },
    {
      title: "Personalised Service",
      text: "Each client has a dedicated point of contact and access to global software for easy updates and tribute video creation.",
      dark: false, // White Box
    },
    {
      title: "Transparency and Flexibility",
      text: "We provide authentic and transparent pricing, 24/7 availability, and flexible scheduling.",
      dark: true, // Black Box
    },
  ];

  return (
    <section
      id="key-features"
      className="section-padding bg-white "
    >
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg font-semibold">Key Features</h2>

        {/* Grid Layout: Content (Left 60%) - Image (Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* --- LEFT SIDE: 2x2 Feature Grid (Takes 3/5 width) --- */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>

          {/* --- RIGHT SIDE: Image (Takes 2/5 width) --- */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px]">
            <img
              src={imgonw}
              alt="Black Tulip Funerals Key Features"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
