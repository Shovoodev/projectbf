import React from "react";
import img from "./images/team-photo.webp";
function Organisation_Structure() {
  return (
    <section className="py-3">
      <h2 className="heading-lg text-center text-black">
        {" "}
        Organisation_Structure
      </h2>

      <img className="w-full" src={img} alt="" />
    </section>
  );
}

export default Organisation_Structure;
