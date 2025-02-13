// src/pages/Managers.jsx
import React, { useState } from "react";

export default function Managers() {
  // Local state or fetch from an API
  const [managers, setManagers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  ]);

  // Handle Approve/Reject
  const handleManagerAction = (id, action) => {
    setManagers(prev =>
      prev.map(mgr =>
        mgr.id === id ? { ...mgr, status: action } : mgr
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Pending Property Managers
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] sm:min-w-0">
          <thead className="bg-indigo-50">
            <tr>
              {["Name", "Email", "Status", "Actions"].map(header => (
                <th
                  key={header}
                  className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-indigo-600 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {managers.map(manager => (
              <tr
                key={manager.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800 text-sm sm:text-base">
                  {manager.name}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-600 text-sm">
                  {manager.email}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                      manager.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : manager.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {manager.status}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 space-y-2 sm:space-x-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleManagerAction(manager.id, "Approved")}
                      className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleManagerAction(manager.id, "Rejected")}
                      className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
