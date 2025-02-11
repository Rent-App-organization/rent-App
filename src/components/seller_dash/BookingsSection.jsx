import React, { useState } from "react";
import { FaClipboardList, FaCheck, FaTimes } from "react-icons/fa";
import BookingWizard from "./BookingWizard";

export default function BookingsSection({ bookings, properties, onBookingAction }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showWizard, setShowWizard] = useState(false);

  // New filter states
  const [propertyFilter, setPropertyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Open/close wizard
  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowWizard(true);
  };
  const closeWizard = () => {
    setSelectedBooking(null);
    setShowWizard(false);
  };

  // Show property name
  const getPropertyTitle = (propertyId) => {
    const prop = properties.find((p) => p.id === propertyId);
    return prop ? prop.title : "Unknown Property";
  };

  // 1) Filter the bookings based on property & status
  const filteredBookings = bookings.filter((b) => {
    // propertyFilter is either "" or a propertyId
    // statusFilter is either "" or "Pending", "Approved", etc.
    const matchProperty =
      !propertyFilter || b.propertyId === Number(propertyFilter);
    const matchStatus = !statusFilter || b.status === statusFilter;
    return matchProperty && matchStatus;
  });

  return (
    <section className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center mb-5">
        <FaClipboardList className="text-indigo-600 mr-2 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Booking Management</h2>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        {/* Property Filter */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Filter by Property:
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
          >
            {/* "" => means All */}
            <option value="">All Properties</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Filter by Status:
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Property
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Guest
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.map((b) => (
              <tr
                key={b.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(b)}
              >
                <td className="px-4 py-3">{getPropertyTitle(b.propertyId)}</td>
                <td className="px-4 py-3">{b.guestName}</td>
                <td className="px-4 py-3">{b.status}</td>
                <td
                  className="px-4 py-3 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  {b.status === "Pending" && (
                    <div className="inline-flex space-x-2">
                      <button
                        onClick={() => onBookingAction(b.id, "Approved")}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => onBookingAction(b.id, "Declined")}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-5 text-center text-gray-500"
                >
                  No booking requests found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* If showWizard is true, mount the wizard. Otherwise it's unmounted. */}
      {showWizard && selectedBooking && (
        <BookingWizard
          booking={selectedBooking}
          onCloseAll={closeWizard}
        />
      )}
    </section>
  );
}
