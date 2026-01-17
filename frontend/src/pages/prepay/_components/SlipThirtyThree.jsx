import { usePrePayServiceApi } from "@/utility/prepay-service-provider";

const SlipThirtyThree = () => {
  const { updateInvestor, handleChange } = usePrePayServiceApi();

  return (
    <div className="form-container-base">
      <div className="form-header-area">
        <h2 className="pdf-h2">1. Investor details</h2>
        <p className="pdf-subtitle">
          Investor 1 (all correspondence will be sent to this person)
        </p>
      </div>

      <form className="p-8 space-y-6" onSubmit={handleChange}>
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
          </div>

          <div>
            <label className="pdf-label">Surname:</label>
            <input
              type="text"
              name="surname"
              className="pdf-input"
              onChange={(e) =>
                updateInvestor("investorOne", ["surname"], e.target.value)
              }
            />
          </div>

          <div>
            <label className="pdf-label">Given Names:</label>
            <input
              type="text"
              name="givenNames"
              className="pdf-input"
              onChange={(e) =>
                updateInvestor("investorOne", ["givenNames"], e.target.value)
              }
            />
          </div>

          <div>
            <label className="pdf-label">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              className="pdf-input"
              onChange={(e) =>
                updateInvestor("investorOne", ["givenNames"], e.target.value)
              }
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
                    className="pdf-radio-input"
                    onSelect={(e) =>
                      updateInvestor("investorOne", ["gender"], e.target.value)
                    }
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
              onChange={(e) =>
                updateInvestor("investorOne", ["unit"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-4">
            <label className="pdf-label-sm">Street No</label>
            <input
              type="text"
              name="res_streetNo"
              onChange={(e) =>
                updateInvestor("investorOne", ["streetNo"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Street Name</label>
            <input
              type="text"
              name="res_streetName"
              onChange={(e) =>
                updateInvestor("investorOne", ["streetName"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Suburb</label>
            <input
              type="text"
              name="res_suburb"
              onChange={(e) =>
                updateInvestor("investorOne", ["suburb"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">State</label>
            <input
              type="text"
              defaultValue="NSW"
              onChange={(e) =>
                updateInvestor("investorOne", ["state"], e.target.value)
              }
              className="pdf-input pdf-input-readonly"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Postcode</label>
            <input
              type="text"
              name="res_postcode"
              onChange={(e) =>
                updateInvestor("investorOne", ["postcode"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Country</label>
            <input
              type="text"
              onChange={(e) =>
                updateInvestor("investorOne", ["country"], e.target.value)
              }
              className="pdf-input pdf-input-readonly"
              disabled
            />
          </div>
        </div>
        {/* Milling  Address */}
        <h3 className="pdf-section-title">
          Mailing Address (
          <span className="pdf-note">(if different to above address))</span>
        </h3>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <label className="pdf-label-sm">Unit Number</label>
            <input
              type="text"
              name="res_unit"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailunit"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-4">
            <label className="pdf-label-sm">Street No</label>
            <input
              type="text"
              name="res_streetNo"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailstreetNo"], e.target.value)
              }
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Street Name</label>
            <input
              type="text"
              name="res_streetName"
              onChange={(e) =>
                updateInvestor(
                  "investorOne",
                  ["mailstreetName"],
                  e.target.value
                )
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-3">
            <label className="pdf-label-sm">Suburb</label>
            <input
              type="text"
              name="res_suburb"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailsuburb"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">State</label>
            <input
              type="text"
              defaultValue="NSW"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailstate"], e.target.value)
              }
              className="pdf-input pdf-input-readonly"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Postcode</label>
            <input
              type="text"
              name="res_postcode"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailpostcode"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div className="col-span-2">
            <label className="pdf-label-sm">Country</label>
            <input
              type="text"
              defaultValue="AUSTRALIA"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailcountry"], e.target.value)
              }
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
              type="number"
              name="daytimeTelephone"
              onChange={(e) =>
                updateInvestor(
                  "investorOne",
                  ["daytimeTelephone"],
                  e.target.value
                )
              }
              className="pdf-input"
            />
          </div>
          <div>
            <label className="pdf-label">Mobile:</label>
            <input
              type="text"
              name="mobile"
              onChange={(e) =>
                updateInvestor("investorOne", ["mobile"], e.target.value)
              }
              className="pdf-input"
            />
          </div>
          <div>
            <label className="pdf-label">Daytime Adress:</label>
            <input
              type="text"
              name="daytimeAddress"
              onChange={(e) =>
                updateInvestor(
                  "investorOne",
                  ["daytimeAddress"],
                  e.target.value
                )
              }
              className="pdf-input"
            />
          </div>
          <div className="">
            <label className="pdf-label">Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) =>
                updateInvestor("investorOne", ["email"], e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="pdf-intro-p">
            If the application is being completed under a Power of Attorney
            (POA), please include the attorney’s contact details under
          </p>
          <h3 className="pdf-section-title">Queensland residents only</h3>
          <p className="pdf-intro-p">
            Queensland State legislation requires all ‘selling agents’ of
            Funeral Bonds to provide clients with a ‘Client Care Statement. We
            are not permitted to accept Keylnvest Funeral Bond Applications from
            Queensland residents without receiving a completed Client Care
            Statement. A Client Care Statement can be obtained from our website
            or by contacting Keylnvest. Mr Mrs Ms Miss Dr Other Female Male
            Other
          </p>
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

export default SlipThirtyThree;
