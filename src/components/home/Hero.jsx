import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./home.css";
import { Link } from 'react-router-dom';

function Hero() {


//// To play video from 9 second //////
const videoRef = useRef(null);

useEffect(() => {
  const video = videoRef.current;
  if (video) {
    video.onloadedmetadata = () => {
      video.currentTime = 5; // Start from 5 seconds
    };
  }
}, []);
/////////////////////////


  return (
   <>
   {/* Hero Section with Video Background */}

   <div className="relative h-screen flex flex-col items-center justify-center text-center text-white">
        {/* Background video*/}
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            className="min-w-full min-h-full absolute object-cover"
            src="src/assets/hero.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
          />
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
          <div className="mt-6 text-white rounded-lg shadow-lg p-3 flex items-center gap-2 w-200 relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-md flex-grow text-white bg-transparent pr-10"
            />
            <svg
              className="absolute right-4 w-5 h-5 text-white transition-colors duration-200"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>



        </div>
      </div>
   </> 
  )
}

export default Hero
