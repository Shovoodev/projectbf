import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import RendererPDF from "./RendererPdf";

const withTimeout = (promise, ms) => {
    let t;
    const timeout = new Promise((_, reject) => {
        t = setTimeout(() => reject(new Error(`PDF generation timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
};

const nextPaint = () => new Promise((r) => requestAnimationFrame(() => r()));

const PDFDownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (loading) return;

        try {
            setLoading(true);

            // ✅ let UI update before starting heavy render
            await nextPaint();

            // ✅ Generate PDF blob (with timeout so it can’t hang forever)
            const blob = await withTimeout(pdf(<RendererPDF />).toBlob(), 20000);

            // ✅ Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "KeyInvest-Application-Form.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);

            console.log("PDF downloaded successfully");
        } catch (error) {
            console.error("Error downloading PDF:", error);
            alert(error?.message || "Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className={`w-full flex items-center justify-center bg-[#2c5aa0] hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md ${loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
        >
            {loading ? "Generating PDF..." : "Download PDF"}
        </button>
    );
};

export default PDFDownloadButton;
