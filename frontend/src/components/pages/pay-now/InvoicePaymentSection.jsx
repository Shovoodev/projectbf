import React from "react";
import { FaLock, FaSearch } from "react-icons/fa";

const InvoicePaymentSection = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle invoice search here
    alert("Search functionality would trigger here.");
  };

  return (
    <section id="pay-invoice" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="section-container max-w-2xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
          {/* --- ICON HEADER --- */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-gray-800">
            <FaLock />
          </div>

          {/* --- HEADINGS --- */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Pay Your Invoice
          </h2>
          <h3 className="text-lg md:text-xl text-gray-600 font-body mb-2">
            Review your details and complete your payment securely.
          </h3>

          <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mb-10 bg-green-50 py-2 px-4 rounded-full inline-block">
            <FaLock className="text-xs" />
            <span>All transactions are encrypted and protected.</span>
          </div>

          {/* --- SEARCH FORM --- */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md mx-auto text-left"
          >
            <div className="mb-6">
              <label
                htmlFor="invoice_id"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Enter Invoice ID:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="invoice_id"
                  id="invoice_id"
                  placeholder="BTFXXXXXXX"
                  required
                  className="w-full p-4 pl-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all uppercase placeholder-gray-400 font-mono tracking-wider"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaSearch />
              <span>Search Invoice</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InvoicePaymentSection;
