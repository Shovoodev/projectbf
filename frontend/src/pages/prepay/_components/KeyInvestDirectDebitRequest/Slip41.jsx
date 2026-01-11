import { useState } from "react";

const SlipTen = () => {
  const [formData, setFormData] = useState({
    ah1_title: "",
    ah2_title: "",
    ah1_surname: "",
    ah1_givenNames: "",
    ah2_surname: "",
    ah2_givenNames: "",
    trust_address: "",
    trust_suburb: "",
    trust_state: "",
    trust_postcode: "",
    trust_country: "",
    bank_name: "",
    bank_branch: "",
    account_name: "",
    bsb: "",
    account_number: "",
  });

  const titles = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"];

  // Handles checkbox change to act like a radio group
  const handleCheckboxChange = (holder, value) => {
    setFormData((prev) => ({
      ...prev,
      // If already selected, unselect it; otherwise, select the new one
      [holder]: prev[holder] === value ? "" : value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container-base">
  

      <section className="p-4 md:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-none mb-2">
            KeyInvest Direct
          </h1>
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-none">
            Debit Request
          </h1>
          <hr className="pdf-hr" />
          <p className="pdf-intro-p text-xs mt-4">
            Request and authority to debit the account named below to pay
            KeyInvest Ltd. Please PRINT clearly and mark boxes using crosses "X"
            (or checkmarks) where appropriate.
          </p>
        </header>

        {/* Section 1: Names and contact details */}
        <div className="mb-10">
          <h2 className="pdf-q-title !text-xl !mt-0 text-[#00A99D]">
            1. Names and contact details
          </h2>

          {/* Account Holder 1 */}
          <div className="space-y-4 mb-8">
            <h3 className="pdf-label !text-blue-900">Account Holder 1</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="pdf-label-sm min-w-[50px] mb-0">Title:</label>
              <div className="pdf-radio-group !bg-transparent !p-0 !border-none">
                {titles.map((t) => (
                  <label
                    key={`ah1_${t}`}
                    className="pdf-radio-item cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[rgb(49,41,166)] border-blue-200 cursor-pointer"
                      checked={formData.ah1_title === t}
                      onChange={() => handleCheckboxChange("ah1_title", t)}
                    />
                    <span className="text-xs">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="pdf-label-sm">
                  Surname/Company/Trust Name:
                </label>
                <input
                  name="ah1_surname"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="pdf-label-sm">Given Names:</label>
                <input
                  name="ah1_givenNames"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
            </div>
          </div>

          {/* Account Holder 2 */}
          <div className="space-y-4 mb-8">
            <h3 className="pdf-label !text-blue-900">Account Holder 2</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="pdf-label-sm min-w-[50px] mb-0">Title:</label>
              <div className="pdf-radio-group !bg-transparent !p-0 !border-none">
                {titles.map((t) => (
                  <label
                    key={`ah2_${t}`}
                    className="pdf-radio-item cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[rgb(49,41,166)] border-blue-200 cursor-pointer"
                      checked={formData.ah2_title === t}
                      onChange={() => handleCheckboxChange("ah2_title", t)}
                    />
                    <span className="text-xs">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="pdf-label-sm">
                  Surname/Company/Trust Name:
                </label>
                <input
                  name="ah2_surname"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="pdf-label-sm">Given Names:</label>
                <input
                  name="ah2_givenNames"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
            </div>
          </div>

          {/* Trust Details Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="pdf-intro-p italic !text-xs">
              If company ABN or Trust
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="pdf-label-sm">Address:</label>
                <input
                  name="trust_address"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div>
                <label className="pdf-label-sm">Suburb:</label>
                <input
                  name="trust_suburb"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="pdf-label-sm">State:</label>
                  <input
                    name="trust_state"
                    onChange={handleInputChange}
                    type="text"
                    className="pdf-input !bg-blue-50/30"
                  />
                </div>
                <div className="col-span-2">
                  <label className="pdf-label-sm">Postcode:</label>
                  <input
                    name="trust_postcode"
                    onChange={handleInputChange}
                    type="text"
                    className="pdf-input !bg-blue-50/30"
                  />
                </div>
              </div>
              <div>
                <label className="pdf-label-sm">Country:</label>
                <input
                  name="trust_country"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Account Details */}
        <div className="mb-10">
          <h2 className="pdf-q-title !text-xl text-[#00A99D]">
            2. Nominated financial institution account
          </h2>
          <div className="space-y-4">
            <div>
              <label className="pdf-label-sm">
                Name of financial institution:
              </label>
              <input
                name="bank_name"
                onChange={handleInputChange}
                type="text"
                className="pdf-input !bg-blue-50/30"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="pdf-label-sm">Branch:</label>
                <input
                  name="bank_branch"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div className="md:col-span-1">
                <label className="pdf-label-sm">Account Name:</label>
                <input
                  name="account_name"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="pdf-label-sm">BSB Number:</label>
                <input
                  name="bsb"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
              <div>
                <label className="pdf-label-sm">Account Number:</label>
                <input
                  name="account_number"
                  onChange={handleInputChange}
                  type="text"
                  className="pdf-input !bg-blue-50/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pdf-footer border-t-2 border-[rgb(49,41,166)] pt-2">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="text-[rgb(49,41,166)]">Direct Debit Request</span>
          </div>
          <div className="flex gap-8">
            <div className="hidden md:block">Version: July 2025</div>
            <div className="font-bold text-[rgb(49,41,166)]">41</div>
          </div>
        </footer>

        {/* Actions */}
      </section>
    </div>
  );
};

export default SlipTen;
