import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="relative group flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
              <span className="text-white font-bold text-xl">HV</span>
            </div>
            <span className="text-gray-800 font-semibold text-lg">
              Horizon Villas
              <div className="absolute bottom-0 left-0 w-0 h-0.5"></div>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {[
                "Rentals",
                "Wishlist",
                "Support",
                "AdminDash",
                "SellerDash",
                "about",
                "contact"
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className="relative group py-2 text-gray-600"
                >
                  <span className="relative z-10">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <Link
              to="/UserProfile"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              <LayoutDashboard className="h-5 w-5" />
              User Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
