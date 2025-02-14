// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import BookNowPopup from "./BookNow"; // استيراد مكون البوب أب
// import { Star, Users, Home, Map, Calendar, Eye, Heart, Clock } from "lucide-react";

// const PropertyDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();
//   const [property, setProperty] = useState(location.state?.rental || null);
//   const [seller, setSeller] = useState(null);
//   const [selectedPhoto, setSelectedPhoto] = useState(0);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);

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

//   const handlePrevious = () => {
//     setSelectedPhoto((prev) =>
//       prev === 0 ? property.photos.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setSelectedPhoto((prev) =>
//       prev === property.photos.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handleBookNow = () => {
//     setIsBookingOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsBookingOpen(false);
//   };

//   if (!property) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-pulse text-xl text-gray-600">
//           Loading property details...
//         </div>
//       </div>
//     );
//   }

//   const propertyStats = [
//     {
//       icon: <Star className="w-6 h-6" />,
//       label: "Rating",
//       value: "4.8/5",
//       subtext: "from 120 reviews"
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       label: "Guests",
//       value: "Up to 6",
//       subtext: "people"
//     },
//     {
//       icon: <Home className="w-6 h-6" />,
//       label: "Size",
//       value: "180m²",
//       subtext: "living space"
//     },
//     {
//       icon: <Map className="w-6 h-6" />,
//       label: "Location",
//       value: "City Center",
//       subtext: "prime area"
//     }
//   ];

//   const bookingStats = [
//     {
//       icon: <Calendar className="w-5 h-5" />,
//       value: "85%",
//       label: "Booking Rate"
//     },
//     {
//       icon: <Eye className="w-5 h-5" />,
//       value: "2.5k",
//       label: "Views"
//     },
//     {
//       icon: <Heart className="w-5 h-5" />,
//       value: "180",
//       label: "Saved"
//     },
//     {
//       icon: <Clock className="w-5 h-5" />,
//       value: "4hr",
//       label: "Avg. Response"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Photo Gallery */}
//         <div className="mb-12">
//           <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
//             <div className="flex items-center justify-center h-full bg-gray-100">
//               {/* Previous Photo */}
//               {property.photos.length > 1 && (
//                 <div className="absolute left-0 w-1/4 h-full flex items-center justify-start opacity-30 blur-sm">
//                   <img
//                     src={property.photos[selectedPhoto === 0 ? property.photos.length - 1 : selectedPhoto - 1]}
//                     alt="Previous"
//                     className="object-cover h-[500px] w-full"
//                   />
//                 </div>
//               )}

//               {/* Current Photo */}
//               <div className="relative w-3/4 h-[600px] z-10">
//                 <img
//                   src={property.photos[selectedPhoto]}
//                   alt={`${property.title} - View ${selectedPhoto + 1}`}
//                   className="w-full h-full object-cover shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
//                 />
//               </div>

//               {/* Next Photo */}
//               {property.photos.length > 1 && (
//                 <div className="absolute right-0 w-1/4 h-full flex items-center justify-end opacity-30 blur-sm">
//                   <img
//                     src={property.photos[selectedPhoto === property.photos.length - 1 ? 0 : selectedPhoto + 1]}
//                     alt="Next"
//                     className="object-cover h-[500px] w-full"
//                   />
//                 </div>
//               )}

//               {/* Navigation Arrows */}
//               {property.photos.length > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrevious}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg z-20 transition-all duration-300 text-white"
//                     aria-label="Previous photo"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={handleNext}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg z-20 transition-all duration-300 text-white"
//                     aria-label="Next photo"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Thumbnail Gallery */}
//           <div className="flex gap-4 mt-6 overflow-x-auto pb-4 justify-center">
//             {property.photos.map((photo, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedPhoto(index)}
//                 className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105
//                 ${selectedPhoto === index ? "ring-4 ring-blue-500 scale-110" : "opacity-70 hover:opacity-100"}`}
//               >
//                 <img
//                   src={photo}
//                   alt={`${property.title} thumbnail ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Property Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {propertyStats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                   <p className="text-xs text-gray-400">{stat.subtext}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Booking Stats */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Property Performance</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {bookingStats.map((stat, index) => (
//               <div key={index} className="text-center p-4 rounded-xl bg-gray-50">
//                 <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-3">
//                   {stat.icon}
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-sm text-gray-500">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Main Content Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Title and Price */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 {property.title}
//               </h1>
//               <p className="text-3xl font-bold text-red-600">
//                 ${property.price} <span className="text-lg text-gray-500 font-normal">/ night</span>
//               </p>
//             </div>

