// // // import React from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setFormData } from "../../redux/FormSlice";
// // // import { getDatabase, ref, set } from "firebase/database";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import { useForm } from "react-hook-form";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const FormPage = ({ productId }) => {
// // //   const dispatch = useDispatch();
// // //   const userId = useSelector((state) =>
// // //     state.auth.user ? state.auth.user.uid : null
// // //   );
// // // //   const productId = useSelector((state) =>
// // // //     state.product ? state.product.productId : null
// // // //   );

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

// // //   const onSubmit = (data) => {
// // //     const db = getDatabase();
// // //     const formRef = ref(db, "formData/" + new Date().getTime());

// // //     dispatch(setFormData(data));

// // //     set(formRef, data)
// // //       .then(() => {
// // //         toast.success("Form data saved successfully!");
// // //       })
// // //       .catch((error) => {
// // //         toast.error("Error saving data: " + error.message);
// // //       });
// // //   };

// // //   const inputClasses =
// // //     "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition duration-200";
// // //   const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
// // //   const errorClasses = "text-red-500 text-sm mt-1";

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="bg-white rounded-2xl shadow-xl p-8">
// // //           <div className="text-center mb-10">
// // //             <h1 className="text-4xl font-bold text-gray-900 mb-3">
// // //               Villa Rental Information
// // //             </h1>
// // //             <p className="text-lg text-gray-600">
// // //               Please provide your details to complete the booking
// // //             </p>
// // //           </div>

// // //           <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //               {/* Full Name Field */}
// // //               <div>
// // //                 <label className={labelClasses}>Full Name</label>
// // //                 <input
// // //                   className={`${inputClasses} ${
// // //                     errors.fullName ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("fullName", {
// // //                     required: "Full name is required",
// // //                     minLength: {
// // //                       value: 3,
// // //                       message: "Name must be at least 3 characters",
// // //                     },
// // //                     pattern: {
// // //                       value: /^[a-zA-Z\s]*$/,
// // //                       message: "Name should only contain letters",
// // //                     },
// // //                   })}
// // //                   placeholder="Your Full Name"
// // //                 />
// // //                 {errors.fullName && (
// // //                   <p className={errorClasses}>{errors.fullName.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* ID Type Field */}
// // //               <div>
// // //                 <label className={labelClasses}>ID Type</label>
// // //                 <select
// // //                   className={inputClasses}
// // //                   {...register("idType", { required: "ID Type is required" })}
// // //                 >
// // //                   <option value="National ID">National ID</option>
// // //                   <option value="Passport">Passport</option>
// // //                 </select>
// // //                 {errors.idType && (
// // //                   <p className={errorClasses}>{errors.idType.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* ID Number Field */}
// // //               <div>
// // //                 <label className={labelClasses}>ID Number</label>
// // //                 <input
// // //                   className={`${inputClasses} ${
// // //                     errors.idNumber ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("idNumber", {
// // //                     required: "ID Number is required",
// // //                     minLength: {
// // //                       value: 10,
// // //                       message: "ID Number must be at least 10 characters",
// // //                     },
// // //                   })}
// // //                   placeholder="Enter your ID Number"
// // //                 />
// // //                 {errors.idNumber && (
// // //                   <p className={errorClasses}>{errors.idNumber.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* Phone Number Field */}
// // //               <div>
// // //                 <label className={labelClasses}>Phone Number</label>
// // //                 <input
// // //                   className={`${inputClasses} ${
// // //                     errors.phoneNumber ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("phoneNumber", {
// // //                     required: "Phone number is required",
// // //                     pattern: {
// // //                       value: /^[0-9]{10}$/,
// // //                       message: "Please enter a valid 10-digit phone number",
// // //                     },
// // //                   })}
// // //                   placeholder="Enter your phone number"
// // //                 />
// // //                 {errors.phoneNumber && (
// // //                   <p className={errorClasses}>{errors.phoneNumber.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* Start Date Field */}
// // //               <div>
// // //                 <label className={labelClasses}>Start Date</label>
// // //                 <input
// // //                   type="date"
// // //                   className={`${inputClasses} ${
// // //                     errors.startDate ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("startDate", {
// // //                     required: "Start date is required",
// // //                     validate: (value) =>
// // //                       new Date(value) >= new Date().setHours(0, 0, 0, 0) ||
// // //                       "Start date must be today or later",
// // //                   })}
// // //                 />
// // //                 {errors.startDate && (
// // //                   <p className={errorClasses}>{errors.startDate.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* End Date Field */}
// // //               <div>
// // //                 <label className={labelClasses}>End Date</label>
// // //                 <input
// // //                   type="date"
// // //                   className={`${inputClasses} ${
// // //                     errors.endDate ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("endDate", {
// // //                     required: "End date is required",
// // //                     validate: (value) =>
// // //                       !startDate ||
// // //                       new Date(value) >= new Date(startDate) ||
// // //                       "End date must be after start date",
// // //                   })}
// // //                 />
// // //                 {errors.endDate && (
// // //                   <p className={errorClasses}>{errors.endDate.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* Number of Guests Field */}
// // //               <div>
// // //                 <label className={labelClasses}>Number of Guests</label>
// // //                 <input
// // //                   type="number"
// // //                   className={`${inputClasses} ${
// // //                     errors.numGuests ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("numGuests", {
// // //                     required: "Number of guests is required",
// // //                     min: {
// // //                       value: 1,
// // //                       message: "Minimum 1 guest required",
// // //                     },
// // //                     max: {
// // //                       value: 10,
// // //                       message: "Maximum 10 guests allowed",
// // //                     },
// // //                   })}
// // //                   placeholder="e.g., 4"
// // //                 />
// // //                 {errors.numGuests && (
// // //                   <p className={errorClasses}>{errors.numGuests.message}</p>
// // //                 )}
// // //               </div>

