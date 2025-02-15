// // // // import React from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { setFormData } from "../../redux/FormSlice";
// // // // import { getDatabase, ref, set } from "firebase/database";
// // // // import { useForm } from "react-hook-form";
// // // // import { ToastContainer, toast } from "react-toastify";
// // // // import "react-toastify/dist/ReactToastify.css";

// // // // // const parseAvailableDates = (dateString, year = 2025) => {
// // // // //   const [month, days] = dateString.split(" ");
// // // // //   const [startDay, endDay] = days.split("-");
// // // // //   const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
// // // // //   const startDate = new Date(year, monthIndex, parseInt(startDay, 10));
// // // // //   const endDate = new Date(year, monthIndex, parseInt(endDay, 10));
// // // // //   return { startDate, endDate };
// // // // // };


// // // // const parseAvailableDates = (dateString) => {
// // // //   if (!dateString || typeof dateString !== "string") {
// // // //     return "Invalid Date Range"; // ✅ منع الأخطاء إذا كان التاريخ غير متاح
// // // //   }

// // // //   // تحويل النص إلى كائن تاريخ
// // // //   const startDate = new Date(dateString);
// // // //   if (isNaN(startDate.getTime())) {
// // // //     return "Invalid Date Range"; // ✅ منع الأخطاء إذا كان التاريخ غير صالح
   
    
// // // //   }
// // // //   console.log(startDate.getTime());

// // // //   // إنشاء تاريخ النهاية بعد سنة واحدة
// // // //   const endDate = new Date(startDate);
// // // //   console.log(endDate);

// // // //   endDate.setFullYear(startDate.getFullYear() + 1);

// // // //   // تنسيق اليوم والشهر والسنة بصيغة `DD/MM/YYYY`
// // // //   const formatDate = (date) =>
// // // //     `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

// // // //   return `range from ${formatDate(startDate)} to ${formatDate(endDate)}`;
// // // // };

// // // // const BookNowPopup = ({ productId, availableDates, onClose }) => {
// // // //   const dispatch = useDispatch();
// // // //   const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));
// // // //   const {
// // // //     register,
// // // //     handleSubmit,
// // // //     formState: { errors },
// // // //     watch,
// // // //   } = useForm({
// // // //     defaultValues: {
// // // //       fullName: "",
// // // //       idType: "National ID",
// // // //       idNumber: "",
// // // //       startDate: "",
// // // //       endDate: "",
// // // //       numGuests: "",
// // // //       phoneNumber: "",
// // // //       address: "",
// // // //       status: "pending",
// // // //       userId: userId,
// // // //       productId: productId,
// // // //     },
// // // //   });

// // // //   const startDate = watch("startDate");
// // // //   const { startDate: startAvailableDate, endDate: endAvailableDate } = parseAvailableDates(availableDates, 2025);

// // // //   const validateDateRange = (date) => {
// // // //     if (!date) {
// // // //       toast.error("Please select a date");
// // // //       return false;
// // // //     }
// // // //     const selectedDate = new Date(date);
// // // //     if (isNaN(selectedDate.getTime())) {
// // // //       toast.error("Invalid date");
// // // //       return false;
// // // //     }
// // // //     if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
// // // //       toast.error("The selected date is booked. Please choose a date within the available range.");
// // // //       return false;
// // // //     }
// // // //     return true;
// // // //   };

// // // //   const validateEndDate = (endDate) => {
// // // //     if (!startDate) {
// // // //       toast.error("Please select the start date first");
// // // //       return false;
// // // //     }
// // // //     const startDateValue = new Date(startDate);
// // // //     const endDateValue = new Date(endDate);
// // // //     if (endDateValue < startDateValue) {
// // // //       toast.error("End date must be after or equal to the start date");
// // // //       return false;
// // // //     }
// // // //     return true;
// // // //   };

