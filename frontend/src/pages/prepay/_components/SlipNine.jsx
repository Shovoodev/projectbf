import { FaChevronLeft, FaChevronRight, FaUpload } from "react-icons/fa";

const SlipNine = () => {
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
              />
            </div>
            <div>
              <label className="pdf-label">Date</label>
              <input
                type="date"
                name="investor1_date"
                defaultValue="2026-01-08"
                className="pdf-input"
              />
            </div>
          </div>
        </div>
        {/* Acknowledgement and Signature */}

        {/* Footer Branding */}
        <div className="pdf-footer mt-12">
          <div className="flex flex-wrap gap-2">
            <span className="text-[rgb(49,41,166)] font-black">KeyInvest</span>
            <span className="hidden sm:inline">
              Funeral Bond Product Disclosure Statement (PDS)
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="hidden md:block">Version: July 2025 </div>
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

export default SlipNine;
