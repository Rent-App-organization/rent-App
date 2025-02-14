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
import { database } from "../../../fireBaseConfig";

/**
 * Creates a new property record.
 */
export async function createProperty(data) {
  const newPropertyRef = push(ref(database, "products"));
  return set(newPropertyRef, { ...data, status: "pending", deleted: false });
}

/**
 * Updates an existing property record.
 */
export async function updateProperty(propertyId, data) {
  return update(ref(database, `products/${propertyId}`), data);
}

/**
 * Soft deletes a property (marks it as deleted).
 */
export async function softDeleteProperty(propertyId) {
  console.log(`Soft deleting property: ${propertyId}`);
  return update(ref(database, `products/${propertyId}`), { deleted: true });
}

/**
 * Subscribe to seller properties and exclude soft-deleted ones.
 */
export function subscribeToPropertiesBySeller(sellerId, callback) {
  const propertiesRef = ref(database, "products");
  const q = query(propertiesRef, orderByChild("seller"), equalTo(sellerId));
  return onValue(q, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const fetchedProperties = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((prop) => !prop.deleted);
      callback(fetchedProperties);
    } else {
      callback([]);
    }
  });
}

/**
 * Sends a deposit request by updating the product record with the deposit request message.
 */
export async function sendDepositRequest(propertyId, message) {
  return update(ref(database, `products/${propertyId}`), {
    depositRequest: message,
  });
}

/**
 * Updates the blockedDates field for a property.
 */
export async function updateBlockedDates(propertyId, blockedDates) {
  return update(ref(database, `products/${propertyId}`), { blockedDates });
}
