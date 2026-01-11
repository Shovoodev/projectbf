import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUpload } from "react-icons/fa";

import Signature from "../common/Signature";
const SlipEleven = () => {
  const [formData, setFormData] = useState({
    lumpSumAmount: "",
    rspContributionAmount: "",
    rspEndAmount: "",
    holder1_date: "2026-01-10",
    holder2_date: "2026-01-10",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container-base">
      <form className="p-4 md:p-10" onSubmit={(e) => e.preventDefault()}>
        {/* Section 3: Amount and frequency of debits */}
        <section className="mb-12">
          <h2 className="pdf-h2 text-[#00A99D] mb-6">
            3. Amount and frequency of debits
          </h2>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pdf-intro-p mb-0">
                Lump Sum Contribution – this authority is for one payment only
                of
              </span>
              <div className="flex items-center">
                <span className="font-bold text-[rgb(49,41,166)] mr-1">$</span>
                <input
                  type="number"
                  name="lumpSumAmount"
                  className="pdf-inline-input w-40 font-bold"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 leading-loose">
              <span className="pdf-intro-p mb-0">
                The Regular Savings Plan contribution of
              </span>
              <div className="flex items-center">
                <span className="font-bold text-[rgb(49,41,166)] mr-1">$</span>
                <input
                  type="number"
                  name="rspContributionAmount"
                  className="pdf-inline-input w-40 font-bold"
                  onChange={handleInputChange}
                />
              </div>
              <span className="pdf-intro-p mb-0">
                will be deducted commencing on the 15th of the month nominated
                in Section 2.1 of the Application Form.
              </span>
            </div>

            <div className="pdf-info-box !border-none !bg-blue-50/30 !mt-2">
              <p className="pdf-intro-p italic text-xs mb-0">
                If no selection is made the RSP will commence at the discretion
                of KeyInvest and be confirmed in writing to you in your Policy
                Confirmation Letter.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="pdf-intro-p mb-0">
                Please end my RSP when total contributions reach
              </span>
              <div className="flex items-center">
                <span className="font-bold text-[rgb(49,41,166)] mr-1">$</span>
                <input
                  type="number"
                  name="rspEndAmount"
                  className="pdf-inline-input w-40 font-bold"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="pdf-hr" />

        {/* Section 4: Declarations */}
        <section className="mb-12">
          <h2 className="pdf-h2 text-[#00A99D] mb-6">4. Declarations</h2>

          <div className="space-y-4">
            <p className="pdf-intro-p text-xs">
              I/We request and authorise KeyInvest Ltd - Identification Number
              113657 to arrange for any amount KeyInvest Ltd may debit or charge
              to be debited through the Bulk Electronic Clearing System from an
              account held at the financial institution identified above subject
              to the terms and conditions of the Direct Debit Request Service
              Agreement and any further instructions provided.
            </p>
            <p className="pdf-intro-p text-xs">
              By signing this Direct Debit Request I/We acknowledge having read
              and understood the terms and conditions governing the debit
              arrangements as set out in this request and in the Direct Debit
              Request Service Agreement.
            </p>
            <p className="pdf-footnote italic text-[10px] mb-8">
              (If signing for a company, sign and print full name and capacity
              for signing e.g. Director.
            </p>
          </div>

          {/* Signature Grid */}
          {/* New Signature Start */}
          <Signature />
          {/* New Signature end */}
          {/* old signatur start */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"> */}
          {/* Signature 1 */}
          {/* <div className="space-y-6">
              <div className="border-b-2 border-[rgb(49,41,166)] pb-2">
                <span className="pdf-label !text-blue-900">
                  Signature of Account Holder 1
                </span>
              </div>
              <div className="pdf-signature-date-row">
                <div className="pdf-date-container">
                  <label className="pdf-label-sm">Date:</label>
                  <input
                    type="date"
                    name="holder1_date"
                    defaultValue="2026-01-10"
                    className="pdf-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div> */}

          {/* Signature 2 */}
          {/* <div className="space-y-6">
              <div className="border-b-2 border-[rgb(49,41,166)] pb-2">
                <span className="pdf-label !text-blue-900">
                  Signature of Account Holder 2
                </span>
              </div>
              <div className="pdf-signature-date-row">
                <div className="pdf-date-container">
                  <label className="pdf-label-sm">Date:</label>
                  <input
                    type="date"
                    name="holder2_date"
                    defaultValue="2026-01-10"
                    className="pdf-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div> */}
          {/* </div> */}
          {/* old signature end */}
          <p className="pdf-footnote text-center mt-6">
            (All bank signatories must sign)
          </p>
        </section>

        {/* Footer Branding: Page 42 */}
        <div className="pdf-footer mt-16">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="hidden sm:inline">
              Funeral Bond Product Disclosure Statement (PDS)
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="hidden md:block">Version: July 2025</div>
            <div className="font-bold text-[rgb(49,41,166)]">42</div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 mt-6 border-t border-gray-100">
          <button
            type="button"
            className="btn-secondary w-full sm:w-auto justify-center"
          >
            <FaChevronLeft className="mr-2" /> Previous Section
          </button>
          <button type="submit" className="btn-primary-pdf w-full sm:w-auto">
            Next Section <FaChevronRight className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlipEleven;
