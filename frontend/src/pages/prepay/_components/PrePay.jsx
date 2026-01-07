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
import SlipTwo from "./SlipTwo";
import { useUserFront } from "../../../utility/use-userFront";
import { generatePdfBlob } from "./ImageToPdf";
import CORE from "../../../components/common/Reusables";
const displayImage = [
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
  const [bgImage, setBgImage] = useState(displayImage[0]);
  // const [images, setImages] = useState([]);
  const [images, setImages] = useState(displayImage);
  const { user } = useUserFront();
  // const handleImageChange = () => {
  //   setImages(displayImage);
  // };
  const sendPdfByEmail = async () => {
    setImages(displayImage);
    const pdfBlob = await generatePdfBlob(displayImage);

    const formData = new FormData();
    formData.append("file", pdfBlob, "policy.pdf");
    formData.append("email", ` ${user.email}`);

    await fetch(`${CORE}/${user._id}/send-pdf-on-email`, {
      method: "POST",
      body: formData,
    });
  };

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
  }, [images]);

  return (
    <div className="relative">
      <div className="fixed right-6 top-10 -translate-y-1/2 z-50">
        <button className="bg-green-700 text-xl p-3 text-white shadow-2xl rounded-2xl">
          <a href="#CompleteForm"> Continue to fill in the form </a>
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

      <div id="CompleteForm" className="scroll-mt-24 gap-10">
        <SlipOne />
        <SlipTwo />
      </div>
      <div className=" flex items-center justify-center">
        <button
          className=" bg-amber-400 p-5 rounded-2xl "
          onClick={sendPdfByEmail}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrePay;
