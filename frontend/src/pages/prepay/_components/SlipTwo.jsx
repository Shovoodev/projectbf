import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Sub-component for section titles to keep code clean
  const SectionHeader = ({ title, subtitle }) => (
    <div className="border-b border-gray-200 pb-2 mt-8 mb-4">
      <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-gray-500 italic mt-1">{subtitle}</p>
      )}
    </div>
  );

  return (
    <div className="my-10 bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden font-sans">
      {/* Header Section */}
      <div className="bg-slate-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-900">
          1. Investor details
        </h2>
        <p className="text-slate-600">
          Investor 1 (all correspondence will be sent to this person)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Basic Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Title:
            </label>
            <div className="flex flex-wrap gap-6">
              {["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"].map((t) => (
                <label
                  key={t}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="title"
                    value={t}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-800 border-gray-300 focus:ring-blue-800"
                  />
                  <span className="text-gray-700 group-hover:text-blue-900 transition-colors">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Surname:
            </label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Given Names:
            </label>
            <input
              type="text"
              name="givenNames"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Gender:
            </label>
            <div className="flex gap-6 mt-2">
              {["Female", "Male", "Other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-800"
                  />
                  <span className="text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Residential Address Section */}
        <SectionHeader
          title="Residential Address"
          subtitle="(must not be a PO box, RMB or Locked Bag)"
        />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Unit Number
            </label>
            <input
              type="text"
              name="res_unit"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Street No
            </label>
            <input
              type="text"
              name="res_streetNo"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Street Name
            </label>
            <input
              type="text"
              name="res_streetName"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Suburb
            </label>
            <input
              type="text"
              name="res_suburb"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              State
            </label>
            <input
              type="text"
              name="res_state"
              defaultValue="NSW"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-slate-50 font-semibold"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Postcode
            </label>
            <input
              type="text"
              name="res_postcode"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Country
            </label>
            <input
              type="text"
              name="res_country"
              defaultValue="AUSTRALIA"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-slate-50 font-semibold"
            />
          </div>
        </div>

        {/* Mailing Address Section */}
        <SectionHeader
          title="Mailing Address"
          subtitle="(if different to above address)"
        />
        <div className="grid grid-cols-6 gap-4 opacity-80 hover:opacity-100 transition-opacity">
          <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Unit No
            </label>
            <input
              type="text"
              name="mail_unit"
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Street No
            </label>
            <input
              type="text"
              name="mail_streetNo"
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Street Name
            </label>
            <input
              type="text"
              name="mail_streetName"
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase">
              Suburb
            </label>
            <input
              type="text"
              name="mail_suburb"
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded"
            />
          </div>
        </div>

        {/* Contact Details Section */}
        <SectionHeader title="Contact Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Daytime Telephone:
            </label>
            <input
              type="text"
              name="daytimeTelephone"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Mobile:
            </label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-full flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
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
