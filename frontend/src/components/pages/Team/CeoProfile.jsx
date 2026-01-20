import ceoimg from "./images/ceo.png";

import separator from "./images/separator.png";

const CeoProfile = () => {
  return (
    <>
      <div className="flex items-center justify-center py-4  mb-12">
        <img src={separator} alt="" />
      </div>

      <section className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <img
            alt="Scott Harris Portrait"
            className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[3/4]"
            src={ceoimg}
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
          <div className="space-y-1">
            <p className="text-gray-500 text-center md:text-left font-light text-lg tracking-wide">
              25+ Years of Compassionate Funeral Leadership
            </p>
            <h2 className="text-4xl md:text-5xl text-center md:text-left font-display font-bold text-gray-900">
              Scott Harris
            </h2>
            <p className="text-lg font-bold text-gray-700">
              (Chief Executive Director & Founder)
            </p>
          </div>

          <div className="text-sm text-text-light space-y-3 leading-relaxed text-justify">
            <p className="bold-paragraph">
              Integrity – As the owner and CEO of{" "}
              <strong>Black Tulip Funerals</strong>, I, Scott Harris, bring over
              25 years of industry experience and a deep commitment to
              integrity. My extensive background in managing over 6,000 funerals
              has taught me the importance of honesty, transparency, and ethical
              behaviour in serving families during their most vulnerable times.
              Transparency – I believe in fostering open and honest
              communication with the families I serve. With a positive and
              empathetic attitude, I provide clear and direct guidance, setting
              realistic expectations and helping families navigate the
              complexities of funeral planning. My goal is to build trust and
              ensure that every family feels supported and cared for throughout
              the process. Quality – With a unique blend of industry expertise
              and technical knowledge, I am dedicated to delivering exceptional
              service to every family. My extensive experience in funeral
              management, combined with my background in Information Technology
              and Logistics, enables me to provide personalized and efficient
              solutions that meet the unique needs of each family. Compassion –
              As a caring and compassionate individual, I am passionate about
              helping families during their time of need. I understand that
              every family is unique, and I am committed to providing a
              personalized and empathetic approach to funeral planning. My goal
              is to not only provide a dignified and respectful farewell but
              also to support families in their grief and help them find a sense
              of peace and closure.
            </p>
            <p></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CeoProfile;