// // // //   const onSubmit = (data) => {
// // // //     const db = getDatabase();
// // // //     const formRef = ref(db, "formData/" + new Date().getTime());
// // // //     dispatch(setFormData(data));
// // // //     set(formRef, data)
// // // //       .then(() => {
// // // //         toast.success("Data saved successfully!");
// // // //         onClose();
// // // //       })
// // // //       .catch((error) => {
// // // //         toast.error("Error saving data: " + error.message);
// // // //       });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <ToastContainer
// // // //         position="top-right"
// // // //         autoClose={3000}
// // // //         hideProgressBar={false}
// // // //         newestOnTop={false}
// // // //         closeOnClick
// // // //         rtl={true}
// // // //         pauseOnFocusLoss
// // // //         draggable
// // // //         pauseOnHover
// // // //       />
// // // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //         <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
// // // //           <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">✕</button>
// // // //           <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>
// // // //           <p className="text-lg text-gray-600 text-center mb-6">Please provide your details to complete the booking</p>
// // // //           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // // //             <input 
// // // //               type="text" 
// // // //               {...register("fullName", { 
// // // //                 required: {
// // // //                   value: true,
// // // //                   message: "Full name is required"
// // // //                 }
// // // //               })} 
// // // //               placeholder="Full Name" 
// // // //               className="p-4 border rounded-lg w-full" 
// // // //               onBlur={(e) => {
// // // //                 if (!e.target.value) {
// // // //                   toast.error("Full name is required");
// // // //                 }
// // // //                 e.target.reportValidity();
// // // //               }}
// // // //             />
// // // //             <input 
// // // //               type="text" 
// // // //               {...register("idNumber", { 
// // // //                 required: {
// // // //                   value: true,
// // // //                   message: "ID Number is required"
// // // //                 }
// // // //               })} 
// // // //               placeholder="ID Number" 
// // // //               className="p-4 border rounded-lg w-full" 
// // // //               onBlur={(e) => {
// // // //                 if (!e.target.value) {
// // // //                   toast.error("ID Number is required");
// // // //                 }
// // // //                 e.target.reportValidity();
// // // //               }}
// // // //             />
// // // //             <input 
// // // //               type="number" 
// // // //               {...register("numGuests", { 
// // // //                 required: {
// // // //                   value: true,
// // // //                   message: "Number of guests is required"
// // // //                 }
// // // //               })} 
// // // //               placeholder="Number of Guests" 
// // // //               className="p-4 border rounded-lg w-full" 
// // // //               onBlur={(e) => {
// // // //                 if (!e.target.value) {
// // // //                   toast.error("Number of guests is required");
// // // //                 }
// // // //                 e.target.reportValidity();
// // // //               }}
// // // //             />
// // // //             <input 
// // // //               type="text" 
// // // //               {...register("phoneNumber", { 
// // // //                 required: {
// // // //                   value: true,
// // // //                   message: "Phone Number is required"
// // // //                 }
// // // //               })} 
// // // //               placeholder="Phone Number" 
// // // //               className="p-4 border rounded-lg w-full" 
// // // //               onBlur={(e) => {
// // // //                 if (!e.target.value) {
// // // //                   toast.error("Phone Number is required");
// // // //                 }
// // // //                 e.target.reportValidity();
// // // //               }}
// // // //             />
// // // //             <input 
// // // //               type="text" 
// // // //               {...register("address", { 
// // // //                 required: {
// // // //                   value: true,
// // // //                   message: "Address is required"
// // // //                 }
// // // //               })} 
// // // //               placeholder="Address" 
// // // //               className="p-4 border rounded-lg w-full" 
// // // //               onBlur={(e) => {
// // // //                 if (!e.target.value) {
// // // //                   toast.error("Address is required");
// // // //                 }
// // // //                 e.target.reportValidity();
// // // //               }}
// // // //             />
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //               <input type="date" {...register("startDate", { required: "Start date is required", validate: { validDate: validateDateRange } })} className="p-4 border rounded-lg w-full" onBlur={(e) => e.target.reportValidity()} />
// // // //               <input type="date" {...register("endDate", { required: "End date is required", validate: { validDate: validateDateRange, validEndDate: validateEndDate } })} className="p-4 border rounded-lg w-full" onBlur={(e) => e.target.reportValidity()} />
// // // //             </div>
// // // //             <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">Confirm Booking</button>
// // // //           </form>
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default BookNowPopup;


