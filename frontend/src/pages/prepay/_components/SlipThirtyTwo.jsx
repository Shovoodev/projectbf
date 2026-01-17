const SlipThirtyTwo = () => {
  return (
    <div className="form-container-base ">
      {/* Decorative Brand Top Border */}

      <section className="p-10">
        {/* Main Header */}
        <header className="mb-2">
          <h1 className="text-5xl font-black text-blue-900 leading-tight">
            KeyInvest Funeral Bond
            <br />
            <span className="text-5xl font-black text-blue-900 leading-tight">
              application form
            </span>
          </h1>
          <hr className="pdf-hr" />
        </header>

        {/* Introduction Text */}
        <div className="space-y-4">
          <p className="pdf-intro-p">
            This Application Form (including the Direct Debit Request and the
            Adviser Electronic Transaction Authority Form) accompanies and forms
            part of the Product Disclosure Statement (PDS) issued by KeyInvest
            Ltd ABN 74 087 649 474 AFSL 240667 (KeyInvest) (‘we’, ‘us’, ‘our’ in
            this Application Form) for the Funeral Bond dated 28 July 2025.
          </p>

          <p className="pdf-intro-p">
            The PDS (and any Supplementary PDS issued) contain important
            information about the Funeral Bond which you should consider before
            making an application. The PDS is available via our website at{" "}
            <a
              href="https://keyinvest.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 font-semibold underline"
            >
              keyinvest.com.au
            </a>{" "}
            or you may request a copy from your financial adviser or funeral
            director.
          </p>

          <p className="pdf-intro-p">
            An application to invest in the KeyInvest Funeral Bond can only be
            made using this form. Completed Application Forms can be posted to
            KeyInvest, Reply Paid 3340, RUNDLE MALL SA 5000 (no stamp required)
            or emailed to:{" "}
            <a
              href="mailto:info@keyinvest.com.au"
              className="text-blue-800 font-semibold"
            >
              info@keyinvest.com.au
            </a>
          </p>

          <p className="pdf-label text-blue-900">
            PLEASE USE CAPITAL LETTERS TO COMPLETE THE APPLICATION FORM
          </p>
        </div>

        {/* Highlight Box */}
        <div className="pdf-highlight-box">
          For an individual applicant you only need to complete{" "}
          <strong className="text-blue-900">Investor 1</strong>. Joint
          applicants will complete{" "}
          <strong className="text-blue-900">Investor 1 &amp; 2</strong>. If
          investing for a separate life insured the Investor is{" "}
          <strong>Investor 1</strong> and the life insured{" "}
          <strong>Investor 2</strong>.
        </div>

        {/* Questionnaire Section */}
        <h2 className="pdf-h2">Target market questionnaire</h2>

        <div className="space-y-8">
          {/* Q1 */}
          <div>
            <label className="pdf-label">1. Funeral Bond Type:</label>
            <div className="pdf-radio-group mt-2">
              {["Nominated", "Unassigned", "Prepaid/Assigned"].map((opt) => (
                <label key={opt} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="bondType"
                    disabled={
                      opt === "Unassigned" || opt === "Prepaid/Assigned"
                    }
                    className="pdf-radio-input"
                    defaultChecked={opt === "Prepaid/Assigned"}
                    checked={opt === "Nominated"}
                  />
                  <span className="text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q2 - Q5 */}
          {[
            { id: "age10", q: "2. Is the applicant aged 10+?" },
            {
              id: "existingBonds",
              q: "3. Does the Applicant currently have 1 or more funeral bonds?",
            },
            {
              id: "overCost",
              q: "4. Does the Applicant intend to contribute more than the actual or reasonable cost of a funeral?",
            },
            {
              id: "accessCapital",
              q: "5. Does the Applicant require access to the capital after the 30 day cooling off period?",
            },
          ].map((item) => (
            <div key={item.id}>
              <label className="pdf-label">{item.q}</label>
              <div className="pdf-radio-group mt-2">
                <label className="pdf-radio-item">
                  <input
                    type="radio"
                    name={item.id}
                    className="pdf-radio-input"
                    defaultChecked
                  />
                  <span className="text-slate-700">Yes</span>
                </label>

                <label className="pdf-radio-item">
                  <input
                    type="radio"
                    name={item.id}
                    className="pdf-radio-input"
                    disabled
                  />
                  <span className="text-slate-700">No</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Final Notes */}
        <footer className="pdf-q-note text-sm">
          <strong>Note:</strong> Investors must be at least 10 years old and
          those under 16 require written consent from a parent or guardian.
          Pre-Paid (Assigned) Funeral Bonds are exempt from Centrelink and/or
          DVA asset and income tests if certain conditions apply. Funeral Bonds
          (nominated or unassigned) are exempt if specific criteria are met.
          Holding multiple Funeral Bonds may result in assets being assessable.
          Funeral bonds can only be used to contribute to the cost of a funeral.
          After the 30 day cooling off period there is no access to funeral bond
          capital prior to payment of funeral expenses.
        </footer>

        {/* Standard PDF Footer Navigation would go here if needed, 
            or you can keep this as a pure cover page */}
      </section>
      <div className="pdf-footer">
        <div>
          <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
        </div>
        <div>Version: July 2026</div>
        <div>Page 32</div>
      </div>
    </div>
  );
};

export default SlipThirtyTwo;
