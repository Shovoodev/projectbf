import React from "react";
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";

const SlipFourtySeven = () => {
  const { signature, date } = usePrePayServiceApi();
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


  return (
    <div className="form-container-base">
      <div className="">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Section Header */}
          <div className="px-2 py-2 border-b border-gray-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              4. Investor(s) declaration
            </h3>
          </div>

          {/* Declarations List */}
          <div className="p-2 md:p-2">
            <div className=" pb-5">
              <p className="text-gray-700 font-medium mb-1">
                You authorise the nominated financial adviser, or authorised
                delegate:
              </p>

              <div className="pdf-declaration-list">
                {declarations.map((text, index) => (
                  <label key={index} className="pdf-declaration-item p-0 gap-2">
                    <input
                      type="checkbox"
                      className="pdf-declaration-checkbox"
                    />
                    <span className="pdf-declaration-text text-sm">{text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Signature Sections */}
            <div className="space-y-1">
              {/* Investor 1 */}
              <div className="border-2 border-gray-200 rounded-xl p-2 bg-gray-50">
                <div className="flex items-center mb-1">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Signature
                  </h3>
                </div>
                <div className=" flex">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* Left Column */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Signature of Inverstor
                        </label>
                        {signature && (
                          <img
                            src={URL.createObjectURL(signature)}
                            alt="Signature"
                            className="mt-1"
                          />
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
