import React from "react";
import { usePrePayServiceApi } from "../../../utility/prePayServiceProvider";

const SlipFourtyTwo = () => {
  const { updateDeptRequest } = usePrePayServiceApi();
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Direct Debit Request
          </h1>
          <p className="text-gray-600 mt-2">
            KeyInvest Funeral Bond Product Disclosure Statement (PDS) Version:
            July 2025
          </p>
        </div>

        {/* Section 3: Amount and frequency of debits */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
            3. Amount and frequency of debits
          </h2>

          {/* Lump Sum Contribution */}
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <div className="min-w-6 h-6 mt-0.5">
                <input
                  type="checkbox"
                  id="lump-sum"
                  className="pdf-input"
                  onChange={() => {
                    updateDeptRequest(["lumpSum", "selected"], true);
                  }}
                />
              </div>
              <label htmlFor="lump-sum" className="ml-3 block">
                <span className="font-medium text-gray-700">
                  Lump Sum Contribution
                </span>
                <span className="text-gray-600 ml-2">
                  – this authority is for one payment only of $
                </span>
              </label>
            </div>
            <div className="ml-9">
              <input
                type="text"
                placeholder="Amount"
                defaultValue={5000}
                className="pdf-input"
                onChange={() => {
                  updateDeptRequest(["lumpSum", "amount"], "5000");
                }}
              />
            </div>
          </div>

          {/* Regular Savings Plan */}
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <div className="min-w-6 h-6 mt-0.5">
                <input
                  type="checkbox"
                  id="rsp"
                  className="pdf-input"
                  onChange={() => {
                    updateDeptRequest(["regularSavingsPlan", "selected"], true);
                  }}
                />
              </div>
              <label htmlFor="rsp" className="ml-3 block">
                <span className="font-medium text-gray-700">
                  The Regular Savings Plan contribution of $
                </span>
              </label>
            </div>
            <div className="ml-9 space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Amount"
                  className="pdf-input"
                  defaultValue={5000}
                  onChange={() => {
                    updateDeptRequest(["regularSavingsPlan", "amount"], "5000");
                  }}
                />
                <span className="text-gray-600">
                  will be deducted commencing on the
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  15th of the month nominated in Section 2.1 of the Application
                  Form.
                </span>
              </div>
            </div>
          </div>

          {/* No Selection Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-gray-700">
              If no selection is made the RSP will commence at the discretion of
              KeyInvest and be confirmed in writing to you in your Policy
              Confirmation Letter.
            </p>
          </div>

          {/* RSP End Condition */}
          <div className="mb-4">
            <p className="text-gray-700 mb-3">
              Please end my RSP when total contributions reach $
            </p>
            <input
              type="text"
              placeholder="Amount"
              className="pdf-input"
              onChange={() => {
                updateDeptRequest(["rspEndCondition"], "End of Year");
              }}
            />
          </div>
        </div>

        {/* Section 4: Declarations */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
            4. Declarations
          </h2>

          {/* Declaration Text */}
          <div className="mb-8">
            <p className="text-gray-700 mb-4 leading-relaxed">
              I/We request and authorise KeyInvest Ltd - Identification Number
              113657 to arrange for any amount KeyInvest Ltd may debit or charge
              to be debited through the Bulk Electronic Clearing System from an
              account held at the financial institution identified above subject
              to the terms and conditions of the Direct Debit Request Service
              Agreement and any further instructions provided.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By signing this Direct Debit Request I/We acknowledge having read
              and understood the terms and conditions governing the debit
              arrangements as set out in this request and in the Direct Debit
              Request Service Agreement.
            </p>
          </div>

          {/* Company Signing Note */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-gray-700 italic">
              (If signing for a company, sign and print full name and capacity
              for signing e.g. Director.)
            </p>
          </div>

          {/* Signature Sections */}
          <div className="space-y-8">
            {/* Account Holder 1 */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">
                Signature of Account Holder 1
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature
                  </label>
                  <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    //signeture change hear
                    <span className="text-gray-400">Sign here</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input type="date" className="pdf-input" />
                </div>
              </div>
            </div>

            {/* Account Holder 2 */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">
                Signature of Account Holder 2
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature
                  </label>
                  <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Sign here</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                (All bank signatories must sign)
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2025</div>
          <div>Page 42</div>
        </div>
      </div>
    </div>
  );
};

export default SlipFourtyTwo;