// // //               {/* Address Field */}
// // //               <div className="md:col-span-2">
// // //                 <label className={labelClasses}>Address</label>
// // //                 <input
// // //                   className={`${inputClasses} ${
// // //                     errors.address ? "border-red-500" : ""
// // //                   }`}
// // //                   {...register("address", {
// // //                     required: "Address is required",
// // //                     minLength: {
// // //                       value: 10,
// // //                       message: "Address must be at least 10 characters",
// // //                     },
// // //                   })}
// // //                   placeholder="Your current address"
// // //                 />
// // //                 {errors.address && (
// // //                   <p className={errorClasses}>{errors.address.message}</p>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div className="mt-10">
// // //               <button
// // //                 type="submit"
// // //                 className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// // //               >
// // //                 Confirm Booking
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // };

// // // export default FormPage;


// // import React from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setFormData } from "../../redux/FormSlice";
// // import { getDatabase, ref, set } from "firebase/database";
// // import { ToastContainer, toast } from "react-toastify";
// // import { useForm } from "react-hook-form";
// // import "react-toastify/dist/ReactToastify.css";

// // const FormPopup = ({ productId, onClose }) => {
// //   const dispatch = useDispatch();
// //   const userId = useSelector((state) => state.auth.user?.uid || null);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     watch,
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

// //   const onSubmit = (data) => {
// //     const db = getDatabase();
// //     const formRef = ref(db, "formData/" + new Date().getTime());

// //     dispatch(setFormData(data));

// //     set(formRef, data)
// //       .then(() => {
// //         toast.success("Form data saved successfully!");
// //         onClose();
// //       })
// //       .catch((error) => {
// //         toast.error("Error saving data: " + error.message);
// //       });
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
// //         >
// //           ✕
// //         </button>
// //         <h2 className="text-2xl font-semibold mb-6 text-center">Villa Rental Information</h2>
// //         <p className="text-lg text-gray-600 text-center mb-4">
// //           Please provide your details to complete the booking
// //         </p>
// //         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <input {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" className="p-3 border rounded w-full" />
// //             <select {...register("idType")} className="p-3 border rounded w-full">
// //               <option value="National ID">National ID</option>
// //               <option value="Passport">Passport</option>
// //             </select>
// //             <input {...register("idNumber", { required: "ID Number is required" })} placeholder="ID Number" className="p-3 border rounded w-full" />
// //             <input {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Phone Number" className="p-3 border rounded w-full" />
// //             <input type="date" {...register("startDate", { required: "Start date is required" })} className="p-3 border rounded w-full" />
// //             <input type="date" {...register("endDate", { required: "End date is required" })} className="p-3 border rounded w-full" />
// //             <input type="number" {...register("numGuests", { required: "Number of guests is required" })} placeholder="Number of Guests" className="p-3 border rounded w-full" />
// //             <input {...register("address", { required: "Address is required" })} placeholder="Address" className="p-3 border rounded w-full" />
// //           </div>
// //           <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
// //             Confirm Booking
// //           </button>
// //         </form>
// //         <ToastContainer />
// //       </div>
// //     </div>
// //   );
// // };

// // export default FormPopup;


// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setFormData } from "../../redux/FormSlice";
// import { getDatabase, ref, set } from "firebase/database";
// import { ToastContainer, toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import "react-toastify/dist/ReactToastify.css";

// const FormPopup = ({ productId, onClose }) => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.user ? state.auth.user.uid : null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       idType: "National ID",
//       idNumber: "",
//       startDate: "",
//       endDate: "",
//       numGuests: "",
//       phoneNumber: "",
//       address: "",
//       status: "pending",
//       userId: userId,
//       productId: productId,
//     },
//   });

//   const startDate = watch("startDate");

//   const onSubmit = (data) => {
//     const db = getDatabase();
//     const formRef = ref(db, "formData/" + new Date().getTime());

//     dispatch(setFormData(data));

//     set(formRef, data)
//       .then(() => {
//         toast.success("Form data saved successfully!");
//         onClose();
//       })
//       .catch((error) => {
//         toast.error("Error saving data: " + error.message);
//       });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
//         >
//           ✕
//         </button>
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>
//         <p className="text-lg text-gray-600 text-center mb-6">
//           Please provide your details to complete the booking
//         </p>
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <select {...register("idType")} className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
//               <option value="National ID">National ID</option>
//               <option value="Passport">Passport</option>
//             </select>
//             <input {...register("idNumber", { required: "ID Number is required" })} placeholder="ID Number" className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <input {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Phone Number" className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <input type="date" {...register("startDate", { required: "Start date is required" })} className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <input type="date" {...register("endDate", { required: "End date is required" })} className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <input type="number" {...register("numGuests", { required: "Number of guests is required" })} placeholder="Number of Guests" className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             <input {...register("address", { required: "Address is required" })} placeholder="Address" className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//           </div>
//           <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">
//             Confirm Booking
//           </button>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default FormPopup;


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/FormSlice";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

const BookNowPopup = ({ productId, availableDates, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => (state.auth.user ? state.auth.user.uid : null));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      idType: "National ID",
      idNumber: "",
      startDate: "",
      endDate: "",
      numGuests: "",
      phoneNumber: "",
      address: "",
      status: "pending",
      userId: userId,
      productId: productId,
    },
  });

  const startDate = watch("startDate");

  // تحويل التواريخ المحددة إلى كائنات Date
  const [startAvailableDate, endAvailableDate] = availableDates
    .split("-")
    .map((date) => new Date(date.trim()));

  // تحقق من أن التواريخ المدخلة ضمن الفترة المتاحة
  const validateDateRange = (date) => {
    const selectedDate = new Date(date);
    return (
      (selectedDate >= startAvailableDate && selectedDate <= endAvailableDate) ||
      "Date must be within the available period"
    );
  };

  // تحقق من أن تاريخ النهاية أكبر من أو يساوي تاريخ البداية
  const validateEndDate = (endDate) => {
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);
    return (
      endDateValue >= startDateValue || "End date must be after or equal to start date"
    );
  };

  const onSubmit = (data) => {
    const db = getDatabase();
    const formRef = ref(db, "formData/" + new Date().getTime());

    dispatch(setFormData(data));

    set(formRef, data)
      .then(() => {
        toast.success("Form data saved successfully!");
        onClose();
      })
      .catch((error) => {
        toast.error("Error saving data: " + error.message);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>
        <p className="text-lg text-gray-600 text-center mb-6">
          Please provide your details to complete the booking
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Full Name"
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            <select
              {...register("idType")}
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="National ID">National ID</option>
              <option value="Passport">Passport</option>
            </select>

            <input
              {...register("idNumber", { required: "ID Number is required" })}
              placeholder="ID Number"
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm">{errors.idNumber.message}</p>
            )}

            <input
              {...register("phoneNumber", { required: "Phone number is required" })}
              placeholder="Phone Number"
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}

            <input
              type="date"
              {...register("startDate", {
                required: "Start date is required",
                validate: {
                  validDate: (value) => validateDateRange(value),
                },
              })}
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}

            <input
              type="date"
              {...register("endDate", {
                required: "End date is required",
                validate: {
                  validDate: (value) => validateDateRange(value),
                  validEndDate: (value) => validateEndDate(value),
                },
              })}
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}

            <input
              type="number"
              {...register("numGuests", { required: "Number of guests is required" })}
              placeholder="Number of Guests"
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.numGuests && (
              <p className="text-red-500 text-sm">{errors.numGuests.message}</p>
            )}

            <input
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              className="p-4 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Confirm Booking
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BookNowPopup;