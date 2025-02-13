import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../navBar/NavBar";
import Hero from "../home/Hero"
import Gallery from "../home/Gallery"
import  Categories from "../home/Categories"
import Testimoneal from "../home/Testimoneal"
import Statistic from "../home/Statistic"
import Features from "../home/Features"
import NewRentals from "../home/NewRentals";
import "./home.css";
import Footer from "../footer/Footer";
import { Link } from 'react-router-dom';



const firebaseUrl =
  "https://rental-website-bb300-default-rtdb.firebaseio.com/products.json";

export default function Home() {
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
    <div>
      <Navbar />
      <Hero/>
      <NewRentals/>
      <Statistic/>
      <Categories/>
      <Features/>
      <Gallery/>
      <Testimoneal/>
      <Footer />
    </div>


  );
}
