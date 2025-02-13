// BookingDetailsModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowRight, FaWallet, FaCalendarAlt, FaUser } from "react-icons/fa";

const defaultBookingIcon = "https://via.placeholder.com/100?text=📅";

export default function BookingDetailsModal({
  booking,
  onClose,
  onForward,
}) {
  const [isExiting, setIsExiting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  if (!booking) return null;

  const goForward = () => {
    setIsExiting(true);
    setTimeout(() => onForward?.(), 300);
  };

  const closeAll = () => onClose?.();

  const statusColor = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  }[booking.status.toLowerCase()] || "bg-gray-100 text-gray-800";

  const paymentColor = booking.paymentStatus === 'paid' 
    ? "bg-green-100 text-green-800" 
    : "bg-red-100 text-red-800";

  return (
    <div className="fixed inset-0 z-[9998]-A flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
          bg-gradient-to-br from-white to-indigo-50 w-full max-w-md rounded-2xl p-8 relative 
          shadow-2xl border border-indigo-100
          ${isExiting ? "opacity-0 translate-x-8 rotate-3" : "opacity-0 translate-y-4"}
        `}
      >
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            onClick={goForward}
            className="p-2 text-indigo-500 hover:text-indigo-700 transition-all 
                      hover:scale-110 active:scale-95"
          >
            <FaArrowRight size={20} />
          </button>
          <button
            onClick={closeAll}
            className="p-2 text-gray-400 hover:text-gray-600 transition-all 
                      hover:scale-110 active:scale-95"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <img
              src={defaultBookingIcon}
              alt="Booking"
              className="w-28 h-28 rounded-2xl border-4 border-indigo-200 shadow-lg
                       hover:rotate-3 transition-transform duration-300"
            />
            <div className={`absolute -bottom-2 right-0 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {booking.status}
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Booking #{booking.id}</h2>
        </div>

        <div className="mt-8 space-y-4 text-gray-700">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <FaUser className="flex-shrink-0 text-indigo-500" />
            <span className="font-medium">{booking.guestName}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <FaCalendarAlt className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-medium">{booking.checkInDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <FaCalendarAlt className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-medium">{booking.checkOutDate}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <FaWallet className="text-indigo-500" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{booking.totalAmount}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${paymentColor}`}>
                  {booking.paymentStatus}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Total amount</p>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-1">Special Requests</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {booking.specialRequests}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

