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
import DepositRequestModal from "./modals/DepositRequestModal";

import { 
  subscribeToPropertiesBySeller, 
  softDeleteProperty, 
  sendDepositRequest,
  updateBlockedDates
} from "./service/PropertyService";
import { subscribeToBookings, updateBookingStatus } from "./service/BookingService";
import { subscribeToReviews } from "./service/ReviewService";

import { database } from "../../fireBaseConfig";

export default function SellerDash() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
    }
  }, [user, navigate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  // This is used for deposit requests; for toggling blocked dates, we'll pass propertyId separately.
  const [selectedProperty, setSelectedProperty] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Subscribe to seller properties.
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToPropertiesBySeller(user.uid, (fetchedProperties) => {
        console.log("Fetched properties:", fetchedProperties);
        setProperties(fetchedProperties);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Subscribe to bookings using BookingService.
  useEffect(() => {
    const unsubscribe = subscribeToBookings((allBookings) => {
      // Filter bookings to include only those whose productId is one of the seller's properties.
      const sellerProductIds = properties.map(p => p.id);
      const sellerBookings = allBookings.filter(b => sellerProductIds.includes(b.productId));
      console.log("Filtered seller bookings:", sellerBookings);
      setBookings(sellerBookings);
    });
    return () => unsubscribe();
  }, [properties]);

  // Subscribe to reviews.
  useEffect(() => {
    const unsubscribeReviews = subscribeToReviews((snapshot) => {
      const data = snapshot.val();
      let allReviews = [];
      if (data) {
        allReviews = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      }
      const propertyIds = properties.map(p => p.id);
      const filteredReviews = allReviews.filter(review => propertyIds.includes(review.productId));
      setReviews(filteredReviews);
    });
    return () => unsubscribeReviews();
  }, [properties]);

  const handleRemoveProperty = async (propertyId) => {
    await softDeleteProperty(propertyId);
  };

  // Deposit modal handlers.
  const openDepositModal = (property) => {
    setSelectedProperty(property);
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDepositRequest = async (message) => {
    if (!selectedProperty) return;
    try {
      await sendDepositRequest(selectedProperty.id, message);
      console.log(`Deposit request submitted for: ${selectedProperty.title}`);
    } catch (error) {
      console.error("Error submitting deposit request:", error);
    }
  };

  // Handle booking actions using BookingService.
  const handleBookingAction = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      console.log(`Booking ${bookingId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Toggle blocked date for a property.
  // This function receives propertyId and a date string.
  const handleToggleBlockedDate = async (propertyId, dateStr) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
      console.error("Property not found for id:", propertyId);
      return;
    }
    const currentBlocked = property.blockedDates || [];
    let newBlocked;
    if (currentBlocked.includes(dateStr)) {
      // Unblock the date.
      newBlocked = currentBlocked.filter(d => d !== dateStr);
      console.log(`Unblocking date ${dateStr}`);
    } else {
      // Block the date.
      newBlocked = [...currentBlocked, dateStr];
      console.log(`Blocking date ${dateStr}`);
    }
    try {
      await updateBlockedDates(propertyId, newBlocked);
      console.log(`Property ${propertyId} blockedDates updated:`, newBlocked);
      // Update local state.
      setProperties(prev =>
        prev.map(p => (p.id === propertyId ? { ...p, blockedDates: newBlocked } : p))
      );
    } catch (error) {
      console.error("Error updating blocked dates:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
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
            onAddProperty={() => {}}
            onEditProperty={() => {}}
            onRemoveProperty={handleRemoveProperty}
            onOpenDepositModal={openDepositModal}
          />
          <CalendarSection
            bookings={bookings}
            properties={properties}
            onToggleBlockedDate={handleToggleBlockedDate}
          />
          <BookingsSection
            bookings={bookings}
            properties={properties}
            onBookingAction={handleBookingAction}
          />
          <AnalyticsSection properties={properties} bookings={bookings} />
          <ReviewsSection reviews={reviews} properties={properties} />
        </main>
      </div>

      <DepositRequestModal
        isOpen={isDepositModalOpen}
        onClose={closeDepositModal}
        onSubmit={handleDepositRequest}
        propertyTitle={
          selectedProperty ? properties.find(p => p.id === selectedProperty)?.title : ""
        }
      />
    </div>
  );
}
