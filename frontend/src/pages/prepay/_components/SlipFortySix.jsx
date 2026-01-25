import { useState } from "react";
import { Sign } from "../../../images";

const SlipFortySix = () => {
  const [formData, setFormData] = useState({
    adviserSignature: "",
    adviserName: "",
    adviserNumber: "",
    date: "",
    acceptTerms: false,
    dealerGroup: "",
    licenseNumber: "",
    contactEmail: "",
    contactPhone: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-2 py-3 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Financial Adviser Declaration
            </h1>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            {/* Terms and Conditions */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                3. Financial adviser declaration
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  By completing this form, you accept and agree to:
                </p>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6  rounded-full flex items-center justify-center">
                        <span className=" font-bold">—</span>
                      </div>
                    </div>
                    <p className=" text-gray-700 leading-relaxed">
                      <span className="font-medium">
                        Be bound by the terms and conditions
                      </span>{" "}
                      contained in this form.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6  rounded-full flex items-center justify-center">
                        <span className=" font-bold">—</span>
                      </div>
                    </div>
                    <p className=" text-gray-700 leading-relaxed">
                      <span className="font-medium">
                        Only provide instructions to KeyInvest
                      </span>{" "}
                      that have been discussed and agreed to by the Investor(s).
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6  rounded-full flex items-center justify-center">
                        <span className=" font-bold">—</span>
                      </div>
                    </div>
                    <p className=" text-gray-700 leading-relaxed">
                      <span className="font-medium">
                        Inform KeyInvest immediately
                      </span>{" "}
                      if you cease to be licensed by the dealer group or cease
                      to have a relationship with the Investor(s).
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6  rounded-full flex items-center justify-center">
                        <span className=" font-bold">—</span>
                      </div>
                    </div>
                    <p className=" text-gray-700 leading-relaxed">
                      <span className="font-medium">
                        Notify KeyInvest immediately
                      </span>{" "}
                      of any dispute with the Investor(s) in relation to any
                      instruction provided to KeyInvest under this authority.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="">
              <h3 className="text-xl font-semibold text-gray-800 mb-8">
                Signature of financial adviser
              </h3>

              <div className="space-y-8">
                {/* Signature Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Digital Signature
                  </label>
                  <div className="max-w-70 space-y-2">
                    <label className="pdf-label-sm">Signature:</label>
                    <div className="pdf-signature-zone !py-4">
                      <img src={Sign} alt="" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Type your legal signature or use a stylus/touchpad to draw
                    your signature
                  </p>
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
              <div>Page 46</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlipFortySix;
