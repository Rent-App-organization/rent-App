//https://random.imagecdn.app/500/150
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../navBar/NavBar";
import PropertiesSection from "./sections/PropertiesSection";
import CalendarSection from "./sections/CalendarSection";
import BookingsSection from "./sections/BookingsSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import ReviewsSection from "./sections/ReviewsSection";

// Import the property service function.
import { subscribeToPropertiesBySeller } from "./service/PropertyService";

export default function SellerDash() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Redirect if no user or if user role is not "seller"
  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
    }
  }, [user, navigate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]); // Dummy or fetched as needed
  const [reviews, setReviews] = useState([]);     // Dummy or fetched as needed

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Subscribe to properties where seller equals the current user's UID.
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToPropertiesBySeller(user.uid, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedProperties = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((prop) => !prop.deleted); // Exclude soft-deleted properties.
          setProperties(fetchedProperties);
        } else {
          setProperties([]);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  // For add property, we now rely solely on the subscription.
  // Hence, we pass an empty function for onAddProperty.
  const handleEditProperty = (id, updatedProp) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...updatedProp } : prop))
    );
  };

  const handleRemoveProperty = (id) => {
    // The removal is handled via soft-delete in Firebase,
    // so the subscription will update the state automatically.
    // We can also update local state if needed.
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  // Dummy bookings handler
  const handleBookingAction = (bookingId, action) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: action } : b))
    );
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      <button
        className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <PropertiesSection
            properties={properties}
            onAddProperty={() => {}} // rely solely on Firebase subscription
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

          <ReviewsSection reviews={reviews} />
        </main>
      </div>
    </div>
  );
}
