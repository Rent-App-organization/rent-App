// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import BookNowPopup from "./BookNow";
// import { Star, Users, Map, MapPin, Phone, Mail, Calendar } from "lucide-react";
// import  Navbar  from "../../components/navBar/NavBar";
// import Footer from '../footer/Footer'

// const PropertyDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();

//   const [property, setProperty] = useState(location.state?.rental || null);
//   const [seller, setSeller] = useState(null);
//   const [selectedPhoto, setSelectedPhoto] = useState(0);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [isMapOpen, setIsMapOpen] = useState(false);

//   useEffect(() => {
//     if (!property && id) {
//       const fetchProperty = async () => {
//         const propertyRef = ref(database, `rentals/${id}`);
//         const snapshot = await get(propertyRef);
//         if (snapshot.exists()) {
//           setProperty(snapshot.val());
//         } else {
//           console.error("No such property in database!");
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, property]);

//   useEffect(() => {
//     if (property?.seller) {
//       const fetchSeller = async () => {
//         const sellerRef = ref(database, `users/${property.seller}`);
//         const snapshot = await get(sellerRef);
//         if (snapshot.exists()) {
//           setSeller(snapshot.val());
//         } else {
//           console.error("No such seller in database!");
//         }
//       };
//       fetchSeller();
//     }
//   }, [property?.seller]);

//   if (!property) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
//           <p className="text-xl text-gray-600 font-medium">
//             Loading property details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   console.log(property.date)

//   return (
//     <>
//     <Navbar/>

//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Property Photos */}
//             {property.photos && property.photos.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                 <div className="relative h-[500px]">
//                   <img
//                     src={property.photos[selectedPhoto]}
//                     alt="Property"
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Photo Navigation */}
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//                     {property.photos.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedPhoto(index)}
//                         className={`w-3 h-3 rounded-full transition-all ${
//                           selectedPhoto === index ? "bg-white" : "bg-white/50"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 {/* Thumbnails */}
//                 <div className="p-4 overflow-x-auto">
//                   <div className="flex gap-4">
//                     {property.photos.map((photo, index) => (
//                       <img
//                         key={index}
//                         src={photo}
//                         alt={`Thumbnail ${index}`}
//                         className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all ${
//                           selectedPhoto === index
//                             ? "ring-4 ring-blue-500"
//                             : "hover:ring-2 hover:ring-blue-300"
//                         }`}
//                         onClick={() => setSelectedPhoto(index)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Property Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
//                     <Star className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">
//                       {property.rating ? `${property.rating}/5` : "N/A"}
//                     </p>
//                     <p className="text-sm text-gray-500">User rating</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-green-100 rounded-xl text-green-600">
//                     <Calendar className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">
//                       {property.date || "Not specified"}
//                     </p>
//                     <p className="text-sm text-gray-500">Available dates</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Property Location */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-6">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                   <MapPin className="w-6 h-6 text-blue-600" />
//                   Property Location
//                 </h2>
//                 <p className="text-gray-600 mb-4">{property.location}</p>
//               </div>
//               <div className="h-[400px] w-full">
//                 <iframe
//                   className="w-full h-full rounded-lg"
//                   src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ&q=${encodeURIComponent(
//                     property.location
//                   )}`}
//                   allowFullScreen
//                   loading="lazy"
//                 ></iframe>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               {/* Price Card */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                   ${property.price}
//                   <span className="text-lg text-gray-500 font-normal">
//                     /night
//                   </span>
//                 </h2>
//                 <button
//                   onClick={() => setIsBookingOpen(true)}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl mt-4 hover:bg-blue-700 transition-all duration-300"
//                 >
//                   Book Now
//                 </button>
//               </div>

