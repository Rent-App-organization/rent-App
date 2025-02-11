// // UserProfile.jsx
// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../../redux/authSlice' // غيّر المسار بناءً على مكان ملف authSlice لديك

// const UserProfile = () => {
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth)

//   const handleLogout = () => {
//     dispatch(logout())
//   }

//   // في حال لم يكن هناك مستخدم مسجّل الدخول
//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h2 className="text-2xl font-bold mb-4">لا يوجد مستخدم مسجّل</h2>
//         <p className="text-gray-600">الرجاء تسجيل الدخول أو إنشاء حساب لعرض الصفحة الشخصية.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-md mx-auto my-8 p-4 border rounded shadow-md">
//       <h2 className="text-3xl font-bold text-center mb-4">الصفحة الشخصية</h2>

//       <div className="flex items-center space-x-4">
//         {/* صورة الملف الشخصي */}
//         {user.profileImage ? (
//           <img
//             src={user.profileImage}
//             alt="Profile"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full">
//             لا توجد صورة
//           </div>
//         )}

//         {/* معلومات المستخدم */}
//         <div>
//           <p className="text-lg">
//             <strong>الاسم الكامل: </strong>
//             {user.fullName}
//           </p>
//           <p>
//             <strong>البريد الإلكتروني: </strong>
//             {user.email}
//           </p>
//           {user.phone && (
//             <p>
//               <strong>رقم الهاتف: </strong>
//               {user.phone}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//         >
//           تسجيل الخروج
//         </button>
//       </div>
//     </div>
//   )
// }

// export default UserProfile

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice' // Adjust the path based on where your authSlice is located

const UserProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  // If no user is logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">No user is logged in</h2>
        <p className="text-gray-600">
          Please log in or create an account to view your profile.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-8 p-4 border rounded shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">User Profile</h2>

      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full">
            No image
          </div>
        )}

        {/* User Information */}
        <div>
          <p className="text-lg">
            <strong>Full Name: </strong>
            {user.fullName}
          </p>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          {user.phone && (
            <p>
              <strong>Phone: </strong>
              {user.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserProfile
