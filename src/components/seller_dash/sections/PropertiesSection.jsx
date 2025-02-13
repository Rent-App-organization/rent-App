import React, { useState, useMemo } from "react";
import { 
  FaPlus, 
  FaRegImage, 
  FaRegFolderOpen, 
  FaEdit, 
  FaTrash 
} from "react-icons/fa";
import PropertyModal from "../modals/PropertyModal";
import RejectedPropertyCard from "../containers/RejectedPropertyCard"; // Adjust path as needed

export default function PropertiesSection({
  properties,
  onAddProperty,
  onEditProperty,
  onRemoveProperty,
  onOpenDepositModal, // Received from SellerDash.jsx
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Memoize filtered properties by status.
  const [approvedProperties, pendingProperties, rejectedProperties] = useMemo(
    () => [
      properties.filter((p) => p.status?.toLowerCase() === "approved"),
      properties.filter((p) => p.status?.toLowerCase() === "pending"),
      properties.filter((p) => p.status?.toLowerCase() === "rejected"),
    ],
    [properties]
  );

  const openModal = (prop = null) => {
    setEditingProperty(prop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSave = (formData) => {
    if (editingProperty) {
      onEditProperty(editingProperty.id, formData);
    } else {
      onAddProperty(formData);
    }
    closeModal();
  };

  // Unique design for Approved and Pending properties.
  const UniquePropertyCard = ({ property }) => {
    const hasPhotos = property.photos && property.photos.length > 0;
    const imageUrl = hasPhotos ? property.photos[0] : null;
    return (
      <div className="relative group rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
        {/* Background Image or Fallback */}
        {hasPhotos ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="h-64 w-full object-cover"
          />
        ) : (
          <div className="h-64 w-full bg-gray-100 flex items-center justify-center">
            <FaRegImage className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

        {/* Property Details */}
        <div className="absolute bottom-0 p-4">
          <h3 className="text-xl font-bold text-white">
            {property.title || "Untitled Property"}
          </h3>
          <p className="text-sm text-gray-200">
            {property.location || "No location specified"}
          </p>
          <div className="mt-2 flex items-center space-x-4 text-sm text-white">
            <span>
              <span className="font-medium">Price:</span>{" "}
              {property.price
                ? `$${Number(property.price).toLocaleString()}`
                : "N/A"}
            </span>
            <span>
              {hasPhotos ? `${property.photos.length} photos` : "No photos"}
            </span>
          </div>
        </div>

        {/* Action Buttons (appear on hover) */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openModal(property)}
            className="bg-white p-2 rounded-full text-indigo-600 hover:bg-indigo-100"
            title="Edit property"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onRemoveProperty(property.id)}
            className="bg-white p-2 rounded-full text-red-600 hover:bg-red-100"
            title="Delete property"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // StatusSection renders a heading and a grid of property cards.
  const StatusSection = ({ title, count, color, properties, isRejected }) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-2xl font-bold ${color}`}>{title}</h3>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-700">
          {count} properties
        </span>
      </div>
      {count > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((prop) =>
            isRejected ? (
              <RejectedPropertyCard
                key={prop.id}
                property={prop}
                onEdit={openModal}
                onRemove={onRemoveProperty}
                onOpenDepositModal={onOpenDepositModal} // Pass the function
              />
            ) : (
              <UniquePropertyCard key={prop.id} property={prop} />
            )
          )}
        </div>
      ) : (
        <div className="py-8 text-center rounded-xl bg-gray-50">
          <FaRegFolderOpen className="mx-auto text-3xl text-gray-300 mb-3" />
          <p className="text-gray-400">No properties found</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 sm:px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Property Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your property listings and statuses
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <FaPlus className="w-4 h-4" />
            Add Property
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8">
        <StatusSection
          title="Approved Properties"
          color="text-green-600"
          count={approvedProperties.length}
          properties={approvedProperties}
        />
        <StatusSection
          title="Pending Approval"
          color="text-amber-600"
          count={pendingProperties.length}
          properties={pendingProperties}
        />
        <StatusSection
          title="Rejected Properties"
          color="text-red-600"
          count={rejectedProperties.length}
          properties={rejectedProperties}
          isRejected
        />
      </div>

      {/* Property Modal for Add/Edit */}
      {isModalOpen && (
        <PropertyModal
          property={editingProperty}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
