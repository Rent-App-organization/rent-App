import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navBar/NavBar";
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


 

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { id: 1, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjUxMTE1MjM3ODI5MzAwODI2/original/e4f9a3d4-5891-473f-8a65-e9ea485ad63a.jpeg?im_w=720&im_format=avif' },
    { id: 2, url: 'https://a0.muscache.com/im/pictures/390e6fee-694c-40eb-896d-f3762e72a184.jpg?im_w=1200&im_format=avif' },
    { id: 3, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50474130/original/5594235f-9a59-4b5b-8a4e-b88bbb8fb2f0.jpeg?im_w=1200&im_format=avif' },
    { id: 4, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-17137173/original/35d33a88-e88b-4506-8a34-81545cc4a2e1.jpeg?im_w=1200&im_format=avif' },
    { id: 5, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTM4MDU5MDkwMTU1NTEwOTky/original/dd74f5e7-1c7b-4f1e-bd51-b99eadbc856d.jpeg?im_w=1200&im_format=avif' },
    { id: 6, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881513318527514472/original/fe839fa0-ccb2-46ea-9c28-31f79235b56a.jpeg?im_w=1200&im_format=avif' },
    { id: 7, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-751955867209277685/original/8cf3bb71-1172-45f3-a42b-0e2b59e52d33.jpeg?im_w=1200&im_format=avif' },
    { id: 8, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyNDYwNjg3ODU4MTk2NzAyMQ%3D%3D/original/bb897ec5-c2a3-4761-a502-b69d33bab379.jpeg?im_w=1200&im_format=avif' },
    { id: 9, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-937324205439662940/original/6f0aaeb3-3c61-47c1-9096-63a2e73b783c.jpeg?im_w=1200&im_format=avif' },
    { id: 10, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740443026570850650/original/8263d1eb-a895-4453-89b3-8497aa6b3b48.jpeg?im_w=1200&im_format=avif' },
    { id: 11, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-947584705728520142/original/5c1b4ac3-dc3b-45c1-acb2-da167078c840.jpeg?im_w=1200&im_format=avif' },
    { id: 12, url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-779745708573674730/original/7de9476a-a505-4b74-b7f2-067737a2ca04.jpg?im_w=1200&im_format=avif' },

  ];


  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= images.length ? 0 : prevIndex + 4
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? Math.max(images.length - 4, 0) : prevIndex - 4
    );
  };

  // Get visible images based on current index
  const visibleImages = images.slice(currentIndex, currentIndex + 4);

  const categories = [
    {
      title: 'Amazing pools',
      description: 'Discover properties with stunning swimming pools.',
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1021823526546123768/original/1de1f36c-3de0-4cec-89f3-79baf38fa242.jpeg?im_w=1200&im_format=avif'
    },
    {
      title: 'Castles',
      description: 'Experience luxury stays in historic castles.',
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=1200&im_format=avif'
    },
    {
      title: 'Island',
      description: 'Escape to beautiful island destinations.',
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/83a47318-f3f6-4579-94d5-71523787ff11.jpeg?im_w=1200&im_format=avif'
    },
    {
      title: 'Historical Homes',
      description: 'Explore accommodations in world-class cities.',
      image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52291644/original/ffeeb710-2e97-423f-a0b7-56e36a40fc70.jpeg?im_w=1200&im_format=avif'
    }
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section with Video Background */}

      <div className="relative h-screen flex flex-col items-center justify-center text-center text-white">
        {/* Background video*/}
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video className="min-w-full min-h-full absolute object-cover"
            src="src/assets/hero.mp4"
            type="video/mp4" autoPlay muted loop></video>
        </div>


        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold">
            Escape to the <span className="italic">Horizon Villas</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Take your pick of the world’s finest villas – we’ll handle the rest.
          </p>

          {/* Search bar */}
          <div className="mt-6 text-white rounded-lg shadow-lg p-3 flex items-center gap-2 w-200">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-md flex-grow text-white"
            />
            <svg
              className="w-5 h-5 text-white transition-colors duration-200"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>

        </div>
      </div>

      {/* New Rentals Section */}



      {/* Gallery section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
  {/* Header */}
  <div className="text-center mt-12 ">
    <h1 className="text-4xl font-bold text-center text-black p-4 rounded-lg ">
      Step inside and <span className="italic text-coral-500">be swept away</span>
    </h1>
  </div>

  {/* Gallery Container */}
  <div className="relative">
    {/* Navigation Buttons */}
    <button
      onClick={prev}
      className=""
      aria-label="Previous"
    ></button>

    <button
      onClick={next}
      className=""
      aria-label="Next"
    ></button>

    {/* Images Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
      {visibleImages.map((image) => (
        <div
          key={image.id}
          className="relative aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

    {/* Pagination Dots */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: Math.ceil(images.length / 4) }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index * 4)}
          className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / 4) === index ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  </div>
</div>

      {/* *************************************************** */}
      {/* Catigories Section */}
      <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-center text-black p-4 rounded-lg">
          Discover Our Featured Categories
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore a variety of unique properties that cater to all your travel dreams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

        {categories.map((category) => (
          <div
            key={category.title}
            className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-bold">{category.title}</h2>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>

            {/* Button */}
            <Link to="/rental" className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              View collection
            </Link>
          </div>
        ))}
      </div>


      {/* Statistic section */}
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-center text-black rounded-lg">
              Numbers tell the hard works we’ve done in last 6 years
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#8697C4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">6+</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Years in business
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#8697C4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">37+</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Team members
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#8697C4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">3,274</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Villas Rent
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#8697C4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">98%</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Customer success
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>


  );
}
