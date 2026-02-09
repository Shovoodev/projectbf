import * as htmlToImage from "html-to-image";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";
import { generatePdfBlob } from "./ImageToPdf";

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
import PDFDownloadButton from "./generatedPdf/TestDownload";

const CORE = import.meta.env.VITE_API_URL;

const NATURAL_WIDTH = 794;
const NATURAL_HEIGHT = 1123;

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

const PrePay = ({ amount }) => {
  // IMPORTANT: separate refs for pdf-only list
  const pdfSlipRefs = useRef([]);

  const { submitInvestment } = usePrePayServiceApi();
  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing your documents…");
  const [step, setStep] = useState(0);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  // ✅ Keep your slip list exactly the same (UI uses this)
  const slips = useMemo(
    () => [
      <SlipThirtyTwo />,
      <SlipThirtyThree />,
      <SlipThirtyFour />, //hide
      <SlipThirtyFive amount={amount} />,
      <SlipThirtySix />, //hide
      <SlipThirtySeven />,
      <SlipThirtyEight />, //hide
      <SlipThirtyNine />,
      <SlipFourty />,
      <SlipFourtyOne />, //hide
      <SlipFourtyTwo />,
      <img src={fortyTwo} />, //hide
      <img src={fortyThree} />, //hide
      <SlipFourtyFive />,
      <SlipFortySix />,
      <SlipFourtySeven />,
      <img src={fortySeven} />, //hide
    ],
    [amount],
  );

  // ✅ Add meta: which slips should be hidden in PDF
  // Must match slips length exactly
  const slipMeta = useMemo(
    () => [
      { id: "32", hideInPdf: false },
      { id: "33", hideInPdf: false },
      { id: "34", hideInPdf: true }, //hide
      { id: "35", hideInPdf: false },
      { id: "36", hideInPdf: true }, //hide
      { id: "37", hideInPdf: false },
      { id: "38", hideInPdf: true }, //hide
      { id: "39", hideInPdf: false },
      { id: "40", hideInPdf: false },
      { id: "41", hideInPdf: true }, //hide
      { id: "42", hideInPdf: false },
      { id: "42img", hideInPdf: true }, //hide
      { id: "43img", hideInPdf: true }, //hide
      { id: "45", hideInPdf: false },
      { id: "46", hideInPdf: false },
      { id: "47", hideInPdf: false },
      { id: "47img", hideInPdf: true }, //hide
    ],
    [],
  );

  // ✅ Full UI list (overlay uses this)
  const uiSlips = slips;

  // ✅ PDF list (ONLY capture pages not hidden)
  const pdfSlips = useMemo(() => {
    return slips
      .map((el, idx) => ({ el, meta: slipMeta[idx], idx }))
      .filter((x) => !x.meta.hideInPdf);
  }, [slips, slipMeta]);

  // Reset step if slips changed (safety)
  useEffect(() => {
    if (step > uiSlips.length - 1) setStep(0);
  }, [uiSlips.length, step]);

  useEffect(() => {
    document.body.classList.toggle("is-generating-pdf", isGeneratingPdf);
  }, [isGeneratingPdf]);

  const sendPdfByEmail = async () => {
    try {
      setIsGeneratingPdf(true);
      setLoadingText("Rendering application pages…");

      // await submitInvestment();

      // ✅ Capture only the pdfSlips nodes
      const slipImages = [];

      for (let i = 0; i < pdfSlipRefs.current.length; i++) {
        setLoadingText(
          `Processing page ${i + 1} of ${pdfSlipRefs.current.length}…`,
        );

        const node = pdfSlipRefs.current[i];
        if (!node) continue;

        const originalOverflow = node.style.overflow;
        node.style.overflow = "hidden";

        const img = await htmlToImage.toJpeg(node, {
          backgroundColor: "#FFFFFF", // ✅ avoid null => weird capture / black bg sometimes
          width: NATURAL_WIDTH,
          height: NATURAL_HEIGHT,
          pixelRatio: 3,
          style: {
            width: `${NATURAL_WIDTH}px`,
            height: `${NATURAL_HEIGHT}px`,
            transform: "none",
          },
        });

        node.style.overflow = originalOverflow;
        slipImages.push(img);
      }

      setLoadingText("Generating PDF document…");
      const pdfBlob = await generatePdfBlob(slipImages);

      setLoadingText("Sending document to your email…");
      const formData = new FormData();
      formData.append(
        "file",
        new File([pdfBlob], "bond.pdf", { type: "application/pdf" }),
      );

      const res = await fetch(`${CORE}/send-pdf-on-email`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const out = await res.json();
      if (!out.success) throw new Error("Email failed");

      setLoadingText("Completed successfully 🎉");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleToggleForm = () => {
    if (formActive) {
      setFormActive(false);
      setButtonStatus(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
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
      {/* Sidebar/Control UI */}
      <div className="fixed bottom-4 flex items-center justify-center inset-x-4 z-[1100] md:hidden">
        {!mobileInfoOpen && (
          <button
            onClick={() => setMobileInfoOpen(true)}
            className="w-[200px] py-3 bg-blue-600 text-white rounded-xl shadow-xl"
          >
            {buttonStatus ? "Open Funeral Bond Info" : "Open Application"}
          </button>
        )}
      </div>

      {/* MOBILE CARD */}
      {mobileInfoOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[1100] md:hidden animate-slide-up">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileInfoOpen(false)}
          />
          <div className="relative mx-4 mb-4 bg-white rounded-2xl shadow-2xl p-5 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-[#2c5aa0] text-lg font-bold flex items-center gap-2">
                {buttonStatus ? " Funeral Bond Info" : " Application Form"}
              </h1>
              <button
                onClick={() => setMobileInfoOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  handleToggleForm();
                  setMobileInfoOpen(false);
                }}
                className="w-full bg-[#2c5aa0] hover:bg-blue-700 text-white font-semibold text-base py-3.5 rounded-xl transition-colors active:scale-[0.98]"
              >
                {buttonStatus
                  ? "Continue to Application Form"
                  : "Back to Documentation"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:block fixed right-6 top-10 z-[1100]">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-[380px]">
          <div className="w-full flex-1">
            <h1 className="text-[#2c5aa0] text-2xl font-semibold mb-4">
              {buttonStatus ? "Funeral Bond Information" : "Application Form"}
            </h1>
            <p className="text-[#666666] text-base leading-[1.5] mb-5">
              {buttonStatus ? "Page 5 - Image 4 of 30" : "Section in Progress"}
            </p>

            <button
              onClick={handleToggleForm}
              className="bg-[#2c5aa0] text-white border-2 border-[#2c5aa0] px-[30px] py-[15px] rounded-lg text-base font-semibold uppercase tracking-wider shadow-[0_6px_16px_rgba(44,90,160,0.4)] cursor-pointer transition-all hover:brightness-110 active:scale-95 w-full"
            >
              {buttonStatus
                ? "Continue to Application Form"
                : "Move back to Documentation"}
            </button>

            <PDFDownloadButton />
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="flex flex-col items-center gap-10 py-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Gallery item"
            className="max-w-[90%] max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
        ))}
      </div>

      {/* Form Interaction Overlay (UI uses full slips) */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          formActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="box-border w-[595px] h-[842px] mx-auto font-roboto bg-white shadow-2xl flex flex-col overflow-hidden">
          <div className="w-full flex-1 overflow-y-scroll">{uiSlips[step]}</div>

          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#3129a6] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold"
              >
                Previous Section
              </button>
            )}

            {step < uiSlips.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#3129a6] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold ml-auto"
              >
                Next Section
              </button>
            ) : (
              <button
                onClick={sendPdfByEmail}
                disabled={isGeneratingPdf}
                className={`px-8 py-3 rounded-md font-bold text-white ml-auto ${
                  isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
                }`}
              >
                {isGeneratingPdf ? "Processing..." : "Finish Submission"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ HIDDEN RENDER NODE (PDF uses filtered list ONLY) */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        {pdfSlips.map((item, pdfIndex) => (
          <div
            key={`${item.meta.id}-${item.idx}`}
            ref={(el) => (pdfSlipRefs.current[pdfIndex] = el)}
            style={{
              width: `${NATURAL_WIDTH}px`,
              height: `${NATURAL_HEIGHT}px`,
              padding: "40px",
              boxSizing: "border-box",
            }}
            className="bg-white overflow-hidden"
          >
            {item.el}
          </div>
        ))}
      </div>

      {/* Loading Modal */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl text-center shadow-2xl">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#2c5aa0] border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">{loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrePay;
