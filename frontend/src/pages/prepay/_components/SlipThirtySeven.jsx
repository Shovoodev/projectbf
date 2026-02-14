import { useCallback, useMemo, useState } from "react";
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";
import Signature from "./common/Signature";
import { showToast } from "../../../utility/toast";

const SlipThirtySeven = () => {
  const { signature, setSignature, sigCanvasRef, updateInvestor } = usePrePayServiceApi();

  const declarations = useMemo(() => ([
    "I/We have read and understood this Application Form and the PDS attached and to which this Application Form relates;",
    "To be bound by the terms and conditions of the PDS, this Application Form and the Constitution of KeyInvest (as amended from time to time);",
    "I/We have not relied on statements or representations made by any person, other than those made in the PDS to which this Application Form relates;",
    "The information I/We have provided in this Application Form is true and correct;",
    "The KeyInvest Funeral Bond does not mature until my/our death and that no withdrawals under the KeyInvest Funeral Bond are possible (other than where the KeyInvest Funeral Bond is 'cooled-off' in accordance with the terms of this PDS);",
    "The amount of my/our contributions to the KeyInvest Funeral Bond do not exceed my/our anticipated total amount of funeral expenses;",
    "Except for in respect of the repayment of capital of the 'Capital Guaranteed Fund', KeyInvest does not guarantee the performance of any other 'Investment Option' of the KeyInvest Funeral Bond;",
    "In the event KeyInvest is wound up and unable to meet its liabilities, I/We will contribute to the sum of $1.00 only, towards the meeting of KeyInvest's liabilities;",
    "I/We may be responsible for any Stamp Duty payable on the issue of my/our KeyInvest Funeral Bond or any subsequent assignment to a funeral director;",
    "My/Our financial adviser (where applicable), may process an application under the KeyInvest Funeral Bond using KeyInvest's online application portal;",
    "That my/our personal information will be collected, used and disclosed by KeyInvest in accordance with its Privacy Policy.",
  ]), []);

  const optionalCheckboxes = useMemo(() => ([
    "If you do not wish to receive newsletters or information in relation to our other products and services, please mark this box",
    "If you do not wish to receive newsletters or information about goods or services from other suppliers which Keylnvest reasonably consider may be of interest to you, please mark this box.",
  ]), []);

  // ✅ store checkbox states
  const [checkedDecl, setCheckedDecl] = useState(() => declarations.map(() => false));
  const [checkedOpt, setCheckedOpt] = useState(() => optionalCheckboxes.map(() => false));

  // ✅ whenever checkbox changes, also sync to store (so submit page can send it)
  const syncToStore = (nextDecl, nextOpt) => {
    updateInvestor("investorOne", ["declarations"], nextDecl);
    updateInvestor("investorOne", ["optionalConsents"], nextOpt);
  };

  const toggleDecl = (index) => {
    setCheckedDecl((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      syncToStore(next, checkedOpt);
      return next;
    });
  };

  const toggleOpt = (index) => {
    setCheckedOpt((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      syncToStore(checkedDecl, next);
      return next;
    });
  };

  const clearSavedSignature = useCallback(() => {
    setSignature(null);

    if (sigCanvasRef.current) sigCanvasRef.current.clear();

    showToast.error("signature has been removed", {
      duration: 800,
      options: { position: "bottom-right" },
    });
  }, [setSignature, sigCanvasRef]);

  return (
    <div className="form-container-base">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="pdf-h2 text-3xl mb-0">5. Application</h1>

        <div className="pdf-info-box bg-blue-50/50">
          <p className="text-[13px]">
            Before signing this Application Form, Investors should read the PDS
            to which this application is attached.
          </p>
        </div>

        <div>
          <h3 className="pdf-label text-lg border-b pb-0">Declaration:</h3>
          <p className="pdf-intro-p mt-0 font-bold">I/We agree and acknowledge:</p>

          <div className="pdf-declaration-list">
            {declarations.map((text, index) => (
              <label key={index} className="pdf-declaration-item">
                <input
                  type="checkbox"
                  className="pdf-declaration-checkbox"
                  checked={checkedDecl[index]}
                  onChange={() => toggleDecl(index)}
                />
                <span className="pdf-declaration-text">{text}</span>
              </label>
            ))}
          </div>

          <div className="pdf-declaration-list mt-4 ml-1 border-t border-gray-300">
            {optionalCheckboxes.map((text, index) => (
              <label key={index} className="pdf-declaration-item">
                <input
                  type="checkbox"
                  className="pdf-declaration-checkbox"
                  checked={checkedOpt[index]}
                  onChange={() => toggleOpt(index)}
                />
                <span className="pdf-declaration-text">{text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-6">
          {signature ? (
            <div className="space-y-2">
              <img
                src={URL.createObjectURL(signature)}
                alt="Signature"
                className="mt-4 max-w-xs border p-2 rounded bg-white"
              />
              <button
                type="button"
                onClick={clearSavedSignature}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove Signature
              </button>
            </div>
          ) : (
            <Signature />
          )}
        </div>

        <div className="pdf-footer">
          <div className="flex gap-1">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span>Funeral Bond Product Disclosure Statement (PDS)</span>
          </div>
          <div className="flex gap-2">
            <div>Version: July 2026</div>
            <div className="font-bold">37</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SlipThirtySeven;
