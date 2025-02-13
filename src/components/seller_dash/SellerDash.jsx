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

import { subscribeToPropertiesBySeller, softDeleteProperty, sendDepositRequest } from "./service/PropertyService"; 
import { subscribeToReviews } from "./service/ReviewService";

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
  const [selectedProperty, setSelectedProperty] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToPropertiesBySeller(user.uid, (fetchedProperties) => {
        setProperties(fetchedProperties);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribeReviews = subscribeToReviews((snapshot) => {
      const data = snapshot.val();
      let allReviews = [];
      if (data) {
        allReviews = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
      const propertyIds = properties.map((p) => p.id);
      const filteredReviews = allReviews.filter((review) =>
        propertyIds.includes(review.productId)
      );
      setReviews(filteredReviews);
    });
    return () => unsubscribeReviews();
  }, [properties]);

  const handleRemoveProperty = async (propertyId) => {
    await softDeleteProperty(propertyId);
  };

  // Global function to open the deposit modal
  const openDepositModal = (property) => {
    setSelectedProperty(property);
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setSelectedProperty(null);
  };

  // Updated: Use sendDepositRequest from PropertyService.js
  const handleDepositRequest = async (message) => {
    if (!selectedProperty) return;
    try {
      await sendDepositRequest(selectedProperty.id, message);
      console.log(`Deposit request submitted for: ${selectedProperty.title}`);
    } catch (error) {
      console.error("Error submitting deposit request:", error);
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
            onOpenDepositModal={openDepositModal} // Open the deposit modal
          />
          <CalendarSection />
          <BookingsSection bookings={bookings} properties={properties} />
          <AnalyticsSection properties={properties} bookings={bookings} />
          <ReviewsSection reviews={reviews} properties={properties} />
        </main>
      </div>

      <DepositRequestModal
        isOpen={isDepositModalOpen}
        onClose={closeDepositModal}
        onSubmit={handleDepositRequest}
        propertyTitle={selectedProperty ? selectedProperty.title : ""}
      />
    </div>
  );
}
