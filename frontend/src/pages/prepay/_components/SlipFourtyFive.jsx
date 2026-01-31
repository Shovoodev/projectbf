import { useState } from "react";

const SlipFourtyFive = () => {
  const [formData, setFormData] = useState({
    investor1: {
      fullName: "",
      emailAddress: "",
      address: "",
      companyABN: "",
      postcode: "",
    },
    investor2: {
      fullName: "",
      emailAddress: "",
      address: "",
      companyABN: "",
      postcode: "",
    },
    adviser: {
      fullName: "",
      dealerGroup: "",
      licenseeAFSLNo: "",
      keyinvestAdviserCode: "",
    },
    acceptedTerms: false,
  });

  const [isSecondInvestor, setIsSecondInvestor] = useState(false);

  return (
    <div className="form-container-base">
      <div>
        <div>
          <h3 className="text-lg font-bold p-1">ADVISER ONLY</h3>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className=" px-1 py-1 text-white">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-4xl font-semibold text-blue-300">
                  KeyInvest Adviser Electronic Transaction Authority Form
                </h2>
              </div>
            </div>

            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 my-1"></div>
          </div>

          {/* Instructions Section */}
          <div className="p-2 md:p-1">
            <div>
              <div className="rounded-lg p-1 mb-1">
                <h4 className="font-bold  mb-1">Instructions:</h4>
                <p className="text-gray-700 leading-relaxed">
                  Use this form to authorise KeyInvest to accept all forms of
                  communication and requests (including new applications and
                  transactional requests) via email or online from the financial
                  adviser nominated on this form, or any other person authorised
                  by them under the same dealer group.
                </p>
              </div>

              {/* Please Note Section */}
              <div className="flex items-start">
                <div>
                  <h4 className="font-bold  mb-1">Please note:</h4>
                  <p className=" text-sm leading-relaxed">
                    In certain circumstances KeyInvest may still request
                    documentation to be submitted via post, such as the case
                    when certified documents are required and in the event of
                    death claims. Please contact KeyInvest for further
                    clarification.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Investor Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1 pb-1 border-b border-gray-300">
                1. Investor details
              </h3>

              {/* Investor 1 */}
              <div className="mb-1">
                <div className="flex items-center mb-1">
                  <div className="w-8 h-8 flex items-center justify-center mr-1">
                    1
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Investor 1
                  </h4>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.investor1.fullName}
                        placeholder="Enter full legal name"
                        className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.investor1.emailAddress}
                        placeholder="investor@example.com"
                        className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.investor1.address}
                      placeholder="Street address, suburb, state"
                      className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company ABN (if available)
                      </label>
                      <input
                        type="text"
                        value={formData.investor1.companyABN}
                        placeholder="XX XXX XXX XXX"
                        className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        value={formData.investor1.postcode}
                        placeholder="XXXX"
                        maxLength={4}
                        className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Investor 2 (Conditional) */}
              <div className="mt-2 p-2 border-2 border-blue-100 rounded-xl ">
                <div className="flex items-center mb-2">
                  <div className="flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Investor 2
                  </h4>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.investor2.fullName}
                        placeholder="Enter full legal name"
                        className="w-full px-1 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required={isSecondInvestor}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.investor2.emailAddress}
                        placeholder="investor@example.com"
                        className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required={isSecondInvestor}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.investor2.address}
                      placeholder="Street address, suburb, state"
                      className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company ABN (if available)
                      </label>
                      <input
                        type="text"
                        value={formData.investor2.companyABN}
                        placeholder="XX XXX XXX XXX"
                        className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        value={formData.investor2.postcode}
                        placeholder="XXXX"
                        maxLength={4}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1"></div>

            {/* Section 2: Financial Adviser Details */}
            <div className="mb-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-1 pb-3 border-b border-gray-300">
                2. Financial adviser details
              </h3>

              <div className="space-y-2">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.adviser.fullName}
                      placeholder="Adviser full name"
                      className="w-full px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Licensee Dealer Group *
                    </label>
                    <input
                      type="text"
                      value={formData.adviser.dealerGroup}
                      placeholder="Dealer group name"
                      className="w-full px-1 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Licensee Dealer Group AFSL No.
                    </label>
                    <input
                      type="text"
                      value={formData.adviser.licenseeAFSLNo}
                      placeholder="AFSL number"
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      KeyInvest Adviser Code (if known)
                    </label>
                    <input
                      type="text"
                      value={formData.adviser.keyinvestAdviserCode}
                      placeholder="Adviser code"
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}

            {/* Footer */}
            <div className="pdf-footer">
              <div>
                <span className="text-blue-900">KeyInvest</span> Funeral Bond
                PDS
              </div>
              <div>Version: July 2026</div>
              <div>Page 45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlipFourtyFive;