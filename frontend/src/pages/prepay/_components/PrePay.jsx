import { useEffect, useMemo, useState } from "react";
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

// slips (UI only)
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

// ✅ React-PDF
import { pdf } from "@react-pdf/renderer";
import RendererPDF from "./generatedPdf/RendererPdf";

const CORE = import.meta.env.VITE_API_URL;

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

// small helper: timeout wrapper so it doesn't spin forever
function withTimeout(promise, ms = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("PDF render timeout")), ms),
    ),
  ]);
}

const PrePay = ({ amount }) => {
  const { submitInvestment } = usePrePayServiceApi();

  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing your documents…");
  const [step, setStep] = useState(0);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  // UI slips only (not used for PDF generation now)
  const slips = useMemo(
    () => [
      <SlipThirtyTwo />,
      <SlipThirtyThree />,
      <SlipThirtyFour />,
      <SlipThirtyFive amount={amount} />,
      <SlipThirtySix />,
      <SlipThirtySeven />,
      <SlipThirtyEight />,
      <SlipThirtyNine />,
      <SlipFourty />,
      <SlipFourtyOne />,
      <SlipFourtyTwo />,
      <img src={fortyTwo} alt="" />,
      <img src={fortyThree} alt="" />,
      <SlipFourtyFive />,
      <SlipFortySix />,
      <SlipFourtySeven />,
      <img src={fortySeven} alt="" />,
    ],
    [amount],
  );

  useEffect(() => {
    document.body.classList.toggle("is-generating-pdf", isGeneratingPdf);
  }, [isGeneratingPdf]);

  useEffect(() => {
    document.body.style.overflow = formActive ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formActive]);

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

  // ✅ ONLY RendererPDF is generated and sent
  const sendPdfByEmail = async () => {
    if (isGeneratingPdf) return; // prevent double click

    try {
      setIsGeneratingPdf(true);
      setLoadingText("Rendering application (RendererPDF)…");

      // ✅ MOCK VALUES (you asked mock values only)
      // Make sure this shape matches what RendererPDF expects:
      const investorData = {
        investorOne: {
          title: "Mr",
          surname: "Doe",
          givenNames: "John",
          dob: "1990-01-01",
          gender: "Male",
          unit: "1",
          streetNo: "10",
          streetName: "Main Street",
          suburb: "Sydney",
          state: "NSW",
          postcode: "2000",
          country: "AUSTRALIA",

          mailunit: "",
          mailstreetNo: "",
          mailstreetName: "",
          mailsuburb: "",
          mailstate: "NSW",
          mailpostcode: "",
          mailcountry: "AUSTRALIA",

          daytimeTelephone: "0299999999",
          mobile: "0412345678",
          daytimeAddress: "10 Main Street, Sydney",
          email: "john@example.com",
        },
        questionnaire: {
          bondType: "Nominated",
          ageOver10: true,
          hasExistingBonds: false,
          excessContribution: false,
          requiresCapitalAccess: false,
        },
      };

      // ✅ render to blob (browser)
      const blob = await withTimeout(
        pdf(<RendererPDF investorData={investorData} />).toBlob(),
        30000,
      );

      setLoadingText("Sending PDF to your email…");

      const formData = new FormData();
      formData.append(
        "file",
        new File([blob], "KeyInvest-Application-Form.pdf", {
          type: "application/pdf",
        }),
      );

      const res = await fetch(`${CORE}/send-pdf-on-email`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      // if server returns non-json
      const text = await res.text();
      let out;
      try {
        out = JSON.parse(text);
      } catch {
        throw new Error(text || "Server error");
      }

      if (!out.success) throw new Error(out.error || "Email failed");

      setLoadingText("Completed successfully 🎉");
    } catch (error) {
      console.error("RendererPDF send failed:", error);
      alert(
        `Failed to generate/send PDF.\n\n${error?.message || "Unknown error"}`,
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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

              {/* ✅ send RendererPDF */}
              <button
                onClick={sendPdfByEmail}
                disabled={isGeneratingPdf}
                className={`w-full text-white font-semibold text-base py-3.5 rounded-xl transition-colors active:scale-[0.98] ${
                  isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
                }`}
              >
                {isGeneratingPdf ? "Processing..." : "Send PDF to Email"}
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

            <button
              onClick={handleToggleForm}
              className="bg-[#2c5aa0] text-white border-2 border-[#2c5aa0] px-[30px] py-[15px] rounded-lg text-base font-semibold uppercase tracking-wider shadow-[0_6px_16px_rgba(44,90,160,0.4)] cursor-pointer transition-all hover:brightness-110 active:scale-95 w-full"
            >
              {buttonStatus
                ? "Continue to Application Form"
                : "Move back to Documentation"}
            </button>

            {/* ✅ your download button can remain */}
            <PDFDownloadButton />

            {/* ✅ send to email button */}
            <button
              onClick={sendPdfByEmail}
              disabled={isGeneratingPdf}
              className={`mt-3 w-full text-white font-semibold text-base py-3.5 rounded-xl transition-colors active:scale-[0.98] ${
                isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
              }`}
            >
              {isGeneratingPdf ? "Processing..." : "Send PDF to Email"}
            </button>
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

      {/* Form Overlay */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          formActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="box-border w-[595px] h-[842px] mx-auto font-roboto bg-white shadow-2xl flex flex-col overflow-hidden">
          <div className="w-full flex-1 overflow-y-scroll">{slips[step]}</div>

          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#3129a6] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold"
              >
                Previous Section
              </button>
            )}

            {step < slips.length - 1 ? (
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
