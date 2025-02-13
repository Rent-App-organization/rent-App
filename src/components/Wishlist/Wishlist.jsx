import { useState } from "react";
import Navbar from "../navBar/NavBar"
import Footer from "../footer/Footer";
const Wishlist = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Luxury Villa in Dubai",
      description: "A 500 sqm villa with a private pool and stunning views.",
      price: "$1,200,000",
      image: "https://i.pinimg.com/736x/ec/c0/b0/ecc0b0ecce4c8b6a501f91ff996b97ac.jpg"
    },
    {
      id: 2,
      name: "Modern Apartment in NYC",
      description: "A fully furnished apartment overlooking the skyline.",
      price: "$750,000",
      image: "https://i.pinimg.com/474x/96/7b/27/967b272e3a2e6007a22c3ba4c62e7304.jpg"
    },
    {
      id: 3,
      name: "Cozy Cottage in the Countryside",
      description: "A peaceful home surrounded by nature.",
      price: "$350,000",
      image: "https://i.pinimg.com/736x/61/9c/8d/619c8d2bb9c318c3d3792e110107b470.jpg"
    },
  ]);

  const removeProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="bg-blue-50">
      <Navbar /> {/* ✅ Navbar ثابت بالأعلى */}
      
      {/* ✅ إضافة مساحة علوية لمنع تداخل المحتوى مع الـ Navbar */}
      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        <div className="w-full max-w-6xl space-y-8">
          
          {/* 💙 Title */}
          <h2 className="text-3xl font-bold text-blue-800 text-center mt-8 mb-6">Your Favorite Properties</h2>

          {/* 📌 Properties Grid */}
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mx-auto">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={property.image} alt={property.name} className="w-full h-52 object-cover"/>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
                  <p className="text-gray-600">{property.description}</p>
                  <span className="block text-blue-600 font-semibold text-lg mt-2">{property.price}</span>

                  {/* 🛠 Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => removeProperty(property.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                      Remove
                    </button>

                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      Booking Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
            <Footer />
      
    </div>
  );
};

export default Wishlist;
