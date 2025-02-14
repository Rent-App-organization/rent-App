import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";

const defaultAvatar = "https://via.placeholder.com/100?text=Guest+Avatar";

export default function GuestDetailsModal({ guest, onCloseAll, onBack }) {
  const [isExiting, setIsExiting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  if (!guest) return null;

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => onBack?.(), 300);
  };

  const handleCloseAll = () => {
    setIsExiting(true);
    setTimeout(() => onCloseAll?.(), 300);
  };

  const { name, email, phone, avatar } = guest;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          bg-white w-full max-w-md rounded-2xl p-6 relative
          border border-gray-200 shadow-2xl
          ${isExiting ? "opacity-0 -translate-x-8 rotate-6" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all"
            title="Back to Booking"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={handleCloseAll}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={avatar || defaultAvatar}
              alt="Guest Avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-100/50 pointer-events-none" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {name || "Guest Profile"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Registered Guest</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaEnvelope className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-900 break-all">{email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaPhone className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-900">{phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}