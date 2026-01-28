import React from "react";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import SignatureField from "./SignatureField";
import { usePrePayServiceApi } from "../../../../utility/prepay-service-provider";
function Signature() {
  // ===== Signature Upload =====
  const { sigCanvasRef, saveSignature, clearSignature, signaturePreview, } = usePrePayServiceApi();
  const fileInputRef = useRef(null);
  const [uploadedSig, setUploadedSig] = useState(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setUploadedSig(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedSig = () => {
    setUploadedSig(null);

    // reset file input so same file can be re-uploaded
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-center">
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

          <label
            htmlFor="sig-investor-1"
            className="pdf-upload-btn cursor-pointer"
          >
            Upload Investor 1 Signature
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

          {uploadedSig && uploadedSig.startsWith("data:application/pdf") && (
            <div className="relative mt-2 inline-block">
              <button
                type="button"
                onClick={handleRemoveUploadedSig}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow w-6 h-6 border flex items-center justify-center text-xs"
              >
                ×
              </button>
              <div className="text-xs text-gray-600 border p-2 rounded">
                PDF signature uploaded
              </div>
            </div>
          )}
        </div>

        <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200 text-center">Signature of Investor 1</label>
      </div>

      {/* Draw Signature */}
      <div className="lg:col-span-2 space-y-4">
        <SignatureField

          sigPadRef={sigCanvasRef}
          saveSignature={saveSignature}
          clearSignature={clearSignature}
          penColor="black" />
      </div>
      {/* hidden signature */}
      <div className="space-y-4 hidden">
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
            Upload Investor 2 Signature
          </label>

          <p className="text-[10px] text-gray-400">PNG, JPG or PDF accepted</p>

          {/* Preview */}
          {(uploadedSig || signaturePreview) && (
            <div className="mt-4 relative inline-block">
              <button
                type="button"
                onClick={() => {
                  setUploadedSig(null);
                  clearSignature();
                }}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow w-6 h-6 border flex items-center justify-center text-xs"
              >
                ×
              </button>

              <img
                src={uploadedSig || signaturePreview}
                alt="Signature Preview"
                className="border rounded max-w-full h-[120px] object-contain bg-white"
              />
            </div>
          )}


        </div>

        <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200 text-center">Signature of Investor 1</label>
      </div>
    </div>
  );
}

export default Signature;
