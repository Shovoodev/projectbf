import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SlipSix = () => {
  const declarations = [
    "I/We have read and understood this Application Form and the PDS attached and to which this Application Form relates;",
    "To be bound by the terms and conditions of the PDS, this Application Form and the Constitution of KeyInvest (as amended from time to time);",
    "I/We have not relied on statements or representations made by any person, other than those made in the PDS to which this Application Form relates;",
    "The information I/We have provided in this Application Form is true and correct;",
    "The KeyInvest Funeral Bond does not mature until my/our death and that no withdrawals under the KeyInvest Funeral Bond are possible (other than where the KeyInvest Funeral Bond is 'cooled-off' in accordance with the terms of this PDS);",
    "The amount of my/our contributions to the KeyInvest Funeral Bond do not exceed my/ our anticipated total amount of funeral expenses;",
    "Except for in respect of the repayment of capital of the 'Capital Guaranteed Fund', KeyInvest does not guarantee the performance of any other 'Investment Option' of the KeyInvest Funeral Bond;",
    "In the event KeyInvest is wound up and unable to meet its liabilities, I/We will contribute to the sum of $1.00 only, towards the meeting of KeyInvest's liabilities;",
    "I/We may be responsible for any Stamp Duty payable on the issue of my/our KeyInvest Funeral Bond or any subsequent assignment to a funeral director;",
    "My/Our financial adviser (where applicable), may process an application under the KeyInvest Funeral Bond using KeyInvest's online application portal;",
    "That my/our personal information will be collected, used and disclosed by KeyInvest in accordance with its Privacy Policy.",
  ];

  const sigPadRef = useRef(null);
  const [sigDataUrl, setSigDataUrl] = useState(null);
  const [uploadedSig, setUploadedSig] = useState(null);

  const handleExport = async () => {
    if (!sigPadRef.current) return;
    try {
      const data = await sigPadRef.current.exportImage("png");
      if (data) setSigDataUrl(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => sigPadRef.current?.clearCanvas();
  const handleUndo = () => sigPadRef.current?.undo();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedSig(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-container-base">
      {/* Responsive Progress Header */}
      {/* <div className="bg-slate-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Section 4 of 12
        </span>
        <div className="flex gap-1 h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 bg-blue-900"></div>
        </div>
      </div> */}

      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="pdf-h2 text-3xl mb-6">5. Application</h1>

        <div className="pdf-info-box mb-8 bg-blue-50/50 border-blue-900">
          <p className="text-[13px] leading-relaxed">
            Before signing this Application Form, Investors should read the PDS
            to which this application is attached. This Application Form must
            not be distributed unless attached to the PDS. Investors aged
            between 10 and 16 years of age require the written consent of a
            parent or guardian.
          </p>
        </div>

        {/* Declaration Section */}
        <div className="mb-10">
          <h3 className="pdf-label text-lg border-b border-gray-100 pb-2">
            Declaration:
          </h3>
          <p className="pdf-intro-p mt-3 font-bold">
            I/We agree and acknowledge:
          </p>

          <div className="pdf-declaration-list">
            {declarations.map((text, index) => (
              <label key={index} className="pdf-declaration-item group">
                <input type="checkbox" className="pdf-declaration-checkbox" />
                <span className="pdf-declaration-text">{text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Marketing Preferences */}
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-slate-200 mb-10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="pdf-declaration-checkbox" />
            <span className="text-xs text-slate-600">
              If you do not wish to receive newsletters or information in
              relation to our other products and services, please mark this box.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="pdf-declaration-checkbox" />
            <span className="text-xs text-slate-600">
              If you do not wish to receive newsletters or information about
              goods or services from other suppliers which KeyInvest reasonably
              consider may be of interest to you, please mark this box.
            </span>
          </label>
        </div>

        {/* Signature Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
          <div className="space-y-4">
            <p className="text-xs text-gray-500 italic">
              If this application is in joint names, both Investors are required
              to sign.
            </p>
            <div className="pdf-signature-zone">
              <FaUpload className="text-gray-300 text-3xl mb-3" />
              <input
                id="sig-1"
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="sig-1" className="pdf-upload-btn cursor-pointer">
                Upload Investor 1 Signature
              </label>
              <p className="text-[10px] text-gray-400 mt-2">
                PNG, JPG or PDF accepted
              </p>

              {uploadedSig && uploadedSig.startsWith("data:image") && (
                <img
                  src={uploadedSig}
                  alt="uploaded signature"
                  className="mt-2 border rounded max-w-full h-auto"
                />
              )}

              {uploadedSig &&
                uploadedSig.startsWith("data:application/pdf") && (
                  <div className="mt-2 text-xs text-gray-600 border p-2 rounded">
                    PDF signature uploaded
                  </div>
                )}
            </div>
            <label className="pdf-label text-center">
              Signature of Investor 1
            </label>
          </div>
          <div className="space-y-4 mt-7">
            {/* Signature canvas for Investor 2 */}
            <ReactSketchCanvas
              ref={sigPadRef}
              width={"240px"}
              height={"120px"}
              strokeWidth={2}
              strokeColor="black"
              className="block border border-gray-200 rounded"
            />

            <div className="flex gap-2 ">
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1 bg-gray-100 rounded border text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="hidden sm:inline">
              Funeral Bond Product Disclosure Statement (PDS)
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="hidden md:block">Version: July 2025</div>
            <div className="bg-[rgb(49,41,166)] text-white px-2 py-0.5 rounded text-[12px]">
              37
            </div>
          </div>
        </div>

        {/* Actions */}
      </form>
    </div>
  );
};

export default SlipSix;
