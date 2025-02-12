// SellerDash.jsx
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import NavBar from "../navBar/NavBar";

import PropertiesSection from "./sections/PropertiesSection";
import CalendarSection from "./sections/CalendarSection";
import BookingsSection from "./sections/BookingsSection";
import AnalyticsSection from "./sections/AnalyticsSection";

// 1) Import the new ReviewsSection
import ReviewsSection from "./sections/ReviewsSection";

export default function SellerDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dummy data for properties
  const [properties, setProperties] = useState([
    { id: 1, title: "Beach House", location: "Malibu, CA", views: 123 },
    { id: 2, title: "City Loft", location: "New York, NY", views: 88 },
  ]);

  // Dummy data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 101,
      propertyId: 1,
      guestName: "Alice Smith",
      status: "Pending",
    },
    {
      id: 102,
      propertyId: 2,
      guestName: "Bob Johnson",
      status: "Pending",
    },
  ]);

  // 2) Dummy reviews array
  const [reviews] = useState([
    {
      id: 1,
      reviewerName: "Alice",
      rate: 4,
      comment: "Lovely place, would visit again!",
    },
    {
      id: 2,
      reviewerName: "Charlie",
      rate: 5,
      comment: "Absolutely perfect stay. Highly recommended!",
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // CRUD handlers for properties
  const handleAddProperty = (newProp) => {
    setProperties((prev) => [...prev, { ...newProp, id: Date.now() }]);
  };
  const handleEditProperty = (id, updatedProp) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...updatedProp } : prop))
    );
  };
  const handleRemoveProperty = (id) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  // Bookings
  const handleBookingAction = (bookingId, action) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: action } : b
      )
    );
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Toggle button for mobile */}
      <button
        className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <PropertiesSection
            properties={properties}
            onAddProperty={handleAddProperty}
            onEditProperty={handleEditProperty}
            onRemoveProperty={handleRemoveProperty}
          />

          <CalendarSection />

          <BookingsSection
            bookings={bookings}
            properties={properties}
            onBookingAction={handleBookingAction}
          />

          <AnalyticsSection properties={properties} bookings={bookings} />

          {/* 3) Insert the new ReviewsSection here */}
          <ReviewsSection reviews={reviews} />
        </main>
      </div>
    </div>
  );
}
