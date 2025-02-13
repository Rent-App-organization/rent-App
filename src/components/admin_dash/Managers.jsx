import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const firebaseUrl = 'https://rental-website-bb300-default-rtdb.firebaseio.com/users.json'; 

  useEffect(() => {
    const fetchManagersData = async () => {
      try {
        const response = await axios.get(firebaseUrl);
        const data = response.data;
        
        if (data) {
          // Add unique ID for each manager from Firebase key
          const managersData = Object.keys(data).map(key => ({
            id: key,  // using Firebase generated key as the unique ID
            ...data[key]
          }));
          setManagers(managersData);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchManagersData();
  }, []);

  const updateManagerStatus = (managerId, newStatus) => {
    const updatedManagers = managers.map(manager => 
      manager.id === managerId 
        ? { ...manager, status: newStatus }  // Update status only for the matched manager
        : manager
    );
    setManagers(updatedManagers);
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
                  {manager.fullName}
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
                      onClick={() => updateManagerStatus(manager.id, "Approved")}
                      className="inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateManagerStatus(manager.id, "Rejected")}
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
