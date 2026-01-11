import React, { useState } from "react";
import { FaChevronLeft, FaPaperPlane } from "react-icons/fa";

const FormSubmitSlip = ({ onBack, onSubmitAll }) => {
  const [formData, setFormData] = useState({
    user_email: "",
    section15_field1: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitAll) {
      onSubmitAll(formData);
    }
  };

  return (
    <div className="form-container-base">
      <div className="p-4 md:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[rgb(49,41,166)] leading-none mb-2">
            15. Final Section
          </h1>
          <p className="pdf-subtitle text-[#00A99D] font-bold">
            Form section based on image 45 - Final review before submission
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Delivery Field */}
          <div className="max-w-2xl">
            <label className="pdf-label">Email Address for PDF Delivery:</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="Enter your email address to receive the application PDFs"
              className="pdf-input !bg-blue-50/30"
              onChange={handleInputChange}
            />
            <p className="text-[11px] text-slate-500 mt-2 italic">
              A copy of your completed application and the Product Disclosure
              Statement (PDS) will be sent here.
            </p>
          </div>

          {/* Final Review Notes */}
          <div className="max-w-2xl">
            <label className="pdf-label">Final Review Field:</label>
            <textarea
              name="section15_field1"
              rows="4"
              placeholder="Any final notes or comments"
              className="pdf-input !bg-blue-50/30 resize-none"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          {/* Final Confirmation Message */}
          <div className="pdf-highlight-box !border-[#00A99D] bg-[#F1F6F7] !my-10">
            <p className="text-[13px] leading-relaxed text-[rgb(49,41,166)] font-medium">
              By clicking "Submit All Forms", you confirm that you have reviewed
              all 15 sections of the application and that the information
              provided is accurate to the best of your knowledge.
            </p>
          </div>

          {/* Footer Branding */}
          <footer className="pdf-footer border-t-2 border-[rgb(49,41,166)] pt-4 mt-12">
            <div className="flex flex-wrap gap-2">
              <span className="text-[rgb(49,41,166)] font-black">
                KeyInvest
              </span>
              <span className="hidden sm:inline">
                Funeral Bond Product Disclosure Statement (PDS)
              </span>
            </div>
            <div className="flex gap-8 items-center">
              <div className="hidden md:block italic">Version: July 2025</div>
              <div className="font-bold text-[rgb(49,41,166)]">45</div>
            </div>
          </footer>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary w-full sm:w-auto justify-center"
            >
              <FaChevronLeft className="mr-2" /> Previous Section
            </button>
            <button
              type="submit"
              className="btn-primary-pdf !bg-[#00A99D] !border-[#00A99D] hover:!bg-[#008c82] w-full sm:w-auto"
            >
              <FaPaperPlane className="mr-2" /> Submit All Forms
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSubmitSlip;
