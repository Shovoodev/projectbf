import React from "react";
import img from "./images/1_2-Photo-2048x1152.jpg";
function Target_Market() {
  return (
    <section id="weaknesses-section" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Target Market Analysis</h2>
        <img className="rounded-lg" src={img} alt="" />
        {/* 3-Column Grid */}
      </div>
    </section>
  );
}

export default Target_Market;