// // // import React from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setFormData } from "../../redux/FormSlice";
// // // import { getDatabase, ref, set } from "firebase/database";
// // // import { useForm } from "react-hook-form";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const parseAvailableDates = (dateString) => {
// // //   if (!dateString || typeof dateString !== "string") {
// // //     return { startDate: null, endDate: null };
// // //   }

// // //   // تحويل النص إلى كائن تاريخ
// // //   const startDate = new Date(dateString);
// // //   if (isNaN(startDate.getTime())) {
// // //     return { startDate: null, endDate: null };
// // //   }

// // //   // إنشاء تاريخ النهاية بعد سنة واحدة
// // //   const endDate = new Date(startDate);
// // //   endDate.setFullYear(startDate.getFullYear() + 1);

// // //   return { startDate, endDate };
// // // };

// // // const BookNowPopup = ({ productId, availableDates, onClose }) => {
// // //   const dispatch = useDispatch();
// // //   const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors },
// // //     watch,
// // //   } = useForm({
// // //     defaultValues: {
// // //       fullName: "",
// // //       idType: "National ID",
// // //       idNumber: "",
// // //       startDate: "",
// // //       endDate: "",
// // //       numGuests: "",
// // //       phoneNumber: "",
// // //       address: "",
// // //       status: "pending",
// // //       userId: userId,
// // //       productId: productId,
// // //     },
// // //   });

// // //   const startDate = watch("startDate");
// // //   const { startDate: startAvailableDate, endDate: endAvailableDate } = parseAvailableDates(availableDates);

// // //   const validateDateRange = (date) => {
// // //     if (!date) {
// // //       return "Please select a date";
// // //     }

// // //     const selectedDate = new Date(date);
// // //     if (isNaN(selectedDate.getTime())) {
// // //       return "Invalid date";
// // //     }

// // //     if (!startAvailableDate || !endAvailableDate) {
// // //       return "No available dates";
// // //     }

// // //     if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
// // //       return `The selected date is out of range. Please choose a date between ${startAvailableDate.toLocaleDateString()} and ${endAvailableDate.toLocaleDateString()}`;
// // //     }

// // //     return true;
// // //   };

// // //   const validateEndDate = (endDate) => {
// // //     if (!startDate) {
// // //       return "Please select the start date first";
// // //     }

// // //     const startDateValue = new Date(startDate);
// // //     const endDateValue = new Date(endDate);

// // //     if (isNaN(startDateValue.getTime()) || isNaN(endDateValue.getTime())) {
// // //       return "Invalid date";
// // //     }

// // //     if (endDateValue < startDateValue) {
// // //       return "End date must be after or equal to the start date";
// // //     }

// // //     return true;
// // //   };

// // //   const onSubmit = (data) => {
// // //     const db = getDatabase();
// // //     const formRef = ref(db, "formData/" + new Date().getTime());
// // //     dispatch(setFormData(data));
// // //     set(formRef, data)
// // //       .then(() => {
// // //         toast.success("Data saved successfully!");
// // //         onClose();
// // //       })
// // //       .catch((error) => {
// // //         toast.error("Error saving data: " + error.message);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <ToastContainer position="top-right" autoClose={3000} />
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //         <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
// // //           <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">
// // //             ✕
// // //           </button>
// // //           <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>

// // //           {/* ✅ عرض نطاق التواريخ المتاحة */}
// // //           <p className="text-lg text-gray-600 text-center mb-6">
// // //             Available Dates: <strong>
// // //               {startAvailableDate && endAvailableDate
// // //                 ? `${startAvailableDate.toLocaleDateString()} to ${endAvailableDate.toLocaleDateString()}`
// // //                 : "No available dates"}
// // //             </strong>
// // //           </p>

