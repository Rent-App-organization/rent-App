import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import PropertyModal from "../modals/PropertyModal";

// A fallback image if the property has no images
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x250.png?text=No+Image";

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
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Property Management
        </h2>
        <button
          className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          onClick={() => openModal()}
        >
          <FaPlus className="mr-2" />
          Add Property
        </button>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((property) => {
            // We'll show the first image, or a placeholder if none
            const hasImages = property.images && property.images.length > 0;
            const thumbnail = hasImages
              ? property.images[0]
              : PLACEHOLDER_IMAGE;

            return (
              <div
                key={property.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Top Image */}
                <img
                  src={thumbnail}
                  alt={property.title || "Property"}
                  className="w-full h-44 object-cover"
                />

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {property.location || "No location"}
                    </p>

                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Price:</strong>{" "}
                        {property.price ? `$${property.price}` : "N/A"}
                      </p>
                      <p>
                        <strong>Images:</strong>{" "}
                        {hasImages
                          ? `${property.images.length} images`
                          : "No images"}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-end mt-3 space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      onClick={() => openModal(property)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
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
        <p className="text-center text-gray-500 mt-6">
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
