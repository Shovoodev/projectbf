import React from "react";

// Reusable Input Component
const FormInput = ({ label, required, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
    />
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, options, required }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all">
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

const SignatureFormPage = () => {
  const salutationOptions = ["Mr", "Mrs", "Ms", "Miss", "Master", "Baby", "Dr"];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-8">
          <form>
            {/* Salutation */}
            <FormSelect label="Salutation" options={salutationOptions} />

            {/* Given Names */}
            <FormInput label="Given Names" required={true} />

            {/* Surname */}
            <FormInput label="Surname / Family Name" required={true} />

            {/* File Upload Section */}
            <div className="mb-6 mt-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Photo Identification For...
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors group">
                <div className="flex justify-center mb-2">
                  <svg
                    className="w-12 h-12 text-gray-400 group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>
                <p className="text-gray-900 font-medium text-lg mb-1">
                  Drag & Drop Files,{" "}
                  <span className="text-blue-600">Choose Files to Upload</span>
                </p>
              </div>
            </div>

            {/* Signature Pad Placeholder */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sign Your Name Here
              </label>
              <div className="border border-gray-300 rounded-lg h-32 bg-white relative">
                {/* This is a visual placeholder for the canvas signature pad */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <span className="text-4xl font-handwriting text-gray-400 select-none">
                    Signature
                  </span>
                </div>
                <canvas className="w-full h-full cursor-crosshair"></canvas>
                <button
                  type="button"
                  className="absolute bottom-2 right-2 text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 bg-white px-2 py-1 rounded border shadow-sm transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear Signature
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignatureFormPage;