// // //           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <input 
// // //               type="text" 
// // //               {...register("fullName", { required: "Full name is required" })} 
// // //               placeholder="Full Name" 
// // //               className="p-4 border rounded-lg w-full"
// // //             />
// // //             <input 
// // //               type="text" 
// // //               {...register("idNumber", { required: "ID Number is required" })} 
// // //               placeholder="ID Number" 
// // //               className="p-4 border rounded-lg w-full"
// // //             />
// // //             <input 
// // //               type="number" 
// // //               {...register("numGuests", { required: "Number of guests is required" })} 
// // //               placeholder="Number of Guests" 
// // //               className="p-4 border rounded-lg w-full"
// // //             />
// // //             <input 
// // //               type="text" 
// // //               {...register("phoneNumber", { required: "Phone Number is required" })} 
// // //               placeholder="Phone Number" 
// // //               className="p-4 border rounded-lg w-full"
// // //             />
// // //             <input 
// // //               type="text" 
// // //               {...register("address", { required: "Address is required" })} 
// // //               placeholder="Address" 
// // //               className="p-4 border rounded-lg w-full"
// // //             />

// // //             {/* ✅ حقول إدخال التواريخ */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <input
// // //                 type="date"
// // //                 {...register("startDate", { required: "Start date is required", validate: validateDateRange })}
// // //                 className="p-4 border rounded-lg w-full"
// // //               />
// // //               <input
// // //                 type="date"
// // //                 {...register("endDate", { required: "End date is required", validate: validateEndDate })}
// // //                 className="p-4 border rounded-lg w-full"
// // //               />
// // //             </div>

// // //             <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">
// // //               Confirm Booking
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default BookNowPopup;


// // // import React from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setFormData } from "../../redux/FormSlice";
// // // import { getDatabase, ref, set } from "firebase/database";
// // // import { useForm } from "react-hook-form";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const BookNowPopup = ({ productId, availableDates, onClose }) => {
// // //   const dispatch = useDispatch();
// // //   const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors },
// // //     watch,
// // //   } = useForm({
// // //     defaultValues: {
// // //       fullName: "",
// // //       idType: "National ID",
// // //       idNumber: "",
// // //       startDate: "",
// // //       endDate: "",
// // //       numGuests: "",
// // //       phoneNumber: "",
// // //       address: "",
// // //       status: "pending",
// // //       userId: userId,
// // //       productId: productId,
// // //     },
// // //   });

// // //   const startDate = watch("startDate");
// // //   const endDate = watch("endDate");

// // //   // تحويل `availableDates` إلى تاريخين يمكن مقارنتهما
// // //   const startAvailableDate = new Date(availableDates.startDate.split("/").reverse().join("-"));
// // //   const endAvailableDate = new Date(availableDates.endDate.split("/").reverse().join("-"));

// // //   // ✅ التحقق من أن `startDate` داخل النطاق المتاح
// // //   const validateStartDate = (date) => {
// // //     if (!date) {
// // //       return "Please select a start date";
// // //     }

// // //     const selectedDate = new Date(date);
// // //     if (isNaN(selectedDate.getTime())) {
// // //       return "Invalid start date";
// // //     }

// // //     if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
// // //       return `Start date is out of range. Please choose between ${availableDates.startDate} and ${availableDates.endDate}`;
// // //     }

// // //     return true;
// // //   };

// // //   // ✅ التحقق من أن `endDate` داخل النطاق وبعد `startDate`
// // //   const validateEndDate = (date) => {
// // //     if (!date) {
// // //       return "Please select an end date";
// // //     }

// // //     const selectedEndDate = new Date(date);
// // //     const selectedStartDate = new Date(startDate);

// // //     if (isNaN(selectedEndDate.getTime())) {
// // //       return "Invalid end date";
// // //     }

// // //     if (selectedEndDate < selectedStartDate) {
// // //       return "End date must be after or equal to the start date";
// // //     }

