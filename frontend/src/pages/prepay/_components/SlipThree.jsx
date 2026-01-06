import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contribution Data:", formData);
  };

  return (
    <div className="my-10 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden font-sans">
      {/* Accent Top Border */}
      <div className="h-2 bg-blue-900 w-full"></div>

      {/* Header Section */}
      <div className="bg-slate-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-900">
          2. Contribution details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-6 border-b border-gray-200 pb-2">
            Initial Contribution
          </h3>
          {/* Amount Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <label className="text-sm font-bold text-gray-700 min-w-[180px]">
              Contribution amount<sup className="text-blue-900 ml-1">1</sup> :
            </label>
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                $
              </span>
              <input
                type="text"
                name="contribution_amount"
                value={formData.contribution_amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-lg"
              />
            </div>
          </div>
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-600">
              Please select how the initial contribution will be paid.
            </p>
            <div className="flex flex-wrap gap-8 p-4 bg-slate-50 rounded-md border border-slate-100">
              {["bpay", "direct_debit", "eft"].map((method) => (
                <label
                  key={method}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span className="text-gray-700 font-bold uppercase text-sm tracking-wider group-hover:text-blue-900 transition-colors">
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

          {/* Information Text */}
          <div className="mt-6 p-4 border-l-4 border-blue-900 bg-blue-50 text-sm text-slate-700 leading-relaxed italic">
            Where the BPAY or EFT payment method is selected, KeyInvest will
            contact the investor(s) and provide the relevant bank reference
            numbers for the payment method selected.
          </div>
          {/* Footnote */}
          <div className="mt-8 text-xs text-gray-500 leading-normal">
            <sup className="text-blue-900 font-bold mr-1">1</sup>
            Where an initial service fee has been agreed to, the fee will be
            deducted from this amount before being invested in the Funeral Bond.
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2025</div>
          <div>Page 35</div>
        </div>

        {/* Action Buttons */}
      </form>
    </div>
  );
};

export default SlipThree;
