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
const CORE = import.meta.env.VITE_API_URL;
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
import { useLocation } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import PrePayInvoicePDF from "./generatedPdf/PrepayinvoicePDF";

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

const PrePay = ({ totalPrice }) => {
  const { submitInvestment, isGeneratingPdf } = usePrePayServiceApi();
  const [loadingText, setLoadingText] = useState("Preparing your documents…");
  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [step, setStep] = useState(0);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const location = useLocation();
  const { selections, path } = location.state || {};

  const clientInvoice = async (e) => {
    e?.preventDefault?.();

    const transformSelectionsForBackend = (selectionsObj) => {
      if (!selectionsObj) return null;

      const transformed = {};
      const keyMapping = {
        stationery: selectionsObj.stationery,
        bodyPreparation: selectionsObj.bodyPreparation,
        coffin: selectionsObj.coffin,
        flowers: selectionsObj.flowers,
        urn: selectionsObj.urn,
        collectionOfUrn: selectionsObj.collectionOfUrn,
        transferOption: selectionsObj.transferOption,
      };

      Object.entries(keyMapping).forEach(([key, value]) => {
        if (!value) return;
        transformed[key] = {
          value: value?.value ?? value,
          price: Number(value?.price ?? 0),
        };
      });

      return Object.keys(transformed).length ? transformed : null;
    };

    const toBase64FromBlob = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("FileReader failed"));
        reader.onloadend = () => {
          const result = String(reader.result || "");
          const base64 = result.split(",")[1];
          if (!base64) return reject(new Error("Failed to convert PDF to base64"));
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });

    try {
      setLoadingText("Preparing invoice…");

      const backendSelections = transformSelectionsForBackend(selections);

      // ✅ selections/path may be missing on refresh
      if (!backendSelections || !path) {
        console.warn("Missing selections or path from location.state. Skipping save selections step.");
      } else {
        // save selections
        const selectionRes = await fetch(`${CORE}/${path}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selections: backendSelections,
            totalPrice: totalPrice ?? 0,
          }),
        });

        if (!selectionRes.ok) {
          const errorText = await selectionRes.text();
          console.warn("Failed to save selections:", errorText);
        }
      }

      setLoadingText("Fetching invoice data…");
      const resSelections = await fetch(`${CORE}/all-selected-selections`, {
        credentials: "include",
      });

      if (!resSelections.ok) {
        const t = await resSelections.text();
        throw new Error(`Failed to load selections: ${t}`);
      }

      const data = await resSelections.json();
      const invoiceData = data?.data;
      console.log({ invoiceData });

      const total = Number(invoiceData?.totalPrice ?? 0);

      await submitInvestment({ totalPriceOfpageThirtyFive: total });


      if (!invoiceData) {
        throw new Error("No invoice data returned from /all-selected-selections");
      }

      setLoadingText("Rendering invoice PDF…");
      const blob = await pdf(
        <PrePayInvoicePDF
          invoiceDetails={invoiceData}
        />
      ).toBlob();

      if (!blob || blob.size === 0) {
        throw new Error("Invoice PDF generated as empty blob");
      }

      const base64data = await toBase64FromBlob(blob);

      setLoadingText("Sending invoice…");
      const invoiceRes = await fetch(`${CORE}/api/send-invoice`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selections: backendSelections ?? selections ?? {},
          totalPrice: invoiceData?.totalPrice ?? totalPrice ?? 0,
          pdfAttachment: base64data,
        }),
      });

      const invoiceText = await invoiceRes.text();

      if (!invoiceRes.ok) {
        throw new Error(`Send invoice failed: ${invoiceText}`);
      }

      setLoadingText("Invoice sent ✅");
      return true;
    } catch (err) {
      console.error("clientInvoice error:", err);
      setLoadingText(err?.message || "Invoice failed");
      throw err;
    }
  };


  // UI slips only (not used for PDF generation now)
  const slips = useMemo(
    () => [
      <SlipThirtyTwo />,
      <SlipThirtyThree />,
      <SlipThirtyFour />,
      <SlipThirtyFive totalPrice={totalPrice} />,
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
    [totalPrice],
  );

  // ✅ ADD: config for conditional rendering (same length as slips)
  // Set enabled: false to hide a slip in the overlay
  const slipConfig = useMemo(
    () => [
      { id: "32", enabled: true },
      { id: "33", enabled: true },
      { id: "34", enabled: true },
      { id: "35", enabled: true },
      { id: "36", enabled: true },
      { id: "37", enabled: true },
      { id: "38", enabled: true },
      { id: "39", enabled: true },
      { id: "40", enabled: true },
      { id: "41", enabled: false },
      { id: "42", enabled: false },
      { id: "42img", enabled: false },
      { id: "43img", enabled: false },
      { id: "45", enabled: false },
      { id: "46", enabled: false },
      { id: "47", enabled: true },
      { id: "47img", enabled: true },
    ],
    [],
  );

  // ✅ ADD: build the list that actually renders in UI + controls navigation
  const renderedSlips = useMemo(() => {
    return slips
      .map((comp, idx) => ({ comp, cfg: slipConfig[idx], originalIndex: idx }))
      .filter((x) => x.cfg?.enabled !== false);
  }, [slips, slipConfig]);

  // ✅ ADD: keep step always valid if some slips are hidden dynamically
  useEffect(() => {
    if (step > renderedSlips.length - 1) setStep(0);
  }, [renderedSlips.length, step]);

  useEffect(() => {
    document.body.classList.toggle("is-generating-pdf", isGeneratingPdf);
  }, [isGeneratingPdf]);

  useEffect(() => {
    document.body.style.overflow = formActive ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formActive]);

  // ✅ FIX 1: If form overlay opens, close the mobile sheet so it can't block clicks
  useEffect(() => {
    if (formActive) setMobileInfoOpen(false);
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

  const fetchAndSendPdf = async () => {
    try {
      await clientInvoice()
      setLoadingText("Completed successfully 🎉");
    } catch (error) {
      console.error("PDF send failed:", error);
      alert(
        `Failed to generate/send PDF.\n\n${error?.message || "Unknown error"}`,
      );
    }
  };

  return (
    <div className="relative font-roboto">
      {/* Toggle Button (top-right) */}
      <div className="fixed top-4 right-4 flex items-center justify-center z-[1100] md:hidden">
        {!mobileInfoOpen && (
          <button
            onClick={() => setMobileInfoOpen(true)}
            className="w-[200px] py-3 bg-blue-600 text-white rounded-xl shadow-xl"
          >
            {buttonStatus ? "Open Funeral Bond Info" : "Open Application"}
          </button>
        )}
      </div>

      {/* MOBILE CARD (top-right panel) */}
      {mobileInfoOpen && (
        <div className="fixed top-4 right-4 z-[1100] md:hidden w-[90%] max-w-sm">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileInfoOpen(false)}
          />

          {/* card */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-5 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-[#2c5aa0] text-lg font-bold flex items-center gap-2">
                {buttonStatus ? "Funeral Bond Info" : "Application Form"}
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

              <button
                onClick={fetchAndSendPdf}
                disabled={isGeneratingPdf}
                className={`w-full text-white font-semibold text-base py-3.5 rounded-xl transition-colors active:scale-[0.98] ${isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
                  }`}
              >
                {isGeneratingPdf ? "Processing..." : "Send PDF to Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
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

            <PDFDownloadButton />

            <button
              onClick={fetchAndSendPdf}
              disabled={isGeneratingPdf}
              className={`mt-3 w-full text-white font-semibold text-base py-3.5 rounded-xl transition-colors active:scale-[0.98] ${isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
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
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${formActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="box-border w-[650px] h-[842px] mx-auto font-roboto bg-white shadow-2xl flex flex-col overflow-hidden">
          {/* ✅ CHANGE: use renderedSlips */}
          <div className="flex-1 px-3 py-3 overflow-y-scroll">
            {renderedSlips[step]?.comp}
          </div>

          <div className="sticky bottom-0 p-4 flex justify-between gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="bg-[#3129a6] hover:bg-blue-700 z-[1105] text-white px-8 py-3 rounded-md font-bold"
              >
                Previous Section
              </button>
            )}

            {/* ✅ CHANGE: use renderedSlips.length */}
            {step < renderedSlips.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-[#3129a6] hover:bg-blue-700 text-white z-[1105] px-8 py-3 rounded-md font-bold ml-auto"
              >
                Next Section
              </button>
            ) : (
              <button
                onClick={fetchAndSendPdf}
                disabled={isGeneratingPdf}
                className={`px-8 py-3 rounded-md font-bold text-white ml-auto ${isGeneratingPdf ? "bg-gray-400" : "bg-amber-500"
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
