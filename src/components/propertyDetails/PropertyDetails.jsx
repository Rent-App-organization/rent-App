

import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../fireBaseConfig";
import BookNowPopup from "./BookNow";
import { Star, Users, Map, MapPin, Phone, Mail, Calendar } from "lucide-react";

const PropertyDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  const [property, setProperty] = useState(location.state?.rental || null);
  const [seller, setSeller] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (!property && id) {
      const fetchProperty = async () => {
        const propertyRef = ref(database, `rentals/${id}`);
        const snapshot = await get(propertyRef);
        if (snapshot.exists()) {
          setProperty(snapshot.val());
        } else {
          console.error("No such property in database!");
        }
      };
      fetchProperty();
    }
  }, [id, property]);

  useEffect(() => {
    if (property?.seller) {
      const fetchSeller = async () => {
        const sellerRef = ref(database, `users/${property.seller}`);
        const snapshot = await get(sellerRef);
        if (snapshot.exists()) {
          setSeller(snapshot.val());
        } else {
          console.error("No such seller in database!");
        }
      };
      fetchSeller();
    }
  }, [property?.seller]);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          <p className="text-xl text-gray-600 font-medium">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  console.log(property.date)


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Photos */}
            {property.photos && property.photos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-[500px]">
                  <img
                    src={property.photos[selectedPhoto]}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                  {/* Photo Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {property.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          selectedPhoto === index ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="p-4 overflow-x-auto">
                  <div className="flex gap-4">
                    {property.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Thumbnail ${index}`}
                        className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all ${
                          selectedPhoto === index
                            ? "ring-4 ring-blue-500"
                            : "hover:ring-2 hover:ring-blue-300"
                        }`}
                        onClick={() => setSelectedPhoto(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Property Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {property.rating ? `${property.rating}/5` : "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">User rating</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl text-green-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {property.date || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-500">Available dates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Location */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Property Location
                </h2>
                <p className="text-gray-600 mb-4">{property.location}</p>
              </div>
              <div className="h-[400px] w-full">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ&q=${encodeURIComponent(
                    property.location
                  )}`}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  ${property.price}
                  <span className="text-lg text-gray-500 font-normal">
                    /night
                  </span>
                </h2>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl mt-4 hover:bg-blue-700 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* Seller Info */}
              {seller && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Host Information
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={seller.photoURL || "https://via.placeholder.com/60"}
                      alt={seller.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-gray-500 text-sm">
                        Host since {seller.joinDate || "2023"}
                      </p>
                    </div>
                  </div>
                  {seller.phone && (
                    <div className="flex items-center gap-3 text-gray-600 mb-2">
                      <Phone className="w-5 h-5" />
                      <span>{seller.phone}</span>
                    </div>
                  )}
                  {seller.email && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5" />
                      <span>{seller.email}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isBookingOpen && (
        <BookNowPopup
          productId={id}
          availableDates={property.date}
          
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
