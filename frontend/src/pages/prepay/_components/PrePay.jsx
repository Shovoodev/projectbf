import React, { useEffect, useState } from "react";
import {
  cover,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
  nineteen,
  twenty,
  twentyOne,
  twentyTwo,
  twentyThree,
  twentyFour,
  twentyFive,
  twentySix,
  twentySeven,
  twentyEight,
  twentyNine,
  thirty,
} from "../../../images/index";
import SlipOne from "./SlipOne";
const images = [
  cover,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
  nineteen,
  twenty,
  twentyOne,
  twentyTwo,
  twentyThree,
  twentyFour,
  twentyFive,
  twentySix,
  twentySeven,
  twentyEight,
  twentyNine,
  thirty,
];

const PrePay = () => {
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const index = Math.min(
        Math.floor(scrollY / window.innerHeight),
        images.length - 1
      );
      setBgImage(images[index]);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative">
      <div className="fixed right-6 top-10 -translate-y-1/2 z-50">
        <button className="bg-green-700 text-xl p-3 text-white shadow-2xl rounded-2xl">
          <a href="#page"> Continue to fill in the form </a>
        </button>
      </div>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center blur-2xl scale-150 transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 -z-10 bg-black/40" />

      {/* 🔹 Flowing Images */}
      <div className="flex flex-col  items-center gap-10 py-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Gallery item"
            className="max-w-[90%] max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
        ))}
      </div>

      <div id="page" className="scroll-mt-24">
        <SlipOne />
      </div>
    </div>
  );
};

export default PrePay;
