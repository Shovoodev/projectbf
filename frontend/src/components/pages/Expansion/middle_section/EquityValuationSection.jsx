import React from "react";
import img from "./images/eqt_vltn_2.avif";
import img2 from "./images/eqt_vltn_1 (1).avif";
function EquityValuationSection() {
  return (
    <section id="financial-performance" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Equity Valuation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img className="rounded-lg" src={img2} alt="" />
          <img className="rounded-lg" src={img} alt="" />
        </div>

        {/* 3-Column Grid */}
      </div>
    </section>
  );
}

export default EquityValuationSection;
