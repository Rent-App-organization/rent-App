import React, { useState, useEffect } from "react";
import BookingDetailsModal from "../modals/BookingDetailsModal";
import GuestDetailsModal from "../modals/GuestDetailsModal";

// Replace this with your real data-fetching logic (e.g., using Firebase onValue)
export default function BookingGuestContainer({ bookingId }) {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);

  useEffect(() => {
    // Simulated data fetch: Replace with your actual Firebase subscription
    setTimeout(() => {
      // For example, your real data from Firebase might be:
      const fetchedData = {
        id: bookingId,
        fullName: "takrezzzzzzzzzffffffffffffffffff",
        guestEmail: "alice@example.com",
        phoneNumber: "0798837302",
        status: "approved",
        startDate: "2025-02-14",
        endDate: "2025-02-27",
        numGuests: "10",
        // Add any additional fields as needed
      };
      setBookingData(fetchedData);
      setLoading(false);
    }, 1000);
  }, [bookingId]);

  const openGuestModal = () => {
    setShowBookingModal(false);
    setShowGuestModal(true);
  };

  const closeAll = () => {
    setShowBookingModal(false);
    setShowGuestModal(false);
  };

  const closeGuest = () => {
    setShowGuestModal(false);
  };

  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (!bookingData) return <div>No booking found.</div>;

  return (
    <>
      {showBookingModal && bookingData && (
        <BookingDetailsModal
          booking={bookingData}
          onExitComplete={openGuestModal}
          onClose={closeAll}
        />
      )}
      {showGuestModal && bookingData && (
        <GuestDetailsModal
          guest={{
            name: bookingData.fullName,
            email: bookingData.guestEmail,
            phone: bookingData.phoneNumber,
            avatar: bookingData.guestAvatar,
          }}
          onClose={closeGuest}
          onCloseAll={closeAll}
        />
      )}
    </>
  );
}
