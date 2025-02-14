import React, { useState } from "react";
import { FaClipboardList, FaCheck, FaTimes, FaFilter, FaRegCalendarTimes } from "react-icons/fa";
import BookingWizard from "../modals/BookingWizard";

export default function BookingsSection({ bookings, properties, onBookingAction }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowWizard(true);
  };

  const closeWizard = () => {
    setSelectedBooking(null);
    setShowWizard(false);
  };

  const getPropertyTitle = (productId) => {
    const prop = properties.find((p) => p.id === productId);
    return prop ? prop.title : "Unknown Property";
  };

  const filteredBookings = bookings.filter((b) => {
    const matchProperty = !propertyFilter || b.productId === propertyFilter;
    const matchStatus = !statusFilter || b.status.toLowerCase() === statusFilter.toLowerCase();
    return matchProperty && matchStatus;
  });

  const statusStyles = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    declined: "bg-rose-100 text-rose-800"
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FaClipboardList className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Manager</h2>
              <p className="text-sm text-gray-600">Manage guest reservations and requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filters:</span>
          </div>
          
          <div className="relative">
            <select
              className="pl-4 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
            >
              <option value="">All Properties</option>
              {properties.map((prop) => (
                <option key={prop.id} value={prop.id}>{prop.title}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              className="pl-4 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Property</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guest</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(b)}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {getPropertyTitle(b.productId)}
                </td>
                <td className="px-6 py-4 text-gray-700">{b.fullName}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[b.status.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </td>
                <td 
                  className="px-6 py-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  {b.status.toLowerCase() === "pending" && (
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onBookingAction(b.id, "approved")}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <FaCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onBookingAction(b.id, "declined")}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="inline-flex flex-col items-center">
                    <FaRegCalendarTimes className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 font-medium">No bookings match your filters</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filter criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showWizard && selectedBooking && (
        <BookingWizard booking={selectedBooking} onCloseAll={closeWizard} />
      )}
    </section>
  );
}