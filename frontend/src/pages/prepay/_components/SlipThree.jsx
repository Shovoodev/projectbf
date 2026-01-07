import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SlipThree = () => {
  const [formData, setFormData] = useState({
    contribution_amount: "",
    payment_method: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container-base">
      {/* Visual Accent for this section */}
      <div className="h-2 bg-blue-900 w-full" />

      <div className="form-header-area">
        <h2 className="pdf-h2">2. Contribution details</h2>
      </div>

      <form className="p-8" onSubmit={(e) => e.preventDefault()}>
        <h3 className="pdf-section-title">Initial Contribution</h3>

        {/* Amount Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <label className="pdf-label min-w-[180px] mb-0">
            Contribution amount<sup className="pdf-footnote-sup ml-1">1</sup> :
          </label>
          <div className="pdf-currency-wrapper">
            <span className="pdf-currency-symbol">$</span>
            <input
              type="text"
              name="contribution_amount"
              onChange={handleChange}
              placeholder="0.00"
              className="pdf-input pl-8 font-semibold text-lg"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-600">
            Please select how the initial contribution will be paid.
          </p>
          <div className="pdf-radio-group p-4 bg-slate-50 rounded-md border border-slate-100">
            {["bpay", "direct_debit", "eft"].map((method) => (
              <label key={method} className="pdf-radio-item">
                <input
                  type="radio"
                  name="payment_method"
                  value={method}
                  onChange={handleChange}
                  className="pdf-radio-input"
                />
                <span className="pdf-label mb-0 uppercase group-hover:text-blue-900">
                  {method === "eft"
                    ? "EFT"
                    : method === "bpay"
                    ? "BPAY"
                    : "Direct Debit"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="pdf-info-box">
          Where the BPAY or EFT payment method is selected, KeyInvest will
          contact the investor(s) and provide the relevant bank reference
          numbers for the payment method selected.
        </div>

        {/* Footnote */}
        <div className="pdf-footnote">
          <sup className="pdf-footnote-sup">1</sup>
          Where an initial service fee has been agreed to, the fee will be
          deducted from this amount before being invested in the Funeral Bond.
        </div>

        {/* Footer Branding */}
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2025</div>
          <div>Page 35</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <button type="button" className="btn-secondary">
            <FaChevronLeft className="mr-2" /> Previous Section
          </button>
          <button type="submit" className="btn-primary">
            Next Section <FaChevronRight className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlipThree;
