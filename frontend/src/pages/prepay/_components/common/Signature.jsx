import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { usePrePayServiceApi } from "../../../../utility/prepay-service-provider";
import SignatureField from "./SignatureField";
function Signature() {
  // ===== Signature Upload =====
  const { sigCanvasRef, saveSignature, clearSignature } = usePrePayServiceApi();
  const [uploadedSig, setUploadedSig] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setUploadedSig(ev.target.result);
    reader.readAsDataURL(file);
  };
  const handleRemoveUploadedSig = () => {
    setUploadedSig(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      {/* Upload Signature */}
      <div className="space-y-4 ">
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

          <label
            htmlFor="sig-investor-1"
            className="pdf-upload-btn cursor-pointer"
          >
            Upload Investor's Signature
          </label>

          <p className="text-[10px] text-gray-400">PNG, JPG or PDF accepted</p>

          {/* Preview */}
          {uploadedSig && uploadedSig.startsWith("data:image") && (
            <div className="relative mt-2 inline-block">
              <button
                type="button"
                onClick={handleRemoveUploadedSig}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow w-6 h-6 border flex items-center justify-center text-xs"
              >
                ×
              </button>
              <img
                src={uploadedSig}
                alt="Uploaded signature"
                className="border rounded max-w-full h-auto"
              />
            </div>
          )}

          {/* Save Uploaded Signature Button */}
          {uploadedSig && (
            <button
              type="button"
              onClick={saveSignature}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm w-full"
            >
              Save Uploaded Signature
            </button>
          )}
        </div>

        <label className="pdf-label text-center">Signature of Investor</label>
      </div>

      {/* Draw Signature */}
      <div className="space-y-4  mb-5">
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
