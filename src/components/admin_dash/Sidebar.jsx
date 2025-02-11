// components/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaUserTie,
  FaCog,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaUserTie />, label: "Users" },
    { icon: <FaHome />, label: "Home" },
    { icon: <FaCog />, label: "Settings" },
  ];

  return (
    <aside
      className={`
        fixed sm:sticky top-0 left-0
        w-64 h-screen
        bg-gradient-to-b from-indigo-600 to-indigo-700
        text-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
    >
      {/* Header / Logo */}
      <div className="p-4 sm:p-6 border-b border-indigo-500 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white rounded-lg">
            <FaHome className="text-indigo-600 text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">RentalAdmin</h1>
        </div>
        <button
          className="text-white hover:text-indigo-100 text-2xl sm:hidden focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 sm:px-3 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#!"
                className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-indigo-500/20 transition-all duration-300 group"
              >
                <span className="text-lg text-indigo-200 group-hover:text-white mr-3">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base font-medium group-hover:text-white">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-indigo-500 text-center">
        <p className="text-xs sm:text-sm text-indigo-200">
          © 2025 Rental Inc.
        </p>
      </div>
    </aside>
  );
}