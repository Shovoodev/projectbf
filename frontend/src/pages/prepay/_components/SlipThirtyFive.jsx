import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";

const SlipThirtyFive = ({ amount }) => {
  const { setAspFrequency, totalPrice } = usePrePayServiceApi();
  console.log({ totalPrice });
  const addedAmount = amount + 220
  const investmentOptions = [
    {
      no: 1,
      fund: "Capital Guaranteed Fund",
      ufm: "Janus Henderson & KeyInvest Managed Investments",
      benefitNo: 50,
    },
    { no: 2, fund: "Conservative Index Fund", ufm: "Vanguard", benefitNo: 51 },
    { no: 3, fund: "Balanced Index Fund", ufm: "Vanguard", benefitNo: 52 },
    { no: 4, fund: "Growth Index Fund", ufm: "Vanguard", benefitNo: 53 },
  ];

  return (
    <>
      <div className="form-container-base">
        {/* Visual Accent for this section */}

        <div >
          <h2 className="pdf-h2">2. Contribution details</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
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
                readOnly
                value={addedAmount}
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
              {["bpay", "direct_debit", "oheque", "eft"].map((method) => (
                <label key={method} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="payment_method"
                    disabled={method === "direct_debit" || method === "oheque"}
                    value={method}
                    className="pdf-radio-input"
                  />
                  <span className="pdf-label mb-0 uppercase group-hover:text-blue-900">
                    {method === "eft"
                      ? "EFT"
                      : method === "bpay"
                        ? "BPAY"
                        : method === "oheque"
                          ? "OHEQUE"
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
            <sup className="pdf-footnote-sup"></sup>
            Where an initial service fee has been agreed to, the fee will be
            deducted from this amount before being invested in the Funeral Bond.
          </div>

          {/* Footer Branding */}
          <div className="pdf-footer">
            <div>
              <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
            </div>
            <div>Version: July 2026</div>
            <div>Page 35</div>
          </div>

          {/* Actions */}
        </form>
      </div>
      <div className="form-container-base">
        <div className="form-header-area">
          <h2 className="pdf-h2">2.1. Investment option(s)</h2>
        </div>

        <div >
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Responsive Instruction Text */}
            <div className="space-y-2 mb-6">
              <p className="pdf-label text-sm md:text-base mb-0">
                Please select an investment option(s) from the list below.
              </p>
              <p className="pdf-intro-p italic mb-0 text-xs md:text-sm">
                If no option is selected, contributions will be invested into
                the Capital Guaranteed Fund.
              </p>
            </div>

            {/* Table with Horizontal Scroll Wrapper */}
            <div className="pdf-table-wrapper border border-gray-100 rounded-lg">
              <table className="pdf-table">
                <thead className="pdf-table-thead">
                  <tr>
                    <th className="pdf-table-th w-8">No.</th>
                    <th className="pdf-table-th">Fund</th>
                    <th className="pdf-table-th">UFM</th>
                    <th className="pdf-table-th w-24">
                      Benefit Fund No.
                      <br />
                      (KeyInvest use only)
                    </th>
                    <th className="pdf-table-th w-32">Lump sum invested</th>
                    <th className="pdf-table-th w-36">
                      Regular Savings Plan
                      <br />
                      (per month)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="pdf-table-tr-highlight">
                    <td className="p-1" colSpan="6"></td>
                  </tr>
                  {investmentOptions.map((opt) => (
                    <tr key={opt.no} className="hover:bg-slate-50">
                      <td className="pdf-table-td pdf-table-td-teal">
                        {opt.no}
                      </td>
                      <td className="pdf-table-td pdf-table-td-teal font-black">
                        {opt.fund}
                      </td>
                      <td className="pdf-table-td italic text-[10px] leading-tight">
                        {opt.ufm}
                      </td>
                      <td className="pdf-table-td text-center">
                        {opt.benefitNo}
                      </td>
                      <td className="pdf-table-td">
                        <div className="pdf-table-input-wrapper">
                          <span className="font-bold text-[rgb(49,41,166)]">
                            $
                          </span>
                        </div>
                      </td>
                      <td className="pdf-table-td">
                        <div className="pdf-table-input-wrapper">
                          <span className="font-bold text-[rgb(49,41,166)]">
                            $
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footnote Responsiveness */}
            <p className="pdf-footnote text-blue-800 font-bold mt-6 text-[10px] md:text-xs">
              Minimum $100 per Investment Option for initial contribution and
              $50 per option for Regular Savings Plan contributions.
            </p>

            {/* ASP Frequency Section - Grid handles 1 vs 2 columns */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="pdf-label uppercase tracking-widest text-xs">
                Regular Savings Plan (ASP) frequency:
              </p>
              <div className="pdf-asp-grid">
                {[
                  { label: "Monthly", detail: "commencing in month" },
                  { label: "Quarterly", detail: "commencing in month" },
                  { label: "Six Monthly", detail: "commencing in month" },
                  { label: "Annually", detail: "commencing in month" },
                ].map((freq) => (
                  <div
                    key={freq.label}
                    className="flex items-center gap-4 group"
                  >
                    <input
                      type="radio"
                      name="asp_frequency"
                      className="pdf-radio-input"
                      onChange={(e) => setAspFrequency(e.target.value)}
                      defaultChecked={freq.label === "Monthly"}
                    />
                    <div className="flex flex-wrap gap-2 text-sm items-center">
                      <span className="font-black text-[rgb(49,41,166)]">
                        {freq.label}
                      </span>
                      <span className="text-gray-400 italic text-xs">
                        {freq.detail}
                      </span>
                      <input
                        type="text"
                        className="border-b border-gray-300 w-20 h-5 bg-transparent outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsive Buttons */}
          </form>
        </div>
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2026</div>
          <div>Page 35</div>
        </div>
      </div>
    </>
  );
};

export default SlipThirtyFive;
