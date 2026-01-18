import { useEffect, useState } from "react";
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
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

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
  // const [images, setImages] = useState([]);
  const { user } = useUserFront();
  const slipRefs = useRef([]);

  // const handleImageChange = () => {
  //   setImages(displayImage);
  // };
  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [loadingText, setLoadingText] = useState("Preparing your documents…");
  const sendPdfByEmail = async () => {
    try {
      setIsGeneratingPdf(true);
      setLoadingText("Rendering application pages…");

      // 1️⃣ Convert slips to images
      const slipImages = [];

      for (let i = 0; i < slipRefs.current.length; i++) {
        setLoadingText(
          `Processing page ${i + 1} of ${slipRefs.current.length}…`,
        );

        const node = slipRefs.current[i];
        if (!node) continue;

        const img = await htmlToImage.toPng(node, {
          pixelRatio: 1,
          quality: 0.5,
        });

        slipImages.push(img);
      }

      setLoadingText("Generating PDF document…");

      // 2️⃣ Merge images
      const allImagesForPdf = [...slipImages];

      // 3️⃣ Generate PDF
      const pdfBlob = await generatePdfBlob(allImagesForPdf);

      setLoadingText("Sending document to your email…");

      // 4️⃣ Send PDF
      const formData = new FormData();
      formData.append("file", pdfBlob, "policy.pdf");
      formData.append("email", user.email);

      await fetch(`${CORE}/${user._id}/send-pdf-on-email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // or credentials: "include"
        },
        body: formData,
        credentials: "include",
      });

      setLoadingText("Completed successfully 🎉");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
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
    }
  };
  useEffect(() => {
    document.body.style.overflow = formActive ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formActive]);

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
  bg-black/50 backdrop-blur-sm
  transition-all duration-300
  ${
    formActive
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none"
  }`}
      >
        <div
          className="max-w-[800px] max-h-[850px] mx-auto font-roboto
  overflow-y-scroll px-6 py-10 space-y-3
  bg-white rounded-none md:rounded-2xl shadow-2xl"
        >
          <div className="flex-1 overflow-hidden px-6 py-6">{slips[step]}</div>

          <div className="border-t border-gray-200 px-6 py-4 bg-white sticky bottom-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-primary-pdf w-full sm:w-auto justify-center"
                >
                  <FaChevronLeft className="mr-2" /> Previous Section
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {step < slips.length - 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary-pdf bg-[#3129a6] w-full sm:w-auto"
                >
                  Next Section <FaChevronRight className="ml-2" />
                </button>
              )}

              {step === slips.length - 1 && (
                <button
                  type="button"
                  onClick={sendPdfByEmail}
                  disabled={isGeneratingPdf}
                  className={`btn-primary-pdf w-full sm:w-auto border-none shadow-lg
          ${
            isGeneratingPdf
              ? "bg-gray-400 cursor-not-allowed"
              : "!bg-amber-500 hover:!bg-amber-600"
          }`}
                >
                  {isGeneratingPdf
                    ? "Generating PDF…"
                    : "Finish your submission"}
                  {!isGeneratingPdf && <FaChevronRight className="ml-2" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        {slips.map((SlipComponent, index) => (
          <div
            key={index}
            ref={(el) => (slipRefs.current[index] = el)}
            className="w-[794px] bg-white"
          >
            {SlipComponent}
          </div>
        ))}
      </div>
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-10 py-8 text-center shadow-2xl max-w-sm">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#2c5aa0] border-t-transparent mx-auto mb-6"></div>

            <h2 className="text-xl font-semibold text-[#2c5aa0] mb-2">
              Please wait
            </h2>

            <p className="text-gray-600 text-sm">{loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrePay;
