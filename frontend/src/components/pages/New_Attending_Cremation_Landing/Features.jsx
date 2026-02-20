import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const Features = () => {
  const features = [
    {
      title: "Award-Winning Compassionate Care",
      desc: "Recognized for our compassionate approach and outstanding service.",
    },
    {
      title: "Affordable, Transparent Farewell Package",
      desc: "We provide clear pricing with no hidden costs.",
    },
    {
      title: "Personalised Tributes for Every Life",
      desc: "Tailoring services to reflect the unique life lived.",
    },
    {
      title: "Trusted by 8,000+ Families in Sydney",
      desc: "A reputation built on trust and reliability.",
    },
  ];

  return (
    <section className="bg-surface py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <FaCircleCheck className="text-black text-3xl mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
