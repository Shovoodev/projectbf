import React from "react";

import img2 from "./images/two.png";
import img3 from "./images/three.png";
import img4 from "./images/four.png";
import img5 from "./images/five.png";
const CoffinCard = ({ name, material, colour, image }) => (
  <div className="border border-teal-500 rounded-lg p-4 text-center">
    <div className="h-40 flex items-center justify-center mb-4">
      <img
        src={image}
        alt={colour}
        className="max-w-full max-h-full object-contain"
      />
    </div>
    <h4 className="font-display font-bold text-gray-900 uppercase text-sm tracking-wider">
      {name}
    </h4>
    <p className=" text-gray-500 uppercase mt-1">Material: {material}</p>
    <p className=" text-gray-500 uppercase">Colour: {colour}</p>
  </div>
);

const AttendingCremationDetailsSection = () => {
  const coffins = [
    {
      name: "Richmond Gloss",
      material: "MDF",
      colour: "Red Cedar",
      image: img2,
    },
    {
      name: "Richmond Gloss",
      material: "MDF",
      colour: "Rosewood",
      image: img3,
    },
    {
      name: "Richmond Gloss",
      material: "MDF",
      colour: "RoseWood",
      image: img4,
    },
    {
      name: "Richmond Gloss",
      material: "MDF",
      colour: "White",
      image: img5,
    },
  ];

  return (
    <section className="py-4 bg-white">
      <div className="section-container mx-auto px-6">
        {/* --- TECHNICAL ADVICE / SURCHARGES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
          <div>
            <h5 className=" font-bold text-gray-900 uppercase tracking-widest mb-2">
              Cremation Risk Advice
            </h5>
            <p className=" text-lg text-gray-500 leading-relaxed">
              Generally a free document issued by NSW Hospitals. Most external
              doctors charge between $110 and $295.
            </p>
          </div>
          <div>
            <h5 className=" font-bold text-gray-900 uppercase tracking-widest mb-2">
              Coffin
            </h5>
            <p className=" text-lg text-gray-500 leading-relaxed">
              Sizing is based on a person 6 foot and 85kgs. Height and weight
              above these incur an oversized coffin cost.
            </p>
          </div>
          <div>
            <h5 className=" font-bold text-gray-900 uppercase tracking-widest mb-2">
              Body Preparation
            </h5>
            <p className=" text-lg text-gray-500 leading-relaxed">
              Embalming may be required based on condition and viewing
              requirements. Some bodies may require bio-sealing.
            </p>
          </div>
          <div>
            <h5 className=" font-bold text-gray-900 uppercase tracking-widest mb-2">
              Public Holiday Surcharge
            </h5>
            <p className=" text-lg text-gray-500 leading-relaxed">
              Transfers required on a Public Holiday will incur an additional
              charge of $195.
            </p>
          </div>
        </div>

        {/* --- COFFIN SELECTION GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {coffins.map((coffin, idx) => (
            <CoffinCard key={idx} {...coffin} />
          ))}
        </div>

        {/* --- SERVICE DEFINITION --- */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
            What Is an Attending Cremation Service?
          </h2>
          <p className="font-body text-gray-700 text-lg leading-relaxed mb-8">
            An attending cremation service—sometimes called a funeral service
            cremation—combines the simplicity of cremation with the tradition of
            a viewing or ceremony. This option has become increasingly popular
            among Sydney families who want the benefits of cremation services
            without sacrificing the opportunity to say goodbye properly.
          </p>

          <div className="space-y-6 text-gray-600 font-body text-lg leading-relaxed">
            <p className="font-body text-gray-700 text-lg leading-relaxed">
              <strong className="text-gray-900">How It Works:</strong> The
              deceased rests in a quality coffin (included in your package)
              during a commemorative service at one of our partner chapels.
              Family and friends gather to share eulogies, music, and
              memories—exactly as they would at a traditional burial service.
              Following the ceremony, cremation takes place privately, with
              ashes returned to the family thereafter.
            </p>
            <p className="font-body text-gray-700 text-lg leading-relaxed">
              This approach offers the flexibility many modern families seek.
              You receive the affordability of cremation services combined with
              the emotional healing that comes from communal grieving and
              celebration. For those searching "cremation services near me" who
              desire both dignity and value, attending cremation provides the
              perfect balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendingCremationDetailsSection;
