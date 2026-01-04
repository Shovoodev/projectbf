import img from "./images/photo-one.jpg";
import img3 from "./images/photo-three.avif";
import img2 from "./images/photo-two.jpg";
import Organisation_Structure from "./Organisation_Structure";

// --- Component for a single link in the Table of Contents ---
const TOCLink = ({ href, label }) => (
  <li className="mb-2">
    <a
      href={href}
      className="flex items-center text-gray-700 hover:text-black transition-colors duration-200"
    >
      <span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>
      <span className="text-lg font-medium">{label}</span>
    </a>
  </li>
);

// --- Component for the main Table of Contents Section ---
const TOCSection = () => (
  <section className="bg-white">
    <div>
      <img className="w-full rounded-lg" src={img} alt="" />
    </div>
    <div className="py-16">
      <h2 className="heading-lg text-center">Table of contents</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="border-2 border-black rounded-xl p-6">
          <ul className="text-left">
            <TOCLink href="#business-overview" label="Business Overview" />
            <TOCLink href="#vision-mission" label="Vision & Mission" />
            <TOCLink
              href="#organisation-structure"
              label="Organisation Structure"
            />
            <TOCLink
              href="#product-offerings"
              label="BTF's Innovative Product Offerings"
            />
            <TOCLink href="#key-features" label="Key Features" />
            <TOCLink
              href="#competitive-landscape"
              label="Competitive Landscape"
            />
            <TOCLink href="#industry-overview" label="Industry Overview" />
            <TOCLink
              href="#key-trends"
              label="Key Trends Impacting the Funeral Industry"
            />
          </ul>
        </div>

        {/* Column 2 */}
        <div className="border-2 border-black rounded-xl p-6">
          <ul className="text-left">
            <TOCLink
              href="#competitive-advantage"
              label="BTF's Competitive Advantage"
            />
            <TOCLink href="#swot-strengths" label="SWOT Analysis: Strengths" />
            <TOCLink
              href="#swot-wot"
              label="Weaknesses, Opportunities, and Threats"
            />
            <TOCLink href="#target-market" label="Target Market Analysis" />
            <TOCLink
              href="#market-share"
              label="Market Share and Growth Potential"
            />
            <TOCLink href="#use-of-funds" label="Use of Funds" />
            <TOCLink
              href="#financial-performance"
              label="Financial Performance"
            />
            <TOCLink
              href="#discounted-cashflow"
              label="Discounted Cashflow Model"
            />
            <TOCLink href="#equity-valuation" label="Equity Valuation" />
          </ul>
        </div>
        {/* Column 3 */}
        <div className="border-2 border-black rounded-xl p-6">
          <ul>
            <TOCLink href="#prepaid-plans" label="Prepaid Funeral Plans" />
            <TOCLink href="#social-impact" label="Social Impact Initiatives" />
            <TOCLink href="#solar-powered" label="Solar Powered" />
            <TOCLink href="#inclusions" label="Inclusions" />
            <TOCLink href="#are-you-aware" label="Are you aware?" />
            <TOCLink href="#exit-strategy" label="BTF's Exit Strategy" />
            <TOCLink href="#timeline" label="Timeline" />
            <TOCLink href="#disclaimer" label="Disclaimer" />
            <TOCLink href="#contact-info" label="Contact Information" />
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- Component for a single feature box within a section ---
const FeatureBox = ({ title, text, dark = false }) => (
  <div
    className={`p-6 rounded-xl border-2 text-center ${
      dark
        ? "bg-black border-black text-white"
        : "bg-white border-gray-200 text-gray-900"
    }`}
  >
    <h3
      className={`font-display font-bold text-2xl mb-3  ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h3>
    <div
      className={`font-body text-lg leading-relaxed ${
        dark ? "text-gray-300" : "text-gray-600"
      }`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  </div>
);

// --- Component for a full Content Section (Boxes on left, Image on right) ---
const ContentSection = ({ id, title, features, imageSrc, imageAlt }) => (
  <section id={id} className="section-padding bg-white scroll-mt-8">
    <div className="">
      <h2 className="heading-lg">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Left Side: Feature Boxes Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <FeatureBox key={idx} {...feature} />
          ))}
        </div>
        {/* Right Side: Image */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Main Page Component ---
const InvestorInfoPage = () => {
  // Data for "Business Overview" section
  const businessOverviewFeatures = [
    {
      title: "Established: 2004",
      text: "<strong>Black Tulip Funerals</strong>, initially known as Afterlife Funerals was founded as a family-owned and independent funeral service provider.",
      dark: true,
    },
    {
      title: "Core Services",
      text: "We offer in-house funeral services and operate a private crematorium, focusing on affordable, supportive funeral services that celebrate life.",
    },
    {
      title: "Client-Centric Approach",
      text: "We encourage active client involvement in customising services to ensure a personalised experience.",
    },
    {
      title: 'New Venture: "BLACK TULIP FUNERALS"',
      text: "Leveraging our established infrastructure and in-house services, we’re launching a new brand focused on technology, personalisation, and social impact.",
      dark: true,
    },
  ];

  // Data for "Vision & Mission" section
  const visionMissionFeatures = [
    {
      title: "Vision",
      text: "To lead the funeral service industry by exceeding client expectations, providing transparent and pressure-free experiences, and making a positive social impact.",
      dark: true,
    },
    {
      title: "Mission",
      text: "To offer dignified funeral services at an affordable price, celebrate lives through personalised services, and empower individuals and communities facing end-of-life challenges.",
      dark: true,
    },
    // Using a single box spanning two columns for "Core Values" to match the design
    {
      title: "Core Values",
      text: "Compassion, innovation, transparency, and affordability guide our approach to serving families during their time of need.",
      colSpan: 2,
    },
  ];

  return (
    <div className="">
      {/* Table of Contents */}
      <TOCSection />

      {/* 1. Business Overview Section */}
      <ContentSection
        id="business-overview"
        title="Business Overview"
        features={businessOverviewFeatures}
        imageSrc={img2}
        imageAlt="Black Tulip Funerals Interior"
      />

      {/* 2. Vision & Mission Section */}
      {/* Note: I've adjusted the FeatureBox grid component slightly here to handle the 'colSpan' for Core Values */}
      <section id="vision-mission" className="section-padding bg-white">
        <div className="">
          <h2 className="heading-lg">Vision & Mission</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureBox {...visionMissionFeatures[0]} />
              <FeatureBox {...visionMissionFeatures[1]} />
              <div className="md:col-span-2">
                <FeatureBox {...visionMissionFeatures[2]} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={img3}
                  alt="Team Meeting"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Organisation_Structure />
    </div>
  );
};

export default InvestorInfoPage;