// // //     if (selectedEndDate > endAvailableDate) {
// // //       return `End date is out of range. Please choose a date between ${availableDates.startDate} and ${availableDates.endDate}`;
// // //     }

// // //     return true;
// // //   };

// // //   const onSubmit = (data) => {
// // //     const db = getDatabase();
// // //     const formRef = ref(db, "formData/" + new Date().getTime());

// // //     dispatch(setFormData(data));

// // //     set(formRef, data)
// // //       .then(() => {
// // //         toast.success("Booking request sent successfully!");
// // //         onClose();
// // //       })
// // //       .catch((error) => {
// // //         toast.error("Error saving booking request: " + error.message);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <ToastContainer position="top-right" autoClose={3000} />
// // //       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //         <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
// // //           <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">
// // //             ✕
// // //           </button>
// // //           <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>

// // //           {/* ✅ عرض نطاق التواريخ المتاحة */}
// // //           <p className="text-lg text-gray-600 text-center mb-6">
// // //             Available Dates: <strong>{availableDates.startDate} to {availableDates.endDate}</strong>
// // //           </p>

// // //           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <input type="text" {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" className="p-4 border rounded-lg w-full" />
// // //             <input type="text" {...register("idNumber", { required: "ID Number is required" })} placeholder="ID Number" className="p-4 border rounded-lg w-full" />
// // //             <input type="number" {...register("numGuests", { required: "Number of guests is required" })} placeholder="Number of Guests" className="p-4 border rounded-lg w-full" />
// // //             <input type="text" {...register("phoneNumber", { required: "Phone Number is required" })} placeholder="Phone Number" className="p-4 border rounded-lg w-full" />
// // //             <input type="text" {...register("address", { required: "Address is required" })} placeholder="Address" className="p-4 border rounded-lg w-full" />

// // //             {/* ✅ حقول إدخال التواريخ */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <input
// // //                 type="date"
// // //                 {...register("startDate", { required: "Start date is required", validate: validateStartDate })}
// // //                 className="p-4 border rounded-lg w-full"
// // //               />
// // //               <input
// // //                 type="date"
// // //                 {...register("endDate", { required: "End date is required", validate: validateEndDate })}
// // //                 className="p-4 border rounded-lg w-full"
// // //               />
// // //             </div>

// // //             <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">
// // //               Confirm Booking
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default BookNowPopup;

// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setFormData } from "../../redux/FormSlice";
// // import { getDatabase, ref, set } from "firebase/database";
// // import { useForm } from "react-hook-form";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const BookNowPopup = ({ productId, availableDates, onClose }) => {
// //   const dispatch = useDispatch();
// //   const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));
// //   const [loading, setLoading] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     watch,
// //     trigger,
// //   } = useForm({
// //     defaultValues: {
// //       fullName: "",
// //       idType: "National ID",
// //       idNumber: "",
// //       startDate: "",
// //       endDate: "",
// //       numGuests: "",
// //       phoneNumber: "",
// //       address: "",
// //       status: "pending",
// //       userId: userId,
// //       productId: productId,
// //     },
// //   });

// //   const startDate = watch("startDate");
// //   const endDate = watch("endDate");

// //   const startAvailableDate = new Date(availableDates.startDate.split("/").reverse().join("-"));
// //   const endAvailableDate = new Date(availableDates.endDate.split("/").reverse().join("-"));

// //   const validateStartDate = (date) => {
// //     if (!date) {
// //       toast.error("Please select a start date");
// //       return "Please select a start date";
// //     }
// //     const selectedDate = new Date(date);
// //     if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
// //       toast.error(`Start date must be between ${availableDates.startDate} and ${availableDates.endDate}`);
// //       return `Start date must be between ${availableDates.startDate} and ${availableDates.endDate}`;
// //     }
// //     return true;
// //   };

// //   const validateEndDate = (date) => {
// //     if (!date) {
// //       toast.error("Please select an end date");
// //       return "Please select an end date";
// //     }
// //     const selectedEndDate = new Date(date);
// //     const selectedStartDate = new Date(startDate);

