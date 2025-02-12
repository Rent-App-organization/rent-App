import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { FaTimes, FaImage, FaMapMarkerAlt, FaDollarSign, FaHome, FaEdit } from "react-icons/fa";

const defaultBookingIcon = "https://random.imagecdn.app/500/150";
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

export default function PropertyModal({ property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    images: [],
    description: "",
    lat: null,
    lng: null,
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
        lat: property.lat || null,
        lng: property.lng || null,
      });
    }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  const center = formData.lat && formData.lng
    ? { lat: formData.lat, lng: formData.lng }
    : { lat: 40.7128, lng: -74.006 };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-gray-900/70 backdrop-blur-lg">
      <div
        ref={modalRef}
        className="transform transition-all duration-500 ease-out opacity-0 translate-y-8
                   bg-gradient-to-br from-white to-indigo-50 w-full max-w-2xl rounded-2xl p-8 relative 
                   shadow-2xl border border-indigo-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-700 
                     transition-all hover:scale-110"
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
              className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2
                         focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Luxury Beach Villa..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2
                         focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="123 Ocean Drive, Malibu..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2
                         focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter price (optional)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaEdit className="text-indigo-600" />
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-indigo-100 rounded-lg focus:ring-2
                         focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={4}
              placeholder="Describe your property's best features..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                           hover:bg-indigo-700 transition-all hover:shadow-md"
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
                    className="w-full h-32 object-cover rounded-lg shadow-sm transition-transform
                             group-hover:scale-105"
                    onError={(e) => (e.target.src = defaultBookingIcon)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity"
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

          {/* Map Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline-block text-indigo-600 mr-1" />
              Select Property Location on Map (optional)
            </label>
            <div className="overflow-hidden rounded border border-indigo-100 shadow-sm">
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={formData.lat && formData.lng ? 14 : 2}
                  onClick={handleMapClick}
                >
                  {formData.lat && formData.lng && (
                    <Marker 
                      position={{ lat: formData.lat, lng: formData.lng }} 
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        scaledSize: new window.google.maps.Size(40, 40),
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
            {formData.lat && formData.lng && (
              <div className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm">
                Selected Coordinates: ({formData.lat.toFixed(5)}, {formData.lng.toFixed(5)})
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200
                         transition-all hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                         transition-all hover:shadow-md flex items-center gap-2"
            >
              <FaEdit className="w-5 h-5" />
              {property ? "Update Property" : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
