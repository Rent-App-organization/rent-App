import React from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";

export default function LandlordHeader({ toggleSidebar }) {
    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="sm:hidden" onClick={toggleSidebar}>
                    <FaBars className="w-5 h-5 text-indigo-600" />
                </button>
                <h2 className="text-lg font-bold text-gray-700">Landlord Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-gray-600">Hello, Landlord!</div>
                <FaUserCircle className="w-7 h-7 text-gray-400" />
            </div>
        </header>
    );
}
