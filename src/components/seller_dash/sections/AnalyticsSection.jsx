import React from "react";
import { FaChartPie, FaEye, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

export default function AnalyticsSection({ properties, bookings }) {
    const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
    const approvedBookings = bookings.filter((b) => b.status === "Approved").length;
    const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
    const declinedBookings = bookings.filter((b) => b.status === "Declined").length;

    const stats = [
        { 
            icon: FaEye, 
            value: totalViews,
            label: "Total Views",
            color: "from-blue-500 to-blue-400",
            trend: "12.5%"
        },
        { 
            icon: FaCheckCircle, 
            value: approvedBookings,
            label: "Approved Bookings",
            color: "from-emerald-500 to-emerald-400",
            trend: "8.2%"
        },
        { 
            icon: FaClock, 
            value: pendingBookings,
            label: "Pending Bookings",
            color: "from-amber-500 to-amber-400",
            trend: "3.1%"
        },
        { 
            icon: FaTimesCircle, 
            value: declinedBookings,
            label: "Declined Bookings",
            color: "from-rose-500 to-rose-400",
            trend: "1.8%"
        }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <FaChartPie className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
                        <p className="text-sm text-gray-600">Key metrics and property insights</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {stats.map((stat, index) => (
                    <div key={index} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            {/* Icon Background */}
                            <div className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${stat.color} opacity-10 rounded-xl`} />
                            
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-sm`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            
                            {/* Trend Indicator */}
                            <div className="mt-4 flex items-center space-x-2">
                                <FiTrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-medium text-gray-600">
                                    {stat.trend} ↑
                                </span>
                                <span className="text-sm text-gray-400">last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}