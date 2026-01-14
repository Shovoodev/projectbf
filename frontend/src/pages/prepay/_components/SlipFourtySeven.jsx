import { useState } from "react";

const SlipFourtySeven = () => {
  const { signature } = usePrePayServiceApi();
  const [formData, setFormData] = useState({
    investor1: {
      signature: "",
      date: "",
      email: "",
      phone: "",
    },
    investor2: {
      signature: "",
      printedName: "",
      date: "",
      email: "",
      phone: "",
    },
    hasSecondInvestor: false,
    acceptAllDeclarations: false,
    receiveElectronicUpdates: true,
    preferredContactMethod: "email",
    acknowledgeRisks: false,
  });
  const [showSecondInvester, setShowSeceondInverster] = useState(false);
  const declarations = [
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
  ];

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen  p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              4. Investor(s) declaration
            </h3>
          </div>

          {/* Declarations List */}
          <div className="p-6 md:p-8">
            <div className="space-y-1 mb-10">
              <p className="text-gray-700 font-medium mb-4">
                You authorise the nominated financial adviser, or authorised
                delegate:
              </p>

              <div className="space-y-3">
                {declarations.map((declaration, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-bold text-sm">
                          —
                        </span>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-700 leading-relaxed">
                      {declaration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Sections */}
            <div className="space-y-12">
              {/* Investor 1 */}
              <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Signature
                  </h3>
                </div>
                <div className=" flex">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Signatureof Inverste 1 *
                        </label>
                        {signature && (
                          <img
                            src={URL.createObjectURL(signature)}
                            alt="Signature"
                            className="mt-4"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          This should match the signature on your official
                          identification documents
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    {showSecondInvester && (
                      <>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Signature of Inverste 2
                            </label>
                            <textarea
                              value={formData.investor1.signature}
                              placeholder="Type your full legal signature"
                              className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-signature text-xl"
                              required
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              This should match the signature on your official
                              identification documents
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pdf-footer">
              <div>
                <span className="text-blue-900">KeyInvest</span> Funeral Bond
                PDS
              </div>
              <div>Version: July 2026</div>
              <div>Page 47</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlipFourtySeven;
