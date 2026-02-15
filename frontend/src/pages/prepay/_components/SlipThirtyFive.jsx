import PdfRadio from "./common/PdfRadio";

const SlipThirtyFive = ({ totalPrice }) => {
  const addedAmount = totalPrice + 220;

  const investmentOptions = [
    {
      no: 1,
      fund: "Capital Guaranteed Fund",
      ufm: "Janus Henderson & KeyInvest Managed Investments",
      benefitNo: 50,
    }
  ];

  return (
    <>
      <div className="form-container-base">
        {/* Visual Accent for this section */}

        <div>
          <h2 className="pdf-h2">2. Contribution details</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="pdf-section-title">Initial Contribution</h3>

          {/* Amount Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1">
            <label className="pdf-label  mb-0">
              Contribution amount<sup className="pdf-footnote-sup ml-1">1</sup>{" "}
              :
            </label>
            <div className="pdf-currency-wrapper">
              {/* <span className="pdf-currency-symbol">$</span> */}
              <input
                type="text"
                name="contribution_amount"
                readOnly
                value={addedAmount}
                placeholder="0.00"
                className="pdf-input pl-1 font-semibold text-lg"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-600">
              Please select how the initial contribution will be paid.
            </p>
            <div className="pdf-radio-group p-1 bg-slate-50 rounded-md border border-slate-100">
              <div className="flex gap-10 mt-1">
                {["bpay", "direct_debit", "cheque", "eft"].map((method) => {
                  const isDisabled =
                    method === "direct_debit" || method === "cheque";

                  const isChecked = method === "eft"; // ← change dynamically later

                  const label =
                    method === "eft"
                      ? "EFT"
                      : method === "bpay"
                        ? "BPAY"
                        : "Direct Debit";

                  return (
                    <PdfRadio
                      key={method}
                      label={label}
                      checked={isChecked}
                      disabled={isDisabled}
                    />
                  );
                })}
              </div>

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

          {/* Actions */}
        </form>
        <div className="">
          <div className="form-header-area">
            <h2 className="pdf-h2">2.1. Investment option(s)</h2>
          </div>

          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Responsive Instruction Text */}
              <div className="space-y-1 mb-1">
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
      </div>
    </>
  );
};

export default SlipThirtyFive;
