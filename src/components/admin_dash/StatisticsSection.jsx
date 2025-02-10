// components/StatisticsSection.jsx
import React from "react";
import { FaUserTie, FaCheckCircle, FaTimesCircle, FaBuilding } from "react-icons/fa";

export default function StatisticsSection({ managers, listings }) {
  // Simple calculations based on props (you can replace these with real logic)
  const totalManagers = managers.length;
  const approvedManagers = managers.filter((m) => m.status === "Approved").length;
  const rejectedManagers = managers.filter((m) => m.status === "Rejected").length;
  const totalListings = listings.length;
  const approvedListings = listings.filter((l) => l.status === "Approved").length;
  const rejectedListings = listings.filter((l) => l.status === "Rejected").length;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Admin Statistics
      </h2>

      {/* Grid of stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Managers */}
        <div className="flex items-center p-4 bg-indigo-50 rounded-lg shadow-sm">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-700 mr-3">
            <FaUserTie size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Managers</p>
            <p className="text-xl font-bold text-indigo-800">
              {totalManagers}
            </p>
          </div>
        </div>

        {/* Approved Managers */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg shadow-sm">
          <div className="p-3 bg-green-100 rounded-full text-green-700 mr-3">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Approved Managers</p>
            <p className="text-xl font-bold text-green-800">
              {approvedManagers}
            </p>
          </div>
        </div>

        {/* Rejected Managers */}
        <div className="flex items-center p-4 bg-red-50 rounded-lg shadow-sm">
          <div className="p-3 bg-red-100 rounded-full text-red-700 mr-3">
            <FaTimesCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Rejected Managers</p>
            <p className="text-xl font-bold text-red-800">
              {rejectedManagers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Total Listings */}
        <div className="flex items-center p-4 bg-indigo-50 rounded-lg shadow-sm">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-700 mr-3">
            <FaBuilding size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Listings</p>
            <p className="text-xl font-bold text-indigo-800">
              {totalListings}
            </p>
          </div>
        </div>

        {/* Approved Listings */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg shadow-sm">
          <div className="p-3 bg-green-100 rounded-full text-green-700 mr-3">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Approved Listings</p>
            <p className="text-xl font-bold text-green-800">
              {approvedListings}
            </p>
          </div>
        </div>

        {/* Rejected Listings */}
        <div className="flex items-center p-4 bg-red-50 rounded-lg shadow-sm">
          <div className="p-3 bg-red-100 rounded-full text-red-700 mr-3">
            <FaTimesCircle size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Rejected Listings</p>
            <p className="text-xl font-bold text-red-800">
              {rejectedListings}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