//               {/* Seller Info */}
//               {seller && (
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <h3 className="text-xl font-semibold mb-4">
//                     Host Information
//                   </h3>
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={seller.photoURL || "https://via.placeholder.com/60"}
//                       alt={seller.name}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-medium">{seller.name}</p>
//                       <p className="text-gray-500 text-sm">
//                         Host since {seller.joinDate || "2023"}
//                       </p>
//                     </div>
//                   </div>
//                   {seller.phone && (
//                     <div className="flex items-center gap-3 text-gray-600 mb-2">
//                       <Phone className="w-5 h-5" />
//                       <span>{seller.phone}</span>
//                     </div>
//                   )}
//                   {seller.email && (
//                     <div className="flex items-center gap-3 text-gray-600">
//                       <Mail className="w-5 h-5" />
//                       <span>{seller.email}</span>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {isBookingOpen && (
//         <BookNowPopup
//           productId={id}
//           availableDates={property.date}

//           onClose={() => setIsBookingOpen(false)}
//         />
//       )}
//     </div>
//     <Footer/>
//     </>

//   );
// };

// export default PropertyDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { Star, Users, MapPin, Calendar as CalendarIcon } from "lucide-react";
// import Navbar from "../../components/navBar/NavBar";
// import Footer from "../footer/Footer";
// import BookNowPopup from "./BookNow";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [blockedDates, setBlockedDates] = useState(new Set());
//   const [bookedDays, setBookedDays] = useState(new Set());

//   useEffect(() => {
//     if (!property && id) {
//       const fetchProperty = async () => {
//         try {
//           const propertyRef = ref(database, `products/${id}`);
//           const snapshot = await get(propertyRef);
//           if (snapshot.exists()) {
//             const propertyData = snapshot.val();
//             setProperty(propertyData);

//             // تحويل التواريخ المحجوزة إلى Set
//             const allBookedDays = new Set();
//             (propertyData.bookedDate || []).forEach(({ startDate, endDate }) => {
//               let currentDate = new Date(startDate);
//               const lastDate = new Date(endDate);
//               while (currentDate <= lastDate) {
//                 const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
//                 allBookedDays.add(dateString);
//                 currentDate.setDate(currentDate.getDate() + 1);
//               }
//             });
//             setBookedDays(allBookedDays);

//             // تحويل التواريخ المحظورة إلى Set
//             const extractedBlockedDates = new Set(
//               (propertyData.blockedDates || []).map((date) => {
//                 const d = new Date(date);
//                 return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
//               })
//             );
//             setBlockedDates(extractedBlockedDates);

//             console.log("✅ Blocked Dates:", Array.from(extractedBlockedDates));
//             console.log("✅ Booked Dates:", Array.from(allBookedDays));
//           }
//         } catch (error) {
//           console.error("Error fetching property data:", error);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, property]);

//   const isDateBlocked = (date) => {
//     const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
//     return blockedDates.has(dateString) || bookedDays.has(dateString);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 px-6 py-8">
//         {property ? (
//           <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//             <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
//             <div className="flex items-center gap-4 text-gray-600">
//               <span className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5" /> {property.location}
//               </span>
//               <span className="flex items-center gap-2">
//                 <Users className="w-5 h-5" /> {property.bedrooms} rooms
//               </span>
//             </div>
//             <img
//               src={property.photos?.[0]}
//               alt="Property"
//               className="w-full h-64 object-cover rounded-lg mt-4"
//             />
//             <p className="text-gray-700 mt-4">{property.description}</p>
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
//                 <CalendarIcon className="w-6 h-6 text-blue-600" /> Booking Calendar
//               </h2>
//               <Calendar
//                 onChange={setSelectedDate}
//                 value={selectedDate}
//                 tileDisabled={({ date }) => isDateBlocked(date)}
//                 className="border rounded-lg shadow-md"
//               />
//             </div>
//             <button
//               onClick={() => setIsBookingOpen(true)}
//               className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               Book Now
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">Loading property details...</div>
//         )}
//       </div>
//       {isBookingOpen && <BookNowPopup onClose={() => setIsBookingOpen(false)} />}
//       <Footer />
//     </>
//   );
// };

// export default PropertyDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import {
//   Star,
//   Users,
//   MapPin,
//   Calendar as CalendarIcon,
//   User,
// } from "lucide-react";
// import Navbar from "../../components/navBar/NavBar";
// import Footer from "../footer/Footer";
// import BookNowPopup from "./BookNow";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [blockedDates, setBlockedDates] = useState(new Set());
//   const [bookedDays, setBookedDays] = useState(new Set());
//   const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);

