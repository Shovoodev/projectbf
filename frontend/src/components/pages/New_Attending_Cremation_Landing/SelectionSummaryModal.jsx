import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import LandingAgreement from "../../../pages/LandingAgreement";

function SelectionSummaryModal({ isOpen, setIsOpen, selections, totalPrice }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "blur(1px)" }}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative w-full h-full flex items-center justify-center p-2 transform transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#2c5aa0] text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">Summary</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all duration-200"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {selections && Object.keys(selections).length > 0 ? (
              <>
                {/* Selections Table */}
                <div className="mb-8">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-3 text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide">
                          Category
                        </th>
                        <th className="px-4 py-3 text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide">
                          Selection
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(selections).map(([key, item], index) => (
                        <tr
                          key={key}
                          className={`border-b transition-colors ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-50`}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700 text-sm md:text-base">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (c) => c.toUpperCase())}
                          </td>

                          <td className="px-4 py-3 text-gray-600 text-sm md:text-base">
                            {item?.value || "Not selected"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Section */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 md:p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-gray-800">
                      Total Amount:
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-[#2c5aa0]">
                      ${Number(totalPrice || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Agreement Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl md:p-0">
                  <h3 className="text-lg text-center font-bold text-gray-800 mb-4">
                    Next Step: Review Agreement
                  </h3>
                  <LandingAgreement />
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No selections found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectionSummaryModal;
