import { useState } from "react";

const SlipTwo = () => {
  const [formData, setFormData] = useState({
    title: "",
    surname: "",
    givenNames: "",
    dob: "",
    gender: "",
    res_unit: "",
    res_streetNo: "",
    res_streetName: "",
    res_suburb: "",
    res_state: "NSW",
    res_postcode: "",
    res_country: "AUSTRALIA",
    mail_unit: "",
    mail_streetNo: "",
    mail_streetName: "",
    mail_suburb: "",
    mail_state: "NSW",
    mail_postcode: "",
    mail_country: "AUSTRALIA",
    daytimeTelephone: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container-base">
      <div className="form-header-area">
        <h2 className="pdf-h2">1. Investor details</h2>
        <p className="pdf-subtitle">
          Investor 1 (all correspondence will be sent to this person)
        </p>
      </div>

      <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="pdf-label mb-3">Title:</label>
            <div className="pdf-radio-group">
              {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
                <label key={t} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="title"
                    value={t}
                    onChange={handleChange}
                    className="pdf-radio-input"
                  />
                  <span className="text-gray-700 group-hover:text-blue-900">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="pdf-label">Surname:</label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>

          <div>
            <label className="pdf-label">Given Names:</label>
            <input
              type="text"
              name="givenNames"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>

          <div>
            <label className="pdf-label">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>

          <div>
            <label className="pdf-label">Gender:</label>
            <div className="pdf-radio-group mt-2">
              {["Female", "Male", "Other"].map((g) => (
                <label key={g} className="pdf-radio-item">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                    className="pdf-radio-input"
                  />
                  <span className="text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <h3 className="pdf-section-title">
          Residential Address{" "}
          <span className="pdf-note">
            (must not be a PO box, RMB or Locked Bag)
          </span>
        </h3>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <label className="pdf-label-sm">Unit Number</label>
            <input
              type="text"
              name="res_unit"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-4">
            <label className="pdf-label-sm">Street No</label>
            <input
              type="text"
              name="res_streetNo"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Street Name</label>
            <input
              type="text"
              name="res_streetName"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Suburb</label>
            <input
              type="text"
              name="res_suburb"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">State</label>
            <input
              type="text"
              defaultValue="NSW"
              className="pdf-input pdf-input-readonly"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Postcode</label>
            <input
              type="text"
              name="res_postcode"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Country</label>
            <input
              type="text"
              defaultValue="AUSTRALIA"
              className="pdf-input pdf-input-readonly"
            />
          </div>
        </div>

        {/* Contact Details */}
        <h3 className="pdf-section-title">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="pdf-label">Daytime Telephone:</label>
            <input
              type="text"
              name="daytimeTelephone"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div>
            <label className="pdf-label">Mobile:</label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
          <div className="col-span-full">
            <label className="pdf-label">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="pdf-input"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2025</div>
          <div>Page 33</div>
        </div>
      </form>
    </div>
  );
};

export default SlipTwo;