//   useEffect(() => {
//     if (!property && id) {
//       const fetchProperty = async () => {
//         try {
//           const propertyRef = ref(database, `products/${id}`);
//           const snapshot = await get(propertyRef);
//           if (snapshot.exists()) {
//             const propertyData = snapshot.val();
//             setProperty(propertyData);

//             // تحويل التواريخ المحجوزة إلى Set
//             const allBookedDays = new Set();
//             (propertyData.bookedDate || []).forEach(
//               ({ startDate, endDate }) => {
//                 let currentDate = new Date(startDate);
//                 const lastDate = new Date(endDate);
//                 while (currentDate <= lastDate) {
//                   const dateString = `${currentDate.getFullYear()}-${String(
//                     currentDate.getMonth() + 1
//                   ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
//                     2,
//                     "0"
//                   )}`;
//                   allBookedDays.add(dateString);
//                   currentDate.setDate(currentDate.getDate() + 1);
//                 }
//               }
//             );
//             setBookedDays(allBookedDays);

//             // تحويل التواريخ المحظورة إلى Set
//             const extractedBlockedDates = new Set(
//               (propertyData.blockedDates || []).map((date) => {
//                 const d = new Date(date);
//                 return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
//                   2,
//                   "0"
//                 )}-${String(d.getDate()).padStart(2, "0")}`;
//               })
//             );
//             setBlockedDates(extractedBlockedDates);

//             console.log("✅ Blocked Dates:", Array.from(extractedBlockedDates));
//             console.log("✅ Booked Dates:", Array.from(allBookedDays));
//           }
//         } catch (error) {
//           console.error("Error fetching property data:", error);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, property]);

//   const isDateBlocked = (date) => {
//     const dateString = `${date.getFullYear()}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
//     return blockedDates.has(dateString) || bookedDays.has(dateString);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 px-6 py-8">
//         {property ? (
//           <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//             <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
//             <div className="flex items-center gap-4 text-gray-600">
//               <span className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5" /> {property.location}
//               </span>
//               <span className="flex items-center gap-2">
//                 <Users className="w-5 h-5" /> {property.bedrooms} rooms
//               </span>
//             </div>
//             {/* عرض الصور */}
//             <div className="mt-4 flex gap-4 overflow-x-auto">
//               {property.photos?.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={photo}
//                   alt={`Property ${index}`}
//                   className="w-32 h-32 object-cover rounded-lg shadow-md"
//                 />
//               ))}
//             </div>
//             <p className="text-gray-700 mt-4">{property.description}</p>
//             {/* معلومات المضيف */}
//             <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//               <h2 className="text-xl font-semibold flex items-center gap-2">
//                 <User className="w-6 h-6 text-blue-600" /> Host Information
//               </h2>
//               <p className="text-gray-700 mt-2">Seller ID: {property.seller}</p>
//             </div>
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
//                 <CalendarIcon className="w-6 h-6 text-blue-600" /> Booking
//                 Calendar
//               </h2>
//               {/* <Calendar
//                 onChange={setSelectedDate}
//                 value={selectedDate}
//                 tileDisabled={({ date }) => isDateBlocked(date)}
//                 className="border rounded-lg shadow-md"
//               /> */}
//               <Calendar
//                 onChange={setSelectedRange}
//                 value={selectedRange}
//                 selectRange={true} // يسمح بتحديد تاريخين (بداية ونهاية)
//                 tileDisabled={({ date }) => isDateBlocked(date)}
//                 className="border rounded-lg shadow-md"
//               />
//             </div>
//             <button
//               onClick={() => setIsBookingOpen(true)}
//               className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               Book Now
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">
//             Loading property details...
//           </div>
//         )}
//       </div>
//       {/* {isBookingOpen && (
//         <BookNowPopup onClose={() => setIsBookingOpen(false)} />
//       )} */}

