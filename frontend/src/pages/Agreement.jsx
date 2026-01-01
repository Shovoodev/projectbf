import React from "react";

// Reusable Form Field Components
const FormLabel = ({ children, required }) => (
  <label className="block text-sm font-bold text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const InputField = ({ type = "text", placeholder, required }) => (
  <input
    type={type}
    required={required}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
  />
);

const SelectField = ({ options, required }) => (
  <select
    required={required}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
  >
    <option value="" disabled selected>
      Select Choice
    </option>
    {options.map((opt, idx) => (
      <option key={idx} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const AgreementForm = () => {
  const salutations = [
    "Mr",
    "Mrs",
    "Ms",
    "Miss",
    "Master",
    "Baby",
    "Dr",
    "Other",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <form className="space-y-12">
            {/* ==========================================
                SECTION 1: DECEASED PERSONS DETAILS
               ========================================== */}
            <div>
              <h3 className="text-3xl text-center font-display font-bold text-gray-900 mb-6  pb-2">
                Deceased Persons Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salutation */}
                <div className="md:col-span-2 lg:col-span-1">
                  <FormLabel required>Salutation</FormLabel>
                  <SelectField options={salutations} required />
                </div>

                {/* Given Names */}
                <div className="md:col-span-2 lg:col-span-1">
                  <FormLabel required>Given Names</FormLabel>
                  <InputField required />
                </div>

                {/* Surname */}
                <div className="md:col-span-2">
                  <FormLabel required>Surname / Family Name</FormLabel>
                  <InputField required />
                </div>

                {/* Date of Birth */}
                <div>
                  <FormLabel required>Date of Birth</FormLabel>
                  <InputField type="date" required />
                </div>

                {/* Checkbox: Not Passed Away */}
                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id="not_passed"
                    className="w-5 h-5 text-black rounded focus:ring-black border-gray-300"
                  />
                  <label
                    htmlFor="not_passed"
                    className="ml-2 text-gray-700 font-medium"
                  >
                    Person Has Not Passed Away
                  </label>
                </div>

                {/* Date of Death */}
                <div>
                  <FormLabel required>Date of Death</FormLabel>
                  <InputField type="date" required />
                </div>

                {/* Last Address */}
                <div className="md:col-span-2">
                  <FormLabel required>
                    Last Registered Address of the Deceased
                  </FormLabel>
                  <InputField
                    placeholder="This is the address they have resided at for the last 3 months."
                    required
                  />
                </div>

                {/* Where did they pass? */}
                <div className="md:col-span-2">
                  <FormLabel required>Where Did deceased Pass Away?</FormLabel>
                  <InputField required />
                </div>

                {/* Current Location */}
                <div className="md:col-span-2">
                  <FormLabel required>Where is the deceased Now?</FormLabel>
                  <InputField placeholder="Eg: Home / Hospital" required />
                </div>

                {/* Devices */}
                <div className="md:col-span-2">
                  <FormLabel required>
                    Does deceased have any form of battery powered devices?
                  </FormLabel>
                  <InputField
                    placeholder="This includes all forms of pacemakers and defibrillators"
                    required
                  />
                </div>

                {/* Doctor */}
                <div className="md:col-span-2">
                  <FormLabel required>
                    Who is deceased's regular doctor (GP) & surgery address?
                  </FormLabel>
                  <InputField
                    placeholder="Eg: Dr Adam Brown, Strathfield"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ==========================================
                SECTION 2: NEXT OF KIN DETAILS
               ========================================== */}
            <div>
              <h4 className="text-3xl text-center font-display font-bold text-gray-900 mb-6  pb-2">
                Next of Kin Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salutation */}
                <div>
                  <FormLabel>Salutation</FormLabel>
                  <SelectField options={salutations} />
                </div>

                {/* Given Names */}
                <div>
                  <FormLabel required>Given Names</FormLabel>
                  <InputField required />
                </div>

                {/* Surname */}
                <div className="md:col-span-2">
                  <FormLabel required>Surname / Family Name</FormLabel>
                  <InputField required />
                </div>

                {/* Current Address */}
                <div className="md:col-span-2">
                  <FormLabel required>Current Address</FormLabel>
                  <InputField required />
                </div>

                {/* Mobile */}
                <div>
                  <FormLabel required>Mobile</FormLabel>
                  <InputField type="tel" required />
                </div>

                {/* Email */}
                <div>
                  <FormLabel required>Email</FormLabel>
                  <InputField type="email" required />
                </div>

                {/* Relationship */}
                <div className="md:col-span-2">
                  <FormLabel required>Your Relationship to deceased?</FormLabel>
                  <InputField required />
                </div>

                {/* File Upload Area */}
                <div className="md:col-span-2">
                  <FormLabel required>
                    Upload Photo Identification For Next of Kin
                  </FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="text-gray-400 group-hover:text-black mb-3">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="font-bold text-gray-900">
                      Drag & Drop Files, or Choose Files to Upload
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      You can upload up to 2 files.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                SECTION 3: SIGNATURE
               ========================================== */}
            <div>
              <FormLabel required>Sign Your Name Here</FormLabel>
              <div className="border border-gray-300 rounded-md h-32 bg-gray-50 relative mt-2">
                <canvas className="w-full h-full cursor-crosshair"></canvas>
                <button
                  type="button"
                  className="absolute bottom-2 right-2 text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 bg-white px-2 py-1 rounded border shadow-sm"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear Signature
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-black text-white font-bold py-4 px-10 rounded hover:bg-gray-800 transition-colors duration-300 w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgreementForm;
