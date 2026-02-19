import { pdf } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
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

// Logic and Utilities
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";
import PrePayInvoicePDF from "./generatedPdf/PrepayinvoicePDF";
import PDFDownloadButton from "./generatedPdf/TestDownload";

// Form Slips
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

const CORE = import.meta.env.VITE_API_URL;
const displayImages = [
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
  console.log("PrePay component received totalPrice:", totalPrice);
  // --- VERSION 2 LOGIC ---
  const { submitInvestment, isGeneratingPdf } = usePrePayServiceApi();
  const [loadingText, setLoadingText] = useState("Preparing your documents...");
  const [formActive, setFormActive] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [step, setStep] = useState(0);
  const location = useLocation();
  const { selections, path } = location.state || {};

  // --- VERSION 1 UI STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // --- BACKEND FUNCTIONS (KEPT FROM VERSION 2) ---
  const clientInvoice = async () => {
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
        reader.onloadend = () =>
          resolve(String(reader.result || "").split(",")[1]);
        reader.readAsDataURL(blob);
      });

    try {
      setLoadingText("Preparing invoice...");
      const backendSelections = transformSelectionsForBackend(selections);
      if (backendSelections && path) {
        await fetch(`${CORE}/${path}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selections: backendSelections,
            totalPrice: totalPrice ?? 0,
          }),
        });
      }
      setLoadingText("Fetching data...");
      const resSelections = await fetch(`${CORE}/all-selected-selections`, {
        credentials: "include",
      });
      const data = await resSelections.json();
      const invoiceData = data?.data;

      setLoadingText("Rendering PDF...");
      const blob = await pdf(
        <PrePayInvoicePDF invoiceDetails={invoiceData} />,
      ).toBlob();
      const base64data = await toBase64FromBlob(blob);

      setLoadingText("Sending...");
      await fetch(`${CORE}/api/send-invoice`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selections: backendSelections ?? selections ?? {},
          totalPrice: invoiceData?.totalPrice ?? totalPrice ?? 0,
          pdfAttachment: base64data,
        }),
      });
      setLoadingText("Sent ✅");
    } catch (err) {
      setLoadingText("Failed");
    }
  };

  const fetchAndSendPdf = async () => {
    try {
      await submitInvestment();
      await clientInvoice();
    } catch (e) {
      console.error(e);
    }
  };

  // --- DYNAMIC SLIPS CONFIG (KEPT FROM VERSION 2) ---
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

  const slipConfig = useMemo(
    () => [
      { id: "32", enabled: true },
      { id: "33", enabled: true },
      { id: "34", enabled: false },
      { id: "35", enabled: true },
      { id: "36", enabled: false },
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

  const renderedSlips = useMemo(() => {
    return slips
      .map((comp, idx) => ({ comp, cfg: slipConfig[idx] }))
      .filter((x) => x.cfg?.enabled !== false);
  }, [slips, slipConfig]);

  // --- HANDLERS (VERSION 1 STYLE) ---
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

  const nextImage = () => {
    if (currentIndex === displayImages.length - 1) {
      // Last image reached, activate form overlay
      setFormActive(true);
      setButtonStatus(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length,
    );

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  useEffect(() => {
    setZoom(1);
    setDragOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  useEffect(() => {
    document.body.style.overflow = formActive ? "hidden" : "auto";
  }, [formActive]);

  return (
    <div className="relative font-roboto">
      {/*  DESKTOP CONTROL BOX - ALWAYS VISIBLE (VERSION 1) */}
      <div className="hidden md:block fixed right-6 top-10 z-[1300]">
        <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border-2 border-[#2c5aa0]/30 w-[400px] min-h-[200px] flex items-center p-[35px] text-center">
          <div className="w-full flex-1">
            <h1 className="text-[#2c5aa0] text-[28px] font-semibold mb-[15px]">
              {buttonStatus ? "Funeral Bond Information" : "Application Form"}
            </h1>

            <button
              onClick={handleToggleForm}
              className="bg-[#2c5aa0] text-white border-2 border-[#2c5aa0] px-[30px] py-[15px] rounded-lg text-base font-semibold uppercase tracking-wider shadow-[0_6px_16px_rgba(44,90,160,0.4)] cursor-pointer transition-all hover:brightness-110 active:scale-95 w-full mb-3"
            >
              {buttonStatus
                ? "Continue to Application Form"
                : "Move back to Documentation"}
            </button>

            {/* Version 2 buttons inside the Version 1 box */}
            <PDFDownloadButton />
            <button
              onClick={fetchAndSendPdf}
              disabled={isGeneratingPdf}
              className={`mt-3 w-full text-white font-semibold text-base py-3.5 rounded-xl transition-all ${isGeneratingPdf ? "bg-gray-400" : "bg-amber-500 hover:brightness-110"}`}
            >
              {isGeneratingPdf ? "Processing..." : "Email PDF to Me"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE CONTROL BAR (VERSION 1) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1300] p-1 bg-white border-t border-[#2c5aa0]/20">
        <button
          onClick={handleToggleForm}
          className="bg-[#2c5aa0] text-white border-2 border-[#2c5aa0] px-[30px] py-[15px] rounded-lg text-base font-semibold uppercase tracking-wider w-full"
        >
          {buttonStatus
            ? "Continue to Application Form"
            : "Move back to Documentation"}
        </button>
      </div>

      {/* GALLERY VIEWER (VERSION 1 LOGIC) */}
      {buttonStatus && (
        <div
          className="relative w-full min-h-screen py-3 pb-24 md:pb-3 flex flex-col items-center justify-center md:gap-10 md:flex-row"
          onWheel={handleWheel}
        >
          {/* DESKTOP LAYOUT */}
          <button
            onClick={prevImage}
            className="hidden md:flex bg-[#2c5aa0] text-white p-4 rounded-full shadow-lg z-10 items-center justify-center hover:brightness-110 transition-all"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* IMAGE CONTAINER */}
          <div
            className="relative flex items-center justify-center"
            style={{
              transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
            }}
          >
            <img
              src={displayImages[currentIndex]}
              alt="Gallery"
              className={`max-w-[90%] max-h-[95vh] object-contain rounded-xl shadow-2xl ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              draggable="false"
            />
          </div>

          {/* DESKTOP LAYOUT */}
          <button
            onClick={nextImage}
            className="hidden md:flex bg-[#2c5aa0] text-white p-4 rounded-full shadow-lg z-10 items-center justify-center hover:brightness-110 transition-all"
          >
            <FaChevronRight size={24} />
          </button>

          {/* MOBILE BUTTONS - BOTTOM */}
          <div className="md:hidden fixed bottom-18 left-0 right-0 flex items-center justify-center gap-4 z-[1310]">
            <button
              onClick={prevImage}
              className="bg-[#2c5aa0] text-white p-3 rounded-full shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="bg-[#2c5aa0] text-white p-3 rounded-full shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* FORM OVERLAY (VERSION 2 CONTENT, VERSION 1 WRAPPER) */}
      <div
        className={`fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 transition-all duration-500 ${formActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col w-full max-w-[700px] h-full md:max-h-[850px] mx-auto bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-y-scroll flex-1 px-2 md:px-3 py-5">
            {renderedSlips[step]?.comp}
          </div>

          {/* ACTIONS - DESKTOP VERSION */}
          <div className="hidden md:flex flex-row justify-between items-center p-2 bg-gray-50">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#2c5aa0] text-white px-6 py-3 rounded-lg flex items-center hover:brightness-110 transition-all active:scale-95"
              >
                <FaChevronLeft className="mr-2" size={20} />
                <span>Previous Section</span>
              </button>
            ) : (
              <div />
            )}

            {step < renderedSlips.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#3129a6] text-white px-6 py-3 rounded-lg flex items-center hover:brightness-110 transition-all active:scale-95"
              >
                <span>Next Section</span>
                <FaChevronRight className="ml-2" size={20} />
              </button>
            ) : (
              <button
                onClick={fetchAndSendPdf}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all active:scale-95"
              >
                <span>Finish Submission</span>
              </button>
            )}
          </div>

          {/* ACTIONS - MOBILE VERSION */}
          <div className="md:hidden mb-15 flex items-center justify-center gap-4 p-1  ">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#2c5aa0] text-white p-3 rounded-lg flex items-center justify-center hover:brightness-110 transition-all active:scale-95 shadow-md"
              >
                <FaChevronLeft size={24} />
              </button>
            ) : (
              <div className="p-3" />
            )}

            <div className="text-center text-sm font-semibold text-[#2c5aa0]">
              Step {step + 1} of {renderedSlips.length}
            </div>

            {step < renderedSlips.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#3129a6] text-white p-3 rounded-lg flex items-center justify-center hover:brightness-110 transition-all active:scale-95 shadow-md"
              >
                <FaChevronRight size={24} />
              </button>
            ) : (
              <button
                onClick={fetchAndSendPdf}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all active:scale-95"
              >
                <span>Sumbit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LOADING MODAL */}
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
