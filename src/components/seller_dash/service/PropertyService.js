// PropertyService.js
import {
  ref,
  push,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import { database } from "../../../fireBaseConfig"; // Adjust the path as needed

/**
 * Creates a new property record.
 * @param {Object} data - The property data to save.
 * @returns {Promise} - A promise that resolves when the property is created.
 */
export async function createProperty(data) {
  const newPropertyRef = push(ref(database, "products"));
  return set(newPropertyRef, { ...data, status: "pending" });
}

/**
 * Updates an existing property record.
 * @param {string} propertyId - The ID of the property to update.
 * @param {Object} data - The property data to update.
 * @returns {Promise} - A promise that resolves when the property is updated.
 */
export async function updateProperty(propertyId, data) {
  return update(ref(database, `products/${propertyId}`), data);
}

/**
 * Soft deletes a property by setting its "deleted" field to true.
 * @param {string} propertyId - The ID of the property to soft delete.
 * @returns {Promise} - A promise that resolves when the property is updated.
 */
export async function softDeleteProperty(propertyId) {
  return update(ref(database, `products/${propertyId}`), { deleted: true });
}

/**
 * Subscribes to properties where the seller field matches the given sellerId.
 * @param {string} sellerId - The seller UID to filter by.
 * @param {function} callback - Callback function receiving the snapshot.
 * @returns {function} - A function to unsubscribe the listener.
 */
export function subscribeToPropertiesBySeller(sellerId, callback) {
  const propertiesRef = ref(database, "products");
  const q = query(propertiesRef, orderByChild("seller"), equalTo(sellerId));
  return onValue(q, callback);
}
