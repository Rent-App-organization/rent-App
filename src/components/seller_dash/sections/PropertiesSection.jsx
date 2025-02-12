import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import PropertyModal from "../modals/PropertyModal";

export default function PropertiesSection({
  properties,
  onAddProperty,
  onEditProperty,
  onRemoveProperty,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Open modal for new or existing property
  const openModal = (prop = null) => {
    setEditingProperty(prop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  // Handle save (new or existing)
  const handleSave = (formData) => {
    if (editingProperty) {
      onEditProperty(editingProperty.id, formData);
    } else {
      onAddProperty(formData);
    }
    closeModal();
  };

  return (
    <section className="bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Property Management
        </h2>
        <button
          className="inline-flex items-center px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md"
          onClick={() => openModal()}
        >
          <FaPlus className="mr-2" />
          Add Property
        </button>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((property) => {
            const hasPhotos = property.photos && property.photos.length > 0;
            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                {/* Top Image */}
                {hasPhotos ? (
                  <img
                    src={property.photos[0]}
                    alt={property.title || "Property"}
                    className="w-full h-48 sm:h-56 md:h-60 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 md:h-60 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm sm:text-md text-gray-600 mb-3 line-clamp-1">
                      {property.location || "No location"}
                    </p>
                    <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Price:</strong>{" "}
                        {property.price ? `$${property.price}` : "N/A"}
                      </p>
                      <p>
                        <strong>Images:</strong>{" "}
                        {hasPhotos
                          ? `${property.photos.length} images`
                          : "No images"}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-end mt-4 space-x-3">
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      onClick={() => openModal(property)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                      onClick={() => onRemoveProperty(property.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No properties found. Click "Add Property" to create one.
        </p>
      )}

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <PropertyModal
          property={editingProperty} // or null for new
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
