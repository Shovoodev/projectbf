import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUpload } from "react-icons/fa";

const SlipEight = () => {
  const [formData, setFormData] = useState({
    funeral_director_name: "",
    funeral_director_phone: "",
    investor1_date: "2026-01-08",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container-base">
      <form className="p-4 md:p-10" onSubmit={(e) => e.preventDefault()}>
        {/* Main Header */}
        <div className="mb-8">
          <h2 className="pdf-h2">
            7. Assigning the Funeral Bond to a funeral director (Pre-Paid
            Funeral Bond)
          </h2>
        </div>

        {/* Instructions */}
        <div className="pdf-info-box mb-8 border-blue-900 bg-blue-50/50">
          <p className="pdf-instruction-bold">
            This section should only be completed and signed if the Funeral Bond
            is being 'NOMINATED' and by the Investor(s) only.This section should
            only be completed and signed if the bond is being assigned to a
            funeral director.
          </p>
          <p className="pdf-intro-p mb-0">
            I/We in accordance with the Life Insurance Act 1995 (Cth), the
            Constitution of Keylnvest and as outlined in the Product Disclosure
            Statement, wish to assign this Funeral Bond to
          </p>
        </div>

        {/* Director Details */}
        <div className="space-y-6 mb-10">
          <h3 className="pdf-section-title border-none mb-0 text-[#00A99D]">
            Assigned to:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="pdf-label">Name of Funeral Director:</label>
              <input
                type="text"
                name="funeral_director_name"
                value="Black Tulip Funerals"
                readOnly
                placeholder="Enter funeral director's full name"
                className="pdf-input"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="pdf-label">Phone:</label>
              <input
                type="text"
                readOnly
                name="funeral_director_phone"
                value="1300110031"
                placeholder="Enter phone number"
                className="pdf-input"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Acknowledgement and Signature */}
        <div className="space-y-6">
          <div className="pdf-highlight-box !my-0 !border-[#4BA6A6] bg-[#F1F6F7]">
            <h3 className="font-bold text-[rgb(49,41,166)]">
              Please Note: An assignment transfers full ownership of the Funeral
              Bond to the funeral director
            </h3>
            <p>
              Despite the ownership transferring to the funeral director upon
              acceptance by Keylnvest, all lnvestor(s) will remain Members of
              Keylnvest and the assigned funeral director will not be admitted
              as a Member of Keylnvest. All future notices will be forwarded to
              the specified funeral director. This assignment is not valid until
              registered by Keylnvest. This assignment is subject to the Funeral
              Bond being issued. You must be at least 16 years of age to assign
              the Funeral Bond to a funeral director. Acknowledgment of
              assignment – Investor 1 and Investor 2 (where applicable) and the
              funeral director signatures are required
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg bg-slate-50/30">
            <h4 className="pdf-label text-base mb-4">Signature of Investor</h4>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col  gap-6 mt-4 items-stretch">
                {/* Signature Upload Area */}
                <div className="flex-[2] space-y-2">
                  <label className="pdf-label-sm">Signature:</label>
                  <div className="pdf-signature-zone !py-4">
                    <FaUpload className="text-gray-300 text-2xl mb-2" />
                    <input id="sig-nominate" type="file" className="hidden" />
                    <label
                      htmlFor="sig-nominate"
                      className="pdf-upload-btn cursor-pointer"
                    >
                      Upload Signature
                    </label>
                  </div>
                </div>

                {/* Date Field */}
                <div className="pdf-date-container">
                  <label className="pdf-label-sm">Date:</label>
                  <input
                    type="date"
                    name="investor1_date"
                    defaultValue="2026-01-08"
                    className="pdf-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col  gap-6 mt-4 items-stretch">
                {/* Signature Upload Area */}
                <div className="flex-[2] space-y-2">
                  <label className="pdf-label-sm">Signature:</label>
                  <div className="pdf-signature-zone !py-4">
                    <FaUpload className="text-gray-300 text-2xl mb-2" />
                    <input id="sig-nominate" type="file" className="hidden" />
                    <label
                      htmlFor="sig-nominate"
                      className="pdf-upload-btn cursor-pointer"
                    >
                      Upload Signature
                    </label>
                  </div>
                </div>

                {/* Date Field */}
                <div className="pdf-date-container">
                  <label className="pdf-label-sm">Date:</label>
                  <input
                    type="date"
                    name="investor1_date"
                    defaultValue="2026-01-08"
                    className="pdf-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="pdf-footer mt-12">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="hidden sm:inline">
              Funeral Bond Product Disclosure Statement (PDS)
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="hidden md:block">Version: July 2025</div>
            <div className="bg-[rgb(49,41,166)] text-white px-2 py-0.5 rounded text-[12px]">
              38
            </div>
          </div>
        </div>

        {/* Responsive Navigation Actions */}
      </form>
    </div>
  );
};

export default SlipEight;
