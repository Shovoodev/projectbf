import React from "react";
import img1 from "./images/Colourful-2-1024x683.png";
import img2 from "./images/Pastel-2-1024x683.png";
import img3 from "./images/White-2-768x512.png";
const FloralGallerySection = () => {
  const images = [
    {
      src: img1,
      alt: "White Floral Arrangement",
      label: "White Collection",
    },
    {
      src: img2,
      alt: "Pastel Floral Arrangement",
      label: "Pastel Collection",
    },
    {
      src: img3,
      alt: "Colourful Floral Arrangement",
      label: "Colourful Collection",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="section-container  mx-auto px-6">
        {/* Optional Heading if needed, based on context */}
        {/* <h2 className="text-3xl font-display font-bold text-center mb-10">Our Floral Collections</h2> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="">
                <img src={img.src} alt={img.alt} className="" />
              </div>

              {/* Overlay Label (Optional flair) */}
              {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-end p-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-display font-bold text-gray-900 text-sm uppercase tracking-wide">
                    {img.label}
                  </span>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloralGallerySection;
