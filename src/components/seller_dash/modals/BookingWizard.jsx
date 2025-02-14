import React, { useState } from "react";
import BookingDetailsModal from "../modals/BookingDetailsModal";
import GuestDetailsModal from "../modals/GuestDetailsModal";

export default function BookingWizard({ booking, onCloseAll }) {
  const [step, setStep] = useState("booking");

  if (!booking) return null;

  const handleBookingForward = () => setStep("guest");
  const handleGuestBack = () => setStep("booking");
  const handleCloseAll = () => onCloseAll?.();

  // Build guest data using booking fields
  const guestData = {
    name: booking.fullName || "",
    email: booking.guestEmail || "", // If available
    phone: booking.phoneNumber || "",
    avatar: booking.guestAvatar || "",
  };

  return (
    <>
      {step === "booking" && (
        <BookingDetailsModal
          booking={booking}
          onClose={handleCloseAll}
          onForward={handleBookingForward}
        />
      )}
      {step === "guest" && (
        <GuestDetailsModal
          guest={guestData}
          onCloseAll={handleCloseAll}
          onBack={handleGuestBack}
        />
      )}
    </>
  );
}
