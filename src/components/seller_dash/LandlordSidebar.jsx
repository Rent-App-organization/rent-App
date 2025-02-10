import React from "react";
import { FaHome, FaCalendarAlt, FaClipboardList, FaChartPie } from "react-icons/fa";

export default function LandlordSidebar({ isOpen, toggleSidebar }) {
    return (
        <aside
            className={`
        absolute top-0 left-0
        sm:sticky sm:top-0
        w-64
        h-screen sm:h-auto
        bg-gradient-to-b from-indigo-600 to-indigo-700
        text-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
        >
            <div className="p-4 border-b border-indigo-500 flex items-center justify-between sm:block">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-white rounded-lg">
                        <FaHome className="text-indigo-600 text-xl" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">LandlordPortal</h1>
                </div>
                {/* Close button on mobile */}
                <button
                    className="text-white text-2xl sm:hidden focus:outline-none"
                    onClick={toggleSidebar}
                >
                    &times;
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 overflow-y-auto">
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#properties"
                            className="flex items-center px-4 py-2 rounded hover:bg-indigo-500/40 transition-colors"
                            onClick={toggleSidebar}
                        >
                            <FaHome className="mr-3" />
                            Properties
                        </a>
                    </li>
                    <li>
                        <a
                            href="#calendar"
                            className="flex items-center px-4 py-2 rounded hover:bg-indigo-500/40 transition-colors"
                            onClick={toggleSidebar}
                        >
                            <FaCalendarAlt className="mr-3" />
                            Calendar
                        </a>
                    </li>
                    <li>
                        <a
                            href="#bookings"
                            className="flex items-center px-4 py-2 rounded hover:bg-indigo-500/40 transition-colors"
                            onClick={toggleSidebar}
                        >
                            <FaClipboardList className="mr-3" />
                            Bookings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#analytics"
                            className="flex items-center px-4 py-2 rounded hover:bg-indigo-500/40 transition-colors"
                            onClick={toggleSidebar}
                        >
                            <FaChartPie className="mr-3" />
                            Analytics
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="mt-auto p-4 border-t border-indigo-500 text-center">
                <p className="text-sm text-indigo-200">© 2025 Rental Inc.</p>
            </div>
        </aside>
    );
}
