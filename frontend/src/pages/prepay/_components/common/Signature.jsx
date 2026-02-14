import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaUpload } from "react-icons/fa";
import { usePrePayServiceApi } from "../../../../utility/prepay-service-provider";
import SignatureField from "./SignatureField";

function Signature() {
  const {
    signature,
    setSignature,
    sigCanvasRef,
    saveSignature,   // saves from canvas
    clearSignature,  // clears canvas
  } = usePrePayServiceApi();

  const fileInputRef = useRef(null);

  // Local preview for uploaded signature
  const [uploadedFile, setUploadedFile] = useState(null); // File
  const [uploadedPreview, setUploadedPreview] = useState(""); // dataURL (image only)

  // Cleanup preview URL when component unmounts or when file changes
  useEffect(() => {
    return () => {
      // nothing to revoke because we use dataURL here
    };
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate type
    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    if (!isImage && !isPdf) {
      alert("Only PNG, JPG or PDF accepted");
      e.target.value = "";
      return;
    }

    setUploadedFile(file);

    // Preview only for images
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedPreview(String(ev.target.result || ""));
      reader.readAsDataURL(file);
    } else {
      setUploadedPreview(""); // no image preview for pdf
    }
  };

  const handleRemoveUploadedSig = useCallback(() => {
    setUploadedFile(null);
    setUploadedPreview("");

    // also clear saved signature from context (optional but usually desired)
    setSignature(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [setSignature]);

  // ✅ Save uploaded signature into your global context (so SlipThirtySeven can preview it)
  const handleSaveUploadedSig = useCallback(() => {
    if (!uploadedFile) return;

    // store the File in context (this is what your submitInvestment checks)
    setSignature(uploadedFile);

    // optional: clear the upload UI after saving
    // setUploadedFile(null);
    // setUploadedPreview("");
  }, [uploadedFile, setSignature]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      {/* Upload Signature */}
      <div className="space-y-4">
        <div className="pdf-signature-zone">
          <FaUpload className="text-gray-300 text-3xl mb-3" />

          <input
            id="sig-investor-1"
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />

          <label htmlFor="sig-investor-1" className="pdf-upload-btn cursor-pointer">
            Upload Investor's Signature
          </label>

          <p className="text-[10px] text-gray-400">PNG, JPG or PDF accepted</p>

          {/* Preview (only images) */}
          {uploadedPreview && uploadedPreview.startsWith("data:image") && (
            <div className="relative mt-2 inline-block">
              <button
                type="button"
                onClick={handleRemoveUploadedSig}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow w-6 h-6 border flex items-center justify-center text-xs"
              >
                ×
              </button>
              <img
                src={uploadedPreview}
                alt="Uploaded signature"
                className="border rounded max-w-full h-auto bg-white"
              />
            </div>
          )}

          {/* If PDF uploaded, show a small label */}
          {uploadedFile?.type === "application/pdf" && (
            <div className="mt-2 text-xs text-gray-500">
              PDF selected: <span className="font-semibold">{uploadedFile.name}</span>
              <button
                type="button"
                onClick={handleRemoveUploadedSig}
                className="ml-2 underline text-red-600"
              >
                remove
              </button>
            </div>
          )}

          {/* ✅ Save uploaded file to context */}
          {uploadedFile && (
            <button
              type="button"
              onClick={handleSaveUploadedSig}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm w-full"
            >
              Save Uploaded Signature
            </button>
          )}

          {/* Optional: show that signature is saved */}
          {signature instanceof File && (
            <p className="mt-2 text-xs text-green-600 font-semibold">
              ✅ Signature saved
            </p>
          )}
        </div>

        <label className="pdf-label text-center">Signature of Investor</label>
      </div>

      {/* Draw Signature */}
      <div className="space-y-4 mb-5">
        <SignatureField
          sigPadRef={sigCanvasRef}
          saveSignature={saveSignature}
          clearSignature={clearSignature}
          penColor="black"
          canvasProps={{
            width: 400,
            height: 150,
            className: "w-full h-full",
          }}
        />
      </div>
    </div>
  );
}

export default Signature;
