import React from "react";

import img from "./images/Discounted-Cash-Flow.png";
function Discounted_Cashflow_Model() {
  return (
    <section id="financial-performance" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Discounted Cashflow Model</h2>
        <img className="rounded-lg" src={img} alt="" />
        {/* 3-Column Grid */}
      </div>
    </section>
  );
}

export default Discounted_Cashflow_Model;