//             {/* Description */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-6">About this property</h2>
//               <p className="text-gray-600 leading-relaxed text-lg">
//                 {property.description}
//               </p>
//             </div>

//             {/* Features */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-6">Property Features</h2>
//               <div className="grid grid-cols-2 gap-6">
//                 {property.features?.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                     <span className="text-gray-700 text-lg">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Host Information */}
//             {seller && (
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold mb-6">About the Host</h2>
//                 <div className="flex items-center gap-6">
//                   {seller.profilePicture && (
//                     <img
//                       src={seller.profilePicture}
//                       alt={seller.fullName}
//                       className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold text-xl text-gray-900">{seller.fullName}</p>
//                     <p className="text-gray-600 text-lg">{seller.email}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Booking Column */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h3 className="text-2xl font-semibold mb-6">Book this property</h3>
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-lg">Price per night</span>
//                     <span className="text-2xl font-bold text-gray-900">${property.price}</span>
//                   </div>
//                   <button
//                     onClick={handleBookNow}
//                     className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isBookingOpen && (
//         <BookNowPopup productId={id} onClose={handleClosePopup} />
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;

// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import BookNowPopup from "./BookNow"; // استيراد مكون البوب أب
// import {
//   Star,
//   Users,
//   Map,
//   Calendar,
//   Eye,
//   Heart,
//   Clock
// } from "lucide-react";

// const PropertyDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();

//   // هنا نحمل بيانات العقار إما من الـ location.state أو نجلبها من الفايربيس
//   const [property, setProperty] = useState(location.state?.rental || null);
//   const [seller, setSeller] = useState(null);
//   const [selectedPhoto, setSelectedPhoto] = useState(0);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);

//   // جلب بيانات العقار من الفايربيس في حال لم يأتِ من الـ location.state
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

//   // جلب بيانات صاحب العقار (seller) في حال توفر الـ seller في الداتا
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

//   // التحكّم في عرض الصورة السابقة والقادمة
//   const handlePrevious = () => {
//     if (!property.photos || property.photos.length === 0) return;
//     setSelectedPhoto((prev) =>
//       prev === 0 ? property.photos.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     if (!property.photos || property.photos.length === 0) return;
//     setSelectedPhoto((prev) =>
//       prev === property.photos.length - 1 ? 0 : prev + 1
//     );
//   };

//   // لعرض وإغلاق نافذة الحجز (BookNowPopup)
//   const handleBookNow = () => {
//     setIsBookingOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsBookingOpen(false);
//   };

//   // في حال لم تصل بيانات العقار بعد
//   if (!property) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-pulse text-xl text-gray-600">
//           Loading property details...
//         </div>
//       </div>
//     );
//   }

//   // أمثلة على إحصائيات تُعرض في واجهة العقار
//   const propertyStats = [
//     {
//       icon: <Star className="w-6 h-6" />,
//       label: "Rating",
//       value: property.rating ? `${property.rating}/5` : "N/A",
//       subtext: "User rating"
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       label: "Date",
//       value: property.date || "Not specified",
//       subtext: "Available dates"
//     },
//     {
//       icon: <Map className="w-6 h-6" />,
//       label: "Location",
//       value: property.location || "No location",
//       subtext: ""
//     }
//   ];

//   // أمثلة على إحصائيات الحجز (يمكنك تخصيصها أو إزالتها)
//   const bookingStats = [
//     {
//       icon: <Calendar className="w-5 h-5" />,
//       value: "85%",
//       label: "Booking Rate"
//     },
//     {
//       icon: <Eye className="w-5 h-5" />,
//       value: "2.5k",
//       label: "Views"
//     },
//     {
//       icon: <Heart className="w-5 h-5" />,
//       value: "180",
//       label: "Saved"
//     },
//     {
//       icon: <Clock className="w-5 h-5" />,
//       value: "4hr",
//       label: "Avg. Response"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Photo Gallery */}
//         <div className="mb-12">
//           <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
//             <div className="flex items-center justify-center h-full bg-gray-100">
//               {/* Previous Photo (عينة اليسار) */}
//               {property.photos?.length > 1 && (
//                 <div className="absolute left-0 w-1/4 h-full flex items-center justify-start opacity-30 blur-sm">
//                   <img
//                     src={
//                       property.photos[
//                         selectedPhoto === 0
//                           ? property.photos.length - 1
//                           : selectedPhoto - 1
//                       ]
//                     }
//                     alt="Previous"
//                     className="object-cover h-[500px] w-full"
//                   />
//                 </div>
//               )}

//               {/* Current Photo */}
//               <div className="relative w-3/4 h-[600px] z-10">
//                 {property.photos && property.photos.length > 0 ? (
//                   <img
//                     src={property.photos[selectedPhoto]}
//                     alt={`${property.category} - Photo ${selectedPhoto + 1}`}
//                     className="w-full h-full object-cover shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-500">
//                     No photos available
//                   </div>
//                 )}
//               </div>

//               {/* Next Photo (عينة اليمين) */}
//               {property.photos?.length > 1 && (
//                 <div className="absolute right-0 w-1/4 h-full flex items-center justify-end opacity-30 blur-sm">
//                   <img
//                     src={
//                       property.photos[
//                         selectedPhoto === property.photos.length - 1
//                           ? 0
//                           : selectedPhoto + 1
//                       ]
//                     }
//                     alt="Next"
//                     className="object-cover h-[500px] w-full"
//                   />
//                 </div>
//               )}

//               {/* Navigation Arrows */}
//               {property.photos?.length > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrevious}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg z-20 transition-all duration-300 text-white"
//                     aria-label="Previous photo"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>

//                   <button
//                     onClick={handleNext}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg z-20 transition-all duration-300 text-white"
//                     aria-label="Next photo"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Thumbnail Gallery */}
//           {property.photos && property.photos.length > 1 && (
//             <div className="flex gap-4 mt-6 overflow-x-auto pb-4 justify-center">
//               {property.photos.map((photo, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedPhoto(index)}
//                   className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105
//                   ${
//                     selectedPhoto === index
//                       ? "ring-4 ring-blue-500 scale-110"
//                       : "opacity-70 hover:opacity-100"
//                   }`}
//                 >
//                   <img
//                     src={photo}
//                     alt={`${property.category} thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Property Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {propertyStats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stat.value}
//                   </p>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                   {stat.subtext && (
//                     <p className="text-xs text-gray-400">{stat.subtext}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Booking Stats (عينة) */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
//           <h2 className="text-2xl font-semibold mb-6">Property Performance</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {bookingStats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="text-center p-4 rounded-xl bg-gray-50"
//               >
//                 <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-3">
//                   {stat.icon}
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-sm text-gray-500">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Main Content Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Category و Price */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 {property.category}
//               </h1>
//               <p className="text-3xl font-bold text-red-600">
//                 ${property.price}{" "}
//                 <span className="text-lg text-gray-500 font-normal">
//                   / night
//                 </span>
//               </p>
//             </div>

//             {/* Date (مثال) */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-6">Booking Dates</h2>
//               <p className="text-gray-600 leading-relaxed text-lg">
//                 {property.date || "No date specified"}
//               </p>
//             </div>

//             {/* يمكن إضافة حقل للوصف لاحقًا إن توفّر لديك في الداتا
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-6">Description</h2>
//               <p className="text-gray-600 leading-relaxed text-lg">
//                 {property.description || "No description available"}
//               </p>
//             </div> */}

//             {/* Host Information */}
//             {seller && (
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold mb-6">About the Host</h2>
//                 <div className="flex items-center gap-6">
//                   {seller.profilePicture && (
//                     <img
//                       src={seller.profilePicture}
//                       alt={seller.fullName}
//                       className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold text-xl text-gray-900">
//                       {seller.fullName}
//                     </p>
//                     <p className="text-gray-600 text-lg">{seller.email}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Booking Column */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h3 className="text-2xl font-semibold mb-6">
//                   Book this property
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-lg">
//                       Price per night
//                     </span>
//                     <span className="text-2xl font-bold text-gray-900">
//                       ${property.price}
//                     </span>
//                   </div>
//                   <button
//                     onClick={handleBookNow}
//                     className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isBookingOpen && (
//         <BookNowPopup productId={id} onClose={handleClosePopup} />
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;

// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import BookNowPopup from "./BookNow";
// import { Star, Users, Map, Calendar, Eye, Heart, Clock } from "lucide-react";

// const PropertyDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();

//   const [property, setProperty] = useState(location.state?.rental || null);
//   const [seller, setSeller] = useState(null);
//   const [selectedPhoto, setSelectedPhoto] = useState(0);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [isMapOpen, setIsMapOpen] = useState(false); // ✅ حالة فتح الخريطة

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

//   const handleBookNow = () => {
//     setIsBookingOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsBookingOpen(false);
//   };

//   // ✅ فتح وإغلاق نافذة الخريطة
//   const handleOpenMap = () => {
//     setIsMapOpen(true);
//   };

//   const handleCloseMap = () => {
//     setIsMapOpen(false);
//   };

//   if (!property) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-pulse text-xl text-gray-600">
//           Loading property details...
//         </div>
//       </div>
//     );
//   }

//   const propertyStats = [
//     {
//       icon: <Star className="w-6 h-6" />,
//       label: "Rating",
//       value: property.rating ? `${property.rating}/5` : "N/A",
//       subtext: "User rating",
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       label: "Date",
//       value: property.date || "Not specified",
//       subtext: "Available dates",
//     },
//     {
//       icon: <Map className="w-6 h-6" />,
//       label: "Location",
//       value: (
//         <button
//           onClick={handleOpenMap}
//           className="text-blue-600 underline hover:text-blue-800 transition-all"
//         >
//           {property.location || "No location"}
//         </button>
//       ),
//       subtext: "",
//     },
//   ];

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {propertyStats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stat.value}
//                   </p>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                   {stat.subtext && (
//                     <p className="text-xs text-gray-400">{stat.subtext}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {seller && (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-semibold mb-6">About the Host</h2>
//             <div className="flex items-center gap-6">
//               {seller.profilePicture && (
//                 <img
//                   src={seller.profilePicture}
//                   alt={seller.fullName}
//                   className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
//                 />
//               )}
//               <div>
//                 <p className="font-semibold text-xl text-gray-900">
//                   {seller.fullName}
//                 </p>
//                 <p className="text-gray-600 text-lg">{seller.email}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {isBookingOpen && (
//         <BookNowPopup productId={id} onClose={handleClosePopup} />
//       )}

//       {/* ✅ نافذة خريطة Google */}
//       {isMapOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl relative">
//             <button
//               onClick={handleCloseMap}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">Property Location</h2>
//             <div className="w-full h-96">
//               <iframe
//                 className="w-full h-full rounded-lg"
//                 src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ&q=${encodeURIComponent(
//                   property.location
//                 )}`}
//                 allowFullScreen
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;

// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { database } from "../../fireBaseConfig";
// import BookNowPopup from "./BookNow";
// import { Star, Users, Map } from "lucide-react";

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
//         <div className="animate-pulse text-xl text-gray-600">
//           Loading property details...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
//                 <Star className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {property.rating ? `${property.rating}/5` : "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500">User rating</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
//                 <Users className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {property.date || "Not specified"}
//                 </p>
//                 <p className="text-sm text-gray-500">Available dates</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {property.photos && property.photos.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-semibold mb-6">Property Photos</h2>
//             <div className="flex flex-col items-center gap-4">
//               <img
//                 src={property.photos[selectedPhoto]}
//                 alt="Property"
//                 className="w-full max-w-lg rounded-lg shadow-md"
//               />
//               <div className="flex gap-2 overflow-x-auto">
//                 {property.photos.map((photo, index) => (
//                   <img
//                     key={index}
//                     src={photo}
//                     alt={`Thumbnail ${index}`}
//                     className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
//                       selectedPhoto === index ? "ring-4 ring-blue-500" : ""
//                     }`}
//                     onClick={() => setSelectedPhoto(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {isMapOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl relative">
//             <button
//               onClick={() => setIsMapOpen(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">Property Location</h2>
//             <div className="w-full h-96">
//               <iframe
//                 className="w-full h-full rounded-lg"
//                 src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ&q=${encodeURIComponent(
//                   property.location
//                 )}`}
//                 allowFullScreen
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;

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
