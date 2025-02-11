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
    // fade/scale in on mount
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "scale-95");
      modalRef.current.classList.add("opacity-100", "scale-100");
    }
  }, []);

  if (!guest) return null;

  // Called when user clicks the back arrow
  const goBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      onBack?.();
    }, 300);
  };

  // Close everything
  const closeAll = () => {
    onCloseAll?.();
  };

  const { name, email, phone } = guest;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300
          bg-white w-full max-w-md rounded-xl p-6 relative shadow-2xl
          ${isExiting ? "opacity-0 -translate-x-8" : "opacity-0 scale-95"}
        `}
      >
        {/* Arrow => exit => back to booking */}
        <button
          onClick={goBack}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
          title="Back to Booking"
        >
          <FaArrowLeft size={16} />
        </button>

        {/* X => close all */}
        <button
          onClick={closeAll}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          title="Close"
        >
          <FaTimes size={16} />
        </button>

        <div className="flex flex-col items-center mt-6">
          <img
            src={defaultAvatar}
            alt="Guest Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-sm mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {name || "Unknown"}
          </h2>
          <p className="text-sm text-gray-500">Guest Profile</p>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 space-y-3 text-gray-700 leading-relaxed">
          <p>
            <strong>Email:</strong> {email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
