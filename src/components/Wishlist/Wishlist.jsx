import { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { auth, database } from "../../fireBaseConfig.js";
import Navbar from "../navBar/NavBar";
import Footer from "../footer/Footer";

const Wishlist = () => {
  const [properties, setProperties] = useState([]);
  const user = auth.currentUser; // Get the authenticated user

  useEffect(() => {
    if (!user) return;

    const wishlistRef = ref(database, `wishlist/${user.uid}`);

    // Fetch wishlist data
    onValue(wishlistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedProperties = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProperties(loadedProperties);
      } else {
        setProperties([]);
      }
    });
  }, [user]);

  const removeProperty = (propertyId) => {
    if (!user) return;
    const propertyRef = ref(database, `wishlist/${user.uid}/${propertyId}`);
    remove(propertyRef)
      .then(() => {
        setProperties(properties.filter((property) => property.id !== propertyId));
      })
      .catch((error) => console.error("Error removing property:", error));
  };

  return (
    <div className="bg-blue-50">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        <div className="w-full max-w-6xl space-y-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center mt-8 mb-6">
            Your Favorite Properties
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mx-auto">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={property.image} alt={property.name} className="w-full h-52 object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
                    <p className="text-gray-600">{property.description}</p>
                    <span className="block text-blue-600 font-semibold text-lg mt-2">{property.price}</span>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => removeProperty(property.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        Booking Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center text-lg">No properties in your wishlist.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
