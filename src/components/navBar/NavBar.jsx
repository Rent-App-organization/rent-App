// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import app  from "../../fireBaseConfig.js";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <nav className="backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <Link to="/" className="relative group flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
//               <span className="text-white font-bold text-xl">HV</span>
//             </div>
//             <span className="text-gray-800 font-semibold text-lg">
//               Horizon Villas
//               <div className="absolute bottom-0 left-0 w-0 h-0.5"></div>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <div className="flex space-x-6">
//               {["Rentals", "Wishlist", "AdminDash", "SellerDash", "about", "support"].map((item) => (
//                 <Link
//                   key={item}
//                   to={`/${item}`}
//                   className="relative group py-2 text-gray-600"
//                 >
//                   <span className="relative z-10">
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </span>
//                   <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-6">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="hidden lg:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/Login"
//                 className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData, logoutUser } from "../../redux/authSlice"; // Adjust the path as needed

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { user } = useSelector(state => state.auth);
  
//   useEffect(() => {
//     if (user?.uid) {
//       dispatch(fetchUserData());
//     }
//   }, [dispatch, user?.uid]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   // Define navigation items based on role
//   const getNavItems = () => {
//     const baseItems = [
//       { name: "Rentals", path: "/Rentals" },
//       { name: "Wishlist", path: "/Wishlist" },
//       { name: "About", path: "/about" },
//       { name: "Support", path: "/support" }
//     ];
    
//     if (!user) {
//       return baseItems;
//     }
    
//     if (user.role === "admin") {
//       return [...baseItems, { name: "Admin Dashboard", path: "/AdminDash" }];
//     }
    
//     if (user.role === "seller" || user.role === "owner") {
//       return [...baseItems, { name: "Seller Dashboard", path: "/SellerDash" }];
//     }
    
//     return baseItems; // Default for regular users
//   };

//   const navItems = getNavItems();

//   return (
//     <nav className="backdrop-blur-md bg-white/90 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <Link to="/" className="relative group flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 transition-all duration-300 group-hover:shadow-lg">
//               <span className="text-white font-bold text-xl">HV</span>
//             </div>
//             <span className="text-gray-800 font-semibold text-lg">
//               Horizon Villas
//               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <div className="flex space-x-6">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`relative group py-2 px-1 ${
//                     location.pathname === item.path
//                       ? "text-blue-600 font-medium"
//                       : "text-gray-600 hover:text-gray-900"
//                   } transition-colors duration-200`}
//                 >
//                   <span className="relative z-10">
//                     {item.name}
//                   </span>
//                   <div 
//                     className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
//                       location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
//                     }`}
//                   ></div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-6">
//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
//                 >
//                   <span>Profile</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="hidden md:flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all duration-300"
//                 >
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/Login"
//                 className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
//               >
//                 <span>Login</span>
//               </Link>
//             )}
            
//             {/* Mobile menu button - you can implement this if needed */}
//             <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../../redux/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user?.uid]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
  };

  // Define navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { name: "Rentals", path: "/Rentals" },
      { name: "Wishlist", path: "/Wishlist" },
      { name: "About", path: "/about" },
      { name: "Support", path: "/support" }
    ];
    
    if (!user) {
      return baseItems;
    }
    
    if (user.role === "admin") {
      return [...baseItems, { name: "Admin Dashboard", path: "/AdminDash" }];
    }
    
    if (user.role === "seller" || user.role === "owner") {
      return [...baseItems, { name: "Seller Dashboard", path: "/SellerDash" }];
    }
    
    return baseItems; // Default for regular users
  };

  const navItems = getNavItems();

  return (
    <nav className="backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="relative group flex items-center space-x-3 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 transition-all duration-300 group-hover:shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">HV</span>
            </div>
            <span className="text-gray-800 font-semibold text-base md:text-lg">
              Horizon Villas
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group py-2 px-1 ${
                    location.pathname === item.path
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors duration-200`}
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                      location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/UserProfile"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
                >
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all duration-300"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/Login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
            
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-10 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <div className="flex flex-col space-y-4 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`py-3 px-4 rounded-lg ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/UserProfile"
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/Login"
                className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;