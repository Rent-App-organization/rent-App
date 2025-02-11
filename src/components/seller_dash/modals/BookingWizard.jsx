import React, { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import GuestDetailsModal from "./GuestDetailsModal";

export default function BookingWizard({ booking, onCloseAll }) {
  const [step, setStep] = useState("booking"); // or "guest"

  if (!booking) return null;

  // Move from booking => guest
  const handleBookingForward = () => {
    setStep("guest");
  };

  // Move from guest => booking
  const handleGuestBack = () => {
    setStep("booking");
  };

  // Close entire wizard
  const handleCloseAll = () => {
    // optionally setStep("") here if you want
    // but the parent will unmount us anyway
    onCloseAll?.();
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
          guest={{
            name: booking.guestName || "Unknown",
            email: "test@example.com",
            phone: "+1 555 555 1234",
          }}
          onCloseAll={handleCloseAll}
          onBack={handleGuestBack}
        />
      )}
    </>
  );
}
