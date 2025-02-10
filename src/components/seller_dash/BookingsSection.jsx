import React from "react";
import { FaClipboardList, FaCheck, FaTimes } from "react-icons/fa";

export default function BookingsSection({ bookings, properties, onBookingAction }) {
    const getPropertyTitle = (propertyId) => {
        const prop = properties.find((p) => p.id === propertyId);
        return prop ? prop.title : "Unknown Property";
    };

    return (
        <section id="bookings" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
                <FaClipboardList className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Booking Management</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-indigo-600">Property</th>
                            <th className="px-4 py-3 text-sm font-semibold text-indigo-600">Guest</th>
                            <th className="px-4 py-3 text-sm font-semibold text-indigo-600">Status</th>
                            <th className="px-4 py-3 text-sm font-semibold text-right text-indigo-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{getPropertyTitle(b.propertyId)}</td>
                                <td className="px-4 py-3">{b.guestName}</td>
                                <td className="px-4 py-3">{b.status}</td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    {b.status === "Pending" && (
                                        <>
                                            <button
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                onClick={() => onBookingAction(b.id, "Approved")}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                                onClick={() => onBookingAction(b.id, "Declined")}
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                                    No booking requests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
