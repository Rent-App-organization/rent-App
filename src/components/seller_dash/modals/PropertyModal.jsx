import React, { useEffect, useRef, useState } from "react";
import {
  FaTimes,
  FaImage,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHome,
  FaEdit,
} from "react-icons/fa";

// Import the Firebase realtime database functions and your configured database.
import { ref, push, set, update } from "firebase/database";

import { database } from "../../../fireBaseConfig"; // Adjust the import path as needed

const defaultBookingIcon = "https://random.imagecdn.app/500/150";

export default function PropertyModal({ property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    images: [],
    description: "",
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "translate-y-8");
      modalRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        location: property.location || "",
        price: property.price || "",
        images: property.images || [],
        description: property.description || "",
      });
    }
  }, [property]);

  // Updated handleSubmit uses Firebase Realtime Database to add or update the property.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (property && property.id) {
        // Update the existing property record.
        await update(ref(database, `properties/${property.id}`), formData);
      } else {
        // Create a new property record and add a default status of "pending".
        const newPropertyRef = push(ref(database, "products"));
        await set(newPropertyRef, { ...formData, status: "pending" });
      }
      // Optionally, call onSave to update any local state in a parent component.
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving property:", error);
      // Optionally, add user feedback for errors here.
    }
  };

  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-lg overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          ref={modalRef}
          className="transform transition-all duration-500 ease-out opacity-0 translate-y-8
                     bg-gradient-to-br from-white to-indigo-50 w-full max-w-2xl rounded-2xl p-8 relative 
                     shadow-2xl border border-indigo-100 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-700 transition-all hover:scale-110"
            title="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <FaEdit className="text-indigo-600 w-7 h-7" />
            <h3 className="text-2xl font-bold text-gray-800">
              {property ? "Edit Property" : "Create New Property"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaHome className="text-indigo-600" />
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Luxury Beach Villa..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Location Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-indigo-600" />
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="123 Ocean Drive, Malibu..."
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            {/* Price Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaDollarSign className="text-indigo-600" />
                Price per Night
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter price (optional)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            {/* Description Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaEdit className="text-indigo-600" />
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                rows={4}
                placeholder="Describe your property's best features..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Images Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaImage className="text-indigo-600" />
                  Property Images
                </label>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-md"
                >
                  <FaImage className="w-4 h-4" />
                  Add Image
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-sm transition-transform group-hover:scale-105"
                      onError={(e) => (e.target.src = defaultBookingIcon)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.images.length === 0 && (
                  <div className="col-span-3 py-6 text-center text-gray-400">
                    No images added yet
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-md flex items-center gap-2"
              >
                <FaEdit className="w-5 h-5" />
                {property ? "Update Property" : "Create Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
