import { useState, useEffect } from "react";
import axios from "axios";

const firebaseUrl =
  "https://rental-website-bb300-default-rtdb.firebaseio.com/products.json";

export default function NewRentals() {

    const [rentals, setRentals] = useState([]);

    // Function to fetch rental properties from Firebase
    const fetchRentals = async () => {
      try {
        const response = await axios.get(firebaseUrl);
        setRentals(response.data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };
    // Fetch rentals data on component mount
    useEffect(() => {
      fetchRentals();
    }, []);
    
  return (
    <>
     {/* New Rentals Section */}
    </>
  )
}
