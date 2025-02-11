import React, { useState } from "react";
import PropertiesSection from "./PropertiesSection";
import CalendarSection from "./CalendarSection";
import BookingsSection from "./BookingsSection";
import AnalyticsSection from "./AnalyticsSection";
import NavBar from "../navBar/NavBar";
import { FaBars } from "react-icons/fa";

export default function SellerDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // test data
  const [properties, setProperties] = useState([
    { id: 1, title: "Beach House", location: "Malibu, CA", views: 123 },
    { id: 2, title: "City Loft", location: "New York, NY", views: 88 },
  ]);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* =====================
   * Handlers for CRUD on properties
   * ===================== */
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

  /* =====================
   * Handlers for Bookings
   * ===================== */
  const handleBookingAction = (bookingId, action) => {
    // action: "Approved" or "Declined"
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
          {/* Property Management */}
          <PropertiesSection
            properties={properties}
            onAddProperty={handleAddProperty}
            onEditProperty={handleEditProperty}
            onRemoveProperty={handleRemoveProperty}
          />

          {/* Availability Calendar */}
          <CalendarSection />

          {/* Booking Management */}
          <BookingsSection
            bookings={bookings}
            properties={properties}
            onBookingAction={handleBookingAction}
          />

          {/* Analytics */}
          <AnalyticsSection properties={properties} bookings={bookings} />
        </main>
      </div>
    </div>
  );
}
