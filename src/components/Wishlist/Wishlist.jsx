import { useState, useEffect } from "react";
import { database, auth } from "../../fireBaseConfig";
import { ref, get } from "firebase/database";
import ImageGallery from './ImageGallery'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react';
import Navbar from "../navBar/NavBar";
import Footer from "../footer/Footer";

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
    <>
      <Navbar />
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Package style={{ color: '#A59D84' }} className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-900">My Wishlist</h2>
          </div>

          {wishlistProducts.length > 0 ? (
            <div className="h-[600px] overflow-y-auto pr-4 -mr-4">
              <div className="grid gap-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image Section */}
                      <div className="w-full md:w-1/2 min-h-[160px] md:min-h-[200px] relative overflow-hidden rounded-lg">
                        {product.photos && (
                          <ImageGallery images={product.photos} className="w-full h-full object-cover" />
                        )}
                      </div>

                      {/* Text Section */}
                      <div className="flex flex-col justify-between flex-grow">
                        <div className="w-100">
                          <h3 className="font-medium text-gray-900 text-lg">{product.location}</h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2 overflow-hidden">
                            Description: {product.description}
                          </p>
                        </div>

                        <div className="mt-0">
                          <p style={{ color: '#A59D84' }} className="text-xl font-semibold">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* View Details Button */}
                        <div className="mt-4">
                          <Link
                            to={`/PropertyDetails/${product.id}`}
                            style={{ backgroundColor: '#A59D84' }}
                            className="inline-block px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-opacity-90 transition"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <Package className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">Your wishlist is empty</p>
              <p className="text-sm text-gray-400 text-center mt-1">
                Items you save will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;