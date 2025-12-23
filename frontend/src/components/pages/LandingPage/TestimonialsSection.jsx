import React from "react";
import { FaStar } from "react-icons/fa6";

// Individual Testimonial Card
const TestimonialCard = ({ name, text, image }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Quote Text */}
      <div className="flex-1 mb-6">
        <p className="text-gray-600 font-body text-sm leading-relaxed italic relative">
          <span className="text-4xl text-gray-200 absolute -top-4 -left-2 font-serif">
            “
          </span>
          {text}
        </p>
      </div>

      {/* Footer: Image & Info */}
      <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={
              image ||
              "https://blacktulipfunerals.com.au/wp-content/plugins/elementor/assets/images/placeholder.png"
            }
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-display font-bold text-gray-900 text-sm">
            {name}
          </h4>
          <div className="flex text-yellow-400 text-xs mt-1 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Samantha Li",
      text: "Scott and his team helped me through the most difficult moments of life with the utmost patience and compassion. The communication is smooth and timely, and the process is smooth. Thanks Scott for his help.",
    },
    {
      name: "Christine S",
      text: "Scott and his team were so professional, so caring and their communication was next to none. Scott picked up the grandmas clothes from the family's house, communicated via text late at night when I had questions, and kept me informed at every step. Afterlife is the best in the business.",
    },
    {
      name: "Kristy & Family",
      text: "Scott and his staff were professional caring and very understanding of a tough situation. He knew my fathers love of football and his favourite team and he ensured it was incorporated into his funeral with tact. Nothing was ever too much to ask... Prices were incredibly competitive but service quality was 100 per cent.",
    },
  ];

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="section-container">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-sm text-gray-500 uppercase tracking-widest block mb-2">
            Here's What Families Say About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight mb-6">
            Real Stories Of
            <br />
            Compassion And Care
          </h2>
          <div className="w-16 h-1 bg-black mx-auto mb-6 opacity-10"></div>
          <p className="text-gray-600 font-body text-lg">
            Welcome to ‘BTF Testimonials,’ where real stories and heartfelt
            experiences take center stage. Get ready to be inspired and moved by
            the power of shared voices.
          </p>
        </div>

        {/* --- TESTIMONIAL GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
