import React, { useEffect, useState, useRef } from "react";

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
    // Animate modal in
    if (modalRef.current) {
      modalRef.current.classList.remove("opacity-0", "scale-95");
      modalRef.current.classList.add("opacity-100", "scale-100");
    }
  }, []);

  // If editing existing property, fill the form
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

  // Handle "Add" or "Save"
  const handleSubmit = (e) => {
    e.preventDefault();
    // Return the formData to the parent
    onSave(formData);
  };

  // Example method for adding an image (by URL)
  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  // Removing an image from the array
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="transform transition-all duration-300 opacity-0 scale-95
                   bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-2xl"
      >
        {/* Close button top-right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          title="Close"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {property ? "Edit Property" : "Add Property"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded py-2 px-3"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded py-2 px-3"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded py-2 px-3"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="(Optional)"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded py-2 px-3"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="(Optional) Describe the property..."
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="mb-2">
              <button
                type="button"
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                onClick={handleAddImage}
              >
                Add Image
              </button>
            </div>
            {formData.images && formData.images.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {formData.images.map((url, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-sm text-gray-700">{url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No images added yet.</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