// //     if (selectedEndDate < selectedStartDate) {
// //       toast.error("End date must be after or equal to the start date");
// //       return "End date must be after or equal to the start date";
// //     }

// //     if (selectedEndDate > endAvailableDate) {
// //       toast.error(`End date must be between ${availableDates.startDate} and ${availableDates.endDate}`);
// //       return `End date must be between ${availableDates.startDate} and ${availableDates.endDate}`;
// //     }

// //     return true;
// //   };

// //   const onSubmit = (data) => {
// //     setLoading(true);

// //     const db = getDatabase();
// //     const formRef = ref(db, "formData/" + new Date().getTime());

// //     dispatch(setFormData(data));

// //     set(formRef, data)
// //       .then(() => {
// //         toast.success("Booking request sent successfully!", { theme: "colored" });
// //         setLoading(false);
// //         onClose();
// //       })
// //       .catch((error) => {
// //         toast.error("Error saving booking request: " + error.message, { theme: "colored" });
// //         setLoading(false);
// //       });
// //   };

// //   return (
// //     <>
// //       <ToastContainer position="top-right" autoClose={3000} />
// //       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2">
// //         <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md relative">
// //           <button
// //             onClick={!loading ? onClose : null}
// //             className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-xl transition-all"
// //             disabled={loading}
// //           >
// //             ✕
// //           </button>
// //           <h2 className="text-xl font-bold mb-3 text-center text-gray-800">Villa Rental</h2>

// //           <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 text-sm">
// //             <p className="text-blue-800 text-center">
// //               Available: <span className="font-bold">{availableDates.startDate} - {availableDates.endDate}</span>
// //             </p>
// //           </div>

// //           <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
// //             <input
// //               type="text"
// //               {...register("fullName", { required: "Full name is required", maxLength: 50 })}
// //               placeholder="Full Name"
// //               className="p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //               onBlur={(e) => {
// //                 trigger("fullName");
// //                 if (!e.target.value) toast.error("Full name is required");
// //               }}
// //             />
// //             <input
// //               type="text"
// //               {...register("idNumber", { required: "ID Number is required", minLength: 8, maxLength: 20 })}
// //               placeholder="ID Number"
// //               className="p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //               onBlur={(e) => {
// //                 trigger("idNumber");
// //                 if (!e.target.value) toast.error("ID Number is required");
// //               }}
// //             />
// //             <div className="grid grid-cols-2 gap-3">
// //               <input
// //                 type="number"
// //                 {...register("numGuests", { required: "Number of guests is required", min: 1, max: 20 })}
// //                 placeholder="Number of Guests"
// //                 className="p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //                 onBlur={(e) => {
// //                   trigger("numGuests");
// //                   if (!e.target.value) toast.error("Number of guests is required");
// //                 }}
// //               />
// //               <input
// //                 type="text"
// //                 {...register("phoneNumber", { required: "Phone Number is required", pattern: /^[0-9]{8,15}$/ })}
// //                 placeholder="Phone Number"
// //                 className="p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //                 onBlur={(e) => {
// //                   trigger("phoneNumber");
// //                   if (!e.target.value) toast.error("Phone Number is required");
// //                 }}
// //               />
// //             </div>
// //             <input
// //               type="text"
// //               {...register("address", { required: "Address is required", maxLength: 100 })}
// //               placeholder="Address"
// //               className="p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //               onBlur={(e) => {
// //                 trigger("address");
// //                 if (!e.target.value) toast.error("Address is required");
// //               }}
// //             />

// //             <div className="grid grid-cols-2 gap-3">
// //               <div>
// //                 <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
// //                 <input
// //                   type="date"
// //                   {...register("startDate", { required: "Start date is required", validate: validateStartDate })}
// //                   className="p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //                   onBlur={(e) => {
// //                     trigger("startDate");
// //                     if (!e.target.value) toast.error("Start date is required");
// //                   }}
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
// //                 <input
// //                   type="date"
// //                   {...register("endDate", { required: "End date is required", validate: validateEndDate })}
// //                   className="p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
// //                   onBlur={(e) => {
// //                     trigger("endDate");
// //                     if (!e.target.value) toast.error("End date is required");
// //                   }}
// //                 />
// //               </div>
// //             </div>

