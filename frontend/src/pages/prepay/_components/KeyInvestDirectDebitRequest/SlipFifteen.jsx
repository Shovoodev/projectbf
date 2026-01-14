
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ReactSketchCanvas } from "react-sketch-canvas";

import Signature from "../common/Signature";


const SlipFifteen = () => {
  const declarations = [
    "To apply for the Funeral Bond electronically online.",
    "To submit signed applications for the Funeral Bond via email.",
    "To submit the Direct Debit Request authority to make the initial payment and establish any Regular Savings Plan via email or online.",
    "Change any data entry errors submitted in the online application to effect the establishment of the Funeral Bond. For example, to correct typographical errors made to bank account details or Policy owner details (online application only).",
    "To submit signed transactional requests on your behalf via email. This includes switch requests, additional deposit requests or to vary any regular savings plans.",
    "To update Investor contact details via email, such as address, telephone numbers and email addresses.",
    "If KeyInvest reasonably believe that a person is your authorised financial adviser, or authorised delegate, then anything they do on your behalf within the constraints of this agreement will be treated as if you had done it personally.",
    "The nominated financial adviser will remain authorised, even if this financial adviser changes dealer groups (with a current dealer group release authority).",
    "Once you sign this authority we will treat your financial adviser, or authorised delegate, as being properly appointed unless you inform us otherwise.",
    "You agree to release, discharge and indemnify KeyInvest from and against any liability, cost or loss that is incurred as a result of KeyInvest acting on this authority.",
    "Agree that KeyInvest are not responsible for any loss or delay that results from an email transmission not being received by us.",
    "This authority continues until we receive written notice from you of cancellation of the authority.",
    "KeyInvest may refuse to accept authority or permit a person to transact or carry out a transaction under this agreement.",
    "KeyInvest can cancel or vary these conditions by giving you not less than seven (7) days written notice.",
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

      <form className="p-4 md:p-10" onSubmit={(e) => e.preventDefault()}>
        <h1 className="pdf-h2 text-3xl mb-6">4. Investor(s) declaration</h1>

        {/* <div className="pdf-info-box mb-8 bg-blue-50/50 border-blue-900">
          <p className="text-[13px] leading-relaxed"></p>
        </div> */}

        {/* Declaration Section */}
        <div className="mb-10">
          <h3 className="pdf-label text-lg border-b border-gray-100 pb-2">
            By signing this Adviser Electronic Transaction Authority Form you
            acknowledge that :
          </h3>

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
            <div className="hidden md:block">Version: July 2026</div>
            <div className="bg-[rgb(49,41,166)] text-white px-2 py-0.5 rounded text-[12px]">
              46
            </div>
          </div>
        </div>

        {/* Actions */}
      </form>
    </div>
  );
};

export default SlipFifteen;
