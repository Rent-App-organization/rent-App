// import { useState, useEffect } from "react";
// import { database, auth } from "../../fireBaseConfig";
// import { ref, get } from "firebase/database";

// const Wishlist = () => {
//   const [wishlistProducts, setWishlistProducts] = useState([]);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const wishlistRef = ref(database, `wishlist/${user.uid}`);
//       try {
//         const snapshot = await get(wishlistRef);
//         if (snapshot.exists()) {
//           const wishlistData = snapshot.val();
//           const itemIds = Object.keys(wishlistData); // Extract wishlist item IDs
//           fetchProductDetails(itemIds); // Fetch product details
//         } else {
//           setWishlistProducts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     const fetchProductDetails = async (itemIds) => {
//       try {
//         const productPromises = itemIds.map(async (id) => {
//           const productRef = ref(database, `products/${id}`);
//           const productSnapshot = await get(productRef);
//           return productSnapshot.exists() ? { id, ...productSnapshot.val() } : null;
//         });

//         const products = await Promise.all(productPromises);
//         setWishlistProducts(products.filter((product) => product !== null)); // Filter out null values
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Wishlist Products</h2>
//       {wishlistProducts.length > 0 ? (
//         <ul className="space-y-4">
//           {wishlistProducts.map((product) => (
//             <li
//               key={product.id}
//               className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="text-xl font-semibold text-blue-600">{product.location}</h3>
//               <p className="text-gray-600 mt-1">{product.description}</p>
//               <p className="text-lg font-bold text-green-600 mt-2">Price: ${product.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500 text-center mt-4">No items in wishlist</p>
//       )}
//     </div>
//   );
// };

// export default Wishlist;


import { useState, useEffect } from "react";
import { database, auth } from "../../fireBaseConfig";
import { ref, get } from "firebase/database";
import { Heart, XCircle, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setIsLoading(false);
        return;
      }

      const wishlistRef = ref(database, `wishlist/${user.uid}`);
      try {
        const snapshot = await get(wishlistRef);
        if (snapshot.exists()) {
          const wishlistData = snapshot.val();
          const itemIds = Object.keys(wishlistData);
          await fetchProductDetails(itemIds);
        } else {
          setWishlistProducts([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError("Failed to load your wishlist. Please try again later.");
      } finally {
        setIsLoading(false);
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
        setWishlistProducts(products.filter((product) => product !== null));
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again later.");
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    // This function would implement the removal logic
    console.log(`Remove item ${id} from wishlist`);
  };

  const addToCart = (product) => {
    // This function would implement the add to cart logic
    console.log(`Add ${product.location} to cart`);
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center text-red-500">
          <XCircle className="mx-auto h-12 w-12 mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
      </div>
      
      {wishlistProducts.length > 0 ? (
        <ul className="space-y-6">
          {wishlistProducts.map((product) => (
            <li
              key={product.id}
              className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition group"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
                    {product.location}
                  </h3>
                  <p className="text-gray-600 mt-2 mb-4">{product.description}</p>
                  <p className="text-lg font-bold text-green-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex sm:flex-col justify-end mt-4 sm:mt-0 space-x-3 sm:space-x-0 sm:space-y-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Your wishlist is empty</p>
          <a href="/products" className="inline-block mt-4 text-blue-500 hover:text-blue-700 transition">
            Browse our products
          </a>
        </div>
      )}
    </div>
  );
};

export default Wishlist;