import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";

const SlipThirtyFour = () => {
  const { updateInvestor, handleChange } = usePrePayServiceApi();

  return (
    <div className=" w-full bg-white border border-gray-200 rounded-lg
  overflow-hidden shadow-xl font-roboto
  p-4 md:p-8">
      <div className="p-6 border-b border-gray-200 bg-slate-50">
        <p className="pdf-subtitle">
          Investor 2 (Only complete this section if this is to be a jointly owned Policy, if being completed by a POA or if the policy is
          for a Separate Life Insured)
        </p>
        <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-md border border-slate-100">
          {["Joint application ", "Separate Life Insured", "Power of Attorney"].map((t) => (
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
        <p>Before making a joint application please read page 7 of the PDS. To make 2 single applications please complete a
          separate Application Form for each Investor.</p>
      </div>

      <form className="p-8 space-y-6" onSubmit={handleChange}>
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-full">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200 mb-3">Title:</label>
            <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-md border border-slate-100">
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
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Surname:</label>
            <input
              type="text"
              name="surname"
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                updateInvestor("investorOne", ["surname"], e.target.value)
              }
            />
          </div>

          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Given Names:</label>
            <input
              type="text"
              name="givenNames"
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                updateInvestor("investorOne", ["givenNames"], e.target.value)
              }
            />
          </div>

          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) =>
                updateInvestor("investorOne", ["givenNames"], e.target.value)
              }
            />
          </div>

          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Gender:</label>
            <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-md border border-slate-100 mt-2">
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
        <h3 className="text-lg font-bold uppercase tracking-wide
  text-[rgb(49,41,166)]
  border-b border-gray-200
  pb-2 mt-8 mb-4">
          Residential Address{" "}
          <span className="pdf-note">
            (must not be a PO box, RMB or Locked Bag)
          </span>
        </h3>

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Unit Number</label>
            <input
              type="text"
              name="res_unit"
              onChange={(e) =>
                updateInvestor("investorOne", ["unit"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-4">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Street No</label>
            <input
              type="text"
              name="res_streetNo"
              onChange={(e) =>
                updateInvestor("investorOne", ["streetNo"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-3">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Street Name</label>
            <input
              type="text"
              name="res_streetName"
              onChange={(e) =>
                updateInvestor("investorOne", ["streetName"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-3">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Suburb</label>
            <input
              type="text"
              name="res_suburb"
              onChange={(e) =>
                updateInvestor("investorOne", ["suburb"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">State</label>
            <input
              type="text"
              defaultValue="NSW"
              onChange={(e) =>
                updateInvestor("investorOne", ["state"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent-readonly"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Postcode</label>
            <input
              type="text"
              name="res_postcode"
              onChange={(e) =>
                updateInvestor("investorOne", ["postcode"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Country</label>
            <input
              type="text"
              onChange={(e) =>
                updateInvestor("investorOne", ["country"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent-readonly"
              disabled
            />
          </div>
        </div>
        {/* Milling  Address */}
        <h3 className="text-lg font-bold uppercase tracking-wide
  text-[rgb(49,41,166)]
  border-b border-gray-200
  pb-2 mt-8 mb-4">
          Mailing Address (
          <span className="pdf-note">(if different to above address))</span>
        </h3>

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Unit Number</label>
            <input
              type="text"
              name="res_unit"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailunit"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-4">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Street No</label>
            <input
              type="text"
              name="res_streetNo"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailstreetNo"], e.target.value)
              }
            />
          </div>
          <div className="col-span-3">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Street Name</label>
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
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-3">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Suburb</label>
            <input
              type="text"
              name="res_suburb"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailsuburb"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">State</label>
            <input
              type="text"
              defaultValue="NSW"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailstate"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent-readonly"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Postcode</label>
            <input
              type="text"
              name="res_postcode"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailpostcode"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200-sm">Country</label>
            <input
              type="text"
              defaultValue="AUSTRALIA"
              onChange={(e) =>
                updateInvestor("investorOne", ["mailcountry"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent-readonly"
            />
          </div>
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-bold uppercase tracking-wide
  text-[rgb(49,41,166)]
  border-b border-gray-200
  pb-2 mt-8 mb-4">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Daytime Telephone:</label>
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
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Mobile:</label>
            <input
              type="text"
              name="mobile"
              onChange={(e) =>
                updateInvestor("investorOne", ["mobile"], e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Daytime Adress:</label>
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
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="">
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) =>
                updateInvestor("investorOne", ["email"], e.target.value)
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
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
