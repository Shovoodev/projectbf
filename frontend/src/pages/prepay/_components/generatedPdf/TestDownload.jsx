import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import RendererPDF from "./RendererPdf";

/**
 * Wrap a promise with a timeout.
 */
const withTimeout = (promise, ms) => {
    let t;
    const timeout = new Promise((_, reject) => {
        t = setTimeout(() => reject(new Error(`PDF generation timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
};

/**
 * Let the UI paint before starting heavy work.
 */
const nextPaint = () => new Promise((r) => requestAnimationFrame(() => r()));

/**
 * Fetch an image and convert it to a Base64 data URL that React-PDF can render reliably.
 * Includes strong validation so you get a clear error instead of a blank page.
 */
const urlToBase64 = async (url) => {
    // Make sure this URL is reachable in your browser too.
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(`Failed to load image: ${url} (${res.status})`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
        // If you accidentally fetched HTML (404 page / index.html), show a snippet
        const text = await res.text();
        throw new Error(
            `URL did not return an image. content-type=${contentType}. Response starts with: ${text.slice(
                0,
                120
            )}`
        );
    }

    const blob = await res.blob();

    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Failed reading image blob as base64"));
        reader.onload = () => resolve(reader.result); // "data:image/jpeg;base64,..."
        reader.readAsDataURL(blob);
    });
};

const PDFDownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (loading) return;

        let objectUrl = null;

        try {
            setLoading(true);
            await nextPaint();

            const imagePath = "/fortyThree.jpg";

            // 1) Convert image to base64 (most reliable for React-PDF)
            const photo43Base64 = await withTimeout(urlToBase64(imagePath), 15000);

            // 2) Build PDF blob (give it enough time)
            const doc = <RendererPDF investorData={{}} photo43={photo43Base64} />;
            const blob = await withTimeout(pdf(doc).toBlob(), 30000);

            // 3) Download blob
            objectUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "KeyInvest-Application-Form.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("PDF download error:", error);
            alert(error?.message || "Failed to generate PDF.");
        } finally {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className={`p-5 rounded ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
        >
            {loading ? "Generating PDF..." : "Download PDF"}
        </button>
    );
};

export default PDFDownloadButton;
