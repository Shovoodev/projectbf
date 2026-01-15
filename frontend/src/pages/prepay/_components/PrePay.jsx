import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
const CORE = import.meta.env.VITE_API_URL;
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
import SlipThree from "./SlipThree";
import SlipTwo from "./SlipTwo";
import InvestorTwo from "./InvestorTwo";
import SlipEleven from "./KeyInvestDirectDebitRequest/SlipEleven";
import SlipFifteen from "./KeyInvestDirectDebitRequest/SlipFifteen";
import SlipFourteen from "./KeyInvestDirectDebitRequest/SlipFourteen";
import SlipTen from "./KeyInvestDirectDebitRequest/SlipTen";
import SlipThirteen from "./KeyInvestDirectDebitRequest/SlipThirteen";
import SlipTwelve from "./KeyInvestDirectDebitRequest/SlipTwelve";
import SlipEight from "./SlipEight";
import SlipFive from "./SlipFive";
import SlipNine from "./SlipNine";
import SlipSeven from "./SlipSeven";
import SlipSix from "./SlipSix";
import SlipSixteen from "./KeyInvestDirectDebitRequest/SlipSixteen";
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
    <SlipTen />,
    <SlipEleven />,
    <SlipTwelve />,
    <SlipThirteen />,
    <SlipFourteen />,
    <SlipFifteen />,
    <SlipSixteen />,
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
    <div className="relative font-roboto">
      <div className="fixed right-6 top-10 z-[1100]">
        <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border-2 border-[#2c5aa0]/30 w-full max-w-[400px] min-h-[200px] flex items-center p-[35px] text-center">
          <div className="w-full flex-1">
            {/* Dynamic Header */}
            <h1 className="text-[#2c5aa0] text-[28px] font-semibold mb-[15px]">
              {buttonStatus ? "Funeral Bond Information" : "Application Form"}
            </h1>

            {/* Dynamic Sub-text */}
            <p className="text-[#666666] text-base leading-[1.5] mb-5">
              {buttonStatus ? "Page 5 - Image 4 of 30" : "Section in Progress"}
            </p>

            {/* Conditional Instruction Text */}
            {buttonStatus && (
              <p className="text-[#666666] text-sm leading-[1.5] mb-5">
                Swipe left/right or use arrow keys to navigate
              </p>
            )}

            {/* The Functional Button */}
            <button
              onClick={handleToggleForm}
              className="bg-[#2c5aa0] text-white border-2 border-[#2c5aa0] px-[30px] py-[15px] rounded-lg text-base font-semibold uppercase tracking-wider shadow-[0_6px_16px_rgba(44,90,160,0.4)] cursor-pointer transition-all hover:brightness-110 active:scale-95 w-full"
            >
              {buttonStatus
                ? "Continue to Application Form"
                : "Move back to Documentation"}
            </button>
          </div>
        </div>
      </div>
      <div className="  bg-white bg-center blur-2xl " />
      {/* <Main /> */}
      <div className="" />
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
          className="max-w-[800px] max-h-[850px]   mx-auto font-roboto
                overflow-y-scroll px-6 py-10 space-y-3
                bg-white rounded-none md:rounded-2xl shadow-2xl "
        >
          {slips[step]}

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 mt-6 border-t border-gray-100">
            {/* Previous Section Button: Only shows if not on the first step */}
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-primary-pdf w-full  sm:w-auto justify-center"
              >
                <FaChevronLeft className="mr-2" /> Previous Section
              </button>
            ) : (
              <div className="hidden sm:block" /> /* Keeps "Next" on the right when "Previous" is gone */
            )}

            {/* Next Section Button: Shows if there are more slips remaining */}
            {step < slips.length - 1 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary-pdf bg-[#3129a6] w-full sm:w-auto"
              >
                Next Section <FaChevronRight className="ml-2" />
              </button>
            )}

            {/* Final Submit Button: Only shows on the very last slip */}
            {step === slips.length - 1 && (
              <button
                type="button"
                onClick={sendPdfByEmail}
                className="btn-primary-pdf w-full sm:w-auto !bg-amber-500 hover:!bg-amber-600 border-none shadow-lg"
              >
                Finish your submission <FaChevronRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePay;
