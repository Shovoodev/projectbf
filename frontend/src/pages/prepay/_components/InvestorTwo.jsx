import { useState } from "react";

const InvestorTwo = () => {
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
    daytimeAddress: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" w-full bg-white border border-gray-200 rounded-lg
  overflow-hidden shadow-xl font-roboto
  p-4 md:p-8">
      <div className="p-6 border-b border-gray-200 bg-slate-50">
        <p className="pdf-subtitle">
          Investor 2 ((Only complete this section if this is to be a jointly
          owned Policy, if being completed by a POA or if the policy is for a
          Separate Life Insured))
        </p>
      </div>

      <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
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
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Surname:</label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Given Names:</label>
            <input
              type="text"
              name="givenNames"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className=" text-sm font-bold text-[rgb(49,41,166)]
  mb-1 block transition-colors duration-200">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent-readonly"
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              type="text"
              name="daytimeTelephone"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded
  outline-none transition-all duration-200
  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* <div>
          <p className="pdf-intro-p">
            If the application is being completed under a Power of Attorney
            (POA), please include the attorney’s contact details under
          </p>
          <h3 className="text-lg font-bold uppercase tracking-wide
  text-[rgb(49,41,166)]
  border-b border-gray-200
  pb-2 mt-8 mb-4">Queensland residents only</h3>
          <p className="pdf-intro-p">
            Queensland State legislation requires all ‘selling agents’ of
            Funeral Bonds to provide clients with a ‘Client Care Statement. We
            are not permitted to accept Keylnvest Funeral Bond Applications from
            Queensland residents without receiving a completed Client Care
            Statement. A Client Care Statement can be obtained from our website
            or by contacting Keylnvest. Mr Mrs Ms Miss Dr Other Female Male
            Other
          </p>
        </div> */}
        {/* Footer */}
        <div className="mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2026</div>
          <div>Page 33</div>
        </div>
      </form>
    </div>
  );
};

export default InvestorTwo;
