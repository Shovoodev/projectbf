import { useState } from "react";
import img from "./images/Scott Harris Sign.png";
const SlipFourty = () => {
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
            7. Funeral director acceptance of the assignment of the Funeral Bond
          </h2>
        </div>
        {/* Instructions */}
        <div className="pdf-info-box mb-8 border-blue-900 bg-blue-50/50">
          <p className="pdf-instruction-bold">
            This section should only be completed and signed if the bond is
            being assigned to a funeral director
          </p>
          <p className="pdf-intro-p mb-0">
            I accept the assignment from the lnvestor(s) named in this
            application with the full understanding of the following
          </p>
        </div>

        <div className="pdf-declaration-list">
          <label className="pdf-declaration-item group">
            <input type="checkbox" className="pdf-declaration-checkbox" />
            <span className="pdf-declaration-text">
              {" "}
              I understand and accept the investment risk associated with the
              Investment Option(s) selected in Section 2.1.
            </span>
          </label>
          <label className="pdf-declaration-item group">
            <input type="checkbox" className="pdf-declaration-checkbox" />
            <span className="pdf-declaration-text">
              All the funeral requirements selected by the lnvestor(s) as a part
              of the pre-paid funeral contract will be provided irrespective of
              the final balance of the Funeral Bond.
            </span>
          </label>
        </div>

        {/* Director Details */}
        <div className="space-y-6 mb-10">
          <h3 className="pdf-section-title border-none mb-0 text-[#00A99D]">
            Authorised Signature of Funeral Director:
          </h3>
          {/* Signature Upload Area */}
          <div className="max-w-70 space-y-2">
            <label className="pdf-label-sm">Signature:</label>
            <div className="pdf-signature-zone !py-4">
              <img src={img} alt="" />
            </div>
          </div>
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
              <label className="pdf-label">Date</label>
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
        {/* Acknowledgement and Signature */}

        {/* Footer Branding */}
        <div className="pdf-footer">
          <div>
            <span className="text-blue-900">KeyInvest</span> Funeral Bond PDS
          </div>
          <div>Version: July 2026</div>
          <div>Page 40</div>
        </div>
        {/* Responsive Navigation Actions */}
      </form>
    </div>
  );
};

export default SlipFourty;
