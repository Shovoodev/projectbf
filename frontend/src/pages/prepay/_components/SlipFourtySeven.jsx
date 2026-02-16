import React, { useEffect, useMemo, useState } from "react";
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";

const SlipFourtySeven = () => {
  const { signature, date, application, updateInvestor } = usePrePayServiceApi();

  const declarations = useMemo(
    () => [
      "To apply for the Funeral Bond electronically online.",
      "To submit signed applications for the Funeral Bond via email.",
      "To submit the Direct Debit Request authority to make the initial payment and establish any Regular Savings Plan via email or online.",
      "Change any data entry errors submitted in the on line application to effect the establishment of the Funeral Bond. For example to correct typographical errors made to bank account details or Policy owner details (online application only).",
      "To submit signed transactional requests on your behalf via email. This includes switch requests, additional deposit requests or to vary any regular savings plans.",
      "To update Investor contact details via email, such as address, telephone numbers and email addresses.",
      "If KeyInvest reasonably believe that a person is your authorised financial adviser, or authorised delegate, then anything they do on your behalf within the constraints of this agreement will be treated as if you had done it personally.",
      "The nominated financial adviser will remain authorised, even if this financial adviser changes dealer groups (with a current dealer group release authority).",
      "Once you sign this authority we will treat your financial adviser, or authorised delegate, as being properly appointed unless you inform us otherwise.",
      "You agree to release, discharge and indemnify KeyInvest from and against any liability, cost or loss that is incurred as a result of KeyInvest acting on this authority.",
      "Agree that KeyInvest are not responsible for any loss or delay that results from an email transmission not being received by us.",
      "This authority continues until we receive written notice from you of cancellation of the authority.",
      "KeyInvest may refuse to accept an authority or permit a person to transact or carry out a transaction under this agreement.",
      "KeyInvest can cancel or vary these conditions by giving you not less than seven (7) days written notice.",
    ],
    []
  );

  // ✅ load saved values from store if you come back to page
  const saved = application?.investorOne?.adviserDeclarations;

  const [checkedDecl47, setCheckedDecl47] = useState(() => {
    // If saved is array of booleans, use it
    if (Array.isArray(saved) && typeof saved?.[0] === "boolean") {
      return saved.length === declarations.length
        ? saved
        : declarations.map((_, i) => !!saved[i]);
    }

    // If saved is array of indexes [0,2,5], convert to boolean array
    if (Array.isArray(saved) && (typeof saved?.[0] === "number" || typeof saved?.[0] === "string")) {
      const idx = saved.map(Number).filter((n) => Number.isFinite(n));
      return declarations.map((_, i) => idx.includes(i));
    }

    // default
    return declarations.map(() => false);
  });

  // ✅ sync to global store whenever it changes
  useEffect(() => {
    updateInvestor("investorOne", "adviserDeclarations", checkedDecl47);
  }, [checkedDecl47, updateInvestor]);

  const toggleDecl = (index) => {
    setCheckedDecl47((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // ✅ signature preview safe (avoid creating URL every render)
  const [sigPreviewUrl, setSigPreviewUrl] = useState("");
  useEffect(() => {
    if (!(signature instanceof File)) {
      setSigPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(signature);
    setSigPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [signature]);

  return (
    <div className="form-container-base">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Section Header */}
        <div className="px-2 py-2 border-b border-gray-200">
          <h3 className="text-3xl font-bold text-gray-800 mb-1">
            4. Investor(s) declaration
          </h3>
        </div>

        <div className="p-2 md:p-2">
          <p className="text-gray-700 font-medium mb-1">
            You authorise the nominated financial adviser, or authorised delegate:
          </p>

          {/* ✅ Declarations List */}
          <div className="pdf-declaration-list pb-5">
            {declarations.map((text, index) => (
              <label key={index} className="pdf-declaration-item p-0 gap-2">
                <input
                  type="checkbox"
                  className="pdf-declaration-checkbox"
                  checked={checkedDecl47[index]}
                  onChange={() => toggleDecl(index)}
                />
                <span className="pdf-declaration-text text-sm">{text}</span>
              </label>
            ))}
          </div>

          {/* Signature */}
          <div className="border-2 border-gray-200 rounded-xl p-2 bg-gray-50">
            <div className="flex items-center mb-1">
              <h3 className="text-2xl font-semibold text-gray-800">Signature</h3>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature of Investor
              </label>

              {sigPreviewUrl ? (
                <img src={sigPreviewUrl} alt="Signature" className="mt-1 max-w-xs" />
              ) : (
                <div className="text-xs text-gray-400">No signature saved</div>
              )}

              <div className="pdf-date-container">
                <label className="pdf-label-sm">Date:</label>
                <input
                  type="date"
                  name="investor1_date"
                  defaultValue={date}
                  className="pdf-input"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pdf-footer">
            <div>
              <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
            </div>
            <div>Version: July 2026</div>
            <div>Page 47</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlipFourtySeven;
