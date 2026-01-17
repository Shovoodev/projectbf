import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { usePrePayServiceApi } from "@/utility/prepay-service-provider";

const SlipThirtyEight = () => {
  const [formData, setFormData] = useState({
    funeral_director_name: "",
    funeral_director_phone: "",
    investor1_date: "2026-01-08",
  });
  const { signature } = usePrePayServiceApi();

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
            6. Nominate a funeral director to perform the funeral
          </h2>
        </div>

        {/* Instructions */}
        <div className="pdf-info-box mb-8 border-blue-900 bg-blue-50/50">
          <p className="pdf-instruction-bold">
            This section should only be completed and signed if the Funeral Bond
            is being 'NOMINATED' and by the Investor(s) only.
          </p>
          <p className="pdf-intro-p mb-0">
            The funeral director’s signature is not required. I/We in accordance
            with the Constitution of Keylnvest and as outlined in the Product
            Disclosure Statement, wish to nominate this Funeral Bond to
          </p>
        </div>

        {/* Director Details */}
        <div className="space-y-6 mb-10">
          <h3 className="pdf-section-title border-none mb-0 text-[#00A99D]">
            Nominated to:
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
            <p className="font-bold text-[rgb(49,41,166)]">
              Acknowledgement of nomination – Investor 1 and Investor 2 (where
              applicable) signatures are required.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg bg-slate-50/30">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col  gap-6 mt-4 items-stretch">
                {/* Signature Upload Area */}
                <div className="flex-[2] space-y-2">
                  <label className="pdf-label-sm">
                    Signature of investor 1
                  </label>
                  <div className="pdf-signature-zone !py-4">
                    {signature && (
                      <img
                        src={URL.createObjectURL(signature)}
                        alt="Signature"
                        className="mt-4"
                      />
                    )}
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
                  />
                </div>
              </div>
              <div className="hidden flex-col  gap-6 mt-4 items-stretch">
                {/* Signature Upload Area */}
                <div className="flex-[2] space-y-2">
                  <label className="pdf-label-sm"></label>
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
        <div className="pdf-footer">
          <div className="flex gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span>Funeral Bond Product Disclosure Statement (PDS)</span>
          </div>
          <div className="flex gap-8">
            <div>Version: July 2025</div>
            <div className="font-bold">38</div>
          </div>
        </div>

        {/* Responsive Navigation Actions */}
      </form>
    </div>
  );
};

export default SlipThirtyEight;
