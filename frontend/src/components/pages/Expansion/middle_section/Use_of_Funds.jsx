import React from "react";
import img from "./images/Use-of-Funds.png";
function Use_of_Funds() {
  return (
    <section id="use-of-funds" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Use of Funds</h2>
        <img className="rounded-lg" src={img} alt="" />
        {/* 3-Column Grid */}
      </div>
    </section>
  );
}

export default Use_of_Funds;