// //             <button 
// //               type="submit" 
// //               className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
// //               disabled={loading}
// //             >
// //               {loading ? 
// //                 <div className="flex items-center justify-center">
// //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   Processing...
// //                 </div> : 
// //                 "Confirm Booking"
// //               }
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default BookNowPopup;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setFormData } from "../../redux/FormSlice";
// import { getDatabase, ref, set, get } from "firebase/database";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BookNowPopup = ({ productId, availableDates, onClose }) => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null); // ✅ تخزين بيانات المستخدم

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue, // ✅ لاستخدامه في ملء القيم تلقائيًا
//     trigger,
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       idNumber: "",
//       numGuests: "",
//       phoneNumber: "",
//       address: "",
//       startDate: "",
//       endDate: "",
//       status: "pending",
//       userId: userId,
//       productId: productId,
//     },
//   });

//   // ✅ جلب بيانات المستخدم من Firebase
//   useEffect(() => {
//     if (userId) {
//       const db = getDatabase();
//       const userRef = ref(db, `users/${userId}`);

//       get(userRef)
//         .then((snapshot) => {
//           if (snapshot.exists()) {
//             const data = snapshot.val();
//             setUserData(data);
//             // ✅ تعبئة الحقول تلقائيًا
//             setValue("fullName", data.fullName || "");
//             setValue("phoneNumber", data.phone || "");
//             setValue("address", data.address || "");
//             setValue("numGuests", data.numGuests || ""); 
//           } else {
//             console.warn("No user data found.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//         });
//     }
//   }, [userId, setValue]);

//   const startDate = watch("startDate");
//   const endDate = watch("endDate");

//   const startAvailableDate = new Date(availableDates.startDate.split("/").reverse().join("-"));
//   const endAvailableDate = new Date(availableDates.endDate.split("/").reverse().join("-"));

//   const validateStartDate = (date) => {
//     if (!date) {
//       toast.error("Please select a start date");
//       return "Please select a start date";
//     }
//     const selectedDate = new Date(date);
//     if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
//       toast.error(`Start date must be between ${availableDates.startDate} and ${availableDates.endDate}`);
//       return `Start date must be between ${availableDates.startDate} and ${availableDates.endDate}`;
//     }
//     return true;
//   };

//   const validateEndDate = (date) => {
//     if (!date) {
//       toast.error("Please select an end date");
//       return "Please select an end date";
//     }
//     const selectedEndDate = new Date(date);
//     const selectedStartDate = new Date(startDate);

//     if (selectedEndDate < selectedStartDate) {
//       toast.error("End date must be after or equal to the start date");
//       return "End date must be after or equal to the start date";
//     }

//     if (selectedEndDate > endAvailableDate) {
//       toast.error(`End date must be between ${availableDates.startDate} and ${availableDates.endDate}`);
//       return `End date must be between ${availableDates.startDate} and ${availableDates.endDate}`;
//     }

//     return true;
//   };

//   const onSubmit = (data) => {
//     setLoading(true);

//     const db = getDatabase();
//     const formRef = ref(db, "formData/" + new Date().getTime());

//     dispatch(setFormData(data));

//     set(formRef, data)
//       .then(() => {
//         toast.success("Booking request sent successfully!", { theme: "colored" });
//         setLoading(false);
//         onClose();
//       })
//       .catch((error) => {
//         toast.error("Error saving booking request: " + error.message, { theme: "colored" });
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2">
//         <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md relative">
//           <button
//             onClick={!loading ? onClose : null}
//             className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-xl transition-all"
//             disabled={loading}
//           >
//             ✕
//           </button>
//           <h2 className="text-xl font-bold mb-3 text-center text-gray-800">Villa Rental</h2>

