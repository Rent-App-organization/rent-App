// BookingDetailsModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";

const defaultBookingIcon = "https://via.placeholder.com/100?text=Booking";

export default function BookingDetailsModal({
  booking,
  onClose,    // closes everything
  onForward,  // proceed to guest step
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

  if (!booking) return null;

  // After user clicks arrow => run exit animation => then call onForward after 300ms
  const goForward = () => {
    setIsExiting(true);
    setTimeout(() => {
      onForward?.();
    }, 300);
  };

  // Close all
  const closeAll = () => {
    onClose?.();
  };

  // Fields
  const {
    id,
    guestName,
    status,
    checkInDate,
    checkOutDate,
    paymentStatus,
    totalAmount,
    specialRequests,
  } = booking;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`
          transform transition-all duration-300
          bg-white w-full max-w-md rounded-xl p-6 relative shadow-2xl
          ${isExiting ? "opacity-0 translate-x-8" : "opacity-0 scale-95"}
        `}
      >
        {/* X => close everything */}
        <button
          onClick={closeAll}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          title="Close Booking"
        >
          <FaTimes size={16} />
        </button>

        {/* Arrow => exit + then go forward */}
        <button
          onClick={goForward}
          className="absolute top-3 right-10 text-gray-500 hover:text-gray-700"
          title="View Guest Details"
        >
          <FaArrowRight size={16} />
        </button>

        {/* Booking Info */}
        <div className="flex flex-col items-center mt-6">
          <img
            src={defaultBookingIcon}
            alt="Booking Icon"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-sm mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">Booking #{id}</h2>
          <p className="text-sm text-gray-500">Booking Information</p>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 space-y-3 text-gray-700 leading-relaxed">
          <p><strong>Guest Name:</strong> {guestName}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Check-In:</strong> {checkInDate}</p>
          <p><strong>Check-Out:</strong> {checkOutDate}</p>
          <p><strong>Payment:</strong> {paymentStatus}</p>
          <p><strong>Total:</strong> {totalAmount}</p>
          <p><strong>Requests:</strong> {specialRequests}</p>
        </div>
      </div>
    </div>
  );
}
