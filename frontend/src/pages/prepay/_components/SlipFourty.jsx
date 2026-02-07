import img from "./images/Scott Harris Sign.png";
import { usePrePayServiceApi } from "../../../utility/prepay-service-provider";
const SlipFourty = () => {
  const { date } = usePrePayServiceApi();
  return (
    <div className="form-container-base">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Main Header */}
        <div className="mb-8">
          <h2 className="pdf-h2">
            7. Funeral director acceptance of the assignment of the Funeral Bond
          </h2>
        </div>
        {/* Instructions */}
        <div className="pdf-info-box border-blue-900 bg-blue-50/50">
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
        <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                defaultValue={date}
                className="pdf-input"
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
