import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";

const SlipThirtyFour = () => {
  const { updateInvestor, handleChange } = usePrePayServiceApi();

  const handleUpdate = (field, value) => {
    updateInvestor("investorTwo", [field], value); // Changed to investorTwo for Slip 34
  };

  return (
    <div className="form-container-base p-3">
      <div className="p-1">
        <p className="pdf-subtitle">
          Investor 2 (Only complete this section if this is to be a jointly
          owned Policy, if being completed by a POA or if the policy is for a
          Separate Life Insured)
        </p>
        <div className="pdf-radio-group mb-4">
          {[
            "Joint application",
            "Separate Life Insured",
            "Power of Attorney",
          ].map((t) => (
            <label key={t} className="pdf-radio-item">
              <input
                type="radio"
                name="applicationType"
                value={t}
                onChange={(e) =>
                  handleUpdate("applicationType", e.target.value)
                }
                className="pdf-radio-input"
              />
              <span className="text-gray-700">{t}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Before making a joint application please read page 7 of the PDS. To
          make 2 single applications please complete a separate Application Form
          for each Investor.
        </p>
        <div className="pdf-radio-group">
          {[
            "Joint application ",
            "Separate Life Insured",
            "Power of Attorney",
          ].map((t) => (
            <label key={t} className="pdf-radio-item">
              <input
                type="radio"
                name="title"
                value={t}
                onChange={(e) =>
                  updateInvestor("investorOne", ["gender"], e.target.value)
                }
                className="pdf-radio-input"
              />
              <span className="text-gray-700 group-hover:text-blue-900">
                {t}
              </span>
            </label>
          ))}
        </div>
        <p>
          Before making a joint application please read page 7 of the PDS. To
          make 2 single applications please complete a separate Application Form
          for each Investor.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleChange}>
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="pdf-label">Title:</label>
            <div className="pdf-radio-group">
              {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
                <label key={t} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="title"
                    value={t}
                    onChange={(e) => handleUpdate("title", e.target.value)}
                    className="pdf-radio-input"
                  />
                  <span className="text-gray-700">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="pdf-label">Surname:</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("surname", e.target.value)}
            />
          </div>

          <div>
            <label className="pdf-label">Given Names:</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("givenNames", e.target.value)}
            />
          </div>

          <div>
            <label className="pdf-label">Date of Birth:</label>
            <input
              type="date"
              className="pdf-input"
              onChange={(e) => handleUpdate("dob", e.target.value)}
            />
          </div>

          <div>
            <label className="pdf-label">Gender:</label>
            <div className="pdf-radio-group">
              {["Female", "Male", "Other"].map((g) => (
                <label key={g} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    className="pdf-radio-input"
                    onChange={(e) => handleUpdate("gender", e.target.value)}
                  />
                  <span className="text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <h3 className="pdf-section-header">
          Residential Address{" "}
          <span className="pdf-note">
            (must not be a PO box, RMB or Locked Bag)
          </span>
        </h3>

        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-2">
            <label className="pdf-label text-xs">Unit Number</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("unit", e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <label className="pdf-label text-xs">Street No</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("streetNo", e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label text-xs">Street Name</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("streetName", e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label text-xs">Suburb</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("suburb", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label text-xs">State</label>
            <input
              type="text"
              defaultValue="NSW"
              className="pdf-input"
              onChange={(e) => handleUpdate("state", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label text-xs">Postcode</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("postcode", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label text-xs">Country</label>
            <input
              type="text"
              defaultValue="AUSTRALIA"
              className="pdf-input pdf-input-readonly"
              disabled
            />
          </div>
        </div>

        {/* Contact Details */}
        <h3 className="pdf-section-header">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="pdf-label">Daytime Telephone:</label>
            <input
              type="number"
              className="pdf-input"
              onChange={(e) => handleUpdate("daytimeTelephone", e.target.value)}
            />
          </div>
          <div>
            <label className="pdf-label">Mobile:</label>
            <input
              type="text"
              className="pdf-input"
              onChange={(e) => handleUpdate("mobile", e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <label className="pdf-label">Email:</label>
            <input
              type="email"
              className="pdf-input"
              onChange={(e) => handleUpdate("email", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2026</div>
          <div>Page 34</div>
        </div>
      </form>
    </div>
  );
};

export default SlipThirtyFour;
