// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaFileAlt,
  FaDollarSign,
  FaClock,
  FaEye,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
const CORE = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");

  console.log(userid);

  const [invoiceDetails, setInvoiceDetails] = useState(null);
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await fetch(`${CORE}/all-service-data`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status:  ${res.status}`);
        }
        const data = await res.json();

        setTimeout(() => {
          setInvoiceDetails(data.data);
        }, 800);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, []);
  console.log(invoiceDetails);
  // Stats data
  const stats = [
    {
      title: "Total Forms",
      value: 5,
      icon: FaFileAlt,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Total Invoices",
      value: 5,
      icon: FaDollarSign,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Paid Invoices",
      value: 2,
      icon: FaCheckCircle,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
    },
    {
      title: "Unpaid Invoices",
      value: 3,
      icon: FaClock,
      color: "bg-amber-500",
      textColor: "text-amber-500",
    },
  ];

  // Recent forms data

  // Recent invoices data
  const recentInvoices = [
    {
      id: "INV-001",
      description: "Website Development - Phase 1",
      amount: "$1,500",
      status: "Paid",
    },
    {
      id: "INV-002",
      description: "UI/UX Design Services",
      amount: "$2,300",
      status: "Paid",
    },
    {
      id: "INV-003",
      description: "Monthly Maintenance",
      amount: "$850",
      status: "Unpaid",
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Submitted: "bg-blue-100 text-blue-800",
      Reviewed: "bg-purple-100 text-purple-800",
      Pending: "bg-amber-100 text-amber-800",
      Paid: "bg-emerald-100 text-emerald-800",
      Unpaid: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          statusConfig[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-8 w-8 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Forms Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                All Selectes Services
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                <FaEye className="h-4 w-4" />
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">
                      Stationery
                    </span>
                    <span className="font-medium">
                      {invoiceDetails?.stationery}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">
                      Body Preparation
                    </span>
                    <span className="font-medium">
                      {invoiceDetails?.bodyPreparation}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">Coffin</span>
                    <span className="font-medium">
                      {invoiceDetails?.coffin}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">Flowers</span>
                    <span className="font-medium">
                      {invoiceDetails?.flowers}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">Urn</span>
                    <span className="font-medium">{invoiceDetails?.urn}</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500 block">
                      Urn Collection
                    </span>
                    <span className="font-medium">
                      {invoiceDetails?.collectionOfUrn}
                    </span>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Invoices Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Invoices
              </h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                <FaEye className="h-4 w-4" />
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="pb-3 font-medium">Invoice ID</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-4">
                        <p className="font-medium text-gray-900">
                          {invoice.id}
                        </p>
                      </td>
                      <td className="py-4 text-gray-600">
                        {invoice.description}
                      </td>
                      <td className="py-4 font-semibold text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="py-4">
                        <FaEnvelope status={invoice.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-gray-600 text-sm">john@example.com</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
