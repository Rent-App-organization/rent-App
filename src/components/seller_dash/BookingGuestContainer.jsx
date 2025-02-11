import React, { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import GuestDetailsModal from "./GuestDetailsModal";

// Example data
const bookingData = {
  id: 123,
  guestName: "Alice Anderson",
  status: "Pending",
  checkInDate: "2025-05-10",
  checkOutDate: "2025-05-14",
  paymentStatus: "Not Paid",
  totalAmount: "$950",
  specialRequests: "Need extra blankets",
};

export default function BookingGuestContainer() {
  const [showBookingModal, setShowBookingModal] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // When user clicks arrow in booking => animate exit, then open guest
  const handleGoToGuest = () => {
    // We'll handle the exit inside the booking modal's code
    // so from here, we just call a function inside Booking that triggers the exit
  };

  // Called by booking modal when exit finishes
  const openGuestModal = () => {
    // Hide booking
    setShowBookingModal(false);
    // Show guest
    setShowGuestModal(true);
  };

  // If user closes everything
  const closeAll = () => {
    setShowGuestModal(false);
    setShowBookingModal(false);
  };

  // If user closes just the guest
  const closeGuest = () => {
    setShowGuestModal(false);
    // Optionally re-show booking if you want
    // Or keep everything closed
  };

  return (
    <>
      {/* If showBookingModal, render it */}
      {showBookingModal && (
        <BookingDetailsModal
          booking={bookingData}
          onExitComplete={openGuestModal} // after exit animation, open guest
          onClose={closeAll}              // close everything
        />
      )}

      {/* If showGuestModal, render it */}
      {showGuestModal && (
        <GuestDetailsModal
          guest={{ 
            name: bookingData.guestName, 
            email: "test@example.com", 
            phone: "+1 555 555 1234" 
          }}
          onClose={closeGuest}    // close just guest
          onCloseAll={closeAll}   // close everything
        />
      )}
    </>
  );
}