//           <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 text-sm">
//             <p className="text-blue-800 text-center">
//               Available: <span className="font-bold">{availableDates.startDate} - {availableDates.endDate}</span>
//             </p>
//           </div>

//           <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" {...register("fullName")} placeholder="Full Name" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />
//             <input type="text" {...register("idNumber")} placeholder="ID Number" className="p-3 border border-gray-300 rounded-lg w-full text-sm"  />
//             <input type="number" {...register("numGuests", { min: 1, max: 50 })} placeholder="Number of Guests" className="p-3 border border-gray-300 rounded-lg w-full text-sm" />

//             <input type="text" {...register("phoneNumber")} placeholder="Phone Number" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />
//             <input type="text" {...register("address")} placeholder="Address" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
//                 <input type="date" {...register("startDate", { validate: validateStartDate })} className="p-2 border border-gray-300 rounded-lg w-full text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
//                 <input type="date" {...register("endDate", { validate: validateEndDate })} className="p-2 border border-gray-300 rounded-lg w-full text-sm" />
//               </div>
//             </div>

//             <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4" disabled={loading}>
//               {loading ? "Processing..." : "Confirm Booking"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookNowPopup;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/FormSlice";
import { getDatabase, ref, set, get } from "firebase/database";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookNowPopup = ({ productId, startDate, endDate, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // ✅ تخزين بيانات المستخدم

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // ✅ لاستخدامه في ملء القيم تلقائيًا
  } = useForm({
    defaultValues: {
      fullName: "",
      idNumber: "",
      numGuests: "",
      phoneNumber: "",
      address: "",
      startDate: "",
      endDate: "",
      status: "pending",
      userId: userId,
      productId: productId,
    },
  });

  // ✅ تعبئة بيانات المستخدم تلقائيًا عند تحميل المكون
  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
            // ✅ تعبئة الحقول تلقائيًا
            setValue("fullName", data.fullName || "");
            setValue("phoneNumber", data.phone || "");
            setValue("address", data.address || "");
            setValue("numGuests", data.numGuests || ""); 
          } else {
            console.warn("No user data found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId, setValue]);

  // ✅ تعبئة التواريخ المختارة تلقائيًا
  useEffect(() => {
    if (startDate && endDate) {
      setValue("startDate", startDate.toISOString().split("T")[0]);
      setValue("endDate", endDate.toISOString().split("T")[0]);
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = (data) => {
    setLoading(true);

    const db = getDatabase();
    const formRef = ref(db, "formData/" + new Date().getTime());

    dispatch(setFormData(data));

    set(formRef, data)
      .then(() => {
        toast.success("Booking request sent successfully!", { theme: "colored" });
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        toast.error("Error saving booking request: " + error.message, { theme: "colored" });
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2">
        <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md relative">
          <button
            onClick={!loading ? onClose : null}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-xl transition-all"
            disabled={loading}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-3 text-center text-gray-800">Villa Rental</h2>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 text-sm">
            <p className="text-blue-800 text-center">
              Selected: <span className="font-bold">{startDate.toDateString()} - {endDate.toDateString()}</span>
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("fullName")} placeholder="Full Name" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />
            <input type="text" {...register("idNumber")} placeholder="ID Number" className="p-3 border border-gray-300 rounded-lg w-full text-sm"  />
            <input type="number" {...register("numGuests", { min: 1, max: 50 })} placeholder="Number of Guests" className="p-3 border border-gray-300 rounded-lg w-full text-sm" />

            <input type="text" {...register("phoneNumber")} placeholder="Phone Number" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />
            <input type="text" {...register("address")} placeholder="Address" className="p-3 border border-gray-300 rounded-lg w-full text-sm" readOnly />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" {...register("startDate")} className="p-2 border border-gray-300 rounded-lg w-full text-sm" readOnly />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" {...register("endDate")} className="p-2 border border-gray-300 rounded-lg w-full text-sm" readOnly />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookNowPopup;
