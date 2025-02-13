// GuestDetailsModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";

const defaultAvatar = "https://via.placeholder.com/100?text=Guest+Avatar";

export default function GuestDetailsModal({
  guest,
  onCloseAll, // closes everything
  onBack,      // go back to booking
}) {
  const [isExiting, setIsExiting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Animate the modal in on mount
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  if (!guest) return null;

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      onBack?.();
    }, 300);
  };

  const handleCloseAll = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCloseAll?.();
    }, 300);
  };

  const { name, email, phone } = guest;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          bg-gradient-to-br from-white to-indigo-50
          w-full max-w-md
          rounded-2xl p-8 relative
          border border-indigo-100 shadow-2xl
          ${isExiting ? "opacity-0 -translate-x-8 rotate-6" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Top-left: Back Arrow */}
        <button
          onClick={handleBack}
          className="
            absolute top-4 left-4
            p-2
            text-indigo-500
            hover:text-indigo-700
            hover:scale-110 active:scale-95
            transition-transform
          "
          title="Back to Booking"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Top-right: Close (X) */}
        <button
          onClick={handleCloseAll}
          className="
            absolute top-4 right-4
            p-2
            text-gray-400
            hover:text-gray-600
            hover:scale-110 active:scale-95
            transition-transform
          "
          title="Close"
        >
          <FaTimes size={20} />
        </button>

        {/* Avatar & Title */}
        <div className="flex flex-col items-center mt-2">
          <img
            src={defaultAvatar}
            alt="Guest Avatar"
            className="
              w-24 h-24
              rounded-full
              border-4 border-indigo-200
              shadow-lg
              mb-3
              hover:rotate-3 hover:scale-105
              transition-all duration-300
            "
          />
          <h2 className="text-2xl font-extrabold text-gray-800">
            {name || "Unknown"}
          </h2>
          <p className="text-sm text-gray-500">Guest Profile</p>
        </div>

        {/* Guest Info */}
        <div className="mt-6 space-y-3 text-gray-700">
          <div className="bg-white/80 rounded-lg shadow-sm p-3">
            <p className="text-sm font-semibold text-gray-600">Email</p>
            <p className="text-sm">
              {email || <span className="text-gray-400">Not provided</span>}
            </p>
          </div>

          <div className="bg-white/80 rounded-lg shadow-sm p-3">
            <p className="text-sm font-semibold text-gray-600">Phone</p>
            <p className="text-sm">
              {phone || <span className="text-gray-400">Not provided</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
