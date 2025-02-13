import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import app from "../../fireBaseConfig"; // Import your Firebase config

const PropertyDetails = () => {
  const location = useLocation();
  const { id } = useParams(); // Get property ID from the URL
  const [property, setProperty] = useState(location.state?.rental || null);

  useEffect(() => {
    if (!property && id) {
      // Fetch rental from Firebase if not passed via state
      const fetchProperty = async () => {
        const docRef = doc(app, "rentals", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty(docSnap.data());
        } else {
          console.error("No such document!");
        }
      };
      fetchProperty();
    }
  }, [id, property]);

  if (!property) {
    return <p className="text-center text-gray-700">Loading property details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <img src={property.photos[0]} alt={property.title} className="w-full h-80 object-cover mt-4 rounded-lg" />
      <p className="mt-4 text-gray-600">{property.description}</p>
      <p className="text-red-500 font-bold mt-2">${property.price} / night</p>
    </div>
  );
};

export default PropertyDetails;
