// import { useState } from "react";
// import Navbar from "../navBar/NavBar";

// const Checkout = () => {
//   const [selectedPayment, setSelectedPayment] = useState("credit-card");

//   return (
//     <div className="bg-gray-50">
//       <Navbar /> {/* ✅ Navbar ثابت بالأعلى */}
      
//       <div className="min-h-screen flex flex-col items-center py-20 px-5">
//         <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-8">
//           {/* 🚚 Order Summary */}
//           <div className="border-b border-gray-300 pb-6">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">🛒 Order Summary</h2>
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-lg font-medium text-gray-700">Product Name</p>
//               <p className="text-lg font-medium text-gray-700">$199.99</p>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-lg font-medium text-gray-700">Shipping</p>
//               <p className="text-lg font-medium text-gray-700">$20.00</p>
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-lg font-medium text-gray-700">Discount</p>
//               <p className="text-lg font-medium text-green-500">-$20.00</p>
//             </div>
//             <div className="flex justify-between items-center border-t border-gray-300 pt-4">
//               <p className="text-xl font-semibold text-blue-700">Total</p>
//               <p className="text-xl font-semibold text-blue-700">$199.99</p>
//             </div>
//           </div>

//           {/* 📝 Billing Information */}
//           <div className="border-b border-gray-300 pb-6">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">📝 Billing Information</h2>
//             <form className="space-y-4">
//               <div className="flex space-x-4">
//                 <div className="w-full">
//                   <label className="text-lg font-medium text-gray-700">First Name</label>
//                   <input
//                     type="text"
//                     placeholder="John"
//                     className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     required
//                   />
//                 </div>
//                 <div className="w-full">
//                   <label className="text-lg font-medium text-gray-700">Last Name</label>
//                   <input
//                     type="text"
//                     placeholder="Doe"
//                     className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-lg font-medium text-gray-700">Email Address</label>
//                 <input
//                   type="email"
//                   placeholder="john.doe@example.com"
//                   className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-lg font-medium text-gray-700">Phone Number</label>
//                 <input
//                   type="tel"
//                   placeholder="+123 456 7890"
//                   className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>
//             </form>
//           </div>

//           {/* 💳 Payment Information */}
//           <div className="pb-6">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">💳 Payment Information</h2>
//             <div className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 id="credit-card"
//                 name="payment-method"
//                 value="credit-card"
//                 checked={selectedPayment === "credit-card"}
//                 onChange={() => setSelectedPayment("credit-card")}
//                 className="mr-2"
//               />
//               <label htmlFor="credit-card" className="text-lg font-medium text-gray-700">
//                 Credit/Debit Card
//               </label>
//             </div>
//             <div className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 id="paypal"
//                 name="payment-method"
//                 value="paypal"
//                 checked={selectedPayment === "paypal"}
//                 onChange={() => setSelectedPayment("paypal")}
//                 className="mr-2"
//               />
//               <label htmlFor="paypal" className="text-lg font-medium text-gray-700">
//                 PayPal
//               </label>
//             </div>
//             <div className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 id="bank-transfer"
//                 name="payment-method"
//                 value="bank-transfer"
//                 checked={selectedPayment === "bank-transfer"}
//                 onChange={() => setSelectedPayment("bank-transfer")}
//                 className="mr-2"
//               />
//               <label htmlFor="bank-transfer" className="text-lg font-medium text-gray-700">
//                 Bank Transfer
//               </label>
//             </div>
//             {selectedPayment === "credit-card" && (
//               <div>
//                 <label className="text-lg font-medium text-gray-700">Card Number</label>
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9101 1121"
//                   className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>
//             )}
//           </div>

//           {/* 🚀 Checkout Button */}
//           <div className="flex justify-center pt-6">
//             <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
//               🚀 Complete Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navBar/NavBar";

const Checkout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");
  const totalPrice = queryParams.get("totalPrice") ? parseFloat(queryParams.get("totalPrice")) : 0;

  const [selectedPayment, setSelectedPayment] = useState("credit-card");

  return (
    <div className="bg-gray-50">
      <Navbar /> {/* ✅ Navbar ثابت بالأعلى */}

      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-8">
          {/* 🚚 Order Summary */}
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">🛒 Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-700">Product ID</p>
              <p className="text-lg font-medium text-gray-700">{productId || "N/A"}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-700">Subtotal</p>
              <p className="text-lg font-medium text-gray-700">JD {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-700">Service Fee</p>
              <p className="text-lg font-medium text-gray-700">JD {(totalPrice * 0.1).toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-700">Discount</p>
              <p className="text-lg font-medium text-green-500">- JD 0.00</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
              <p className="text-xl font-semibold text-blue-700">Total</p>
              <p className="text-xl font-semibold text-blue-700">JD {(totalPrice + totalPrice * 0.1).toFixed(2)}</p>
            </div>
          </div>

          {/* 📝 Billing Information */}
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">📝 Billing Information</h2>
            <form className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-full">
                  <label className="text-lg font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="text-lg font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-lg font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-lg font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+123 456 7890"
                  className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </form>
          </div>

          {/* 💳 Payment Information */}
          <div className="pb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">💳 Payment Information</h2>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                value="credit-card"
                checked={selectedPayment === "credit-card"}
                onChange={() => setSelectedPayment("credit-card")}
                className="mr-2"
              />
              <label htmlFor="credit-card" className="text-lg font-medium text-gray-700">
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="paypal"
                name="payment-method"
                value="paypal"
                checked={selectedPayment === "paypal"}
                onChange={() => setSelectedPayment("paypal")}
                className="mr-2"
              />
              <label htmlFor="paypal" className="text-lg font-medium text-gray-700">
                PayPal
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="bank-transfer"
                name="payment-method"
                value="bank-transfer"
                checked={selectedPayment === "bank-transfer"}
                onChange={() => setSelectedPayment("bank-transfer")}
                className="mr-2"
              />
              <label htmlFor="bank-transfer" className="text-lg font-medium text-gray-700">
                Bank Transfer
              </label>
            </div>
            {selectedPayment === "credit-card" && (
              <div>
                <label className="text-lg font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  className="w-full p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}
          </div>

          {/* 🚀 Checkout Button */}
          <div className="flex justify-center pt-6">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
              🚀 Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
