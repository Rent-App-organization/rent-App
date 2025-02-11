import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import PropertyModal from "./PropertyModal";

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
    <section
      id="properties"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Property Management
        </h2>
        <button
          className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => openModal()}
        >
          <FaPlus className="mr-2" />
          Add Property
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Title
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Location
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Price
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-600">
                Images
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-indigo-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{property.title}</td>
                <td className="px-4 py-3">{property.location}</td>
                <td className="px-4 py-3">{property.price || "N/A"}</td>
                <td className="px-4 py-3">
                  {property.images && property.images.length > 0
                    ? `${property.images.length} images`
                    : "No images"}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => openModal(property)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => onRemoveProperty(property.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                  No properties found. Click "Add Property" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
