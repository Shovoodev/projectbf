import React from "react";

const SlipTwo = () => {
  return (
    <section className="max-w-5xl mx-auto bg-white px-10 py-12 text-[#2E3192]">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">
        KeyInvest Funeral Bond
        <br />
        application form
      </h1>

      <hr className="border-[#2E3192]/40 mb-8" />

      {/* Intro paragraphs */}
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          This Application Form (including the Direct Debit Request and the
          Adviser Electronic Transaction Authority Form) accompanies and forms
          part of the Product Disclosure Statement (PDS) issued by KeyInvest Ltd
          ABN 74 087 649 474 AFSL 240667 (KeyInvest) (‘we’, ‘us’, ‘our’ in this
          Application Form) for the Funeral Bond dated 28 July 2025.
        </p>

        <p>
          The PDS (and any Supplementary PDS issued) contain important
          information about the Funeral Bond which you should consider before
          making an application. The PDS is available via our website at
          keyinvest.com.au or you may request a copy from your financial adviser
          or funeral director.
        </p>

        <p>
          An application to invest in the KeyInvest Funeral Bond can only be
          made using this form. Completed Application Forms can be posted to
          KeyInvest, Reply Paid 3340, RUNDLE MALL SA 5000 (no stamp required) or
          emailed to: info@keyinvest.com.au
        </p>

        <p className="font-semibold">
          Please use CAPITAL letters to complete the Application form
        </p>
      </div>

      {/* Highlight box */}
      <div className="bg-[#F1F6F7] text-sm p-4 my-8">
        For an individual applicant you only need to complete{" "}
        <strong>Investor 1</strong>. Joint applicants will complete{" "}
        <strong>Investor 1 &amp; 2</strong>. If investing for a separate life
        insured the Investor is <strong>Investor 1</strong> and the life insured{" "}
        <strong>Investor 2</strong>.
      </div>

      {/* Questionnaire */}
      <h2 className="text-2xl font-semibold text-[#4BA6A6] mb-6">
        Target market questionnaire
      </h2>

      <div className="space-y-8 text-sm">
        {/* Q1 */}
        <div>
          <p className="font-semibold mb-2">1. Funeral Bond Type:</p>
          <div className="flex gap-10">
            {["Nominated", "Unassigned", "Prepaid/Assigned"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bondType"
                  defaultChecked={opt === "Prepaid/Assigned"}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <p className="font-semibold mb-2">2. Is the applicant aged 10+?</p>
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input type="radio" name="age10" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="age10" defaultChecked /> No
            </label>
          </div>
        </div>

        {/* Q3 */}
        <div>
          <p className="font-semibold mb-2">
            3. Does the Applicant currently have 1 or more funeral bonds?
          </p>
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input type="radio" name="existingBonds" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="existingBonds" defaultChecked /> No
            </label>
          </div>
        </div>

        {/* Q4 */}
        <div>
          <p className="font-semibold mb-2">
            4. Does the Applicant intend to contribute more than the actual or
            reasonable cost of a funeral?
          </p>
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input type="radio" name="overCost" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="overCost" defaultChecked /> No
            </label>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">
            5. Does the Applicant require access to the capital after the 30 day
            cooling off period?
          </p>
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input type="radio" name="accessCapital" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="accessCapital" defaultChecked /> No
            </label>
          </div>
        </div>
      </div>

      <div className="mt-10 text-xs leading-relaxed border-t pt-6">
        <p>
          <strong>Note:</strong> Investors must be at least 10 years old and
          those under 16 require written consent from a parent or guardian.
          Pre-Paid (Assigned) Funeral Bonds are exempt from Centrelink and/or
          DVA asset and income tests if certain conditions apply. Funeral Bonds
          (nominated or unassigned) are exempt if specific criteria are met.
          Holding multiple Funeral Bonds may result in assets being assessable.
          Funeral bonds can only be used to contribute to the cost of a funeral.
          After the 30 day cooling off period there is no access to funeral bond
          capital prior to payment of funeral expenses.
        </p>
      </div>
    </section>
  );
};

export default SlipTwo;
