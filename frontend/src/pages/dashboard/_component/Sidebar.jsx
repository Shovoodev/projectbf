import { useState } from "react";
import {
  FiGrid,
  FiFileText,
  FiDollarSign,
  FiCreditCard,
  FiUser,
  FiMenu,
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard Overview", icon: FiGrid },
  { name: "Submitted Forms", icon: FiFileText },
  { name: "Invoices", icon: FiDollarSign },
  { name: "Payments", icon: FiCreditCard },
  { name: "Profile Settings", icon: FiUser },
];
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-white border-r transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            C
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold">ClientHub</span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-1 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg
              text-gray-600 hover:bg-blue-50 hover:text-blue-600
              transition-colors
              ${index === 0 ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
