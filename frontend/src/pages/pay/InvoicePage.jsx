// src/components/PayInvoice.jsx
import React, { useState } from "react";
import {
  FaCreditCard,
  FaShieldAlt,
  FaLock,
  FaSearch,
  FaCheckCircle,
  FaReceipt,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaQuestionCircle,
} from "react-icons/fa";
import Hero from "../../components/common/Hero";
import PaynowPage from "./PaynowPage";

const CORE = import.meta.env.VITE_API_URL;
const InvoicePage = () => {
  const [invoiceId, setInvoiceId] = useState("BTFXXXXXXXX");
  const [isSearching, setIsSearching] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  //   const [paymentMethod, setPaymentMethod] = useState("card");

  // Mock invoice data (would come from API in real app)

  const handleSearch = async () => {
    try {
      setIsSearching(true);

      const res = await fetch(`${CORE}/service-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: invoiceId.trim() }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      setTimeout(() => {
        setInvoiceDetails(data.data);
        setIsSearching(false);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = () => {
    // Handle payment logic here
    alert(`Processing payment for ${invoiceDetails?.id}`);
  };

  return (
    <div>
      <Hero title={"Pay Now"} subtitle={"Pay Now"} />

      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-5">
        {/* Header */}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Pay Your Invoice
        </h1>
        <p className="text-gray-600 text-lg">
          Review your details and complete your payment securely.
        </p>
        <div className=" flex items-center gap-1 text-green-600">
          <FaLock className="h-5 w-5" />
          <span className="text-sm font-medium">
            All transactions are encrypted and protected
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Invoice Search */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              {/* Invoice Search Section */}
              <div className="mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Your Invoice ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        onChange={(e) => setInvoiceId(e.target.value)}
                        className="w-full px-4 py-3 pl-11 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter your invoice ID"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaReceipt className="h-5 w-5 text-gray-400" />
                      </div>
                      <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSearching ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <FaSearch />
                            Search
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your invoice ID should look like: BTFXXXXXXXX
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              {invoiceDetails && (
                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Invoice Details
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-4">
                        {/* Map _id to Invoice ID */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Invoice ID:</span>
                          <span className="font-semibold text-gray-900">
                            {invoiceDetails.reference}
                          </span>
                        </div>

                        {/* Map createdAt to Date */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="text-gray-900">
                            {new Date(
                              invoiceDetails.createdAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        {/* If you have a dueDate field, add it here, otherwise use updatedAt */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="text-gray-900">
                            {new Date(
                              invoiceDetails.updatedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Map email to Client */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Client Email:</span>
                          <span className="text-gray-900">
                            {invoiceDetails.email}
                          </span>
                        </div>

                        {/* Show reference number */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-medium text-gray-900">
                            {invoiceDetails.reference}
                          </span>
                        </div>

                        {/* Status with color coding */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              invoiceDetails.status === "paid" ||
                              invoiceDetails.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : invoiceDetails.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {invoiceDetails.status?.charAt(0).toUpperCase() +
                              invoiceDetails.status?.slice(1)}
                          </span>
                        </div>

                        {/* PayNow button component */}
                      </div>
                    </div>

                    {/* Additional Details Section */}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">
                        Service Details
                      </h4>
                      <div className="flex-row gap-1">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Stationery
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.stationery}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Body Preparation
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.bodyPreparation}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Coffin
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.coffin}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Flowers
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.flowers}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Urn
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.urn}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-500 block">
                            Urn Collection
                          </span>
                          <span className="font-medium">
                            {invoiceDetails.collectionOfUrn}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount Display */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaDollarSign className="text-gray-400" />
                          <span className="text-lg text-gray-600">
                            Total Amount:
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">
                            $
                            {(
                              invoiceDetails.totalPrice ||
                              invoiceDetails.amount ||
                              0
                            ).toFixed(2)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Includes: extra added service Price $
                            {(invoiceDetails.totalPriceImpact || 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Created:{" "}
                            {new Date(
                              invoiceDetails.createdAt,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <PaynowPage
                      amount={Math.round(
                        Number(
                          invoiceDetails.totalPrice || invoiceDetails.amount,
                        ) * 100,
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoicePage;
