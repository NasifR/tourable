import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import '../tailwind.css';
import ggProfileIcon from '../logo/gg_profile.png';
import logo1 from '../logo/Logo-picture.png';

function Navbar() {
  return (
    <nav className="bg-[#452A1A] z-10 p-4 fixed w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center space-x-2">
         <Link to="/">
          <img src={logo1} alt="Tourable Logo" className="h-12 w-12" /> 
          </Link>
          <Link to="/">
          <span className="text-white font-bold font-red-hat text-3xl">Tourable</span>
          </Link>
        </div>

        {/* Center section with navigation links */}
        <ul className="flex space-x-8 text-xl">
          <li>
            <Link to="/" className="px-3 py-1 text-white hover:text-black hover:bg-white hover:rounded-full transition-all">Home</Link>
          </li>
          <li>
            <Link to="/explore" className="px-3 py-1 text-white hover:text-black hover:bg-white hover:rounded-full transition-all">Explore</Link>
          </li>
          <li>
            <Link to="/profile" className="px-3 py-1 text-white hover:text-black hover:bg-white hover:rounded-full transition-all">Profile</Link>
          </li>
          <li>
            <Link to="/about" className="px-3 py-1 text-white hover:text-black hover:bg-white hover:rounded-full transition-all">About Us</Link>
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
          <Link to="/profile">
          <FaUserCircle className="text-white text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

