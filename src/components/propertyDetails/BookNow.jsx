import { useState, useEffect } from "react";
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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
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
            <input type="text" {...register("idNumber")} placeholder="ID Number" className="p-3 border border-gray-300 rounded-lg w-full text-sm" />
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
