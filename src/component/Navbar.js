import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import '../tailwind.css';
import ggProfileIcon from '../logo/gg_profile.png';
import logo1 from '../logo/Logo-picture.png';

function Navbar() {
  return (
    <nav className="bg-transparent p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center space-x-2">
          <img src={logo1} alt="Tourable Logo" className="h-12 w-12" /> 
          <span className="text-black font-bold text-lg">Tourable</span>
        </div>

        {/* Center section with navigation links */}
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-black hover:text-gray-600">Home</Link>
          </li>
          <li>
            <Link to="/explore" className="text-black hover:text-gray-600">Explore</Link>
          </li>
          <li>
            <Link to="/profile" className="text-black hover:text-gray-600">Profile</Link>
          </li>
          <li>
            <Link to="/about" className="text-black hover:text-gray-600">About Us</Link>
          </li>
        </ul>

        {/* Right section with search bar and profile icon */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 rounded-full py-2 pl-8 pr-4 text-black focus:outline-none"
            />
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black" />
          </div>
          {/* Profile icon */}
          <FaUserCircle className="text-black text-2xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


