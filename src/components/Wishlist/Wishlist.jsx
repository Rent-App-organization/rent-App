import { useState, useEffect } from "react";
import { database, auth } from "../../fireBaseConfig";
import { ref, get } from "firebase/database";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const wishlistRef = ref(database, `wishlist/${user.uid}`);
      try {
        const snapshot = await get(wishlistRef);
        if (snapshot.exists()) {
          const wishlistData = snapshot.val();
          const itemIds = Object.keys(wishlistData); // Extract wishlist item IDs
          fetchProductDetails(itemIds); // Fetch product details
        } else {
          setWishlistProducts([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const fetchProductDetails = async (itemIds) => {
      try {
        const productPromises = itemIds.map(async (id) => {
          const productRef = ref(database, `products/${id}`);
          const productSnapshot = await get(productRef);
          return productSnapshot.exists() ? { id, ...productSnapshot.val() } : null;
        });

        const products = await Promise.all(productPromises);
        setWishlistProducts(products.filter((product) => product !== null)); // Filter out null values
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Wishlist Products</h2>
      {wishlistProducts.length > 0 ? (
        <ul className="space-y-4">
          {wishlistProducts.map((product) => (
            <li
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">{product.location}</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">No items in wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
