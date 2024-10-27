import React from "react";
import { Link } from "react-router-dom";
import '../tailwind.css'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/explore" className="text-white hover:text-gray-400">Explore</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-400">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
