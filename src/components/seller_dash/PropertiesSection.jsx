import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function PropertiesSection({
    properties,
    onAddProperty,
    onEditProperty,
    onRemoveProperty,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
    });

    // Open modal for new or existing property
    const openModal = (prop = null) => {
        setEditingProperty(prop);
        setFormData(prop || { title: "", location: "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProperty(null);
        setFormData({ title: "", location: "" });
    };

    // Handle save
    const handleSave = (e) => {
        e.preventDefault();
        if (editingProperty) {
            onEditProperty(editingProperty.id, formData);
        } else {
            onAddProperty(formData);
        }
        closeModal();
    };

    return (
        <section id="properties" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
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
                            <th className="px-4 py-3 text-sm font-semibold text-indigo-600">Title</th>
                            <th className="px-4 py-3 text-sm font-semibold text-indigo-600">Location</th>
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
                                <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                                    No properties found. Click "Add Property" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded p-5 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingProperty ? "Edit Property" : "Add Property"}
                        </h3>
                        <form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded py-2 px-3"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded py-2 px-3"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                                    onClick={closeModal}
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
            )}
        </section>
    );
}
