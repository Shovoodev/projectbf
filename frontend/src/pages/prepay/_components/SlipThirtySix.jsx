import { useState } from "react";

const SlipThirtySix = () => {
  const [userValue, setUserValue] = useState("");
  const maxValue = 25;

  return (
    <div className="form-container-base">
      <form
       
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Section 2.2: RSP Increase */}
        <section>
          <h2 className="pdf-h2 text-[#00A99D]">
            2.2. Automatically increase the RSP contribution amount each year?
          </h2>

          <div className="flex gap-12 mb-6">
            <div className="flex items-center gap-3">
              <input type="radio" name="rspIncrease" value="yes" />
              <span className="pdf-label mb-0">Yes</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="radio" name="rspIncrease" value="no" />
              <span className="pdf-label mb-0">No</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="pdf-label mb-0">Annual percentage increase</span>
            <input
              type="text"
              value={userValue}
              onChange={(e) => {
                if (e.target.value <= maxValue) {
                  setUserValue(e.target.value);
                }
              }}
              className="pdf-inline-input w-48"
            />
            <span className="pdf-label mb-0">
              % (up to a maximum of {maxValue}%)
            </span>
          </div>
        </section>

        <hr className="pdf-hr" />

        {/* Section 3: Service Fee Payment */}
        <section>
          <h2 className="pdf-h2 text-[#00A99D]">
            3. Service fee payment instruction{" "}
            <span className="text-sm font-normal text-[#00A99D]">
              (Financial adviser use only)
            </span>
          </h2>

          <div className="mt-3 space-y-1">
            <h3 className="font-bold text-[rgb(49,41,166)] text-sm">
              Initial Service Fee
            </h3>
            <p className="pdf-intro-p text-xs">
              Where agreement has been reached to pay a financial adviser or
              service provider an initial service fee, please insert the fee as
              either a fixed dollar amount or percentage of the initial
              contribution.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                <span className="pdf-label mb-0 min-w-[140px]">
                  Fixed dollar amount:
                </span>
                <span className="font-bold text-[rgb(49,41,166)]">$</span>
                <input
                  type="text"
                  readOnly
                  className="pdf-inline-input w-48 font-bold"
                  defaultValue="220"
                />
              </div>

              <div className="text-center font-bold text-[rgb(49,41,166)] py-2 text-sm">
                OR
              </div>

              <div className="flex items-center gap-3">
                <span className="pdf-label mb-0 min-w-[140px]">
                  Percentage of the initial contribution:
                </span>
                <input type="number" className="pdf-inline-input w-48" />
                <span className="font-bold text-[rgb(49,41,166)]">%</span>
              </div>
            </div>

            <p className="pdf-intro-p italic text-[11px] mt-6">
              Please note an initial service fee will be deducted from the
              initial contribution amount with the lower net amount invested.
              The lower net amount is the amount assessed under the Exempt
              Funeral Bond Threshold.
            </p>
          </div>
        </section>

        <hr className="pdf-hr" />

        {/* Section 4: Financial Adviser Details */}
        <section>
          <h2 className="pdf-h2 text-[#00A99D]">
            4. Financial adviser / Service provider details{" "}
            <span className="text-sm font-normal text-[#00A99D]">
              (Financial adviser use only)
            </span>
          </h2>

          <p className="pdf-intro-p text-xs mt-4 mb-8">
            Please note, unless Section 3 has been completed - Service fee
            payment instruction, the financial adviser or service provider will
            not receive any payment from KeyInvest.
          </p>

          <div className="space-y-4">
            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">
                Financial Adviser/Service Provider:
              </span>
              <input
                type="text"
                readOnly
                className="pdf-inline-input flex-1 "
                defaultValue="Black Tulip Funerals"
              />
            </div>

            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">
                Name of Financial Adviser Group:
              </span>
              <input type="text" className="pdf-inline-input flex-1" />
            </div>

            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">Address:</span>
              <input
                type="text"
                readOnly
                className="pdf-inline-input flex-1"
                defaultValue="PO Box 1033 Hurstville BC NSW 1481"
              />
            </div>

            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">Phone:</span>
              <input
                type="text"
                readOnly
                className="pdf-inline-input flex-1"
                defaultValue="1300110031"
              />
            </div>

            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">Office email:</span>
              <input
                type="text"
                className="pdf-inline-input flex-1"
                readOnly
                defaultValue="keyinvest@blacktulipfunerals.com.au"
              />
            </div>

            <div className="pdf-adviser-row">
              <span className="pdf-adviser-label">
                Adviser's Email (new advisers only, required for online access):
              </span>
              <input type="text" className="pdf-inline-input flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="pdf-adviser-row">
                <span className="pdf-adviser-label">AFS Licence number:</span>
                <input type="text" className="pdf-inline-input flex-1" />
              </div>
              <div className="pdf-adviser-row">
                <span className="pdf-adviser-label">Adviser Code:</span>
                <input type="text" className="pdf-inline-input flex-1" />
              </div>
            </div>
          </div>

          <p className="pdf-intro-p italic text-xs mt-8">
            Financial advisers, please attach a current business card so we can
            ensure contact details are kept up to date.
          </p>
        </section>

        {/* Footer Branding */}
        <div className="pdf-footer">
          <div className="flex gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span>Funeral Bond Product Disclosure Statement (PDS)</span>
          </div>
          <div className="flex gap-8">
            <div>Version: July 2026</div>
            <div className="font-bold">36</div>
          </div>
        </div>

        {/* Navigation Actions */}
      </form>
    </div>
  );
};

export default SlipThirtySix;