//       {isBookingOpen && (
//         <BookNowPopup
//           onClose={() => setIsBookingOpen(false)}
//           startDate={selectedRange[0]}
//           endDate={selectedRange[1]}
//           productId={id}
//         />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default PropertyDetails;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { Star, Users, MapPin, Calendar as CalendarIcon, User } from "lucide-react";
// import Navbar from "../../components/navBar/NavBar";
// import Footer from "../footer/Footer";
// import BookNowPopup from "./BookNow";
// import { ToastContainer, toast } from "react-toastify"; // ✅ إضافة التنبيهات
// import "react-toastify/dist/ReactToastify.css"; // ✅ استيراد أنماط التنبيهات

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [blockedDates, setBlockedDates] = useState(new Set());
//   const [bookedDays, setBookedDays] = useState(new Set());
//   const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);

//   useEffect(() => {
//     if (!property && id) {
//       const fetchProperty = async () => {
//         try {
//           const propertyRef = ref(database, `products/${id}`);
//           const snapshot = await get(propertyRef);
//           if (snapshot.exists()) {
//             const propertyData = snapshot.val();
//             setProperty(propertyData);

//             // تحويل التواريخ المحجوزة إلى Set
//             const allBookedDays = new Set();
//             (propertyData.bookedDate || []).forEach(({ startDate, endDate }) => {
//               let currentDate = new Date(startDate);
//               const lastDate = new Date(endDate);
//               while (currentDate <= lastDate) {
//                 const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
//                 allBookedDays.add(dateString);
//                 currentDate.setDate(currentDate.getDate() + 1);
//               }
//             });
//             setBookedDays(allBookedDays);

//             // تحويل التواريخ المحظورة إلى Set
//             const extractedBlockedDates = new Set(
//               (propertyData.blockedDates || []).map((date) => {
//                 const d = new Date(date);
//                 return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
//               })
//             );
//             setBlockedDates(extractedBlockedDates);
//           }
//         } catch (error) {
//           console.error("Error fetching property data:", error);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, property]);

//   const isDateBlocked = (date) => {
//     const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
//     return blockedDates.has(dateString) || bookedDays.has(dateString);
//   };

//   const handleDateSelection = (range) => {
//     if (!range || range.length < 2) return;

//     const [start, end] = range;
//     let currentDate = new Date(start);
//     const lastDate = new Date(end);

//     while (currentDate <= lastDate) {
//       const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

//       if (blockedDates.has(dateString) || bookedDays.has(dateString)) {
//         toast.error("❌ Some selected dates are unavailable. Please choose a different range.", { theme: "colored" });
//         return; // ❌ لا يتم تحديث النطاق إذا كان هناك يوم محجوز
//       }
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // ✅ تحديث النطاق المختار إذا كان صالحًا
//     setSelectedRange(range);
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 px-6 py-8">
//         {property ? (
//           <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//             <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
//             <div className="flex items-center gap-4 text-gray-600">
//               <span className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5" /> {property.location}
//               </span>
//               <span className="flex items-center gap-2">
//                 <Users className="w-5 h-5" /> {property.bedrooms} rooms
//               </span>
//             </div>
//             {/* عرض الصور */}
//             <div className="mt-4 flex gap-4 overflow-x-auto">
//               {property.photos?.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={photo}
//                   alt={`Property ${index}`}
//                   className="w-32 h-32 object-cover rounded-lg shadow-md"
//                 />
//               ))}
//             </div>
//             <p className="text-gray-700 mt-4">{property.description}</p>
//             {/* معلومات المضيف */}
//             <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//               <h2 className="text-xl font-semibold flex items-center gap-2">
//                 <User className="w-6 h-6 text-blue-600" /> Host Information
//               </h2>
//               <p className="text-gray-700 mt-2">Seller ID: {property.seller}</p>
//             </div>
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
//                 <CalendarIcon className="w-6 h-6 text-blue-600" /> Booking Calendar
//               </h2>
//               <Calendar
//                 onChange={handleDateSelection}
//                 value={selectedRange}
//                 selectRange={true} // يسمح بتحديد تاريخين (بداية ونهاية)
//                 tileDisabled={({ date }) => isDateBlocked(date)}
//                 className="border rounded-lg shadow-md"
//               />
//             </div>
//             <button
//               onClick={() => setIsBookingOpen(true)}
//               className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               Book Now
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">Loading property details...</div>
//         )}
//       </div>

