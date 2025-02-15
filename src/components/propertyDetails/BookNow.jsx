import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/FormSlice";
import { getDatabase, ref, set } from "firebase/database";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const parseAvailableDates = (dateString, year = 2025) => {
  const [month, days] = dateString.split(" ");
  const [startDay, endDay] = days.split("-");
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const startDate = new Date(year, monthIndex, parseInt(startDay, 10));
  const endDate = new Date(year, monthIndex, parseInt(endDay, 10));
  return { startDate, endDate };
};

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
  const { startDate: startAvailableDate, endDate: endAvailableDate } = parseAvailableDates(availableDates, 2025);

  const validateDateRange = (date) => {
    if (!date) {
      toast.error("Please select a date");
      return false;
    }
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      toast.error("Invalid date");
      return false;
    }
    if (selectedDate < startAvailableDate || selectedDate > endAvailableDate) {
      toast.error("The selected date is booked. Please choose a date within the available range.");
      return false;
    }
    return true;
  };

  const validateEndDate = (endDate) => {
    if (!startDate) {
      toast.error("Please select the start date first");
      return false;
    }
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);
    if (endDateValue < startDateValue) {
      toast.error("End date must be after or equal to the start date");
      return false;
    }
    return true;
  };

  const onSubmit = (data) => {
    const db = getDatabase();
    const formRef = ref(db, "formData/" + new Date().getTime());
    dispatch(setFormData(data));
    set(formRef, data)
      .then(() => {
        toast.success("Data saved successfully!");
        onClose();
      })
      .catch((error) => {
        toast.error("Error saving data: " + error.message);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">✕</button>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Villa Rental Information</h2>
          <p className="text-lg text-gray-600 text-center mb-6">Please provide your details to complete the booking</p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input 
              type="text" 
              {...register("fullName", { 
                required: {
                  value: true,
                  message: "Full name is required"
                }
              })} 
              placeholder="Full Name" 
              className="p-4 border rounded-lg w-full" 
              onBlur={(e) => {
                if (!e.target.value) {
                  toast.error("Full name is required");
                }
                e.target.reportValidity();
              }}
            />
            <input 
              type="text" 
              {...register("idNumber", { 
                required: {
                  value: true,
                  message: "ID Number is required"
                }
              })} 
              placeholder="ID Number" 
              className="p-4 border rounded-lg w-full" 
              onBlur={(e) => {
                if (!e.target.value) {
                  toast.error("ID Number is required");
                }
                e.target.reportValidity();
              }}
            />
            <input 
              type="number" 
              {...register("numGuests", { 
                required: {
                  value: true,
                  message: "Number of guests is required"
                }
              })} 
              placeholder="Number of Guests" 
              className="p-4 border rounded-lg w-full" 
              onBlur={(e) => {
                if (!e.target.value) {
                  toast.error("Number of guests is required");
                }
                e.target.reportValidity();
              }}
            />
            <input 
              type="text" 
              {...register("phoneNumber", { 
                required: {
                  value: true,
                  message: "Phone Number is required"
                }
              })} 
              placeholder="Phone Number" 
              className="p-4 border rounded-lg w-full" 
              onBlur={(e) => {
                if (!e.target.value) {
                  toast.error("Phone Number is required");
                }
                e.target.reportValidity();
              }}
            />
            <input 
              type="text" 
              {...register("address", { 
                required: {
                  value: true,
                  message: "Address is required"
                }
              })} 
              placeholder="Address" 
              className="p-4 border rounded-lg w-full" 
              onBlur={(e) => {
                if (!e.target.value) {
                  toast.error("Address is required");
                }
                e.target.reportValidity();
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="date" {...register("startDate", { required: "Start date is required", validate: { validDate: validateDateRange } })} className="p-4 border rounded-lg w-full" onBlur={(e) => e.target.reportValidity()} />
              <input type="date" {...register("endDate", { required: "End date is required", validate: { validDate: validateDateRange, validEndDate: validateEndDate } })} className="p-4 border rounded-lg w-full" onBlur={(e) => e.target.reportValidity()} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">Confirm Booking</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookNowPopup;