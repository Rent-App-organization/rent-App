import React from "react";
import { FaChartPie, FaEye, FaBook } from "react-icons/fa";

export default function AnalyticsSection({ properties, bookings }) {

    const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
    const approvedBookings = bookings.filter((b) => b.status === "Approved").length;
    const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
    const declinedBookings = bookings.filter((b) => b.status === "Declined").length;

    return (
        <section id="analytics" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center mb-4">
                <FaChartPie className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Analytics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-gray-700">
                <div className="p-4 bg-indigo-50 rounded-lg shadow-sm flex items-center">
                    <FaEye className="text-indigo-600 mr-3" size={24} />
                    <div>
                        <p className="text-sm">Total Views</p>
                        <p className="text-xl font-bold">{totalViews}</p>
                    </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg shadow-sm flex items-center">
                    <FaBook className="text-green-600 mr-3" size={24} />
                    <div>
                        <p className="text-sm">Approved Bookings</p>
                        <p className="text-xl font-bold">{approvedBookings}</p>
                    </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg shadow-sm flex items-center">
                    <FaBook className="text-yellow-600 mr-3" size={24} />
                    <div>
                        <p className="text-sm">Pending Bookings</p>
                        <p className="text-xl font-bold">{pendingBookings}</p>
                    </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg shadow-sm flex items-center">
                    <FaBook className="text-red-600 mr-3" size={24} />
                    <div>
                        <p className="text-sm">Declined Bookings</p>
                        <p className="text-xl font-bold">{declinedBookings}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