//       {isBookingOpen && (
//         <BookNowPopup
//           onClose={() => setIsBookingOpen(false)}
//           startDate={selectedRange[0]}
//           endDate={selectedRange[1]}
//           productId={id}
//         />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default PropertyDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../../fireBaseConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Star, Users, MapPin, Calendar as CalendarIcon, User, Wifi, Airplay, Car, Bath } from "lucide-react";
import Navbar from "../../components/navBar/NavBar";
import Footer from "../footer/Footer";
import BookNowPopup from "./BookNow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState(new Set());
  const [bookedDays, setBookedDays] = useState(new Set());
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);

  useEffect(() => {
    if (!property && id) {
      const fetchProperty = async () => {
        try {
          const propertyRef = ref(database, `products/${id}`);
          const snapshot = await get(propertyRef);
          if (snapshot.exists()) {
            const propertyData = snapshot.val();
            setProperty(propertyData);

            // تحويل التواريخ المحجوزة إلى Set
            const allBookedDays = new Set();
            (propertyData.bookedDate || []).forEach(({ startDate, endDate }) => {
              let currentDate = new Date(startDate);
              const lastDate = new Date(endDate);
              while (currentDate <= lastDate) {
                const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
                allBookedDays.add(dateString);
                currentDate.setDate(currentDate.getDate() + 1);
              }
            });
            setBookedDays(allBookedDays);

            // تحويل التواريخ المحظورة إلى Set
            const extractedBlockedDates = new Set(
              (propertyData.blockedDates || []).map((date) => {
                const d = new Date(date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              })
            );
            setBlockedDates(extractedBlockedDates);
          }
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };
      fetchProperty();
    }
  }, [id, property]);

  const isDateBlocked = (date) => {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return blockedDates.has(dateString) || bookedDays.has(dateString);
  };

  const handleDateSelection = (range) => {
    if (!range || range.length < 2) return;

    const [start, end] = range;
    let currentDate = new Date(start);
    const lastDate = new Date(end);

    while (currentDate <= lastDate) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      if (blockedDates.has(dateString) || bookedDays.has(dateString)) {
        toast.error("❌ Some selected dates are unavailable. Please choose a different range.", { theme: "colored" });
        return;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setSelectedRange(range);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        {property ? (
          <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

            {/* السعر والتقييم */}
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">${property.price} / night</span>
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star className="w-5 h-5 fill-current" /> {property.rating} (120 reviews)
              </span>
            </div>

            {/* تفاصيل الفيلا */}
            <div className="flex items-center gap-4 text-gray-600 mt-2">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {property.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" /> {property.bedrooms} rooms
              </span>
            </div>

            {/* صور الفيلا */}
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {property.photos?.map((photo, index) => (
                <img key={index} src={photo} alt={`Property ${index}`} className="w-40 h-40 object-cover rounded-lg shadow-md" />
              ))}
            </div>

            {/* مميزات الفيلا */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <span className="flex items-center gap-2"><Wifi className="w-5 h-5 text-blue-600" /> Free WiFi</span>
                <span className="flex items-center gap-2"><Airplay className="w-5 h-5 text-blue-600" /> Smart TV</span>
                <span className="flex items-center gap-2"><Car className="w-5 h-5 text-blue-600" /> Free Parking</span>
                <span className="flex items-center gap-2"><Bath className="w-5 h-5 text-blue-600" /> Jacuzzi</span>
              </div>
            </div>

            {/* التقويم وزر الحجز */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" /> Booking Calendar
              </h2>
              <Calendar onChange={handleDateSelection} value={selectedRange} selectRange={true} tileDisabled={({ date }) => isDateBlocked(date)} className="border rounded-lg shadow-md" />
            </div>
            
            <button onClick={() => setIsBookingOpen(true)} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">
              Book Now
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading property details...</div>
        )}
      </div>

      {isBookingOpen && <BookNowPopup onClose={() => setIsBookingOpen(false)} startDate={selectedRange[0]} endDate={selectedRange[1]} productId={id} />}
      <Footer />
    </>
  );
};

export default PropertyDetails;
