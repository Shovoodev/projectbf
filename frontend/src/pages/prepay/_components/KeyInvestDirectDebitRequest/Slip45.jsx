import React, { useState } from "react";

const SlipFourteen = () => {
  const [formData, setFormData] = useState({
    inv1_name: "",
    inv1_email: "",
    inv1_address: "",
    inv1_abn: "",
    inv1_postcode: "",
    inv2_name: "",
    inv2_email: "",
    inv2_address: "",
    inv2_abn: "",
    inv2_postcode: "",
    adv_name: "",
    adv_licensee_afsl: "",
    adv_licensee_group: "",
    adv_code: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reusable component for the inline label-input rows found in this form
  const InlineField = ({ label, name, className = "flex-1" }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
      <label className="pdf-label mb-0 min-w-[140px] text-[13px]">
        {label}
      </label>
      <input
        type="text"
        name={name}
        onChange={handleInputChange}
        className={`pdf-input !bg-blue-50/30 h-8 ${className}`}
      />
    </div>
  );

  return (
    <div className="form-container-base">
      <section className="p-4 md:p-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="text-[10px] font-bold text-[rgb(49,41,166)] mb-2 uppercase">
            Adviser only
          </div>
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-tight mb-6">
            KeyInvest adviser electronic <br /> transaction authority form
          </h1>
          <hr className="pdf-hr" />
        </header>

        {/* Instructions Block */}

        <div className="space-y-4 mb-10">
          <div>
            <span className="font-bold text-[#00A99D] block mb-1 text-sm">
              Instructions:
            </span>
            <p className="text-[12px] text-slate-700 leading-relaxed">
              Use this form to authorise KeyInvest to accept all forms of
              communication and requests (including new applications and
              transactional requests) via email or online from the financial
              adviser nominated on this form, or any other person authorised by
              them under the same dealer group.
            </p>
          </div>
          <div>
            <span className="font-bold text-[#00A99D] block mb-1 text-sm">
              Please note:
            </span>
            <p className="text-[12px] text-slate-700 leading-relaxed italic">
              In certain circumstances KeyInvest may still request documentation
              to be submitted via post, such as the case when certified
              documents are required and in the event of death claims. Please
              contact KeyInvest for further clarification.
            </p>
          </div>
        </div>

        {/* Section 1: Investor details */}
        <div className="mb-10">
          <h2 className="pdf-section-title !mt-0 !text-[#00A99D]">
            1. Investor details
          </h2>

          {/* Investor 1 Sub-section */}
          <div className="space-y-2 mb-8">
            <h3 className="pdf-label !text-blue-900 font-black">Investor 1</h3>
            <InlineField label="Full Name:" name="inv1_name" />
            <InlineField label="Email Address:" name="inv1_email" />
            <InlineField label="Address:" name="inv1_address" />
            <div className="flex flex-col md:flex-row gap-4">
              <InlineField
                label="Company ABN (if available):"
                name="inv1_abn"
                className="flex-1"
              />
              <InlineField
                label="Postcode:"
                name="inv1_postcode"
                className="w-full md:w-32"
              />
            </div>
          </div>

          {/* Investor 2 Sub-section */}
          <div className="space-y-2">
            <h3 className="pdf-label !text-blue-900 font-black">Investor 2</h3>
            <InlineField label="Full Name:" name="inv2_name" />
            <InlineField label="Email Address:" name="inv2_email" />
            <InlineField label="Address:" name="inv2_address" />
            <div className="flex flex-col md:flex-row gap-4">
              <InlineField
                label="Company ABN (if available):"
                name="inv2_abn"
                className="flex-1"
              />
              <InlineField
                label="Postcode:"
                name="inv2_postcode"
                className="w-full md:w-32"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Financial adviser details */}
        <div className="mb-10">
          <h2 className="pdf-section-title !text-[#00A99D]">
            2. Financial adviser details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            <InlineField label="Full Name:" name="adv_name" />
            <InlineField
              label="Licensee Dealer Group AFSL No.:"
              name="adv_licensee_afsl"
            />
            <InlineField
              label="Licensee Dealer Group:"
              name="adv_licensee_group"
            />
            <InlineField
              label="KeyInvest Adviser Code (if known):"
              name="adv_code"
            />
          </div>
        </div>

        {/* Branding Footer */}
        <footer className="pdf-footer border-t-2 border-[rgb(49,41,166)] pt-4 mt-20">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="text-[rgb(49,41,166)]">
              Adviser Authority Form
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default SlipFourteen;
