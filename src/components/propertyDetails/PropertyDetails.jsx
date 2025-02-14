import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../fireBaseConfig"; // Import Realtime Database

const PropertyDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(location.state?.rental || null);
  const [seller, setSeller] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);


  useEffect(() => {
    if (!property && id) {
      // Fetch rental property from Realtime Database
      const fetchProperty = async () => {
        const propertyRef = ref(database, `rentals/${id}`); // Path to rentals
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
      // Fetch seller data from Realtime Database using seller ID
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


  const handlePrevious = () => {
    setSelectedPhoto((prev) =>
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedPhoto((prev) =>
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleClick = () => {
  }

  if (!property) {
    return <p className="text-center text-gray-700">Loading property details...</p>;
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-2">
        {/* Photo Gallery */}
        <div className="mb-9">
          {/* Main Gallery */}
          <div className="relative w-full h-[480px] overflow-hidden">
            <div className="flex items-center justify-center h-full">
              {/* Previous Photo */}
              {property.photos.length > 1 && (
                <div className="absolute left-0 w-1/4 h-full flex items-center justify-start opacity-50 transform -translate-x-1/4">
                  <img
                    src={property.photos[selectedPhoto === 0 ? property.photos.length - 1 : selectedPhoto - 1]}
                    alt="Previous"
                    className="object-cover h-[400px] w-full"
                  />
                </div>
              )}

              {/* Current Photo */}
              <div className="relative w-3/4 h-[480px] z-10">
                <img
                  src={property.photos[selectedPhoto]}
                  alt={`${property.title} - View ${selectedPhoto + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Next Photo */}
              {property.photos.length > 1 && (
                <div className="absolute right-0 w-1/4 h-full flex items-center justify-end opacity-50 transform translate-x-1/4">
                  <img
                    src={property.photos[selectedPhoto === property.photos.length - 1 ? 0 : selectedPhoto + 1]}
                    alt="Next"
                    className="object-cover h-[400px] w-full"
                  />
                </div>
              )}

              {/* Navigation Arrows */}
              {property.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all"
                    aria-label="Previous photo"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition-all"
                    aria-label="Next photo"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2 justify-center">
            {property.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhoto(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
              ${selectedPhoto === index ? 'border-blue-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img
                  src={photo}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 Columns */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>

            {/* Price */}
            <p className="text-2xl font-bold text-red-500 mt-4">
              ${property.price} / night
            </p>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Property Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            {seller && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">About the Host</h2>
                <div className="flex items-center gap-4">
                  {seller.profilePicture && (
                    <img
                      src={seller.profilePicture}
                      alt={seller.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-lg">{seller.fullName}</p>
                    <p className="text-gray-600">{seller.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Section - 1 Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-xl font-semibold mb-4">Book this property</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-semibold">${property.price}</span>
                  </div>
                  <button onClick={handleClick} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;