import { useEffect, useRef, useState } from "react";
const CORE = import.meta.env.VITE_API_URL;

import {
  cover,
  eight,
  eighteen,
  eleven,
  fifteen,
  five,
  fortySeven,
  fortyThree,
  fortyTwo,
  four,
  fourteen,
  nine,
  nineteen,
  one,
  seven,
  seventeen,
  six,
  sixteen,
  ten,
  thirteen,
  thirty,
  three,
  twelve,
  twenty,
  twentyEight,
  twentyFive,
  twentyFour,
  twentyNine,
  twentyOne,
  twentySeven,
  twentySix,
  twentyThree,
  twentyTwo,
  two,
} from "../../../images/index";
import { useUserFront } from "../../../utility/use-userFront";
import { generatePdfBlob } from "./ImageToPdf";
// import SlipFour from "./SlipFour";
// import all the slips in order
import { usePrePayServiceApi } from "@/utility/prepay-service-provider";
import SlipFortySix from "./SlipFortySix";
import SlipFourty from "./SlipFourty";
import SlipFourtyFive from "./SlipFourtyFive";
import SlipFourtyOne from "./SlipFourtyOne";
import SlipFourtySeven from "./SlipFourtySeven";
import SlipFourtyTwo from "./SlipFourtyTwo";
import SlipThirtyEight from "./SlipThirtyEight";
import SlipThirtyFive from "./SlipThirtyFive";
import SlipThirtyFour from "./SlipThirtyFour";
import SlipThirtyNine from "./SlipThirtyNine";
import SlipThirtySeven from "./SlipThirtySeven";
import SlipThirtySix from "./SlipThirtySix";
import SlipThirtyThree from "./SlipThirtyThree";
import SlipThirtyTwo from "./SlipThirtyTwo";
const displayImage = [
import SlipOne from "./SlipOne";
import SlipTwo from "./SlipTwo";
import SlipThree from "./SlipThree";
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
  const [bgImage, setBgImage] = useState(displayImage[0]);
  // const [images, setImages] = useState([]);
  const [images, setImages] = useState(displayImage);
  const { user } = useUserFront();
  // const handleImageChange = () => {
  //   setImages(displayImage);
  // };
  const refs = useRef([]);
  const { investors, directDebitForm } = usePrePayServiceApi();
  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);

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
  const [step, setStep] = useState(0);
  const slips = [
    <SlipThirtyTwo />,
    <SlipThirtyThree />,
    <SlipThirtyFour />,
    <SlipThirtyFive />,
    <SlipThirtySix />,
    <SlipThirtySeven />,
    <SlipThirtyEight />,
    <SlipThirtyNine />,
    <SlipFourty />,
    <SlipFourtyOne />,
    <SlipFourtyTwo />,
    <img src={fortyTwo} />,
    <img src={fortyThree} />,
    <SlipFourtyFive />,
    <SlipFortySix />,
    <SlipFourtySeven />,
    <img src={fortySeven} />,
  ];
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
  useEffect(() => {
    if (formActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formActive]);
  const handleToggleForm = () => {
    if (formActive) {
      setFormActive(false);
      setButtonStatus(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // 🔒 Disable scroll, go to form
      setFormActive(true);
      setButtonStatus(false);

      document.getElementById("CompleteForm")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    document.body.style.overflow = formActive ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formActive]);
  // all component to image conversion
  const downloadAll = async () => {
    for (let i = 0; i < refs.current.length; i++) {
      const node = refs.current[i];
      if (!node) continue;

      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `card-${i + 1}.png`;
      link.href = dataUrl;
      link.click();
    }
  };
  //debug
  console.log({ investors, directDebitForm });
  return (
    <div className="relative">
      <div className="fixed right-6 top-10 -translate-y-1/2 z-50">
        <button
          onClick={handleToggleForm}
          className="bg-green-700 text-xl p-3 text-white shadow-2xl rounded-2xl"
        >
          {buttonStatus
            ? "Continue to fill in the form"
            : "Move back to the Documentation"}
        </button>
      </div>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center blur-2xl scale-150 transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* <Main /> */}
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

      <div
        id="CompleteForm"
        className={`fixed inset-0 z-40 flex items-center justify-center
    transition-all duration-500
    ${
      formActive
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
      >
        <div
          className="w-full h-full max-w-5xl mx-auto
                overflow-y-auto px-6 py-10 space-y-3
                bg-white rounded-none md:rounded-2xl shadow-2xl"
        >
          {slips[step]}
        </div>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50
                     bg-black/60 text-white p-4 rounded-full
                     hover:bg-black transition"
          >
            ◀ Previous Secction
          </button>
        )}

        {step < slips.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50
                     bg-black/60 text-white p-4 rounded-full
                     hover:bg-black transition"
          >
            Nect Section ▶
          </button>
        )}
        {step === slips.length - 1 && (
          <button
            onClick={sendPdfByEmail}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-amber-400 p-5 rounded-2xl shadow-lg"
          >
            Finish your submittion
          </button>
        )}
      <div id="page" className="scroll-mt-24 max-w-4xl mx-auto">
        <SlipOne />
        <SlipTwo />
        <SlipThree />
      </div>
    </div>
  );
};

export default PrePay;
